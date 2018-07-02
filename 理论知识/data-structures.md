# Array 
 
|             |  Worst Case |
|  :-------:  |  :-------:  |
|  space      |  O(n)       |
|  lookup     |  O(1)       |
|  append     |  O(1)       |
|  insert     |  O(n)       |
|  delete     |  O(n)       |

在大部分编程语言中 数组是固定长度的(Fixed size)。所以 `insert` `delete` 在最糟糕的情况下是 O(n)


# Dynamic Array

|             |  Average Case   |  Worst Case  |
|  :-------:  |  :-----------:  |  :--------:  |
|  space      |  O(n)           |  O(n)        |
|  lookup     |  O(1)           |  O(1)        |
|  append     |  O(1)           |  O(n)        |
|  insert     |  O(n)           |  O(n)        |
|  delete     |  O(n)           |  O(n)        |

不同于`Array` 动态数组是不固定长度的，但是如果动态数组没有足够的容量 `append` 新元素，会使整体数组扩大。所以最糟糕情况下是 O(n)  
这里牵扯到一个很重要的概念 `Size` vs `Capacity`

当我们定义一个动态数组的时候，会在底层生成一个固定长度的数组，长度取决于实现  
  
![Size vs Capacity](https://www.interviewcake.com/images/svgs/dynamic_arrays__capacity_size_end_index.svg?bust=183)


# Linked List


