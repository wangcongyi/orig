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
