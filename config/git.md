### git merge / git rebase

合并分之通常有两种选择，直接使用 git merge 或者 git rebase 后再合并。   
直接 git merge 有一个缺点就是每次合并上游更改时 feature 分支都会引入一个外来的合并提交，导致提交历史分叉。  
使用 git rebase 可以解决这个问题。  
[merge vs rebase](https://zhuanlan.zhihu.com/p/47905032)

### git pull / git fetch
从远程仓库拉取代码，可以使用 git pull 和 git fetch 命令来完成。  
git fetch 不会更新本地代码的工作状态  
git pull 是更加激进的选择，将下载的远程内容并立即执行 git merge 为新的远程内容创建合并提交。  
如果有在进行的更改，会导致冲突

### git cherry-pick
从一个分支中选择一个提交并将其应用到另一个分支上。也可用于撤消更改。   
例如，假设不小心向错误的分支提交了一次提交。 
可以切换到正确的分支并选择提交到它应该属于的位置。

### git 回滚
1. 已经提交，没有 push
   - git reset --soft  [commit id]  撤销 commit
   - git reset --mixed [commit id]  撤销 commit 和 add 两个动作

2. 已经提交，并且 push
   - git reset --hard  [commit id]  撤销并舍弃版本号之后的提交记录，
   - git revert  [commit id]        撤销但保留提交记录


### git stash
暂时存储对工作副本所做的更改，以便可以处理其他内容，然后稍后再回来重新应用它们。  
需要快速切换上下文并处理其他事情，则存储很方便，但是正处于代码更改的中途并且还没有准备好提交。   
git stash pop 默认返回最近一条暂存数据  
git stash list 返回所有暂存记录

📦：表示添加、更新或管理依赖项或包。  
🐞：表示报告 bug 或问题。  
📝：表示更新文档或写下注释。  
🚧：表示正在进行重构或修改代码。  
📈：表示增加性能优化或改进项目的指标。  
📌：表示固定某个 commit、版本或状态。  
👀：表示关注或注意某个问题或讨论。  
⬆️：表示升级到新版本或更新内容。  
⬇️：表示降级到旧版本或回滚更改。  
🙏：表示请求帮助或寻求反馈。  
✨：表示新功能或突出的特性。  
🚀：表示新增功能或改进的功能，使项目更强大。  
🌟：表示一个重要的特性或功能。  
🃏 ：jest   
