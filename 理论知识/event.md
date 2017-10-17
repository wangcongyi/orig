## Javascript Event Loop

- 事件循环机制
    可以参考阮一峰老师的 [JavaScript 运行机制详解](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
 
 - 这里 我想说的是 
    1. MacroTask (Task) 与 MicroTask (Job)
    > 一个事件循环(Event Loop)会有一个或多个任务队列(Task Queue，又称 Task Source)，这里的 Task Queue 就是 MacroTask Queue，而 Event Loop 仅有一个 MicroTask Queue。每个 Task Queue 都保证自己按照回调入队的顺序依次执行，所以浏览器可以从内部到JS/DOM，保证动作按序发生。而在 Task 的执行之间则会清空已有的 MicroTask 队列，在 MacroTask 或者 MicroTask 中产生的 MicroTask 同样会被压入到 MicroTask 队列中并执行  

    2. 典型的 MacroTask 包含了 setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O, UI rendering 等，MicroTask 包含了 process.nextTick, Promises, Object.observe, MutationObserver 
