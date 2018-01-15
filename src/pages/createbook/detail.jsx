// detail
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import BookDetail from 'src/components/bookDetail/index'
import './detail.scss'

class Detail extends Component {
    render() {
        return (
            <div className = "detail">
                <BookDetail book={this.props.book}/>
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
