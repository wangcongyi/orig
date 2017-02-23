 在知乎专栏中看见李银城对chrome内核的一些分析 
https://www.zhihu.com/people/li-yin-cheng-24/pins/posts
整理下文章中的结论~~
 
 
 a, b, big, code, em, font, i, nobr, s, small, strike, strong, tt, and u
 这些带有格式化的标签如果漏写闭标签 会导致渲染异常
 
 但是如果是span标签漏写的话 渲染结果是正常的
 
 自定义标签默认不会有任何的样式，并且是一个行内元素，可以把自定义的标签当做一个span来看待
 
 querySelector 查找DOM  
 如果是ID  最后还是会去调用TreeScope的getElementById
 所以 document.querySelector('#XXX') -->> document.getElementById('XXX')
 
 删除一个节点 是不需要手动去释放它绑定的事件
 但是节点存在一个引用 即使remove掉 GC也不会去回收

      var p = document
