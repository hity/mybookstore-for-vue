// bookitem
import React from 'react'
import { Row, Col, Icon } from 'antd'
import './index.scss'
export default class BookDetail extends React.Component {
    render() {
        console.log('detail', this.props)
        let {
            title,
            images: {
                large,
                medium,
                small
            },
            author,
            isbn,
            price,
            pubdate,
            translator,
            publisher,
            pages,
            binding
        } = this.props.book ? this.props.book : {}
        return (
            <Row className="book-detail" type="flex" align="middle">
                <Col className="img-frame">
                    <img src={medium} />
                </Col>
                <Col className="desc">
                    {title ? <p className="desc-name">{title}</p> : null}
                    <p>{author + ' / ' + translator + ' / ' + publisher + ' / ' + pages + '页 / ' + binding + ' / ' + price + ' / ' + pubdate}</p>
                </Col>
            </Row>
        )
    }
}
