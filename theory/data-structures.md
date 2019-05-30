## [数据结构](https://www.interviewcake.com/data-structures-reference)


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

![Hash Table](https://www.interviewcake.com/images/svgs/cs_for_hackers__hash_tables_lies_key_labeled.svg?bust=183)  

`Hash table` 是建立在 `Array` 上的,提供一个 `key` 值，是经过 `hashing function` 算出底层数组的对应的 `Index`，找到 `value`的





 # Tree

![Tree](https://www.interviewcake.com/images/svgs/trees__depth_height.svg?bust=183)

每个在 `Tree`里的元素叫做 `node`,每个 `node` 至少有0个 `child nodes`。如果一个节点没有子节点，我们叫它 `Leaf Nodes`。每个树都有深度，上图所示 深度为4。  

### Binary Trees (以下解释有可能有误，最好还是看英文文献，中文的解释像坨屎)

![Binary Trees](https://www.interviewcake.com/images/svgs/trees__binary_non_binary.svg?bust=183)  
二叉树是指 在树节点中 最多有两个子节点  

![Full binary trees](https://www.interviewcake.com/images/svgs/trees__full_binary.svg?bust=183)  
满二叉树是指 每个节点 有0个或者2个 子节点  

![Perfect binary trees](https://www.interviewcake.com/images/svgs/trees__perfect_binary.svg?bust=183)  
平衡二叉树是指 每个节点只有2个子节点 所有 `leaf node` 在同一个深度  
 
`Relationship between height and number of nodes`  
 Level 0: 2^0= 1 nodes  
 Level 1: 2^1= 2 nodes  
 Level 2: 2^2= 4 nodes  
 所有节点为 n 深度为 h 可以推导出  
 n = 2^h - 1  
 h = log2(n+1)

![Complete binary trees](https://www.interviewcake.com/images/svgs/trees__complete_binary.svg?bust=183)  
完全二叉树是指 满二叉树最后的 `leaf node` 在最左边或者最右边
  

# Graph
![Graph](https://www.interviewcake.com/images/svgs/graph_coloring__nodes_and_edges.svg?bust=195)  

图就像是个关系网一样，树的节点之间是一对多的关系，并存在父与子的层次划分，而图的顶点（vertex）之前是多对多的关系，并且所有  
顶点都是平等的。顶点之间的关联关系被称为边（edges）。  
边有权重之分（weight）就有 带权图（Weighted Graph）；边也有方向之分：就有 有向图  
图表数据结构非常适合表示与其他相关事物的情况。大多数图算法是 O(n*lg(n))O(n*lg(n))或者更慢  

图数据结构表示主要为 邻接矩阵、邻接表（邻接表、逆邻接表、十字链表）
![邻接矩阵](https://mmbiz.qpic.cn/mmbiz_png/NtO5sialJZGosRUW6ToEL0P3VKYqaQiaaV0y4Ozk1W47oyL3ssuFWtDP6Z91VRLLpRvB5iazeOV42LjF7EHhjnJaQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)  

![邻接表](https://mmbiz.qpic.cn/mmbiz_png/NtO5sialJZGosRUW6ToEL0P3VKYqaQiaaVY4zMoTbJH2J4AuknyLHOGBribE1k5MReDS60l5rjtj9pKwws181aaqg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)  

![十字链表](https://mmbiz.qpic.cn/mmbiz_png/NtO5sialJZGosRUW6ToEL0P3VKYqaQiaaVoKoEIaI2QZlLbXkSYm8QkGjM3V7ExPPnFc9uic0Y5tzQMAicub7qQibeQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)


# `以下内容更多的是关于算法，另写一篇`     
1. Tree Traversals
  + 广度优先遍历 (Breadth First Search (BFS))  
  + 深度优先遍历 (Depth First Search (DFS))
  + 还有其他的遍历方法 看原文 (not important)  
# Binary Search Tree

