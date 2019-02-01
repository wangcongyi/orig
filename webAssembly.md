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
```html
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

```js
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
```


### 重要概念

1. `WebAssembly.Module` : 模块 —— 是已被编译为可执行机器码的二进制对象，可以简单地与操作系统的班底可执行程序进行类比（win系统的 .exe 文件)。是由 WebAssembly 二进制汇编代码（.wasm）编译而来  
`WebAssembly.Module`  构造方法用于同步地编译.wasm 文件为模块
```js
  fetch('./test.wasm')
    .then(res => res.arrayBuffer())
    .then(bytes => {
      const module = new WebAssembly.Module(bytes)
      console.log(module.toString())
        }
      )
```
`WebAssembly.Module.exports()`  该方法用于获取模块的导出信息
```js
fetch('./test.wasm')
    .then(res => res.arrayBuffer())
    .then(bytes => WebAssembly.compile(bytes))
    .then(module => {
        const exports = WebAssembly.Module.exports(module)
        for (let ex in exports) {
          console.log(exports[ex])
        }
      }
    )
```

`WebAssembly.Module.imports()`  该方法用于获取模块的导入信息
```js
fetch('./test.wasm')
    .then(res => res.arrayBuffer())
    .then(bytes => WebAssembly.compile(bytes))
    .then(module => {
        const imports = WebAssembly.Module.imports(module)
        for (let i in imports) {
          console.log(imports[i])
        }
      }
    )
```

  

2. `WebAssembly.Memory` ：内存 —— 在浏览器中，WebAssembly 是由 JavaScript 中的 ArrayBuffer 对象实现，JavaScript 和 WebAssembly 可以通过内存交换数据。较为常见的用法是：在JavaScript中创建内存对象（该对象包含了一个ArrayBuffer，用于存储上述一维数组），模块实例化时将其通过导入对象导入WebAssembly中。一个内存对象可以导入多个实例，这使得多个实例可以通过共享一个内存对象的方式交换数据。  
`WebAssembly.Memory.prototype.buffer` 用于访问内存对象的ArrayBuffer  
```js
const memory = new WebAssembly.Memory({ initial, maxinum })   
//initial：内存的初始容量，以页为单位（1页=64 KB=65 536字节） maximum：可选，内存的最大容量，以页为单位。
```
`WebAssembly.Memory.prototype.grow()` 用于扩大内存对象的容量
   

3. `WebAssembly.Table` ：表格 —— WebAssembly 引入了表格对象用于存储函数引用。 表格是保存了对象引用的一维数组。目前可以保存在表格中的元素只有函数引用一种类型，随着WebAssembly的发展，将来或许有更多类型的元素（如DOM对象）能被存入其中，但到目前为止，可以说表格是专为函数指针而生。目前每个实例只能包含一个表格，因此相关的WebAssembly指令隐含的操作对象均为当前实例拥有的唯一表格。表格不占用内存地址空间，二者是相互独立的。使用函数指针的本质行为是：通过变量（即函数地址）找到并执行函数。在WebAssembly中，当一个函数被存入表格中后，即可通过它在表格中的索引（该函数在表格中的位置，或者说数组下标）来调用它，这就间接地实现了函数指针的功能，只不过用来寻找函数的变量不是函数地址，而是它在表格中的索引。WebAssembly为何使用这种拐弯抹角的方式来实现函数指针？最重要的原因是为了安全。倘若能通过函数的真实地址来调用它，那么WebAssembly代码的执行范围将不可控，例如，调用非法地址导致浏览器崩溃，甚至下载恶意程序后导入运行等，而在WebAssembly当前的设计框架下，保存在表格中的函数地址对WebAssembly代码不可见、无法修改，只能通过表格索引来调用，并且运行时的栈数据并不保存在内存对象中，由此彻底断绝了WebAssembly代码越界执行的可能，最糟糕的情况不过是在内存对象中产生一堆错误数据而已。
```js
const table = new WebAssembly.Table({ element, initial, maximum });
//  element：存入表格中的元素的类型，当前只能为anyfunc，即函数引用。 initial：表格的初始容量。maximum：可选，表格的最大容量。
```

`WebAssembly.Table.prototype.get()`  用于获取表格中指定索引位置的函数引用
```
;;import_table.wat
(module
    (import "js" "table" (table 2 anyfunc))
    (elem (i32.const 0) $func1 $func0) ;;set $func0,$func1 to table
    (func $func0 (result i32)
        i32.const 13
    )
    (func $func1 (result i32)
        i32.const 42
    )
)
```

```js
    var table = new WebAssembly.Table({element:'anyfunc', initial:2});
    console.log(table);
    console.log(table.get(0));
    console.log(table.get(1));
    fetch('./test.wasm', {js:{table:table}}).then(
        function(instance) {
            console.log(table.get(0));
            console.log(table.get(1));
        }
    );
```

4. `WebAssembly.Instance` ：实例 —— 在 WebAssembly 中，实例用于指代一个模块及其运行时的所有状态，包括内存、表格、导入对象等，模块只有在实例化之后才能被调用。导入、导出对象是模块实例很重要的部分，模块内部的 WebAssembly 代码可以通过导入对象中的导入函数调用外部的 JavaScript 的方法，导出对象中的导出函数是模块提供 外部 JavaScript 使用的接口。  
`WebAssembly.Instance`  构造方法用于同步地创建模块的实例  
`WebAssembly.Instance.prototype.exports` 只读属性exports包含了实例的所有导出函数，即实例供外部JavaScript程序调用的接口  
```
;;test.wat
(module
  (func (export "add") (param $i1 i32) (param $i2 i32) (result i32)
    get_local $i1
    get_local $i2
    i32.add
  )
  (func (export "inc") (param $i1 i32) (result i32)
    get_local $i1
    i32.const 1
    i32.add
  )
)
```
```js
fetch('test.wasm')
    .then(res => res.arrayBuffer())
    .then(bytes => WebAssembly.compile(bytes))
    .then(module => WebAssembly.instantiate(module))
    .then(instance => {
      console.log(instance.exports)
      console.log(instance.exports.add(21, 21))    // 42
      console.log(instance.exports.inc(12))        // 13
    })
```



### 全局方法
1.  `WebAssembly.compile()` —— 该方法用于将WebAssembly二进制代码（.wasm）编译为WebAssembly.Module  
```js
 fetch('./test.wasm')
    .then(res => res.arrayBuffer())
    .then(bytes => WebAssembly.compile(bytes))
    .then(result => console.log(result.toString()))
```  

2. `WebAssembly.instantiate()` —— 将 WebAssembly 二进制代码编译为模块，并创建其实例。例子如上面的代码  

3. `WebAssembly.validate()` —— 用于校验 WebAssembly 二进制代码是否合法  
```js
const valid = WebAssembly.validate(bufferSource)   //  return true or false
```  

4. `WebAssembly.compileStreaming()` —— 该方法与 WebAssembly.compile() 类似，用于 WebAssembly 二进制代码的编译，区别在于本方法使用流式底层源作为输入  
```js
WebAssembly.compileStreaming(fetch('./test.wasm'))
  .then(module => console.log(module.toString()) 
)
```  

5. `WebAssembly.instantiateStreaming()` —— 该方法与 WebAssembly.instantiate() 类似，用于将 WebAssembly 二进制代码编译为模块，并创建其第一个实例，区别在于本方法使用流式底层源作为输入  
```js
WebAssembly.instantiateStreaming(fetch('./test.wasm'))
  .then(res =>console.log(res.instance.exports.showMeTheAnswer())
)
```




