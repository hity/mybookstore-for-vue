import React from 'react'
import { Row, Col, DatePicker } from 'antd'
import './index.scss'

function onChange(date, dateString) {
    console.log(date, dateString)
}

export default class Bookitem extends React.Component {
    render() {
        return (
            <Row className="book-plan-item" type="flex" align="middle">
                <Col className="number">
                    1
                </Col>
                <Col className="desc">
                    <p className="desc--name">全集02：撒哈拉的故事</p>
                    <p className="desc--author">三毛</p>
                    <DatePicker onChange={onChange} placeholder={'2018-01-02'}/>
                </Col>
                <Col className="opr">
                    <p>完成购买</p>
                    <p>移除</p>
                    <p>加入购书单</p>
                    <p>加入读书计划</p>
                    <p>移除</p>
                    <p>加入购书单</p>
                    <p>完成阅读</p>
                    <p>移除</p>
                </Col>
            </Row>
        )
    }
}
