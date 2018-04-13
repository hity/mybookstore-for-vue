// toolbar
import React from 'react'
import Toolbar from 'src/components/toolbar/index'
import Picker from 'src/libs/picker'
import Quagga from 'quagga'
new Picker({
    isCascade: true,
    defaultTarget: [{
        key: '34',
        value: '34'
    }, {
        key: 'cd',
        value: 'cd'
    }],
    done: (info) => {
        console.log('info', info)
    },
    getList: (target = [], index = 0) => {
        return new Promise((resolve, reject) => {
            console.log('index', index, target)
            let isDone = false
            let list = [{
                id: '12',
                value: '12'
            }, {
                id: '34',
                value: '34'
            }, {
                id: '56',
                value: '56'
            }]

            if (index == 1) {
                list = [{
                    id: 'ab',
                    value: 'ab'
                }, {
                    id: 'cd',
                    value: 'cd'
                }, {
                    id: 'ef',
                    value: 'ef'
                }]
            }

            if (index == 2) {
                isDone = true
            }
            resolve({
                success: true,
                list,
                isDone
            })
        })
    }
}).init()

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
                <div className="b-content">{this.props.children}</div>
                <div className="b-footer"><Toolbar></Toolbar></div>
            </div>
        )
    }
}
