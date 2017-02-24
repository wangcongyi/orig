#[在知乎专栏中看见李银城对chrome内核的一些分析](https://www.zhihu.com/people/li-yin-cheng-24/pins/posts) 

##整理下文章中的结论
  
  - `a`, `b`, `big`, `code`, `em`, `font`, `i`, `nobr`, `s`, `small`, `strike`, `strong`, `tt`, and `u`
  
  - 这些带有格式化的标签如果漏写闭标签 会导致渲染异常
  
  - 但是如果是span标签漏写的话 渲染结果是正常的
  
  - 自定义标签默认不会有任何的样式，并且是一个行内元素，可以把自定义的标签当做一个span来看待
  
  - `querySelector` 查找DOM  如果是ID  最后还是会去调用TreeScope的`getElementById` 所以 `document.querySelector('#XXX')` -->> `document.getElementById('XXX')`
  
  - 删除一个节点 是不需要手动去释放它绑定的事件但是节点存在一个引用 即使remove掉 GC也不会去回收  
   
```javascript
   var p = document.getElementById('XXX');
       p.remove();
       window.gc()
```
  
 - **上述代码 remove 掉了 GC也不会去回收。remove 掉了之后 如果将 `p = null` 或者离开作用域 GC就会管用。**
 - **删掉之后GC并不会立刻回收和释放事件，因为在执行监听函数的时候，里面有个this指针指向了该节点，并且this是只读的，你不能把它置成null。所以只有执行完了回调函数，离开了作用域，this才会销毁，才有可能被GC回收**
 
 - `<link rel="stylesheet" href="demo.css"` 加载CSS是异步的 不会影响DOM树的构建
 - 但是**这只能说明CSS没有处理好之前 构建好的DOM并不会显示出来**有可能DOM已经构建好但CSS没有加载完 页面一开打会停留较长时间的白屏
 
 - 使用16位色值比rgb要好 rgb要经过函数再次计算一下
 - 设置了margin：20px，会转化成四个属性 虽然CSS提倡属性合并 但最后还是被拆成各个小属性 属性合并最大最作用应该在于减少CSS代码量
 - [chrome blink内核 浏览器默认样式表](http://yincheng.site/html/chrome-ua-css.html)
 - CSS表解析好了之后 触发layout tree 把每个可视的node节点相应的创建一个layout节点 创建layout节点的时候需要计算一下自己的style 因为有可能多个选择器样式命中 需要把样式属性综合在一起 ect
