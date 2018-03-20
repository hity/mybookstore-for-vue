// toolbar
import React from 'react'
import { Menu, Dropdown, Icon, Row, Col } from 'antd'
import './index.scss'

const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
)

export default class SearchSelector extends React.Component {
    composeMenu(dataList) {
        let menu = ''
        if (dataList && dataList.length) {
            menu = (<Menu>
                {
                    dataList.map(i => {
                        return <Menu.Item key={i.name}>{i.name}</Menu.Item>
                    })
                }
            </Menu>)
        }
        return menu
    }
    render() {
        let {
            tag,
            pos,
            category
        } = this.props

        let tagMenu = this.composeMenu(tag.list)
        let posMenu = this.composeMenu(pos.list)
        let categoryMenu = this.composeMenu(category.list)
        return (
            <Row className="search-selector" type="flex" justify="space-between">
                {
                    categoryMenu ?
                        <Col>
                            <Dropdown overlay={categoryMenu} trigger={['click']}>
                                <a className="ant-dropdown-link" href="javascript:void(0);">
                                    分类<Icon type="down" />
                                </a>
                            </Dropdown>
                        </Col>
                        : ''
                }
                {
                    tagMenu ?
                        <Col>
                            <Dropdown overlay={tagMenu} trigger={['click']}>
                                <a className="ant-dropdown-link" href="javascript:void(0);">
                                    标签<Icon type="down" />
                                </a>
                            </Dropdown>
                        </Col>
                        : ''
                }
                {
                    posMenu ?
                        <Col>
                            <Dropdown overlay={posMenu} trigger={['click']}>
                                <a className="ant-dropdown-link" href="javascript:void(0);">
                                    书架<Icon type="down" />
                                </a>
                            </Dropdown>
                        </Col>
                        : ''
                }
                <Col>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href="javascript:void(0);">
                            购书日期<Icon type="down" />
                        </a>
                    </Dropdown>
                </Col>
                <Col>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href="javascript:void(0);">
                            完成日期<Icon type="down" />
                        </a>
                    </Dropdown>
                </Col>
            </Row>
        )
    }
}
