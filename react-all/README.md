### overview

- react 的核心可以用 ui = fn(state) 来表示，更详细点可以用  
  const state = reconcile(update)  
  const UI = commit(state)  

- react 源码可以分为如下几个模块：
  - Scheduler (调度器)：排序优先级，让优先级高的任务先进行 reconcile  
  - Reconciler (协调器)：找出哪些节点发生了改变，并标记不同的 tag  
  - Renderer (渲染器)：将 Reconcile 中打好的 tag 节点渲染到视图上

- 无论 `props` 有没有用到，只要是传入都会再次执行，即便是用了 `React.memo` 
  - 我在 react v17.0.2 用 memo 第一个参数强制返回 true 还是有效的


- class vs function
  - 在 class 组件中 this 指向最新的组件实例；function 组件中的 this 是 undefined。[详细解释](https://overreacted.io/how-are-function-components-different-from-classes/)
