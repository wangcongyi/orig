## Javascript Event Loop

- 事件循环机制 可以参考阮一峰老师的 [JavaScript 运行机制详解](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
- 这里 我想说的是 
    * MacroTask (Task) 与 MicroTask (Job)  
    
    > 一个事件循环(Event Loop)会有一个或多个任务队列(Task Queue，又称 Task Source)，
      这里的 Task Queue 就是 MacroTask Queue，而 Event Loop 仅有一个 MicroTask Queue。
      每个 Task Queue 都保证自己按照回调入队的顺序依次执行，所以浏览器可以从内部到JS/DOM，保证动作按序发生。
      而在 Task 的执行之间则会清空已有的 MicroTask 队列，在 MacroTask 或者 MicroTask 中产生的 MicroTask 
      同样会被压入到 MicroTask 队列中并执行  
      
    > 典型的 MacroTask 包含了 setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O, UI rendering 等，
      MicroTask 包含了 process.nextTick, Promises, Object.observe, MutationObserver 


```javascript
   
  function foo() {
      console.log(1);
      bar();
      setTimeout(() => console.log(7), 0);
      Promise.resolve().then(() => {
      console.log(3);
      Promise.resolve().then(() => console.log(4));
    });
    console.log(2)
  }

    function bar() {
      setTimeout(() => console.log(5), 0);
      setTimeout(() => console.log(6), 0);
    }
  
  foo();
```

```js

(function test() {
    setTimeout(function() {console.log(4)}, 0);
    new Promise(function executor(resolve) {   // 创建 Promise 实例是同步的 ！！
        console.log(1);
        for( var i=0 ; i<10000 ; i++ ) {
            i == 9999 && resolve();
        }
        console.log(2);
    }).then(function() {
        console.log(5);
    });
    console.log(3);
})()

// 输出结果为：
// 1
// 2
// 3
// 5
// 4



```
