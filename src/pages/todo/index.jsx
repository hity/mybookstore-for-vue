// todo index
import React from 'react'
import AddTodo from './addTodo.jsx'
import TodoList from './todoList.js'

export default class App extends React.Component {
    render() {
        return (
            <div className = "todos">
                <AddTodo />
                <TodoList />
            </div>
        )
    }
}
