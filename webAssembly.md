# 初步了解 WebAssembly

*WebAssembly程序从开发到运行于网页中大致可以分为以下几个阶段*

- 使用WebAssembly文本格式或其他语言（C++、Go、Rust等）编写程序，通过各自的工具链编译为WebAssembly汇编格式.wasm文件。  

- 在网页中使用fetch、XMLHttpRequest等获取.wasm文件（二进制流）。  

- 将.wasm编译为模块，编译过程中进行合法性检查。  

- 实例化。初始化导入对象，创建模块的实例。  

- 执行实例的导出函数，完成所需操作。  

![w](https://www.epubit.com/upload/write/App_Data/1812/1812c8b5a86e7fa11f83-Original-image3.png)
