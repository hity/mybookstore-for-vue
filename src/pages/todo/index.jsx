// todo index
import React from 'react'
import AddTodo from './addTodo'
import TodoList from './todoList'

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
