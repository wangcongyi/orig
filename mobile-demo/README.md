#### 代码规范
- 使用 定制化 `Airbnb react` 代码规范 详见项目 `eslint` 相关配置
- 不准注销 `eslint` 相关配置、不准使用 `eslint-disable-next-line`
- 代码注释请参考 `JSDoc` 编写 (不强制写注释 因为最好的注释就是代码本身)
- 请充分利用标签 不要一直 `DIV` 


#### Git 提交规范
- feat： 新增feature
- fix: 修复 bug
- docs: 仅仅修改了文档，比如 README, CHANGELOG, 等等
- format: 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑（注意不是 css 样式修改）
- css: 仅仅修改样式（css）
- refactor: 代码重构，没有加新功能或者修复 bug
- perf: 优化相关，比如提升性能、体验
- test: 测试用例，包括单元测试、集成测试等
- chore: 改变构建流程、或者增加依赖库、工具等
- revert: 回滚到上一个版本版本
- merge: 合并分支，需说明是从那个分支合并至当前分支

#### 组件设计模式
- 请确保组件的单一性 每份文件不要超过 200 行代码
- 请提供 `restProps` 参数 保证组件扩展性
- 请提供 `children` 参数 保证组件扩展性
- 请使用 `prop-types` 设置 不推荐使用默认参数
- 请使用 `.jsx` 后缀名 命名 react 组件
- 请使用 `g-xxx` 命名 通用组件 `className`
- 请确保通用组件不处理任何业务上的逻辑
- 请使用下划线 `_` 作为占位符表示可以忽略的参数或者内部函数命名
- 推荐使用 `...` 扩展符 提供组件的 `props`
  ```js
   // <Test {...dummyData} /> instead of
   // <Test a={dummyData.a} b={dummyData.b} c={dummyData.c} />
  ````
- 不推荐使用 `Higher-order-component` 组件
- 不推荐在组件中使用条件语句去渲染组件 如果必须请简单使用
  ```js
    //  if 
    // { condition && <span>Rendered when truthy</span> }
    ////////////////////////////////////////////////////
    // unless
    // { condition || <span>Rendered when truthy</span> } 
    ////////////////////////////////////////////////////
    // if-else
    // { condition ? ( <span>Rendered when truthy</span> ) : ( <span>Rendered when falsy</span> )}  
  ```

#### webpack
- 不允许删除 `pkg` 里的 `sideEffects` 字段
- thread-loader
- DllPlugin
- cache-loader
- webpack-bundle-analyzer react官方说 此插件的标签带有很强的误导性不予推荐使用 请使用 source-map-explorer


#### fetch lib
- fetch as whatwg-fetch 尽可能使用原生 fetch API
- 考虑加入 [SWR](https://github.com/zeit/swr) 功能模块


#### router
- use browserHistory or hashHistory


#### style
- css-module or css-in-js sass less postcss 不会限制 但代码规范依照 eslint 相关配置
- 在蓝湖上 下载切图 请使用 [压缩工具](https://tinypng.com/) 再上传至 OSS 
- 小于 4K 的图片 请转成 Base64 
- 对于比较整齐的图 推荐使用 CSS3 画出来
- 能用 CSS 解决的问题就别用 images or JavaScript


#### other
- 不推荐使用 比如 @ 符号作为 路径别名
- 不推荐引入 比如像 moment.js 比较大的依赖包 请根据实际情况并查看项目是否有相应的依赖包存在

#### todo
- 增加 WebWorkers 模块 [WebWorkers](https://github.com/GoogleChromeLabs/comlink)  
- [react hooks 封装的 worker](https://github.com/alewin/useWorker)  

- 增加 WebAssembly 模块 [WebAssembly](https://mbebenita.github.io/WasmExplorer/)
