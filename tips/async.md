### async 的 await 区别

```javascript

  function timeoutPromise(interval) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        console.log(2)
        resolve('done')
      }, interval)
    })
  }

  async function timeTest() {
    const timeoutPromise1 = timeoutPromise(3000)
    const timeoutPromise2 = timeoutPromise(3000)
    const timeoutPromise3 = timeoutPromise(3000)

    await timeoutPromise1
    await timeoutPromise2
    await timeoutPromise3
  }

  let startTime = Date.now()
  timeTest().then(() => {
    let finishTime = Date.now()
    let timeTaken = finishTime - startTime
    console.log('Time taken in milliseconds: ' + timeTaken)
  })

```

```javascript

  function timeoutPromise(interval) {
    return new Promise((resolve, reject) => {
      setTimeout(function(){
        console.log(1)
        resolve("done");
      }, interval);
    });
  };

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
