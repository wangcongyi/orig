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
    > 同一个实现接口，使用不同的实例而执行不同的操作


- 继承  

```javascript
   
   ////   类式继承--对象冒充   
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
   
   ////    原型链继承
   //      缺点就是 每次都要创建父类的实例，
   //      因为是原型对象，所以 定义在prototype上的属性，一个实例上修改了，其他的实例上也会修改
   Child.prototype = new Father()
   Child.constructor = Child
   
```

#### ES5的继承时通过prototype或构造函数机制来实现。ES5的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到this上（Parent.apply(this)）。  
#### ES6的继承机制完全不同，实质上是先创建父类的实例对象this（所以必须先调用父类的super()方法），然后再用子类的构造函数修改this。

```
具体的：ES6通过class关键字定义类，里面有构造方法，类之间通过extends关键字实现继承。
子类必须在constructor方法中调用super方法，否则新建实例报错。因为子类没有自己的this对象，
而是继承了父类的this对象，然后对其进行加工。
如果不调用super方法，子类得不到this对象。

ps：super关键字指代父类的实例，即父类的this对象。在子类构造函数中，调用super后，才可使用this关键字，否则报错。
```

#### __proto__和 prototype
每一个对象 一定对应一个原型对象，并从原型对象上继承属性和方法。  
对象 __proto__ 属性就是所对应的原型对象
```js

const o1 = { x: 1 }
const o2 = new Object();

o1.__proto__ === Object.prototype // true
o2.__proto__ === Object.prototype // true

//  对象有属性__proto__,指向该对象的构造函数的原型对象
//  方法除了有属性__proto__,还有属性prototype，prototype指向该方法的原型对象
```





