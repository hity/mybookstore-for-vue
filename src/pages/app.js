// toolbar
import React from 'react'
import Toolbar from 'src/components/toolbar/index'
import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout

export default class App extends React.Component {
    render() {
        return (
            <Layout>
                <Content>{this.props.children}</Content>
                <Footer><Toolbar></Toolbar></Footer>
            </Layout>
        )
    }
}
