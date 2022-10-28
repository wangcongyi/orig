#### React 重新渲染

##### 重新渲染原因
1. state changes     也是其他原因的根本因素
2. parent re-renders 当一个组件发生 re-render， 组件的所有子组件也发生 re-render
3. context changes   当 context provider发生改变，所有引用到这个 context 的组件都会发生 re-render, 即便没有直接使用 context  
4. props changes     当 props 发生改变的时候，也会触发组件 re-render



[React 为什么重新渲染](https://blog.skk.moe/post/react-re-renders-101/)  
[React re-renders guide: everything, all at once](https://www.developerway.com/posts/react-re-renders-guide)
