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





