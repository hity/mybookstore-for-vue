// bookitem
import React from 'react'
import { Row, Col, Icon, Collapse, Select, Checkbox, InputNumber, DatePicker, Button, Radio } from 'antd'
import './index.scss'
const RadioGroup = Radio.Group

function handleChange(value) {
    console.log(`selected ${value}`)
}

function handleBlur() {
    console.log('blur')
}

function handleFocus() {
    console.log('focus')
}

function onChange() {

}
export default class BookDetail extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.onChange1 = this.onChange1.bind(this)
        this.onChange2 = this.onChange2.bind(this)

        this.state = {
            value1: '已有藏书',
            value2: '想读'
        }
    }

    onChange1(e) {
        console.log('radio1 checked', this)
        this.setState({
            value1: e.target.value
        })
    }

    onChange2(e) {
        console.log('radio2 checked', this)
        this.setState({
            value2: e.target.value
        })
    }
    render() {
        let {
            title,
            images,
            author,
            isbn,
            price,
            pubdate,
            translator,
            publisher,
            pages,
            binding,
            summary,
            isWantedToRead, // 想读
            isMine, // 已有藏书
            isRead, // 已读
            isWantedToBuy, // 想买
            isPrivate // 是否公开
        } = this.props.book ? this.props.book : {}
        let tags = this.props.tags || [1, 2, 3]
        let pos = this.props.pos || {list: [1, 2, 3], defaultPos: '书架'}
        let {
            large,
            medium,
            small
        } = images || {}
        return (
            <div className="book-detail">
                <p className="book-detail-title">{title}</p>
                <div className="book-detail-info">
                    <Row type="flex" align="middle">
                        <Col className="book-info__desc">
                            <p>{author + ' / ' + translator + ' / ' + publisher + ' / ' + pages + '页 / ' + binding + ' / ' + price + ' / ' + pubdate}</p>
                        </Col>
                        <Col className="img-frame">
                            <img src={medium} />
                        </Col>
                    </Row>
                    {summary ? <Collapse bordered={false} defaultActiveKey={['1']}>
                        <Collapse.Panel header="内容简介">
                            <p>{summary}</p>
                        </Collapse.Panel>
                    </Collapse> : null}
                </div>
                <div className="book-detail-opr">
                    <div className="book-detail-pos large-gap">
                        <em>藏书位置：</em>
                        <Select
                            mode="combobox"
                            defaultValue={pos.defaultPos}
                            placeholder="选择/输入藏书位置"
                            style={{width: 200}}
                        >
                            {
                                pos.list.map(i => {
                                    return <Select.Option key={i.toString(36)}>{i.toString(36)}</Select.Option>
                                })
                            }
                        </Select>
                    </div>
                    <div className="large-gap">
                        <em>贴标签：</em>
                        <Select
                            mode="tags"
                            style={{ width: '50%' }}
                            placeholder="选择/输入标签"
                            onChange={handleChange}
                        >
                            {tags.map((i) => {
                                return <Select.Option key={i.toString(36)}>{i.toString(36)}</Select.Option>
                            })}
                        </Select>
                    </div>
                    <div className="large-gap">
                        <em>购买价格：</em>
                        <InputNumber
                            min={0}
                            precision={2}
                            placeholder="0.00"
                        /> 元
                    </div>
                    <div className="large-gap">
                        <em>购书日期：</em>
                        <DatePicker onChange={onChange} placeholder={'2018-01-02'}/>
                    </div>
                    <div>
                        <RadioGroup options={['已有藏书', '想买']} onChange={this.onChange1} value={this.state.value1} />
                    </div>
                    <div>
                        <RadioGroup options={['已读', '想读']} onChange={this.onChange2} value={this.state.value2} />
                    </div>
                    <p><Checkbox value="a" defaultChecked={!isPrivate}>是否公开</Checkbox></p>
                </div>
                <div style={{textAlign: 'center'}}><Button type="primary">放入书库</Button></div>
            </div>
        )
    }
}
