// toolbar
import React from 'react'
import Toolbar from 'src/components/toolbar/index'
import Picker from 'src/libs/picker-limited'
import Picker2 from 'src/libs/picker-limitless'
import Quagga from 'quagga'
import axios from 'axios'

new Picker2({
    // 默认值
    defaultTarget: [
        {value: 'test1', id: 1},
        {value: 'test2', id: 2},
        {value: 'test3', id: 3},
        {value: 'test4', id: 4}
    ],
    // 结束回调
    done: (info) => {
        console.log('info', info)
    },

    // 数据接口函数 返回promise
    getList: (target = [], index = 0) => {
        return new Promise((resolve, reject) => {
            let rst = {
                list: [],
                isDone: false,
                success: true
            }

            if (index === 4) {
                rst.isDone = true
                resolve(rst)
                return
            }

            rst.list = [{
                value: 'test1',
                id: 1
            }, {
                value: 'test2',
                id: 2
            }, {
                value: 'test3',
                id: 3
            }, {
                value: 'test4',
                id: 4
            }]
            resolve(rst)
        })
    }
}).init()

// let keys = [
//     'province',
//     'city',
//     'district',
//     'street'
// ]
// new Picker2({
//     // isCascade: true,
//     defaultTarget: [
//         {value: '陕西省', id: '610000'},
//         {value: '榆林市', id: '610800'},
//         {value: '绥德县', id: '610826'},
//         {value: '薛家河镇', id: '610826005'}
//     ],
//     done: (info) => {
//         console.log('info', info)
//     },
//     getList: (target = [], index = 0) => {
//         return new Promise((resolve, reject) => {
//             let rst = {
//                 list: [],
//                 isDone: false,
//                 success: true
//             }

//             if (index === 4) {
//                 rst.isDone = true
//                 resolve(rst)
//                 return
//             }

//             let paramsKey = index - 1 >= 0 ? keys[index - 1] : keys[index]
//             let key = keys[index]
//             axios.get('/common/' + key + 's', {
//                 params: {[paramsKey + 'Code']: target[index - 1] ? target[index - 1].id : ''}
//             }).then(({
//                 data: {
//                     result,
//                     success
//                 }
//             }) => {
//                 if (success && result) {
//                     if (result.length) {
//                         rst.list = result.map(item => {
//                             return {
//                                 value: item[key],
//                                 id: item[key + 'Code']
//                             }
//                         })
//                     } else {
//                         rst.isDone = true
//                         rst.list = [{value: '空'}]
//                     }
//                 } else {
//                     rst.success = false
//                 }
//                 resolve(rst)
//             }).catch((error) => {
//                 resolve({
//                     success: false
//                 })
//             })
//         })
//     }
// }).init()

// Quagga.init({
//     inputStream: {
//         name: 'Live',
//         type: 'LiveStream',
//         target: document.querySelector('body') // Or '#yourElement' (optional)
//     },
//     decoder: {
//         readers: [{
//             format: 'ean_reader',
//             config: {}
//         }],
//         debug: {
//             drawBoundingBox: false,
//             showFrequency: false,
//             drawScanline: false,
//             showPattern: false
//         },
//         multiple: false
//     },
//     locate: true
// }, (err) => {
//     if (err) {
//         console.log(err)
//         return
//     }
//     console.log('Initialization finished. Ready to start')
//     Quagga.start()
// })

// Quagga.onProcessed((data) => {
//     console.log('data', data)
//     let drawingCtx = Quagga.canvas.ctx.overlay
//     let drawingCanvas = Quagga.canvas.dom.overlay
//     console.log('data', data)

//     if (data && data.boxes) {
//         drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width')), parseInt(drawingCanvas.getAttribute('height')))
//         data.boxes.filter((box) => {
//             return box !== data.box
//         }).forEach((box) => {
//             Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: 'green', lineWidth: 2})
//         })
//     }

//     if (data && data.box) {
//         Quagga.ImageDebug.drawPath(data.box, {x: 0, y: 1}, drawingCtx, {color: '#00F', lineWidth: 2})
//     }

//     if (data && data.codeResult && data.codeResult.code) {
//         Quagga.ImageDebug.drawPath(data.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3})
//     }
// })

// Quagga.onDetected((data) => {
//     console.log('detected', data)
// })

// function onStop() {
//     console.log('stop')
//     Quagga.stop()
// }
//

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div className="b-content" style="display:none">{this.props.children}</div>
                <div className="b-footer" style="display:none"><Toolbar></Toolbar></div>
            </div>
        )
    }
}
