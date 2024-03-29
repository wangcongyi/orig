### diff

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
