// toolbar
import React from 'react'
import { Row, Col, Icon } from 'antd'
import './index.scss'
import { browserHistory } from 'react-router'

export default class BookDetail extends React.Component {
    render() {
        let {
            logo,
            title,
            author,
            readDate,
            isbn,
            pos,
            type
        } = this.props
        return (
            <Row className="bookitem" type="flex" align="middle">
                <Col className="img-frame">
                    <img src={logo} />
                </Col>
                <Col className="desc">
                    {title ? <p className="desc-name">{title}</p> : null}
                    {author ? <p className="desc-author">作者: {author}</p> : null}
                    {readDate ? <p className="desc-date">完成阅读: {readDate}</p> : null}
                    {isbn ? <p className="desc-isbn">ISBN: {isbn}</p> : null}
                    {pos ? <p className="desc-pos">{pos}</p> : null}
                </Col>
                <Col className="opr">
                    {type === 'createBook' ? <Icon type="right" onClick={() => {
                        console.log('cick')
                        browserHistory.push('/createbook/' + isbn)
                    }}/> :
                        <div>
                            <p>加入藏书</p>
                            <p>加入想读</p>
                            <p>加入想买</p>
                            <p>加入已读</p>
                        </div>
                    }
                </Col>
            </Row>
        )
    }
}
