## 浏览器缓存机制

- 浏览器每次发起请求，都会先在浏览器缓存中查找该请求的结果以及缓存标识。
- 浏览器每次拿到返回的请求结果都会将该结果和缓存标识存入浏览器缓存中。


### 强制缓存

- 不存在该缓存结果和缓存标识， 强制缓存失效。 -->> 则直接向服务器发起请求
- 存在该缓存结果和缓存标识，但该结果已经失效，强制缓存失效，  -->> 则使用协商缓存（携带该资源的缓存标识发起请求）
- 存在该缓存结果和缓存标识，且该结果尚未失效，强制缓存生效    -->> 则使用浏览器缓存

#### 强制缓存规则

当浏览器向服务器发起请求时，服务器回家缓存规则放入 `HTTP` 响应报文里， 字段分别是 `Expires` 和 `Cache-Control`  
`Cache-Control` 的优先级高于 `Expires`
- `Expires` 是 `HTTP/1.0` 的字段，其值为服务器返回该请求结果缓存的到期时间，再次发起该请求时，如果客户端的时间小于，直接使用缓存结果。
- `Cache-Control` 到了 `HTTP/1.1` 代替 `Expires`，因为如果时区不同或者其他原因时间对比发生误差概览情况比较高。 主要取值为：
1. public: 所有内容都叫被缓存（客户端和代理服务器都可缓存）
2. private:  所有内容只有客户端可以缓存， 默认值
3. no-cache: 客户端缓存内容，但是否使用缓存则需要经过协商缓存来验证决定
4. no-store: 所有内容都不会被缓存，既不使用强制缓存，也不使用协商缓存
5. max-age=xxx: 缓存内容将在 xxx 秒之后失效

#### 强制缓存存放位置

如果浏览器使用了强制缓存的内容，请求对应的 `Size` 字段值，取值为：
1. `from memory cache`: 使用内存中的缓存
2. `from disk cache`: 使用硬盘中的缓存

### 协商缓存

协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务端发起请求，由服务器根据缓存标识决定是否使用缓存。
- 协商缓存生效 返回 **304** 状态码
- 协商缓存失效 返回 **200** 状态码

#### 协商缓存规则

当浏览器向服务器发起请求时，服务器回家缓存规则放入 `HTTP` 响应报文里， 字段分别是 `Last-Modified / If-Modified-Since` 和 `Etag / If-None-Match`  
`Etag / If-None-Match` 的优先级高于 `Last-Modified / If-Modified-Since`， 同时存在则只有 `Etag / If-None-Match` 生效  
因为 modified 是秒为单位，有可能文件在一秒内发生多次改动，所以 Etag 的精准度要高，但由于 Etag 是服务器用算法得到一个值，性能比 modified 低

- Last-Modified 是服务器响应请求时，返回该资源文件在服务器最后被修改的时间
- If-Modified-Since 是客户端再次发起相同请求时，携带上传返回的 `Last-Modified` 值，通过此字段告诉服务器该资源上传请求返回最后修改的时间。 服务器发现含有 `If-Modified-Since` 
则会进行对比，若该资源最后修改时间大于 `If-Modified-Since` 的字段值，则重新返回资源，状态码为200， 否则 返回 304 表示可继续使用缓存文件
- Etag 是服务器响应请求时，返回当前资源文件的唯一标识（由服务器生成）
- If-None-Match 是客户端再起发起相同请求时，携带上传返回的 `Etag` 值，通过此字段告诉服务器该资源上传请求返回的值。 服务器发现含有 `If-None-Match` 
则会进行对比，若该资源 `Etag` 一致则返回 304 表示资源无更新，可以继续使用缓存文件，否则返回 200













