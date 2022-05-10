### requestIdleCallback

- react 新的调度策略是异步、可中断的，其实现方式基于浏览器的 requestIdleCallback 和 requestAnimationFrame。
- 该 API 的作用是 让浏览器在‘有空’的时候执行我们的回调，这个回调会传入一个期限，表示浏览器有多少时间供我们执行，我们最后在这个时间范围内执行完毕
- requestIdleCallback will schedule work when there is free time at the end of a frame, or when the user is inactive.

> requestIdleCallback

- requestAnimationFrame 的回调会在每一帧确定执行，属于高优先级任务， requeIdleCallback 则不一定
- 浏览器的每一帧（通常设定 FPS 为 60，也即 每帧 16.7ms）包含了 用户的交互，js 执行、requestAnimationFrame 调用，布局计算和页面重绘等工作。
- 假如在一帧里执行的任务不多，在不到 16ms 的时间内完成了上述任务的话 那就有一定的空闲时间用来执行 requestIdleCallback 的回调
- 由于 requestIdleCallback 是利用帧的空闲时间，就有可能浏览器一直处于繁忙状态，导致回调一直无法执行，我们可以使用 requestIdleCallback 的第二个配置参数了
- 但是 如果空闲阶段还剩余 2ms， requestIdleCallback 的 callback 方法执行需要 20ms 那么浏览器就会卡住 18ms 直到这一帧走完，才会走下一帧，归还 控制权

> requestAnimationFrame

- 浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
- 通俗点讲就是该API能以浏览器的显示频率来作为其动画动作的频率，比如浏览器每10ms刷新一次，动画回调也每10ms调用一次，这样就不会存在过度绘制的问题，动画不会掉帧，自然流畅。
- requestAnimationFrame 会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率
- 与 setTimeout 相比，requestAnimationFrame 最大的优势是 由系统来决定回调函数的执行时机。
- 定时器函数没有办法去精准地把时间定位到。
