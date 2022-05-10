#### Mental model
react 的核心可以用 ui = fn(state) 来表示，更详细点可以用  
  const state = reconcile(update)  
  const UI = commit(state)  

react 源码可以分为如下几个模块：
- Scheduler (调度器)：排序优先级，让优先级高的任务先进行 reconcile  
- Reconciler (协调器)：找出哪些节点发生了改变，并标记不同的 tag  
- Renderer (渲染器)：将 Reconcile 中打好的 tag 节点渲染到视图上


##### Fiber
> 动机

  - 在 react v16 版本之前，组件渲染的时候，从开始到完成整个过程是无法中断的。  
    如果组件较大，js 线程会一直执行，等到整颗 VDOM 树计算完成后，才会交给渲染线程，导致一些用户假话、动画等任务无法处理，导致卡顿的情况

> Fiber

  - Fiber 是对 react 核心算法（协调） 的重写，也是 react 内部定义的一种数据结构，是 Fiber 树结构的节点单位，也是虚拟 DOM  
  - fiber 是一个 JavaScript 对象， 包含了元素的信息、更新操作队列、类型等... 
  - Fiber 把渲染更新过程拆分成多个子任务，每次只做一小部分，如果时间充裕继续下一个任务，如果没有挂起当前任务，将控制权交给主线程，等待下一个空闲时间
  - 实现上述方法是调用原生 requestIdleCallback 方法， 此方法将会在浏览器的空闲时间段内被调用。
  - 由浏览器给我们分配执行时间片，我们按照约定在这个时间内完成，并将控制权还给浏览器。
  - fiber 另一个解读就是最小执行单元，每执行完一个 fiber，就检查剩余时间是否充足，
  - react v16 之前 reconciliation 是同步、递归执行的，只不过这种依赖调用栈的方式不能随意中断，也很难被恢复，不利于异步处理
  - 所以 react v16 使用链表 模拟函数调用栈，将之前的需要递归处理的事情分解成执行单元，
  - fiber 可以划分5个部分
    - 结构信息
    - 节点类型信息
    - 节点状态
    - 副作用
    - 替身 react 在 reconciliation 过程中会构建一颗新fiber 树 （workInProgress tree）表示当前工作进度的树，一边和旧树进行对比，一边构建新树，
    - 我们可以叫 双缓存 或者 双缓冲，在 reconciliation 完毕之后一次性提交给浏览器进行渲染，减少内存分配和垃圾回收


// todo;  vdom 更多意义在于 是数据驱动的、声明式的，让开发者不需要关系 dom 的操作细节， 开发模式变成了 view=f(state)

Fiber (虚拟DOM) 是内存中用来描述 dom 的对象  
保存了这个节点的属性、类型、等... Fiber 通过 child、sibling、return 来形成 Fiber 树，  
还保存了更新状态时用于计算的 state 的 updateQueue，updateQueue 是一种链表结构，上面可能存在多个未计算的 update  
双缓存是只存在两颗 fiber 树， current Fiber 树描述了当前呈现的 dom 树， workInProgress Fiber 是正在更新的 Fiber 树  
这两颗 Fiber 树都是在内存中运行，在 workInProgress Fiber 构建完成之后会将作为 current Fiber 应用到 dom 上  
在首次渲染时候，会根据 jsx 对象构建 Fiber 形成 Fiber 树，然后这颗 Fiber 树会作为 current Fiber 应用到真实 DOM 上，  
在 update 状态更新时，根据状态后变更的 jsx 对象 和 current Fiber 做对比 形成新的 workInProgress Fiber， 然后  
workInProgress Fiber 切换成 current Fiber 应用到真实 DOM 就达到了更新 UI 的目的。

> requestIdleCallback
- 该 API 的作用是 让浏览器在‘有空’的时候执行我们的回调，这个回调会传入一个期限，表示浏览器有多少时间供我们执行，我们最后在这个时间范围内执行完毕
- 

> diff  
- 对比两颗 Fiber 树复杂度是 O(n^3) react 提出了三个前提：  
- 只对同级比较，跨层级的 DOM 不会进行复用  
- 不同类型节点生成的 DOM 树不同，此知会直接销毁老节点及子孙节点，并新建节点  
- 可以通过 key 来对元素 diff 过程提供复用的线索。  

单节点 diff  
1. key 和 type 相同表示可以复用节点  
2. key 不同直接标记删除节点，然后新建节点  
3. key 相同type 不同，标记删除该节点和兄弟节点，然后新创建节点。  

多节点 diff 会经历三次遍历。    
1. 遍历处理节点的更新 包括 props 和 type  
2. 遍历处理其他的情况 比如节点新增  
3. 遍历处理节点位置的改变

