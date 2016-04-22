#javascript Event
## 事件函数执行顺序
```javascript
捕获阶段的处理函数最先执行，
其次是目标阶段的处理函数，
最后是冒泡阶段的处理函数。
目标阶段的处理函数，先注册的先执行，后注册的后执行。
event.stopPropagation() 除了阻止事件的冒泡，还阻止事件的继续捕获，简而言之就是阻止事件的进一步传播
```

```html
IE下 使用 event.returnValue = false; 阻止默认事件  
preventDefault()
IE下 使用 event.cancelBubble = true; 阻止事件冒泡  
```