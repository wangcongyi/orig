### 编程语言大致分类

```
1. 静态类型语言：变量的类型在编译时就能知道。  
2. 动态类型语言：变量的类型只能在运行时知道。   
3. 强类型语言：变量不得随意更改类型。  
4. 弱类型语言：变量可以随意更改类型。
5. 编译型语言：需要编译步骤生成可执行文件。
6. 解释型语言：无需编译，代码直接由解释器只想 
```

### 整数在内存中存储方式

| Length  | Signed | Unsigned |
| :----:  | :----: | :----:   |
| 8-bit   | i8     |   u8     |
| 16-bit  | i16    |   u16    |
| 32-bit  | i32    |   u32    |
| 64-bit  | i64    |   u64    |
| 128-bit | i128   |   u128   |
| arch    | isize  |   usize  |
```
Each signed variant can store numbers from -(2^n-1) to 2^n-1 - 1 inclusive,   
where n is the number of bits that variant uses. So an i8 can store numbers from -(2^7) to 2^7 - 1,  
which equals -128 to 127. Unsigned variants can store numbers from 0 to 2^n - 1,   
so a u8 can store numbers from 0 to 2^8 - 1, which equals 0 to 255.

Additionally, the isize and usize types depend on the kind of computer your program is running on:  
64 bits if you’re on a 64-bit architecture and 32 bits if you’re on a 32-bit architecture.
```

Stack 栈内存  
Heap  堆内存  
![image](https://github.com/user-attachments/assets/01e51339-3a0d-4f7e-8ea5-dc362c042279)



![image](https://github.com/user-attachments/assets/e93a3453-6dff-405a-86b1-52d142385ad0)


