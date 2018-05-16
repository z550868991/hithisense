const qs = require('querystring')

function tofixed(data) {
    return data.toString().length > 1 ? '' + data : '0' + data
}
export function formatTime(time) {
    if (!time) return ''
    let date = new Date(+time)
    let hours = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    return tofixed(hours) + ':' + tofixed(minute) + ':' + tofixed(second)
}
export function formatDate(time) {
    if (!time) return ''
    let date = new Date(+time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return year + '-' + tofixed(month) + '-' + tofixed(day)
}
export function query(url) {
    return qs.parse(url)
}
export function paramString(param) {
    return qs.stringify(param)
}

export function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "";
    var uuid = s.join("");
    return uuid;
}

// 浮点数运算
export function resolveFloat(base, increment, operator = '+') {
    if (Array.isArray(base)) {
        operator = increment || operator
        return base.reduce((first, second) => {
            return resolveFloat(first, second, operator)
        })
    } else {
        // 转换成字符串
        base = '' + base
        increment = '' + increment
        // 计算小数点移动位数
        let dig = base.split('.')[1] && base.split('.')[1].length || 0
        let dig2 = increment.split('.')[1] && increment.split('.')[1].length || 0
        let max = Math.max(dig, dig2)
        let diff = dig - dig2
        // 位数补全
        base = base.replace('.', '')
        increment = increment.replace('.', '')
        if (diff >= 0) {
            let cm = Math.pow(10, diff)
            increment = Number(increment) * cm
        } else {
            let cm = Math.pow(10, -diff)
            base = Number(base) * cm
        }
        switch (operator) {
            case '+':
                base = (+base) + (+increment)
                return base / Math.pow(10, max)
            case '-':
                base = (+base) - (+increment)
                return base / Math.pow(10, max)
            case '*':
                base = (+base) * (+increment)
                return base / Math.pow(10, dig + dig2)
            default:
                throw new Error('unexpected operator')
        }
    }
}
