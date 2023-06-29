## HTTP2.0

- 二进制分帧： HTTP2.0 的所有帧都采用二进制编码  
   1、帧：  客户端与服务器通过交换帧来通信，帧是基于新协议通信的最小单位  
   2、消息：指逻辑上的 HTTP 消息，比如请求、响应等由一个或多个帧组成  
   3、流：  流是连接中一个虚拟信道，可以承载双向消息；每个流都有一个唯一的整数标识符  
   
- 多路复用 Multiplexing  
    多路复用允许同时通过单一的 HTTP 连接发起多重 请求-响应 消息，有了新的分帧机制，不必再依赖多个 TCP 连接去实现多流并行。  
    每个数据流都拆分成很多互不依赖的帧(可以乱序发送，可以分优先级)

- 请求优先级  
    把 HTTP 消息分解为很多独立的帧之后，就可以通过优化这些帧的交错和传输顺序，每个流都可以带有一个31比特的优先值：0表示最高优先级，2^31-1 表示最低优先级  
    服务器可以根据流的优先级，控制分配资源，优先将最高优先级的帧发送给客户端

- header 压缩  
    HTTP1.X 的 header 带有大量信息，并且每次都要重复发送， HTTP2.0 使用 encoder 来减少需要传输的 header 大小，通讯顺发各自 cacha 一份 header fields 表   

- 服务器推送  
    一言以蔽之 就是 客户端请求 index.html，服务器把所需要的资源随着 index.html 一起发送到客户端，省去了客户端请求的步骤。  
    服务器可以对一个客户端请求发送多个响应，无需客户端明确地请求。所有推送的资源都遵守同源策略


**HTTP 2.0**  
`HTTP 1.1` 在应用层以纯文本的形式进行通信  每次都要带完整的 `HTTP` 头 实时性、并发性都存在问题  
`HTTP 2.0` 会都 `HTTP` 头进行一定的压缩 将每次都要携带的大量 `key value` 在两端建立一个索引表  
对相同头只发送索引表中的索引  
`HTTP 2.0` 将 `TCP` 连接中 切分成多个流 每个流都有自己的 ID 而且流可以是从客户端发往服务端 也可以说是服务端发往客户端  
一个虚拟的通道 流是有优先级的
`HTTP 2.0` 将所有的传输信息分割为更小的消息和帧 并采用二进制格式编码  
  
假设一个页面要发送三个独立的请求 一个 css  一个js  一个图片  
`HTTP 1.1` 就是串行的  但如果使用 `HTTP 2.0` 就可以在一个连接里  
客户端和服务器都可以同时发送多个请求或回应 减少了 `TCP` 连接数对服务器性能的影响 而且还能加快页面传输速度  


> 2023-06-21 现在浏览器对HTTP2.0的一些特性支持不好，而且不稳定，所以才会有HTTP3.0
