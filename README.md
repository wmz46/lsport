# lsport
基于nodejs查看本机端口占用工具
## 安装
npm install wmz46/lsport -g
## 卸载
npm uninstall lsport -g
## 使用
```cmd
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
