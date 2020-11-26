#!/usr/bin/env node
const {
    netstat
} = require('./cmd/netstat')

var arguments = process.argv.splice(2);
var port, showCmd = false,
    onlyTCP = false,
    onlyUDP = false,
    showHelp = false
if (arguments != '') {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] == '-p') {
            port = arguments[i + 1];
        } else if (arguments[i] == '-c') {
            showCmd = true
        } else if (arguments[i] == '-t') {
            onlyTCP = true;
        } else if (arguments[i] == '-u') {
            onlyUDP = true;
        } else if (arguments[i] == '-h') {
            showHelp = true;
        }
    }

}
if (showHelp) {
    var arr = [];
    arr.push('[-p port] [-c] [-t] [-u]')
    arr.push('-p port   显示指定端口的占用情况')
    arr.push('-c        显示命令行列')
    arr.push('-t        只显示TCP协议的端口占用情况')
    arr.push('-u        只显示UDP协议的端口占用情况')
    console.log(arr.join('\r\n'))

} else {
    netstat(port, showCmd, onlyTCP, onlyUDP).then(info => {
        console.log(info)
    })
}