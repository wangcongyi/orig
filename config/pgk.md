### dependencies 的区别
- dependencies     生产和开发都会用到的依赖，最后会被打包到项目中  
- devDependencies  只在开发环境中使用的依赖，最后不会被打包到项目中
- peerDependencies 某个模块依赖其他库，但主项目已经按照了此依赖库，可不用重复安装。[more](https://segmentfault.com/a/1190000022435060)
- peerDependenciesMeta  向npm提供有关如何使用对等依赖项的更多信息。
- bundleDependencies  发布的时候这些绑定包也会被一同发布。绑定包必须是dependencies或devDependencies中声明过的包。
- optionalDependencies  安装依赖的时候，放在optionalDependencies中的包即使安装失败，也不会报错终止安装操作。

### package-lock
本质上package-lock.json文件是为了锁版本，在package.json中指定的子npm包  
比如：react: "^16.0.0"，在实际安装中，只要高于react的版本都满足package.json的要求。  
这样就使得根据同一个package.json文件，两次安装的子依赖版本不能保证一致


### exports
[从 package.json 来聊聊如何管理一款优秀的 Npm 包](https://zhuanlan.zhihu.com/p/548202395)  
在引入的 Npm 包的 pkg 中如果存在 exports 关键字时，构建配置的 resolve.mainFields 是无效的。  
我们需要通过 resolve.conditionNames 字段来定义对应的环境。[more](https://webpack.js.org/configuration/resolve/#resolveconditionnames)
