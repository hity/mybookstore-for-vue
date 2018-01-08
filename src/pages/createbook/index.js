// todo index
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Searchbar from 'src/components/searchbar/index'
import Bookitem from 'src/components/bookitem/index'
import { List } from 'antd'
import './index.scss'
import { get } from 'src/api'

class CreateBook extends Component {
    render() {
        return (
            <div className = "create-book">
                <Searchbar searchCb={this.props.searchCb}/>
                <List className="booklist" itemLayout="horizontal" dataSource={this.props.booklist}
                    renderItem={item => (
                        <List.Item>
                            <Bookitem />
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
    return {
        booklist: [1, 2, 3]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchCb: (value) => {
            // console.log('here', value)
            get('https://api.douban.com/v2/book/search', {
                q: value
            }).then((data) => {
                console.log('here', data)
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBook)
