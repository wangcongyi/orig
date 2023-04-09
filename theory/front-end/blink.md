# [在知乎专栏中看见李银城对chrome内核的一些分析](https://www.zhihu.com/people/li-yin-cheng-24/pins/posts) 

## 整理下文章中的结论也增加了其他内容
  
> 浏览器HTML机制
  
  - `a`, `b`, `big`, `code`, `em`, `font`, `i`, `nobr`, `s`, `small`, `strike`, `strong`, `tt`, and `u`
  
  - 这些带有格式化的标签如果漏写闭标签 会导致渲染异常
  
  - 但是如果是span标签漏写的话 渲染结果是正常的
  
  - 自定义标签默认不会有任何的样式，并且是一个行内元素，可以把自定义的标签当做一个span来看待
  
  
> 浏览器CSS机制

 - `<link rel="stylesheet" href="demo.css"` 加载CSS是异步的 不会影响DOM树的构建
 
 - 但是**这只能说明CSS没有处理好之前 构建好的DOM并不会显示出来**有可能DOM已经构建好但CSS没有加载完 页面一开打会停留较长时间的白屏
 
 - 使用16位色值比rgb要好 rgb要经过函数再次计算一下
 
 - 设置了margin：20px，会转化成四个属性 虽然CSS提倡属性合并 但最后还是被拆成各个小属性 属性合并最大最作用应该在于减少CSS代码量
 
 
 - [Chromium UA stylesheet - Google Chrome & Opera](https://chromium.googlesource.com/chromium/blink/+/master/Source/core/css/html.css)  
 - [Mozilla UA stylesheet - Firefox](https://dxr.mozilla.org/mozilla-central/source/layout/style/res/html.css)  
 
 - [WebKit UA stylesheet - Safari](https://trac.webkit.org/browser/trunk/Source/WebCore/css/html.css)
 
 
 
 - CSS表解析好了之后 触发layout tree 把每个可视的node节点相应的创建一个layout节点 创建layout节点的时候需要计算一下自己的style 因为有可能多个选择器样式命中 需要把样式属性综合在一起 ect
 
 - 重新渲染 就需要重新生成布局和重新绘制 前者叫重排(reflow) 后者叫重绘(repaint).
 
   - 重排(reflow): 当 DOM 的变化影响了元素的几何信息(元素的的位置和尺寸大小)，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排

   - 重绘(repaint): 当一个元素的外观发生改变，但没有改变布局,重新把元素外观绘制出来的过程，叫做重绘。
    
   - 重绘不一定重排 比如改变页面元素的颜色 就只会触发重绘。  
  
   - 不会触发重排是因为布局没有改变 但是重排一定会重绘 比如改变原元素的位置。 
  
   - 样式表越简单 重排和重绘就越快。  
 
   - 重绘和重排的DOM元素层级越高，成本就越高。  table 元素重排和重绘成要高于 div 
  
   - 尽量不要把读操作和写操作放在一个语句中。display:none 不影响重绘重排。修改CSS类，而不是样式 
 
 
> 浏览器事件机制

 - `querySelector` 查找 DOM 如果是 ID 最后还是会去调用 TreeScope 的 `getElementById` 所以 `document.querySelector('#XXX')` -->> `document.getElementById('XXX')`
  
 - 删除一个节点 是不需要手动去释放它绑定的事件但是节点存在一个引用 即使remove掉 GC 也不会去回收  
   
```javascript
      var p = document.getElementById('XXX');
      p.remove();
      window.gc()
```
  
 - **上述代码 remove 掉了 GC 也不会去回收。remove 掉了之后 如果将 `p = null` 或者离开作用域 GC 就会管用。**
 
 - **删掉之后 GC 并不会立刻回收和释放事件，因为在执行监听函数的时候，里面有个 `this` 指针指向了该节点，并且 `this` 是只读的，你不能把它置成`null`。所以只有执行完了回调函数，离开了作用域，`this` 才会销毁，才有可能被GC回收**
 
 - 捕获阶段的处理函数最先执行
 
 - 其次是目标阶段的处理函数
 
 - 最后是冒泡阶段的处理函数
 
 - 目标阶段的处理函数 先注册的先执行 后注册的后执行
 
 - `event.stopPropagation()` 除了阻止事件的冒泡 还阻止事件的继续捕获 ,简而言之就是阻止事件的进一步传播
 
 - IE下使用 `event.returnValue = false` 阻止默认事件，使用 `event.cancelBubble = true` 阻止事件冒泡




### JavaScript modules

[JS modules](https://v8.dev/features/modules#module-vs-script)

![script tag](https://v8.dev/_img/modules/async-defer.svg)
