#### Source Map 文件

1. Source Map 就是一个信息文件，存储了代码打包转变后的位置信息，用于维护打包前后的代码映射关系

2. map 文件中主要字段
    - version：Source map的版本
    - sources：转换前的文件。该项是一个数组，表示可能存在多个文件合并
    - names：转换前的所有变量名和属性名
    - mappings：记录位置信息的字符串
    - file：转换后的文件名
    - sourceRoot：转换前的文件所在的目录。如果与转换前的文件在同一目录，该项为空
    - sourcesContent：转换前文件的原始内容。

3. 主流打包器对 Source Map 的设置
   [webpack设置](https://webpack.js.org/configuration/devtool/)
  


##### 参考
- [An Introduction to Source Maps](https://blog.teamtreehouse.com/introduction-source-maps)
- [弄懂 SourceMap](https://juejin.cn/post/7023537118454480904)
