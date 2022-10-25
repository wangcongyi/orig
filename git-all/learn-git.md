### git merge / git rebase

合并分之通常有两种选择，直接使用 git merge 或者 git rebase 后再合并。   
直接 git merge 有一个缺点就是每次合并上游更改时 feature 分支都会引入一个外来的合并提交，导致提交历史分叉。  
使用 git rebase 可以解决这个问题。  
[merge vs rebase](https://zhuanlan.zhihu.com/p/47905032)


### git pull / git fetch
从远程仓库拉取代码，可以使用 git pull 和 git fetch 命令来完成。  
git fetch 不会更新本地代码的工作状态  
git pull 是更加激进的选择，将下载的远程内容并立即执行 git merge 为新的远程内容创建合并提交。 如果有在进行的更改，会导致冲突


### git cherry-pick
从一个分支中选择一个提交并将其应用到另一个分支上。
