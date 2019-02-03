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

### WebAssembly 文本格式基本语法

- WebAssembly 文本格式是以 `S-表达式` 表示的。`S-表达式` 是用于描述树状结构的一种简单的文本格式，其特征是树的每个结点均被一对圆括号 “(...)” 包围，结点可以包含子结点。  
- WebAssembly 中共有以下4种数据类型
1. i32  32位整形数
2. i64  64位整形数
3. f32  32位浮点数
4. f64  64位浮点数

```
(module              ;; WebAssembly模块根结点，即Module
  (func)             ;; 函数
　(memory 1)         ;; Memory
  (data)             ;; Memory初始值
  (table)            ;; Table
  (elem)             ;; Table元素初始值
  (import)           ;; 导入对象
  (export)           ;; 导出对象
  (type)             ;; 函数签名
  (global)           ;; 全局变量
  (param)            ;; 函数参数
  (local)            ;; 局部变量
  (result)           ;; 函数返回值
  (start)            ;; 开始函数
)
```
- 函数签名 函数签名表明了函数的参数及返回值，它由一系列 `param` 结点（参数列表）及 `result` 结点（返回值）构成
```
(func (param i32) (param f32) (result f64) ...)
```  

- 局部变量表 局部变量表由一系列 `local` 结点组成  
- get_local 0指令将得到第一个参数（i32类型），get_local 1将得到第二个参数（f32类型），get_local 2将得到局部变量（f64类型）。由此我们可以看出，参数与局部变量的区别仅在于：参数的初始值是在调用函数时由调用方传入的；对函数体来说，参数与局部变量是等价的，都是函数内部的局部变量，WebAssembly按照变量声明出现的顺序给每个变量赋予了0,1,2,…这样的递增索引，get_local n指令的作用是读取第n个索引对应的局部变量的值并将其压入栈中（关于栈式虚拟机的概念将在4.5节中介绍），相对地，set_local n的功能是将栈顶的数据弹出并存入第n个索引对应的局部变量中。
```
(func (result f64) (local i32) (local f32) ...)  

func $f1 (param i32) (param f32) (result i64)
　　(local f64)
　　get_local 0 ;;get i32
　　get_local 1 ;;get f32
　　get_local 2 ;;get f64
　　...
)
```  

- 全局变量 与局部变量的作用域仅限于函数内部不同，全局变量的作用域是整个module。全局变量分为可变全局变量、只读全局变量两种，区别 `mut`
```
(module
　　(global (mut i32) (i32.const 42))　　;;define global[0]
　　(global $pi f32 (f32.const 3.14159)) ;;define global[1] as $pi
)  

(module
　　(global (mut i32) (i32.const 42))　　;;define global[0]
　　(global $pi f32 (f32.const 3.14159)) ;;define global[1] as $pi
　　(func
　　　　get_global 0　 ;;get 42
　　　　get_global 1　 ;;get 3.14159
　　　　get_global $pi ;;get 3.14159
　　　　i32.const 42
　　　　set_global 0　 ;;global[0] now become 42
　　　　f32.const 2.1
　　　　set_global $pi ;;CompileError!!!
　　)
)
```

- 函数体 函数体是一系列 WebAssembly 汇编指令的线性列表
- 使用 `call` 直接调用
```
(module
　　(func $compute (result i32)
　　　　i32.const 13
　　　　f32.const 42.0
　　　　call 1　　　　 ;;get 55
　　　　f32.const 10.0
　　　　call $add　　　;;get 65
　　)
　　(func $add (param $a i32) (param $b f32) (result i32)
　　　　get_local $a
　　　　get_local $b
　　　　i32.trunc_s/f32
　　　　i32.add
　　)
)
```

- 使用 `call_indirect` 间接调用
```
(module
　　(table 2 anyfunc)
　　(elem (i32.const 0) $plus13 $plus42)　　　 ;;set $plus13,$plus42 to table
　　(type $type_0 (func (param i32)(result i32))) ;;define func Signatures
　　(func $plus13 (param $i i32) (result i32)
　　　　i32.const 13
　　　　get_local $i
　　　　i32.add)
　　(func $plus42 (param $i i32) (result i32)
　　　　i32.const 42
　　　　get_local $i
　　　　i32.add)
　　(func (export "call_by_index") (param $id i32) (param $input i32) (result i32)
　　　　get_local $input　　　　　　 ;;push param into stack
　　　　get_local $id　　　　　　　　;;push Function id into stack
　　　　call_indirect (type $type_0) ;;call table:id
　　)
)
```

- 递归
```
(module
　　(func $sum (export "sum") (param $i i32) (result i32)
　　 (local $c i32)
　　　　get_local $i
　　　　i32.const 1
　　　　i32.le_s
　　　　if
　　　　　　get_local $i
　　　　　　set_local $c
　　　　else
　　　　　　get_local $i
　　　　　　i32.const 1
　　　　　　i32.sub
　　　　　　call $sum
　　　　　　get_local $i
　　　　　　i32.add
　　　　　　set_local $c
　　　　end
　　　　get_local $c
　　)
)
```

- 导出对象 WebAssembly 中可导出的对象包括内存、表格、函数、只读全局变量。若要导出某个对象，只需要在该对象的类型后加入(export "export_name")属性即可  
```
(module
　　(func (export "wasm_func") (result i32)
　　　　i32.const 42
　　)
　　(memory (export "wasm_mem") 1)
　　(table (export "wasm_table") 2 anyfunc)
　　(global (export "wasm_global_pi") f32 (f32.const 3.14159))
)
```
```js
fetch("exports.wasm")
    .then(res => res.arrayBuffer())
    .then(bytes => WebAssembly.instantiate(bytes))
    .then(results => {
        const exports = WebAssembly.Module.exports(results.module)
        for (let e in exports) {
          console.log(exports[e])
        }
        console.log(results.instance.exports)
        console.log(results.instance.exports.wasm_func())
        console.log(results.instance.exports.wasm_global_pi)
        console.log(typeof (results.instance.exports.wasm_global_pi))
      }
    )
```

- 导入对象 与可导出的对象类似，WebAssembly中的可导入对象包括内存、表格、函数、只读全局变量,由于导入函数必须先于内部函数定义，因此习惯上导入对象一般在module的开始处声明  
- 与导出对象类似，使用WebAssembly.Module.imports()可以获取模块的导入对象信息
```
(module
　　(import "js" "memory" (memory 1))　　　　　　　　　　　　 ;;import Memory
　　(import "js" "table" (table 1 anyfunc))　　　　　　　　　 ;;import Table
　　(import "js" "print_i32" (func $js_print_i32 (param i32))) ;;import Fucntion
　　(import "js" "global_pi" (global $pi f32))　　　　　　　　;;import Global
)
```
```js
fetch("imports.wasm")
    .then(res => res.arrayBuffer())
    .then(bytes => WebAssembly.compile(bytes))
    .then(module => {
        const imports = WebAssembly.Module.imports(module)
        for (let e in imports) {
          console.log(imports[e])
        }
      }
    )

```

- import 结点使用了两级名字空间的方式对外部导入的对象进行识别，第一级为模块名（即上例中的js），第二级为对象名（即上例中的memory、table等）。导入对象是在实例化时导入实例中去的，在JavaScript的环境下，如果导入对象为importObj，那么(import "m" "n"...)对应的就是importObj.m.n。例如，上述imports.wasm模块实例化时应提供的导入对象如下  
```js
function js_print_i32(param) {
    console.log(param)
  }

  var memory = new WebAssembly.Memory({ initial: 1, maximum: 10 })
  var table = new WebAssembly.Table({ element: 'anyfunc', initial: 2 })
  var importObj = { js: { print_i32: js_print_i32, memory: memory, table: table, global_pi: 3.14 } }
  fetchAndInstantiate("imports.wasm", importObj).then(instance =>
    console.log(instance)
  )
```

- 与导出函数相对应，导入的作用是让WebAssembly调用外部对象。WebAssembly代码调用导入对象时，虚拟机同样执行了参数类型转换、参数和返回值的出入栈等操作，因此导入函数的调用方法与内部函数是一致的  
```
;;imports.wat
(module
　　(import "js" "print_f32" (func $js_print_f32 (param f32) (result f32)))
　　(import "js" "global_pi" (global $pi f32))
　　(func (export "print_pi") (result f32)
　　　　get_global $pi
　　　　call $js_print_f32
　　)
)
```

- print_pi()函数读取了导入的只读全局变量$pi并压入栈中，然后调用了导入函数$js_print_f32，并将其返回值一并返回  
```js
function js_print_f32(param) {
    console.log(param)
    return param * 2.0
  }

  var importObj = { js: { print_f32: js_print_f32, global_pi: 3.14 } }
  fetchAndInstantiate("imports.wasm", importObj).then(
    function(instance) {
      console.log(instance.exports.print_pi())
    }
  )
```
