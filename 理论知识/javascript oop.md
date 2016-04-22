#javascript 面向对象编程
```javascript
function Aaa() {}
    //    Aaa.prototype.constructor = Aaa;    //程序自动生成此句话
    var a = new Aaa();
    console.log(a.constructor.prototype === Aaa.prototype);
    console.log(a.__proto__ === Aaa.prototype);
    console.log(a.constructor.prototype.constructor)
```    