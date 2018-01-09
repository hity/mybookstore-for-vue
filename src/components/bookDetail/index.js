// bookitem
import React from 'react'
import { Row, Col, Icon, Collapse, Select, Checkbox, InputNumber, DatePicker, Button } from 'antd'
import './index.scss'

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
    open() {

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
            isWantedToRead,
            isMine,
            isRead,
            isWantedToBuy,
            isPrivate
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
                <Row className="book-detail-info" type="flex" align="middle">
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
                    <p><Checkbox value="a" defaultChecked={isMine}>藏书</Checkbox></p>
                    <p><Checkbox value="d" defaultChecked={isRead}>已读</Checkbox></p>
                    <p><Checkbox value="b" defaultChecked={isWantedToBuy}>想买</Checkbox></p>
                    <p><Checkbox value="c" defaultChecked={isWantedToRead}>想读</Checkbox></p>
                    <p><Checkbox value="a" defaultChecked={!isPrivate}>是否公开</Checkbox></p>
                </div>
                <div style={{textAlign: 'center'}}><Button type="primary">放入书库</Button></div>
            </div>
        )
    }
}
