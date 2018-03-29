// toolbar
import React from 'react'
import Toolbar from 'src/components/toolbar/index'

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div className="b-content">{this.props.children}</div>
                <div className="b-footer"><Toolbar></Toolbar></div>
            </div>
        )
    }
}
