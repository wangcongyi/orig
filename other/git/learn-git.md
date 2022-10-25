### git merge / git rebase

合并分之通常有两种选择，直接使用 git merge 或者 git rebase 后再合并。   
直接 git merge 有一个缺点就是每次合并上游更改时 feature 分支都会引入一个外来的合并提交，导致提交历史分叉。  
使用 git rebase 可以解决这个问题。  
[merge vs rebase](https://zhuanlan.zhihu.com/p/47905032)
