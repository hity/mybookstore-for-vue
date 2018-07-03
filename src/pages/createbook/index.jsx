// todo index
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Searchbar from 'src/components/searchbar/index'
import Bookitem from 'src/components/bookitem/index'
import { List } from 'antd'
import './index.scss'
import { crosJsonp } from 'src/libs/utils'
import { filterDouban } from './redux/action'

class CreateBook extends Component {
    render() {
        return (
            <div className = "create-book">
                <Searchbar searchCb={this.props.searchCb}/>
                <List className="booklist" itemLayout="horizontal" dataSource={this.props.booklist}
                    renderItem={item => (
                        <List.Item>
                            <Bookitem type='createBook' logo={item.images.medium} isbn={item.isbn} author={item.author} title={item.title}/>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

CreateBook.PropTypes = {
    booklist: PropTypes.array.isRequired,
    searchCb: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        booklist: state.createbook.books
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchCb: (value) => {
            crosJsonp('https://api.douban.com/v2/book/search?q=' + value, (data) => {
                if (data) {
                    dispatch(filterDouban(data && data.books))
                }
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBook)
