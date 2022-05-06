### UDP 协议

**建立连接，是为了在客户端和服务端维持连接，而建立一定的数据结构来维护双方交互的状态，用这样的数据结构来保证所谓面向连接的特性**

UDP 不保证不丢失，不保证按顺序到达。基于数据报，一个一个发，一个一个收。  
UDP 是无状态服务，没脑子，发出去就发出了  

我们可以这样比喻，如果 MAC 层定义了本地局域网的传输行为， IP 层就定义了整个网络端到端的传输行为，  
这两层基本定义了这样的基因：网络传输是以包为单位的，二层叫帧，网络层叫包，传输层叫端段，我们笼统的称为包。  
包单独传输，自行选路，在不同的设备封装解封装，不保证到达。 UDP 完全继承了这些特性。