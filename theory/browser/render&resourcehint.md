### 前端渲染方式 和 资源请求优化机制

#### [渲染方式](https://web.dev/rendering-on-the-web/#static-rendering)
- SSR: Server-Side Rendering - rendering a client-side or universal app to HTML on the server.  
- CRS: Client-Side Rendering - rendering an app in a browser, generally using the DOM.  
- Rehydration: “booting up” JavaScript views on the client such that they reuse the server-rendered HTML’s DOM tree and data.  
- Prerendering: running a client-side application at build time to capture its initial state as static HTML.  

1. TTFB: Time to First Byte - seen as the time between clicking a link and the first bit of content coming in.
2. FP: First Paint - the first time any pixel gets becomes visible to the user.  
3. FCP: First Contentful Paint - the time when requested content (article body, etc) becomes visible.
4. TTI: Time To Interactive - the time at which a page becomes interactive (events wired up, etc).

![image](https://user-images.githubusercontent.com/13843979/190094928-a205d6e6-3051-4182-b19a-b7d6789be332.png)



#### [静态资源请求优化](https://www.keycdn.com/blog/resource-hints)
- preload  
- prefetch
- dns-prefetch 
- prerender
- preconnect

##### 其他参考
1. [Preload，Prefetch 和它们在 Chrome 之中的优先级](https://github.com/xitu/gold-miner/blob/master/TODO/preload-prefetch-and-priorities-in-chrome.md)

##### TODO
- 翻译中文
