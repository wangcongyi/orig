#### Mental model
react 的核心可以用 ui = fn(state) 来表示，更详细点可以用  
  const state = reconcile(update)  
  const UI = commit(state)  

react 源码可以分为如下几个模块：
- Scheduler (调度器)：排序优先级，让优先级高的任务先进行 reconcile  
- Reconciler (协调器)：找出哪些节点发生了改变，并标记不同的 tag  
- Renderer (渲染器)：将 Reconcile 中打好的 tag 节点渲染到视图上


##### Fiber
Fiber (虚拟DOM) 是内存中用来描述 dom 的对象  
保存了这个节点的属性、类型、等... Fiber 通过 child、sibling、return 来形成 Fiber 树，  
还保存了更新状态时用于计算的 state 的 updateQueue，updateQueue 是一种链表结构，上面可能存在多个未计算的 update  
双缓存是只存在两颗 fiber 树， current Fiber 树描述了当前呈现的 dom 树， workInProgress Fiber 是正在更新的 Fiber 树  
这两颗 Fiber 树都是在内存中运行，在 workInProgress Fiber 构建完成之后会将作为 current Fiber 应用到 dom 上  
在首次渲染时候，会根据 jsx 对象构建 Fiber 形成 Fiber 树，然后这颗 Fiber 树会作为 current Fiber 应用到真实 DOM 上，  
在 update 状态更新时，根据状态后变更的 jsx 对象 和 current Fiber 做对比 形成新的 workInProgress Fiber， 然后  
workInProgress Fiber 切换成 current Fiber 应用到真实 DOM 就达到了更新 UI 的目的。
