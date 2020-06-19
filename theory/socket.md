user socket.io connection server and server
```js
const io = require("socket.io").listen(3000)
io.on("connection", socket => {
  console.log("a connected:", socket.client.id)
  socket.on("serverEvent", data => {
    console.log("new message from client:", data)
  });

  setInterval(() => {
    socket.emit("clientEvent", Math.random())
  }, 3000)
});
/////////////////////////////////////////////////////////////////
const io = require("socket.io-client")
const socket = io.connect("http://localhost:3000", {
  reconnection: true
});

socket.on("connect", () => {
  console.log("connected localhost:3000")
  socket.on("clientEvent", data => {
    console.log(data)
    socket.emit("serverEvent", data)
  })
})

```

user ws connection server and server
```js
const WebSocket = require("ws");
const ws = new WebSocket.Server({ port: 8080 });

ws.on("open", () => {
  console.log("connected");
});

ws.on("close", () => {
  console.log("disconnected");
});

ws.on("connection", (w,req) => {
  console.log(req.connection.remoteAddress)
  w.on("message", data => {
    ws.clients.forEach(client => {
      client.send(data)
    })
    w.send("send data from a.js");
  })
})
//////////////////////////////////////////////////////
const WebSocket = require("ws");
const ws = new WebSocket("ws://localhost:8080");

ws.on("open", () => {
  console.log("connected");
  setInterval(function () {
    ws.send(Date.now())
  }, 1500)
});

ws.on("close", () => {
  console.log("disconnected");
});


ws.on("connection", w => {
  w.on("message", data => {
    console.log(data);
  });
  w.send("something");
})

ws.on("message", data => {
  console.log(data)
})
```


> 一点历史  

1. `短轮训 Polling` client 每隔一段时间都会向 server 发生 http 请求  
2. `长轮训 Long-polling` client 向 server 发出请求 server 并不一定立即发送 而是看数据是否有更新  
如果数据已经更新了的话，那就立即将数据返回给 client；但如果数据没有更新，那就把这个请求保持住，等待有新的数据到来时，才将数据返回给 client。  
当然了，如果 server 的数据长时间没有更新，一段时间后，请求便会超时，client 收到超时信息后，再立即发送一个新的请求给 server。

> WebSocket  

W3C 在 HTML5 中提供了一种 client 与 server 间进行全双工通讯的网络技术 WebSocket。  
WebSocket 是一个全新的、独立的协议，基于 TCP 协议，与 HTTP 协议兼容却不会融入 HTTP 协议，仅仅作为 HTML5 的一部分。  
WebSocket 是一种协议，是一种与 HTTP 同等的网络协议，两者都是应用层协议，都基于 TCP 协议。  
但是 WebSocket 是一种双向通信协议，在建立连接之后，WebSocket 的 server 与 client 都能主动向对方发送或接收数据。  
同时，WebSocket 在建立连接时需要借助 HTTP 协议，连接建立好了之后 client 与 server 之间的双向通信就与 HTTP 无关了。


**基于 TCP 和 UDP 的 socket 编程**  

- 基于 TCP 协议的 Socket 程序函数调用过程
  `TCP` 服务端要先监听一个端口 给 `socket` 赋予一个 IP地址和端口  
  网络包来的时候 内核要通过 `TCP` 头里面的端口来找这个应用程序 把包给你  
  服务端有了IP和端口就可以调用 `listen`函数进行监听 服务器进入了这个状态  
  客户端就可以发起连接了  通过 `connect` 发起连接  
  监听的 `socket` 和真正用来传数据的 `socket` 是两个  
  一个叫作监听 `socket` 一个叫作已连接 `socket`

- 基于 UDP 协议的 Socket 程序函数调用过程
  对于 `UDP` 来说 因为没有连接 更不需要三次握手 也就不需要 `listen` 和 `connect`  
  `UDP` 是没有维护连接状态的 因而不需要每对连接建立一组 `socket` 而是只要有一个 `socket`  
  就能够和多个客户端通信 也正是因为没有连接状态    
  每次通信的时候 都调用 `sendto` 和 `recvfrom` 都可以传入 `IP` 地址和端口

#### 如何接入更多的 socket 
- 多进程方式  
   这就相当于重新注册一家子公司 把连接转给子公司来做（调用 `fork` 函数） 
   
- 多线程方式
    如果创建进程的方式相当于成立新公司  创建线程的方式就是在同一个公司里成立新的项目组（调用 `worker_threads`）  
    很多的资源 比如文件描述符列表 进程空间 都是共享的 只不过多了一个引用  
    新的线程也可以通过已连接的 `socket` 处理请求 从而达到并发处理的目的  
    
- IO多路复用模式（一个线程维护多个 socket 轮询方式）
    上面基于进程或者线程的模式都有问题 一台服务器无法非常多的创建进程、线程  
    一个线程当然可以维护多个 socket 某个线程盯着所以的 `socket` 都放在一个文件描述集合里  
    用函数来监听是否有变化 有变化就可以进行读写操作 然后在调动函数继续监听下一轮变化  

- IO多路复用模式（一个线程维护多个 socket 事件通知方式）
    线程不需要通过轮询挨个等着 `socket` 而是当发送变化时 主动通知线程 根据不同情况做相应的操作
          
        



