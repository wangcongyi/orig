# 初步了解 WebAssembly

*WebAssembly程序从开发到运行于网页中大致可以分为以下几个阶段*

- 使用WebAssembly文本格式或其他语言（C++、Go、Rust等）编写程序，通过各自的工具链编译为WebAssembly汇编格式.wasm文件。  

- 在网页中使用fetch、XMLHttpRequest等获取.wasm文件（二进制流）。  

- 将.wasm编译为模块，编译过程中进行合法性检查。  

- 实例化。初始化导入对象，创建模块的实例。  

- 执行实例的导出函数，完成所需操作。  

![w](https://camo.githubusercontent.com/389fb45b7cb4d253c1002a70ce9130d83c487c98/68747470733a2f2f7777772e6570756269742e636f6d2f75706c6f61642f77726974652f4170705f446174612f313831322f31383132633862356138366537666131316638332d4f726967696e616c2d696d616765332e706e67)

*简单示例*  
test.wat (需要通过 wat 工具链编译成 wasm 文件) 
```
(module
  (func (export "showMeTheAnswer") (result i32)
    i32.const 42
  )
)
```


index.html  
```
<body>
<script>
  fetch('./test.wasm')
    .then(res => res.arrayBuffer())
    .then(bytes => WebAssembly.instantiate(bytes))
    .then(result => console.log(result.instance.exports.showMeTheAnswer()))

</script>
</body>
```


*hello world 示例*
```
(module
  (import "js" "print" (func $js_print(param i32 i32)))
  (import "js" "mem" (memory 1))
  (data (i32.const 0) "Hello, world")
  (func (export "hello")
    i32.const 0
    i32.const 13
    call $js_print
  )
)
```

```
<script>
  var wasmMem = new WebAssembly.Memory({ initial: 1 })
  var importObj = { js: { print: printStr, mem: wasmMem } }
  fetch('./test.wasm')
    .then(response => response.arrayBuffer())
    .then(bytes => WebAssembly.instantiate(bytes, importObj))
    .then(result => result.instance.exports.hello())

  function printStr(offset, length) {
    var bytes = new Uint8Array(wasmMem.buffer, offset, length)
    var string = new TextDecoder('utf8').decode(bytes)
    console.log(string)
  }
</script>
```

