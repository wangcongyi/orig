## 编程语言大致分类

1. 静态类型语言：变量的类型在编译时就能知道。  
2. 动态类型语言：变量的类型只能在运行时知道。   
3. 强类型语言：变量不得随意更改类型。  
4. 弱类型语言：变量可以随意更改类型。 



| Length  | Signed | Unsigned |
| :----:  | :----: | :----:   |
| 8-bit   | i8     |   u8     |
| 16-bit  | i16    |   u16    |
| 32-bit  | i32    |   u32    |
| 64-bit  | i64    |   u64    |
| 128-bit | i128   |   u128   |
| arch    | isize  |   usize  |

```

Each signed variant can store numbers from -(2n - 1) to 2n - 1 - 1 inclusive,   
where n is the number of bits that variant uses. So an i8 can store numbers from -(27) to 27 - 1,  
which equals -128 to 127. Unsigned variants can store numbers from 0 to 2n - 1,   
so a u8 can store numbers from 0 to 28 - 1, which equals 0 to 255.

Additionally, the isize and usize types depend on the kind of computer your program is running on:  
64 bits if you’re on a 64-bit architecture and 32 bits if you’re on a 32-bit architecture.

```


