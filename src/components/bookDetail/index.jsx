// bookitem
import React from 'react'
import { Row, Col, Icon, Collapse, Select, Checkbox, InputNumber, DatePicker, Button, Radio } from 'antd'
import './index.scss'
import moment from 'moment'
import { addBook } from '../../api/index'
import { browserHistory } from 'react-router'
const RadioGroup = Radio.Group

export default class BookDetail extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.onChangeCategory = this.onChangeCategory.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangePos = this.onChangePos.bind(this)
        this.onChangeTag = this.onChangeTag.bind(this)
        this.onChangePrice = this.onChangePrice.bind(this)
        this.onChangePossessTime = this.onChangePossessTime.bind(this)
        this.onChangeStockState = this.onChangeStockState.bind(this)
        this.onChangeReadState = this.onChangeReadState.bind(this)
        this.onChangePrivate = this.onChangePrivate.bind(this)

        this.state = Object.assign(
            this.handleData(this.props)
        )
    }
    onSubmit() {
        let {
            title,
            category,
            tag,
            pos,
            stockState,
            readState,
            possessTime
        } = this.state

        let data = Object.assign({}, this.state, {
            name: title,
            category: category.value,
            tag: tag.value,
            pos: pos.value,
            isWantedToBuy: stockState === '想买',
            isMine: stockState === '藏书',
            isWantedToRead: readState === '想读',
            isRead: readState === '已读',
            possessTime: new Date(possessTime).toLocaleDateString()
        })
        delete data.stockState
        delete data.readState
        delete data.price
        delete data.summary
        delete data.binding

        addBook(data).then(({success}) => {
            success && browserHistory.push('/home')
        })
    }
    handleData({book = {}, categories = [{}], tag = [{}], pos = [{}]}) {
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
            value: tag.length ? tag[0].name : []
        }

        // 位置
        book.pos = {
            list: pos,
            value: pos.length ? pos[0].name : ''
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
    onChangeCategory(e) {
        let category = Object.assign(this.state.category, {
            value: e
        })
        this.setState({
            category
        })
    }
    onChangePos(e) {
        let pos = Object.assign(this.state.pos, {
            value: e
        })
        this.setState({
            pos
        })
    }
    onChangeTag(e) {
        let tag = Object.assign(this.state.tag, {
            value: e
        })
        this.setState({
            tag
        })
    }
    onChangePrice(e) {
        this.setState({
            realPrice: e
        })
    }
    onChangePossessTime(e) {
        this.setState({
            possessTime: new Date(e).toLocaleDateString()
        })
    }
    onChangeStockState(e) {
        this.setState({
            stockState: e.target.value
        })
    }
    onChangeReadState(e) {
        this.setState({
            readState: e.target.value
        })
    }
    onChangePrivate(e) {
        this.setState({
            isPrivate: e.target.checked
        })
    }
    render() {
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
                            onChange={this.onChangeCategory}
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
                            onChange={this.onChangePos}
                        >
                            {
                                pos.list.map(i => {
                                    return <Select.Option key={!i.name ? i : i.name}>{!i.name ? '' : i.name}</Select.Option>
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
                            onChange={this.onChangeTag}
                        >
                            {tag.list.map((i) => {
                                return <Select.Option key={!i.name ? i : i.name}>{!i.name ? '' : i.name}</Select.Option>
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
                            onChange={this.onChangePrice}
                        /> 元
                    </div>
                    <div className="large-gap">
                        <em>购书日期：</em>
                        <DatePicker onChange={this.onChangePossessTime} defaultValue={moment(possessTime)} format="YYYY/MM/DD"/>
                    </div>
                    <div>
                        <RadioGroup options={['已有藏书', '想买', '其他']} onChange={this.onChangeStockState} value={stockState} />
                    </div>
                    <div>
                        <RadioGroup options={['已读', '想读', '其他']} onChange={this.onChangeReadState} value={readState} />
                    </div>
                    <p><Checkbox value="a" defaultChecked={!isPrivate} onChange={this.onChangePrivate}>是否公开</Checkbox></p>
                </div>
                <div style={{textAlign: 'center'}}><Button type="primary" onClick={this.onSubmit}>放入书库</Button></div>
            </div>
        )
    }
}
