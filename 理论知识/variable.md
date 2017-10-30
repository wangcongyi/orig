### 使用 var let const function 的区别
#### [原文地址](https://zhuanlan.zhihu.com/p/28140450)

- var [创建、初始化、赋值] 过程
```javascript
   console.log(x);       // undefined
   var x = 1111;
   console.log(x);       // 1111
```   
   > 找到 var 声明的变量， `创建`变量并`初始化`为 undefined  
   > 开始执行代码  
   > 将 x 变量赋值为 1111  
   > **创建、初始化、都被提升了**
 
- let [创建、初始化、赋值] 过程
```javascript
   console.log(x);      // error
   let x = 2222;
   console.log(x);     // 2222
```   
   > 找到 let 声明的变量， `创建`变量 开始执行代码 **没有初始化**  
   > 没有找到 x 报错~~~  
   > 执行 x = 2222  将 x 初始化为 2222  
   > **创建被提升了，初始化没有**
   > **const与let相同，但只要创建和初始化，没有赋值过程**


- function [创建、初始化、赋值] 过程

   > **function 声明会在代码执行之前就 创建、初始化并赋值**
