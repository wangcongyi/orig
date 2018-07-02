[对文章的一些总结](https://www.interviewcake.com/data-structures-reference)

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

|             |  Worst Case |
|  :-------:  |  :-------:  |
|  space      |  O(n)       |
|  lookup     |  O(n)       |
|  prepend    |  O(1)       |
|  append     |  O(1)       |
|  insert     |  O(n)       |
|  delete     |  O(n)       |  

![Linked List](https://cdn-images-1.medium.com/max/1600/1*1vMrgnKUU2ujVS7CEx52kw.png)

在链表中，每个元素叫做 `node`，第一个元素叫做 `head` 最后一个元素叫做 `tail`。每个元素存储着一个指向下一个元素的指针。与数组不同，链表中的连续项不一定在内存中彼此相邻。



# Queue

|             |  Worst Case |
|  :-------:  |  :-------:  |
|  space      |  O(n)       |
|  enqueue    |  O(1)       |
|  dequeue    |  O(1)       |
|  peek       |  O(1)       | 

队列实行 先进先出的原则 (first-in, first-out (FIFO))



# Stack

|             |  Worst Case |
|  :-------:  |  :-------:  |
|  space      |  O(n)       |
|  push       |  O(1)       |
|  pop        |  O(1)       |
|  peek       |  O(1)       | 

堆实行 先进后出的原则 (last-in, first-out (LIFO))



# Hash Table

|             |  Average Case   |  Worst Case  |
|  :-------:  |  :-----------:  |  :--------:  |
|  space      |  O(n)           |  O(n)        |
|  lookup     |  O(1)           |  O(n)        |
|  insert     |  O(1)           |  O(n)        |
|  delete     |  O(1)           |  O(n)        |

在不同的编程语言中有不同的叫法  

|                       |                |
|  :-------:            |  :-------:     |
|  C                    |  hash tables   |
|  C# / Python / Swift  |  dictionaries  |
|  Java                 |  hash maps     |
|  JavaScript           |  objects       | 

`Hash table` 是建立在 `Array` 上的 

 //TODO

# Tree



# Binary Search Tree



# Graph
