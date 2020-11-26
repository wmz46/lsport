# lsport
基于nodejs查看本机端口占用的命令行工具
## 一、安装
```shell
npm install wmz46/lsport -g
#或者
cnpm install wmz46/lsport -g

```
## 二、卸载
npm uninstall lsport -g
## 三、使用
```shell
#查询所有本机所有端口占用
lsport 

#查询所有本机tcp端口占用情况
lsport -t

#查询所有本机udp端口占用情况
lsport -u

#查询本机80端口占用
lsport -p 80

#查询本机80端口占用，包括进程的执行命令行。
lsport -p 80 -c

```
## 四、原理
原理很简单就是调用cmd命令netstat和wmic process，并将结果进行整合输出。

那为什么不直接用cmd原生命令行？
- 1.原生的命令太长，懒得每次都敲。
- 2.原生的语法过于复杂，我记不住。
- 3.我又不是为了让新手觉得我牛逼才敲一堆命令行的人。

## 五、为什么用nodejs
- 1.不需要额外的编译打包
- 2.用nodejs可以方便的获取和执行程序。
- 3.用nodejs写命令行简单  
基于以上3点，只是写一个命令行小工具，用nodejs刚好够用。
