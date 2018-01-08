// toolbar
import React from 'react'
import { Row, Col } from 'antd'
import './index.scss'
export default class Bookitem extends React.Component {
    render() {
        return (
            <Row className="bookitem" type="flex" align="middle">
                <Col>
                    <img src="javascript:void(0)" />
                </Col>
                <Col className="desc">
                    <p className="desc-name">全集02：撒哈拉的故事</p>
                    <p className="desc-author">三毛</p>
                    <p className="desc-date">2017-01-02</p>
                    <p className="desc-isbn">ISBN：1244234243242324</p>
                    <p className="desc-pos">一楼书房A架1层</p>
                </Col>
                <Col className="opr">
                    <p>加入藏书</p>
                    <p>加入想读</p>
                    <p>加入想买</p>
                    <p>加入已读</p>
                </Col>
            </Row>
        )
    }
}
