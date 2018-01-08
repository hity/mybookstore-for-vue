// toolbar
import React from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router'
import './index.scss'
export default class Toolbar extends React.Component {
    render() {
        return (
            <Row className="toolbar" type="flex" justify="space-around">
                <Col span={4}>
                    <Link activeClassName="active" to="/home"><span>藏书</span></Link>
                </Col>
                <Col span={4}>
                    <Link to="/plan" activeClassName="active" ><span>计划</span></Link>
                </Col>
                <Col span={4}>
                    <Link to="/createbook" activeClassName="active" ><span>录入</span></Link>
                </Col>
                <Col span={4}>
                    <Link to="/msgboard" activeClassName="active" ><span>留言</span></Link>
                </Col>
                <Col span={4}>
                    <Link to="/trends" activeClassName="active" ><span>动态</span></Link>
                </Col>
            </Row>
        )
    }
}
