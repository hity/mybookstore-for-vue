// bookitem
import React from 'react'
import { Row, Col, Icon, Collapse, Select, Checkbox, InputNumber, DatePicker, Button, Radio } from 'antd'
import './index.scss'
import moment from 'moment'
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
        this.onPosChange = this.onPosChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = Object.assign(
            this.handleData(this.props)
        )
        console.log('state', this.state)
    }
    onSubmit() {

    }
    handleData({book = {}, categories = [], tag = [], pos = []}) {
        // 分类数据处理
        book && book.tags && book.tags.length && book.tags.forEach(i => categories.unshift(i.name))
        delete book.tags
        book.category = {
            list: categories,
            value: categories.length ? categories[0] : ''
        }

        // 标签
        book.tag = {
            list: tag,
            value: tag[0].name
        }

        // 位置
        book.pos = {
            list: pos,
            value: pos[0].name
        }

        // logo处理
        let {
            large,
            medium,
            small
        } = (book && book.images) || {}
        book.logo = medium
        delete book.images

        // 价格处理
        book.realPrice = isNaN(parseFloat(book.price)) ? 0 : parseFloat(book.price)

        book.stockState = book.isWantedToBuy ? '想买' : (book.isMine ? '已有藏书' : '其他')
        book.readState = book.isWantedToRead ? '想读' : (book.isRead ? '已读' : '其他')
        book.possessTime = new Date()
        book.isPrivate = Boolean(book.isPrivate)

        return book || {}
    }
    onChange1(e) {
        this.setState({
            value1: e.target.value
        })
    }

    onChange2(e) {
        this.setState({
            value2: e.target.value
        })
    }

    onPosChange(e) {
        console.log('e0', e)
    }

    onPriceChange(e) {
        console.log('price', e)
    }

    render() {
        console.log('here', this.state)
        let {
            title,
            author,
            translator,
            publisher,
            logo,
            pages,
            price,
            realPrice,
            pubdate,
            summary,
            category,
            pos,
            tag,
            possessTime,
            stockState,
            readState,
            isPrivate
        } = this.state
        let renderIntro = [author, translator, publisher, !pages ? '' : pages + '页', !price ? '' : price + '元', pubdate].filter(i => Boolean(i)).join(' / ')
        return (
            <div className="book-detail">
                <p className="book-detail-title">{title}</p>
                <div className="book-detail-info">
                    {renderIntro ?
                        <Row type="flex" align="middle">
                            <Col className="book-info__desc">
                                <p>
                                    {renderIntro}
                                </p>
                            </Col>
                            <Col className="img-frame">
                                <img src={logo} />
                            </Col>
                        </Row>
                        : '无介绍' }
                    {summary ? <Collapse bordered={false} defaultActiveKey={['1']}>
                        <Collapse.Panel header="内容简介">
                            <p>{summary}</p>
                        </Collapse.Panel>
                    </Collapse> : null}
                </div>
                <div className="book-detail-opr">
                    <div className="book-detail-catetory large-gap">
                        <em>分类：</em>
                        <Select
                            mode="combobox"
                            defaultValue={category.value}
                            placeholder="选择/输入分类"
                            style={{width: 200}}
                        >
                            {
                                category.list.map(i => {
                                    return <Select.Option key={i}>{i}</Select.Option>
                                })
                            }
                        </Select>
                    </div>

                    <div className="book-detail-pos large-gap">
                        <em>藏书位置：</em>
                        <Select
                            mode="combobox"
                            defaultValue={pos.value}
                            placeholder="选择/输入分类"
                            style={{width: 200}}
                        >
                            {
                                pos.list.map(i => {
                                    return <Select.Option key={i._id}>{i.name}</Select.Option>
                                })
                            }
                        </Select>
                    </div>

                    <div className="large-gap">
                        <em>标签：</em>
                        <Select
                            mode="tags"
                            style={{ width: '50%' }}
                            placeholder="选择/输入标签"
                            defaultValue={tag.value}
                            onChange={handleChange}
                        >
                            {tag.list.map((i) => {
                                return <Select.Option key={i._id}>{i.name}</Select.Option>
                            })}
                        </Select>
                    </div>
                    <div className="large-gap">
                        <em>购买价格：</em>
                        <InputNumber
                            min={0}
                            precision={2}
                            placeholder="0.00"
                            value={realPrice}
                            onChange={this.priceChange}
                        /> 元
                    </div>
                    <div className="large-gap">
                        <em>购书日期：</em>
                        <DatePicker onChange={onChange} defaultValue={moment(possessTime)} format="YYYY-MM-DD"/>
                    </div>
                    <div>
                        <RadioGroup options={['已有藏书', '想买', '其他']} onChange={this.onChange1} value={stockState} />
                    </div>
                    <div>
                        <RadioGroup options={['已读', '想读', '其他']} onChange={this.onChange2} value={readState} />
                    </div>
                    <p><Checkbox value="a" defaultChecked={!isPrivate}>是否公开</Checkbox></p>
                </div>
                <div style={{textAlign: 'center'}}><Button type="primary" onClick={this.submit}>放入书库</Button></div>
            </div>
        )
    }
}
