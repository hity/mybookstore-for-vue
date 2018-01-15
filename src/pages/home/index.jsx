// todo index
import React from 'react'
import Searchbar from 'src/components/searchbar/index'
import SearchSelector from 'src/components/searchSelector/index'
import Bookitem from 'src/components/bookitem/index'
import { List } from 'antd'
import './index.scss'

export default class Home extends React.Component {
    render() {
        return (
            <div id = "home">
                <Searchbar />
                <SearchSelector />
                <List className="booklist" itemLayout="horizontal" dataSource={[1, 2, 3]}
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
