#javascript 变量存放  原始值 与 引用值
##原始值包括 undefined、Null、Number、String、boolean
##引用值包括 Object、function、Array
### 原始类型的值传的都是值，引用类型传的都是对象的地址

###栈内存 存储对象的地址 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 堆内存 存储对象的具体内容        
###栈内存运行效率高 空间小  堆内存相反


##对原始类型的值 地址和内容都在栈内存中
##对引用类型的值 地址在栈内存中 具体内容在对内存中

    var stra = 'a'       //为stra分配栈内存    stra="a"
    var strb = stra      //原始类型直接访问值   strb = "a"
        strb = 'b'       //栈内存中strb='b'  而stra仍然是'a'
        
        
    var obja = {v:'a'}      //为obja分配栈内存obja 堆内存{v:'a'}
    var objb = obja         //为objb分配栈内存objb 引用堆内存德尔值{v:'a'}
        objb.v = 'b'       //通过objb访问堆内存的值 修改为"b" 由于obja和objb引用的是堆内存同一个对象值 obja={v:'b'}
    var objb = {v:'c'}     //修改了整个对象 在对内存中创建一个新的对象值{v:'c'}   


 