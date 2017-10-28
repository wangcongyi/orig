 - JavaScript 面向对象编程 **es6的语法基本类似，不作介绍**
 
```javascript
      function Aaa() {}
      //    Aaa.prototype.constructor = Aaa;    //程序自动生成此句话
        var a = new Aaa();
        console.log( a.constructor.prototype === Aaa.prototype );
        console.log( a.__proto__ === Aaa.prototype );
        console.log( a.constructor.prototype.constructor )
```

//  TODO 
//  之前有很多大误解
//  es6 与 es5 的 oop 差别还是挺大的 
