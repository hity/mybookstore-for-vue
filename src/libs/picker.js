/* 秒杀组件
    功能：a、服务端时间不需要多次请求
        b、客户端时间校准
        c、模版自定义（当前模版无法实现UI需求时，可使用perCb进行定制）
    参数：
        style: 样式，会提供默认样式；
        template: dom;{{value}}其中的value为getList返回的list中item的属性;
        el: 挂载点（默认为body）;
        pClass: 自定义秒杀组件容器的类;
        defaultTarget: 默认值；与target的结构相同
        isCascade: 是否级联，默认不级联。如果级联打开，当list为空时，则停止级联
        *getList: type: function;
            输入：
                target: type: array，返回选中结果数组，
                index：当前请求第几个面板数据；
            输出：
                promise, {success, list}
                其中 list为数组，包含每个item的数据 如[{value: xxx, id:xxx}]
        done: 回调函数，当picker整体选择完毕以后，调用该函数；返回选中的target
*************************/
/* global alert */
import { throttle, throttleTail } from './utils'

const defaultStyle = [
    '.picker {position:fixed; bottom:10%; left: 0; width: 100%; height: 20%; display: flex;}',
    '.picker ul{position: relative; height:auto; top: 50%; flex: 1 auto;}',
    'li {line-height: 20px;}',
    '.target-line {width: 100%; height: 20px; position: absolute; top:50%; border: 1px solid #ddd;}'
].join('')

const defaultLiTemplate = '<li key="{{id}}">{{value}}</li>'

class Picker {
    constructor(options) {
        Object.assign(this, {
            style: defaultStyle,
            liTemplate: defaultLiTemplate,
            defaultTarget: []
        },
        options, {
            _target: [],
            _list: [],
            _pElem: null,
            _currSequenceNum: [], // 当前插入面板的数据为第n个数据请求，用于处理异步请求时序
            _latestSequenceNum: 0, // 最新请求的序号，用于处理异步请求时序
            _requestRstBuff: new Map(), // 缓存数据请求的结果，加速数据返回,map结构
            _touchIndex: -1 // 标记当前数据请求通过那个面板触发，用于处理异步请求时序 如果有级联，当高级面板触发的请求未结束时，不能继续操作面板
        })
    }

    init() {
        if (typeof this.getList !== 'function') {
            console.log('error getList为函数')
            return
        }

        this.el = !this.el ? document.querySelector('body') : this.el
        // style渲染
        this._renderStyle()
        this._target = this.defaultTarget
        this._handleWholePanel(0)
    }

    // 获取数据
    _getDataByNet(index) {
        return new Promise((resolve, reject) => {
            // 获取list数据
            this.getList(this._target, index).then(({success, list, isDone}) => {
                if (success) {
                    resolve({list, isDone})
                }
            }).catch((err) => {
                resolve({
                    list: [],
                    isDone: false
                })
                console.log(err)
            })
        })
    }

    // 样式渲染
    _renderStyle() {
        let style = this.style
        if (typeof style === 'string' && style.trim()) {
            let styleElem = document.createElement('style')
            styleElem.innerHTML = style
            document.querySelector('head').append(styleElem)
        }
    }

    // 挂载
    _mount(template, el, pClass, index) {
        let pElem = this._pElem

        if (!pElem) {
            pElem = document.createElement('div')
            pElem.className = 'picker ' + (!pClass ? '' : pClass)
            el.append(pElem)
            pElem.innerHTML = '<div class="target-line"></div>'
            this._pElem = pElem
        }

        let ulElem = this._pElem.querySelector('.panel-' + index)
        if (!ulElem) {
            ulElem = document.createElement('ul')
            ulElem.className = 'panel-' + index
            ulElem.innerHTML = template
            pElem.append(ulElem)
            // 新建ul列表时，注册交互事件
            this._registerUlEvent(ulElem, index)
        } else {
            ulElem.innerHTML = template
        }
    }

    // 编译模版，填充值
    _compile(liTemplate, list) {
        let reg = new RegExp(/(\{\{([^\}]+)\}\})/g)
        return list.map(item => {
            let template = liTemplate
            while (reg.test(liTemplate)) {
                let value = item[RegExp.$2]
                if (!value) {
                    value = ''
                    console.log('error, 该变量不存在')
                }
                template = template.replace(RegExp.$1, value)
            }
            return template
        }).join('')
    }

    // 处理整个面板
    _handleWholePanel(index) {
        if (this._touchIndex != -1 && index > this._touchIndex && this.isCascade) {
            return
        }
        this._touchIndex = index
        let latestSequenceNum = this._latestSequenceNum++

        this._handleOnePanel(index, latestSequenceNum)
    }

    // 处理单个面板的数据获取及编译、挂载
    _handleOnePanel(index, mySequenceNum) {
        this._getData(index, mySequenceNum).then(({list, isDone}) => {
            if (isDone) {
                this._currSequenceNum[index] = mySequenceNum
                this._touchIndex = -1
                this.defaultTarget = []
                this.done && this.done(this._target)
            } else if (list && list.length > 0) {
                this._handleData(list, index, mySequenceNum)
            }
        })
    }

    // 获取数据，通过内存或者数据回调函数
    _getData(index, mySequenceNum) {
        return new Promise((resolve, reject) => {
            let firstTargetValue = Symbol('first')
            let targetValue = index == 0 ? firstTargetValue : this._target[index - 1]
            let rst = {}

            if (this._requestRstBuff.has(targetValue)) {
                rst = this._requestRstBuff.get(targetValue)
                resolve(rst)
            } else {
                this._getDataByNet(index).then((rst) => {
                    // 当请求数据的序列号 大于 已插入面板的数据序列号时，数据有效；否则无效丢弃
                    if (!mySequenceNum || mySequenceNum > this._currSequenceNum[index]) {
                        // 存入内存中
                        this._requestRstBuff.set(targetValue, rst)
                        resolve(rst)
                    }
                })
            }
        })
    }
    // 对数据进行编译、挂载、级联判断等处理
    _handleData(list, index, mySequenceNum) {
        this._list[index] = list
        if (!this.defaultTarget || !this.defaultTarget.length) {
            this._target[index] = list[0]
        }

        // 获取模版
        let template = this._compile(this.liTemplate, list)

        // 挂载
        this._mount(template, this.el, this.pClass, index)

        // 设置当前的数据时序
        this._currSequenceNum[index] = mySequenceNum
        if (this.isCascade) {
            this._handleOnePanel(index + 1, mySequenceNum)
        }
    }

    // touch时，移动面板
    _renderTouchUi(touchInfo, ulElem, index) {
        let touchGap = (touchInfo.preTouchY - touchInfo.currTouchY)
        let yCount = touchGap / touchInfo.lineHeight
        yCount = (touchGap / touchInfo.lineHeight).toFixed(0)

        let yGap = -1 * yCount * touchInfo.lineHeight

        if ((touchInfo.translateY + yGap) > touchInfo.minY && (touchInfo.translateY + yGap) <= touchInfo.maxY) {
            touchInfo.translateY += yGap
        }
        ulElem.style.transform = 'translate(0, ' + touchInfo.translateY + 'px)'
        this._target[index] = this._list[index][Math.abs((touchInfo.translateY / touchInfo.lineHeight))]
    }

    // 注册事件
    _registerUlEvent(ulElem, index) {
        let lineHeight = ulElem.querySelector('li').offsetHeight

        let touchInfo = {
            preTouchY: 0,
            currTouchY: 0,
            lineHeight: lineHeight,
            maxY: 0,
            minY: -this._list[index].length * lineHeight,
            translateY: 0
        }
        let handleWholePanel = throttleTail(this._handleWholePanel, 1000, this)
        let renderTouchUi = throttle(this._renderTouchUi, 100, this)

        ulElem.addEventListener('touchstart', (event) => {
            touchInfo.preTouchY = event.touches[0].clientY
        })

        ulElem.addEventListener('touchmove', (event) => {
            touchInfo.currTouchY = event.touches[0].clientY
            renderTouchUi(touchInfo, ulElem, index)
            handleWholePanel(index + 1)
        }, false)
    }
}

export default Picker
