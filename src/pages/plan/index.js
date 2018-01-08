import React from 'react'
import BookPlanItem from 'src/components/bookplanitem/index'
import { List, Row, Col } from 'antd'
import './index.scss'

export default class App extends React.Component {
    render() {
        return (
            <div id = "plan">
                <nav className="plan-nav">
                    <Row>
                        <Col span={8}>
                            购书单
                        </Col>
                        <Col span={8}>
                            想读书单
                        </Col>
                        <Col span={8}>
                            读书计划
                        </Col>
                    </Row>
                </nav>
                <div className="plan-ct">
                    <p className="plan-ct__add"> 添加书本 </p>
                    <List className="plan-booklist" itemLayout="horizontal" dataSource={[1, 2, 3]}
                        renderItem={item => (
                            <List.Item>
                                <BookPlanItem />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        )
    }
}
