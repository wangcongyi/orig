### 总结一些结论，文件夹里是 参考代码

- 无论 `props` 有没有用到，只要是传入都会再次执行，即便是用了 `React.memo` 
  - 我在 react v17.0.2 用 memo 第一个参数强制返回 true 还是有效的


- class vs function
  - 在 class 组件中 this 指向最新的组件实例；function 组件中的 this 是 undefined。[详细解释](https://overreacted.io/how-are-function-components-different-from-classes/)
