// detail
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import BookDetail from 'src/components/bookDetail/index'
import './detail.scss'

class Detail extends Component {
    render() {
        return (
            <div className = "detail">
                <BookDetail
                    book={this.props.book}
                    tag={[{name: '123', _id: '1'}, {name: '12fd3', _id: '2'}]}
                    pos={[{
                        _id: '3234', name: '书房 A面第二层'
                    }, {
                        _id: '4234', name: '客厅 第一层'
                    }]}
                    categories={[]}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        book: state.createbook.books.filter(book => {
            return book.isbn == ownProps.params.isbn
        })[0]
    }
}

export default connect(mapStateToProps, null)(Detail)
