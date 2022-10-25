### cros 请求

以下是服务器针对客户端的 `options` 请求的 规范写法  
用 PHP、Python、GO 等其他后台语言类似

```js

const { allowOrigin } = require('../config')

module.exports = () => {
  return async (ctx, next) => {
    ctx.set('Vary', 'Origin, Accept-Encoding')
    const origin = ctx.get('Origin') || '*'
    const clientIP = ctx.req.headers['x-forwarded-for'] ||
      ctx.req.connection.remoteAddress ||
      ctx.req.socket.remoteAddress ||
      ctx.req.connection.socket.remoteAddress

    if (allowOrigin.indexOf(clientIP) > -1) {
      ctx.set('Access-Control-Allow-Origin', origin)
    } else {
      return await next()
    }
    ctx.set('Access-Control-Allow-Origin', origin)
    if (ctx.method === 'OPTIONS') {
      if (!ctx.get('Access-Control-Request-Method')) {
        return await next()
      }
      ctx.set('Access-Control-Max-Age', '18000')
      ctx.set('Access-Control-Allow-Credentials', 'true')
      ctx.set('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, HEAD, OPTIONS')
      ctx.set('Access-Control-Allow-Headers', ctx.get('Access-Control-Request-Headers'))
      ctx.status = 204
    } else {
      if (origin === '*') {
        ctx.remove('Access-Control-Allow-Credentials')
      } else {
        ctx.set('Access-Control-Allow-Credentials', 'true')
      }
      try {
        await next()
      } catch (err) {
        throw err
      }
    }
  }
}


```
