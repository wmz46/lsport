const {
    cmd
} = require('./index')

function rightPad(str, len) {
    while (str.length < len) {
        str += ' '
    }
    return str;
}
var netstat = function (port, showCmd, onlyTCP, onlyUDP) {
    return new Promise(function (resolve, reject) {
        var netstat = 'netstat -ano'
        if (onlyTCP) {
            netstat += ' -p TCP'
        } else if (onlyUDP) {
            netstat += ' -p UDP'
        }
        cmd(netstat).then(async function (info) {
            var reg = new RegExp('(TCP|UDP)    \\d+\\.\\d+\\.\\d+\\.\\d+:(\\d+).*?(\\d+)\\r\\n', 'g');
            var arr = [];
            var processes = {};
            while (tempR = reg.exec(info)) {
                if (port && port != tempR[2]) {
                    continue;
                }
                var name = '',
                    commandline = '';
                if (processes[tempR[3]]) {
                    name = processes[tempR[3]][0];
                    commandline = processes[tempR[3]][1];

                }
                if (!name) {
                    var str = await cmd('wmic process where processid=' + tempR[3] + ' get caption,commandline');
                    var temp = str.split('\r\r\n')[1];
                    var idx = temp.indexOf(' ');
                    name = temp.substring(0, idx);
                    commandline = temp.substring(idx);
                    processes[tempR[3]] = [name, commandline];
                }

                var line = tempR[1] + '   ' + rightPad(tempR[2], 5) + '     ' + rightPad(name, 30) + '   ' + rightPad(tempR[3], 5) + (showCmd ? '  ' + commandline : '');
                arr.push({line:line,port:tempR[2]});

            }
            arr = arr.sort(function (obj1, obj2) {
                var val1 = parseInt(obj1.port);
                var val2 = parseInt(obj2.port);
                if (val1 < val2) {
                    return -1;
                } else if (val1 > val2 ){
                    return 1;
                } else {
                    return 0;
                }
            }).map(m=>m.line)
            arr.unshift('协议  端口      映像名称                         PID' + (showCmd ? '      命令行' : ''))
            resolve(arr.join('\r\n'))
        })
    });

}
exports.netstat = netstat