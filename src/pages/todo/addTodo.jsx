// addTodo.jsx
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTodo } from './redux/action.js'

let value = ''

class AddTodo extends Component {
    constructor(props, context) {
        super(props, context)

        this.onClick = this.onClick.bind(this)
        this.onInputChange = this.onInputChange.bind(this)

        this.state = {
            value: ''
        }
    }
    mounting() {
        console.log('yes')
    }
    componentDidMount() {
        console.log('yep-1')
    }
    onClick(event) {
        event.preventDefault()

        let inputValue = this.state.value
        if (!inputValue.trim()) {
            return
        }

        this.props.onAdd(inputValue)
        this.setState({
            value: ''
        })
    }

    onInputChange(event) {
        this.setState({
            value: event.target.value
        })
    }

    render() {
        return (
            <div className="add-todo">
                <input className="new-todo" onChange = {this.onInputChange} value={this.state.value}/>
                <span className="add-btn" onClick = {this.onClick}>添加数据</span>
            </div>
        )
    }
}

AddTodo.PropTypes = {
    onAdd: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (text) => {
            dispatch(addTodo(text))
        }
    }
}

export default connect(null, mapDispatchToProps)(AddTodo)
