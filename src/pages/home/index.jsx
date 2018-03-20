// todo index
import React from 'react'
import Searchbar from 'src/components/searchbar/index'
import SearchSelector from 'src/components/searchSelector/index'
import Bookitem from 'src/components/bookitem/index'
import { List } from 'antd'
import { getBook, getTag, getPos, getCategory } from '../../api'
import './index.scss'

export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            book: {},
            tag: {},
            category: {},
            pos: {}
        }
        this.init()
    }
    init() {
        this.getBook({})
        this.getTag({})
        this.getPos({})
        this.getCategory({})
    }
    getBook(query) {
        getBook(query).then(({success, rst}) => {
            console.log('book', rst)
            if (success) {
                this.setState({
                    book: rst
                })
            }
        })
    }
    getTag(query) {
        getTag(query).then(({success, rst}) => {
            console.log('tag', rst)
            if (success) {
                this.setState({
                    tag: rst
                })
            }
        })
    }
    getPos(query) {
        getPos(query).then(({success, rst}) => {
            console.log('pos', rst)
            if (success) {
                this.setState({
                    pos: rst
                })
            }
        })
    }
    getCategory(query) {
        getCategory(query).then(({success, rst}) => {
            console.log('category', rst)
            if (success) {
                this.setState({
                    category: rst
                })
            }
        })
    }
    render() {
        return (
            <div id = "home">
                <Searchbar />
                <SearchSelector tag={this.state.tag} pos={this.state.pos} category={this.state.category}/>
                <List className="booklist" itemLayout="horizontal" dataSource={this.state.book.list}
                    renderItem={item => (
                        <List.Item>
                            <Bookitem type='home' logo={item.logo} isbn={item.isbn} author={item.author} title={item.name} />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}
