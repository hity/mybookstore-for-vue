// toolbar
import React from 'react'
import Toolbar from 'src/components/toolbar/index'
import Seckill from '../libs/seckill'
import axios from 'axios'

new Seckill({
    during: 100,
    endTime: '2018-5-23 15:49:00',
    startTime: '2018-3-22 16:00:00',
    getServerTime: () => {
        return new Promise((resolve, reject) => {
            axios.get('/common/getNow').then(({data: {success, result}}) => {
                resolve({
                    success,
                    serverTime: result
                })
            })
        })
    }
})

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
