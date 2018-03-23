/* 秒杀组件
    功能：根据给定的模版，编译生成秒杀Dom结构 or 串；
        其中包含requestAnimationFrame的倒计时，
        根据服务器时间与客户端时间差，来获取实时的服务器时间；
        对客户端时间进行校验等
    参数：
        style: 样式，会提供默认样式；
        template: 倒计时渲染的模版，其中包含关键子：
            a、$isBefore{xxx} 如果秒杀未开始，则露出xxx，否则不显示；
            b、$isIng{xxx} 如果秒杀进行中，则露出xxx，否则不显示；
            c、$isAfter{xxx} 如果秒杀已结束，则露出xxx，否则不显示；
            b、$Y: 年
            c、$M: 月
            d、$W: 周
            e、$D: 日
            f、$h: 时
            g、$m: 分
            h、$s: 秒
            i、$100ms: 100ms
            如果包含$W，则日不大于7！
        el: 挂载点（默认为body）;
        pClass: 自定义秒杀组件容器的类;
        threshold: 检验客户端时间是否异常的阈值，单位ms; 必须大于during；默认为30s
        *getServerTime[与gap必有其一]: 获取服务端时间的函数，可校验客户端时间变化；要求其返回promise对象，resolve数据的结构为{success, serverTime};
        *gap[与getServerTime必有其一]: 服务端与客户端时间差 gap = frontTime - serverTime；
        *startTime[必须]: 秒杀开始时间；
        *endTime［必须］：秒杀结束时间；
        during: UI渲染频率，单位ms; 必须大于100ms；
        perCb: 倒计时中的回调，dom挂载成功后，执行perCallback，其参数为Object，{isIng, isEnd, isBefore, year, month, week, day, hour, minute, second, _100msecond}
        beginSeckillCb: 秒杀开始时的回调；［参数同perCb］
        endSeckillCb: 秒杀结束时的回调。[无参数]

*************************/

const defaultStyle = ''
const defaultTemplate = [
    '$isBefore{<span>即将开始</span>}',
    '$isIng{<span>进行中</span>}',
    '$isAfter{<span>已结束</span>}',
    '$isIng||$isBefore{<div>',
    '   <span class="time-block">$W</span>',
    '   <span class="time-block">周</span>',
    '   ,',
    '   <span class="time-block">$D</span>',
    '   <span class="time-block">天</span>',
    '     ',
    '   <span class="time-block">$h</span>',
    '   <span class="time-block">$h</span>',
    '   :',
    '   <span class="time-block">$m</span>',
    '   <span class="time-block">$m</span>',
    '   :',
    '   <span class="time-block">$s</span>',
    '   <span class="time-block">$s</span>',
    '   :',
    '   <span class="time-block">$_100ms</span>',
    '</div>}'
].join('')
const defaultThreshold = 10 * 1000
const defaultDuring = 1000

class Seckill {
    constructor(options) {
        Object.assign(this, {
            style: defaultStyle,
            template: defaultTemplate,
            el: document.querySelector('body'),
            during: defaultDuring,
            threshold: defaultThreshold
        },
        options, {
            _isGetServerTimeValid: false, // 用于校验客户端时间
            _preClientTime: 0, // 用于校验客户端时间
            _moment: null, // 倒计时返回
            _beginSeckillCbDone: false // 开始秒杀回调是否执行
        })

        if (this.during < 100) {
            this.during = 100
        }

        if (this.threshold < this.during || this.threshold < this.defaultThreshold) {
            this.threshold = this.during + this.defaultThreshold
        }

        this.startTime = this._formatDate(this.startTime)
        this.endTime = this._formatDate(this.endTime)

        if (this.startTime >= this.endTime) {
            console.log('error, 时间参数错误')
            return
        }

        this.init()
    }

    init() {
        // style渲染
        this._renderStyle()

        // 获取服务端与客户端的时间差
        this._getGap().then(() => {
            // 开始倒计时
            this._moment = setTimeout(this._start.bind(this), this.during)
        }).catch((err) => {
            console.log(err)
        })
    }

    _renderStyle() {
        let style = this.style
        if (typeof style === 'string' && style.trim()) {
            document.querySelector('head').append('<style type="text/css">' + style + '</style>')
        }
    }

    // 通过输入的函数获取服务端时间，如果有效，则给出标记；再判断gap是否有效，如果无效则报错，并停止函数
    _getGap() {
        return new Promise((resolve, reject) => {
            this.getServerTime && this.getServerTime().then(({success, serverTime}) => {
                if (success) {
                    this._isGetServerTimeValid = true
                    this.gap = new Date() - this._formatDate(serverTime)
                }
                if (this.gap !== undefined) {
                    this._preClientTime = new Date()
                    resolve()
                } else {
                    console.log('error，缺少有效的gap参数')
                    reject()
                }
            })
        })
    }

    // 格式化时间，如果为number，则直接返回；如果为string，则将'-'格式转换成'/'，进行ios时间兼容
    _formatDate(date) {
        if (typeof date === 'number') {
            return date
        } else if (typeof date === 'string') {
            return new Date(date.replace(/-/g, '/'))
        } else {
            console.log('error 时间无效')
            return 0
        }
    }

    // 当前服务端时间
    _currServerTime() {
        return new Date() - this.gap
    }

    // 秒杀未开始
    _isBefore() {
        return this.startTime > this._currServerTime()
    }

    // 秒杀进行中
    _isIng() {
        return this._currServerTime() >= this.startTime && this._currServerTime() < this.endTime
    }

    // 秒杀结束
    _isAfter() {
        return this.endTime <= this._currServerTime()
    }
    // 当客户端时间变化大于阈值时，客户端时间异常：该时间小于
    _validClientTime() {
        return (new Date() - this._preClientTime) < this.threshold
    }

    // 倒计时功能
    _start() {
        // 客户端时间校验
        if (!this._validClientTime()) {
            this._getGap().then(() => {
                this._start()
            }).catch((err) => {
                console.log(err)
            })
        } else {
            clearTimeout(this._moment)

            // 结束时，清空timeout, 执行结束回调
            if (this._isAfter()) {
                this.endSeckillCb && this.endSeckillCb()
                return
            }

            // 剩余时间
            let restTime = Math.abs((this._isBefore() ? this.startTime : this.endTime) - this._currServerTime())

            // 编译
            let rst = this._compile(restTime, this.template)
            console.log('rst', rst)
            // 挂载
            let pElem = document.querySelector('#seckill')

            if (!pElem) {
                pElem = document.createElement('div')
                pElem.id = 'seckill'
                this.el.append(pElem)
            }

            pElem.innerHTML = rst.template

            this.perCb && this.perCb(rst.obj)

            // 开始秒杀，执行回调
            if (this._isIng() && this.beginSeckillCb && !this._beginSeckillCbDone) {
                this.beginSeckillCb && this.beginSeckillCb(rst.obj)
                this._beginSeckillCbDone = true
            }

            // 纪录当前客户端时间
            this._preClientTime = new Date()

            this._moment = setTimeout(this._start.bind(this), this.during)
        }
    }

    _compile(restTime, template) {
        let timeOptions = [{
            name: 'year',
            key: 'Y',
            mult: 365
        }, {
            name: 'month',
            key: 'M',
            mult: 30
        }, {
            name: 'week',
            key: 'W',
            mult: 7
        }, {
            name: 'day',
            key: 'D',
            mult: 24
        }, {
            name: 'hour',
            key: 'h',
            mult: 60
        }, {
            name: 'minute',
            key: 'm',
            mult: 60
        }, {
            name: 'second',
            key: 's',
            mult: 1000
        }, {
            name: 'ms',
            key: '_100ms',
            mult: 1
        }]

        let timeObj = {}

        // 删除模版中不存在的项
        timeOptions = timeOptions.filter((item) => {
            return template.indexOf('$' + item.key) != -1
        })

        // 计算剩余项目的结果
        timeOptions.forEach((item, index) => {
            let sum = timeOptions.slice(index)
                .map(item => item.mult)
                .reduce((x, y) => {
                    return x * y
                })
            // 如果是年或者月，去除周的影响
            if ((item.key === 'Y' || item.key === 'M') && timeOptions.some(item => item.key === 'W')) {
                sum = sum / 7
            }
            if (item.key === '_100ms') {
                sum = sum * 100
            }

            timeObj[item.name] = Math.floor(restTime / sum)
            restTime = restTime % sum
        })

        let reg = new RegExp(/((\$(isIng|isBefore|isAfter)\|\|)*)(\$(isIng|isBefore|isAfter)\{([^\}]+)\})/i)
        let count = 5

        while (reg.test(template)) {
            // 包含或运算
            if (RegExp.$1) {
                let stateArray = RegExp.$1.slice(0, RegExp.$1.length - 2).replace('$', '').split('||')
                stateArray.push(RegExp.$3)
                let state = stateArray.reduce((s1, s2) => {
                    return this['_' + s1]() || this['_' + s2]()
                })
                template = template.replace(RegExp.$1 + RegExp.$4, state ? RegExp.$6 : '')
            } else if (RegExp.$4) {
                template = template.replace(RegExp.$4, this['_' + RegExp.$5]() ? RegExp.$6 : '')
            }
        }

        timeOptions.forEach((item) => {
            //  找出key的数量，进行相应替换
            let keyArray = template.match(new RegExp('\\$' + item.key, 'g'))
            let value = timeObj[item.name].toString()

            // 数值字符长度不够，用0补充
            value = value.padStart(keyArray.length, '0')

            // 将对应数值填坑
            let start = 0
            let count = 0
            keyArray.forEach((item, index) => {
                if (index === 0) {
                    count = value.length - keyArray.length + 1
                } else {
                    count = 1
                }
                template = template.replace(item, value.substr(start, count))
                start += count
            })
        })

        return {
            template,
            timeObj: Object.assign(timeObj, {
                isBefore: this._isBefore(),
                isIng: this._isIng(),
                isAfter: this._isAfter()
            }),
            timeOptions
        }
    }
}

export default Seckill
