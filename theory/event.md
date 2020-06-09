## Javascript Event Loop

    * MacroTask (Task) 与 MicroTask (Job)  
    
    > 一个事件循环(Event Loop)会有一个或多个任务队列(Task Queue，又称 Task Source)，
      这里的 Task Queue 就是 MacroTask Queue，而 Event Loop 仅有一个 MicroTask Queue。
      每个 Task Queue 都保证自己按照回调入队的顺序依次执行，所以浏览器可以从内部到JS/DOM，保证动作按序发生。
      而在 Task 的执行之间则会清空已有的 MicroTask 队列，在 MacroTask 或者 MicroTask 中产生的 MicroTask 
      同样会被压入到 MicroTask 队列中并执行  
      
    > 典型的 MacroTask 包含了 setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O, UI rendering 等，
      MicroTask 包含了 process.nextTick, Promises, Object.observe, MutationObserver 

   [demo](https://medium.com/javascript-in-plain-english/6-interview-questions-that-combine-promise-and-settimeout-34c430fc297e)

```js
   
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



```js
btn.addEventListener('click', () => {
    Promise.resolve().then(() => console.log('microtask 1'))
    console.log('Listener 1')
  })

  btn.addEventListener('click', () => {
    Promise.resolve().then(() => console.log('microtask 2'))
    console.log('Listener 2')
  })

// 输出结果为： L1 m1 L2 m2

```  



### NodeJS 事件循环

```js

const fs = require('fs')
const async = require('async_hooks')

let index = 0

function print(str) {
  fs.writeFileSync(1, str + '\n')
}

function getIndex(n) {
  return ' '.repeat(n)
}


async.createHook({
  init(asyncId, type, triggerAsyncId) {
    const cId = async.executionAsyncId()
    print(`${getIndex(index)}${type}(${asyncId} : trigger: ${triggerAsyncId} scope: ${cId}`)
  },
  before(asyncId) {
    print(`${getIndex(index)} before: ${asyncId}`)
    index += 2
  },
  after(asyncId) {
    index -= 2
    print(`${getIndex(index)} after: ${asyncId}`)
  },
  destroy(asyncId) {
    print(`${getIndex(index)} destroy: ${asyncId}`)
  }
}).enable()

print('start')

setTimeout(() => {
  print(' -- outer: timeout1 -- ')
  setImmediate(() => {
    print('-- inner: setImmediate --')
    process.nextTick(() => {
      print('-- inner-inner: nextTick --')
    })
  })

  setTimeout(() => {
    print('-- inner: setTimeout --')
  })

  setImmediate(() => {
    print('-- inner: setImmediate2 --')
  })

  process.nextTick(() => {
    print('-- inner: nextTick --')
  })
})

process.nextTick(() => {
  print('-- outter: nextTick--')
})

setTimeout(() => {
  print('--outter: timeout2')
})

print('end')

```


### async/await 

`async/await` 让你的代码看起来是同步的，在某种程度上，也使得它的行为更加地同步  
`await` 关键字会阻塞其后的代码，直到 `promise` 完成，就像执行同步操作一样  
它确实可以允许其他任务在此期间继续运行，但您自己的代码被阻塞  

```js

// async function timeTest() {
  //   const timeoutPromise1 = timeoutPromise(3000);
  //   const timeoutPromise2 = timeoutPromise(3000);
  //   const timeoutPromise3 = timeoutPromise(3000);
  //
  //   await timeoutPromise1;
  //   await timeoutPromise2;
  //   await timeoutPromise3;
  // }
  
  async function timeTest() {
    await timeoutPromise(3000);
    await timeoutPromise(3000);
    await timeoutPromise(3000);
  }

  let startTime = Date.now();
  timeTest().then(() => {
    let finishTime = Date.now();
    let timeTaken = finishTime - startTime;
    console.log("Time taken in milliseconds: " + timeTaken);
  })

```





