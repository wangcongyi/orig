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


### 重要概念

1. `WebAssembly.Module` : 模块 —— 是已被编译为可执行机器码的二进制对象，可以简单地与操作系统的班底可执行程序进行类比（win系统的 .exe 文件)。是由 WebAssembly 二进制汇编代码（.wasm）编译而来  

2. `WebAssembly.Memory` ：内存 —— 在浏览器中，WebAssembly 是由 JavaScript 中的 ArrayBuffer 对象实现，JavaScript 和 WebAssembly 可以通过内存交换数据。    

3. `WebAssembly.Table` ：表格 —— WebAssembly 引入了表格对象用于存储函数引用。 

4. `WebAssembly.Instance` ：实例 —— 在 WebAssembly 中，实例用于指代一个模块及其运行时的所有状态，包括内存、表格、导入对象等，模块只有在实例化之后才能被调用。导入、导出对象是模块实例很重要的部分，模块内部的 WebAssembly 代码可以通过导入对象中的导入函数调用外部的 JavaScript 的方法，导出对象中的导出函数是模块提供 外部 JavaScript 使用的接口。  

