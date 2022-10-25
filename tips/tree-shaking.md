[copy from this blog](https://blog.bitsrc.io/build-a-tree-shaking-utility-in-javascript-c6b13e469121)


```shake.js
const acorn = require('acorn')
const JSEmitter = require('./e')
const fs = require('fs')

const buffer = fs.readFileSync('./test.js').toString()

const body = acorn.parse(buffer).body
const jsEmitter = new JSEmitter()

let decls = new Map()
let calledDecls = []
let code = []

body.forEach(node => {
  if (node.type === 'FunctionDeclaration') {
    const code = jsEmitter.run([node])
    decls.set(jsEmitter.visitNode(node.id), code)
    return
  }
  if (node.type === 'ExpressionStatement') {
    if (node.expression.type === 'CallExpression') {
      const callNode = node.expression
      calledDecls.push(jsEmitter.visitIdentifier(callNode.callee))
      const args = callNode.arguments
      for (const arg of args) {
        if (arg.type === 'Identifier') {
          calledDecls.push(jsEmitter.visitNode(arg))
        }
      }
    }
  }

  if (node.type === 'VariableDeclaration') {
    const kind = node.kind
    for (const decl of node.declarations) {
      decls.set(jsEmitter.visitNode(decl.id), jsEmitter.visitVariableDeclarator(decl, kind))
    }
    return
  }

  if (node.type === 'Identifier') {
    calledDecls.push(node.name)
  }
  code.push(jsEmitter.run([node]))

})

code = calledDecls
  .map(c => decls.get(c))
  .concat([code]).join('')

fs.writeFileSync('after_shake.js', code)


```

```emmiter.js
class JSEmitter {
  visitVariableDeclaration(node) {
    let str = ''
    str += node.kind + ' '
    str += this.visitNodes(node.declarations)
    return str + '\n'
  }

  visitVariableDeclarator(node, kind) {
    let str = ''
    str += kind ? kind + ' ' : str
    str += this.visitNode(node.id)
    str += '='
    str += this.visitNode(node.init)
    return str + ';' + '\n'
  }

  visitIdentifier(node) {
    return node.name
  }

  visitLiteral(node) {
    return node.raw
  }

  visitBinaryExpression(node) {
    let str = ''
    str += this.visitNode(node.left)
    str += node.operator
    str += this.visitNode(node.right)
    return str + '\n'
  }

  visitFunctionDeclaration(node) {
    let str = 'function '
    str += this.visitNode(node.id)
    str += '('
    for (let param = 0; param < node.params.length; param++) {
      str += this.visitNode(node.params[param])
      str += ((node.params[param] == undefined) ? '' : ',')
    }
    str = str.slice(0, str.length - 1)
    str += '){'
    str += this.visitNode(node.body)
    str += '}'
    return str + '\n'
  }

  visitBlockStatement(node) {
    let str = ''
    str += this.visitNodes(node.body)
    return str
  }

  visitCallExpression(node) {
    let str = ''
    const callee = this.visitIdentifier(node.callee)
    str += callee + '('
    for (const arg of node.arguments) {
      str += this.visitNode(arg) + ','
    }
    str = str.slice(0, str.length - 1)
    str += ');'
    return str + '\n'
  }

  visitReturnStatement(node) {
    let str = 'return '
    str += this.visitNode(node.argument)
    return str + '\n'
  }

  visitExpressionStatement(node) {
    return this.visitNode(node.expression)
  }

  visitNodes(nodes) {
    let str = ''
    for (const node of nodes) {
      str += this.visitNode(node)
    }
    return str
  }

  visitNode(node) {
    let str = ''
    switch (node.type) {
      case 'VariableDeclaration':
        str += this.visitVariableDeclaration(node)
        break
      case 'VariableDeclarator':
        str += this.visitVariableDeclarator(node)
        break
      case 'Literal':
        str += this.visitLiteral(node)
        break
      case 'Identifier':
        str += this.visitIdentifier(node)
        break
      case 'BinaryExpression':
        str += this.visitBinaryExpression(node)
        break
      case 'FunctionDeclaration':
        str += this.visitFunctionDeclaration(node)
        break
      case 'BlockStatement':
        str += this.visitBlockStatement(node)
        break
      case 'CallExpression':
        str += this.visitCallExpression(node)
        break
      case 'ReturnStatement':
        str += this.visitReturnStatement(node)
        break
      case 'ExpressionStatement':
        str += this.visitExpressionStatement(node)
        break
    }
    return str
  }

  run(body) {
    let str = ''
    str += this.visitNodes(body)
    return str
  }
}

module.exports = JSEmitter


```

```before.js
function add(a, b) {
  return a + b
}

function mul(a, b) {
  return a * b
}

const f = 0
const s = 10
add(f, s)

```
