import React from 'react'
import BookPlanItem from 'src/components/bookplanitem/index'
import { List, Row, Col, Card } from 'antd'
import './index.scss'

const tabList = [{
    key: 'tab1',
    tab: '购书单'
}, {
    key: 'tab2',
    tab: '想读'
}, {
    key: 'tab3',
    tab: '读书计划'
}]

const contentList = {
    tab1: <p>请期待哦～～</p>,
    tab2: <p>请期待哦～～</p>,
    tab3: <p>请期待哦～～</p>
}

export default class Plan extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            key: 'tab1'
        }
    }

    onTabChange(key, type) {
        this.setState({ [type]: key })
    }

    render() {
        return (
            <div id = "plan">
                <Card
                    style={{ width: '100%' }}
                    tabList={tabList}
                    onTabChange={key => { this.onTabChange(key, 'key') }}
                >
                    {contentList[this.state.key]}
                </Card>
            </div>
        )
    }
}
