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
                    book={Object.assign({}, this.props.book, {
                        isMine: true
                    })}
                    tag={[]}
                    pos={[]}
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
