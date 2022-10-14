#### class组件与函数组件

- class 组件
  1. 生命周期函数，可以通过 this 来访问自定义事件和一些实例的 api
  2. class组件中可以通过Provider, Consumer, render props和高阶组件来实现状态逻辑复用，需要重新组织组件结构，形成组件和代码的嵌套，使代码难以理解。
  3. hook 使你在无需修改组件结构的情况下复用状态逻辑。
  4. 子组件中props和state会随着this的改变取到的内容可能不是子组件想用的内容，需要通过一次解构，将this.props或者this.state的值存下来，这样才能保证此次要渲染的内容无误。
  5. 因为props本身不会改变，所以对于函数组件来说，取到的props不会随着this的改变而改变。

- 函数组件（hooks）
  1. 更加符合 react 哲学
  2. UI 在概念上就是当前应用状态的一个渲染函数，我们的事件处理程序(render) 本质上就是一个拥有特定 props 和 state 的特定渲染。
  3. 页面是组合而来的，而不是继承。当我们写 class 组件的时候 都是 class XX extend React.Component {}



##### 在 class 组件中 this 指向最新的组件实例；function 组件中的 this 是 undefined。[详细解释](https://overreacted.io/how-are-function-components-different-from-classes/)
