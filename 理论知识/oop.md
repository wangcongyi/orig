## JavaScript 面向对象编程

```js
   // 创建对象
   
   function Aaa() {}
     //    Aaa.prototype.constructor = Aaa;    //程序自动生成此句话
     var a = new Aaa();
     console.log( a.constructor.prototype === Aaa.prototype );
     console.log( a.__proto__ === Aaa.prototype );
     console.log( a.constructor.prototype.constructor )
   /*****************************************************/    
     
   //// 构造函数的问题 
      function P(name,age) {
        this.name = name;
        this.age = age;
        this.sayName = function(){    // 实例的创建机制相同 但不同的作用域和标识符的解析
          console.log(this.name)
        }
      }
   
      //  p1.sayName == p2.sayName   ---->>>> false
      
      
      //// 原型对象的问题
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
      // 组合方式创建对象
      // 构造函数用于定义 实例属性 
      // 原型对象用于定义 方法和共享属性 
``` 

- 封装  
    > 把抽象的属性和对属性的操作封装在一起，  
      属性被保护在内部，程序的其他部分只用通过被授权的操作，才能对属性进行操作 
    
```javascript
   
   function P(name,age) {
     this.name = name;      //   公开属性
     var aged = age;        //   私有属性
     
     this.showAge = function() {  // 公开方法（特权方法）
       console.log(aged)          // 可以操作私有属性
     }
     
     function show() {            // 私有方法 （内部方法）类
       console.log(32323);        //  可以访问对象属性，但不能在外部被调用
     }
   }
   
   var p = new P("king",20,232323);
   console.log(p.name)        // "king"
   console.log(p.aged)       //  undefined
   p.showAge()               //   20 
```    
    
    
- 多态

- 继承  

```javascript
   
   ////   对象冒充   
   //     关键一点就是改变 this 指向
   //     缺点就是父类定义在 prototype 无法继承
   function Stu(name, age) {
       this.name = name;
       this.age = age;
       this.show = function () {
         console.log(this.name + " " + this.age)
       }
     }
  
     function MidStu(name, age) {
         this.stu = Stu;
         this.stu(name,age)   //这句话不能少，js是动态语言，如果不执行，则不能实现继承
         // this.dog = Dog    
         // this.dot(name,age)  // 通过对象冒充 可以实现多重继承的效果
         
         // Stu.call(this,arguments)
         // Stu.apply(this,[...arguments]) 相同效果        
     }
   
     const m = new MidStu("king",23)
     m.show()
   
   
   
```
