 - JavaScript 面向对象编程 **es6的语法基本类似，不作介绍**
 
```javascript
      function Aaa() {}
      //    Aaa.prototype.constructor = Aaa;    //程序自动生成此句话
        var a = new Aaa();
        console.log( a.constructor.prototype === Aaa.prototype );
        console.log( a.__proto__ === Aaa.prototype );
        console.log( a.constructor.prototype.constructor )
```

### 继承
 
```javascript

   // 构造函数的问题 
    
   function P(name,age) {
     this.name = name;
     this.age = age;
     this.sayName = function(){    // 实例的创建机制相同 但不同的作用域和标识符的解析
       console.log(this.name)
     }
   }

   //  p1.sayName == p2.sayName   ---->>>> false
   
   
   // 原型对象的问题
   function P() {
      
   }
   
   P.prototype = {
      construct: P,
      name: "king",
      age: 20,
      color: ["red", "yellow"],
   }
   // 省略了构造函数传递参数的初始化，所有实例都享有原型对象上的属性
   // 实例指向原型对象 指针 而并非 拷贝
   
   
   // 组合继承
   // 构造函数用于定义 实例属性 
   // 原型对象用于定义 方法和共享属性 
   
   
   
```
