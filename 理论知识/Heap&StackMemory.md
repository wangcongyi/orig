# javascript变量与内存 传值策略
## javascript变量有两种不同的数据类型
1. 基本类型  undefined、boolean、number、string、null.  
2. 引用类型  array、object、function.
### 基本类型的变量存放在栈内存中
### 引用类型的变量的地址(指针)存放在栈内存中 具体的值存放在堆内存中！important



### 基本类型的值是不可变的
任何方法都无法改变一个基本类型的值，比如一个字符串  
```javascript
var name = 'king';
name.toUpperCase() //  KING
console.log(name)  //  king
// name并未发生改变，调用了方法之后返回了一个新的字符串
// 并且我们不能给基本类型添加属性和方法
// 也不能使用delete 删除
```

### 引用类型的值是可变的 引用类型的比较是引用的比较
```javascript  
var p = {};
p.name = 'king';
p.sayName = function(){console.log(this.name)}
delete person.name; //删除person对象的name属性
person.sayName(); // undefined
//引用类型可以拥有属性和方法，并且是可以动态改变的 
```
```javascript
var p1 = {};
var p2 = {};
console.log( p1==p2 ) //false   比较两个对象的堆内存中的地址是否相同 很明显不同
```

### 引用类型的赋值
```javascript
var a = {}; // a保存了一个空对象的实例
var b = a;  // a和b都指向了这个空对象
a.name = 'king';
console.log( a.name ); // 'king'
console.log( b.name ); // 'king'
b.age = 22;
console.log( b.age );// 22
console.log( a.age );// 22
console.log( a == b );// true  
var obja = { v:'a' }      //为obja分配栈内存obja 堆内存{v:'a'}
var objb = obja         //为objb分配栈内存objb 引用堆内存德尔值{v:'a'}
objb.v = 'b'       //通过objb访问堆内存的值 修改为"b" 由于obja和objb引用的是堆内存同一个对象值 obja={v:'b'}
var objb = {v:'c'}     //修改了整个对象 在对内存中创建一个新的对象值{v:'c'} 
```


### JavaScript 的传值策略
#### JavaScript 基本类型按值传递，引用类型按共享传递（call by sharing）
```javascript
  const obj = { x: 1 }

  function foo(o) {
    o.x = 121212
  }

  foo(obj)
  console.log(obj.x)   //  121212    
     //  引用的是副本，但引用的对象是相同的（共享相同的对象）  修改形参对象的属性值，也会影响到实参的属性值 


  function change(n, o1, o2) {
    n = n * 100
    o1.item = 'b'
    o2 = { item: 'b' }
  }

  const n = 10
  const o1 = { item: 'a' }
  const o2 = { item: 'a' }

  change(n, o1, o2)
  console.log(n)             //  没有变   10
  console.log(o1.item)       //  改变了   b
  console.log(o2.item)       //  没有变   a




```



