// addTodo.jsx
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { switchCompletedStatus, delItem, setFilterType } from './redux/action.js'

const TodoList = ({
    todos,
    onSwitchCompletedStatus,
    onDelItem,
    filterType,
    switchFilter
}) => {
    return (
        <div>
            <ul>
                {
                    todos.map((item) => (
                        <li key={item.id}>
                            <input type="radio" checked={item.completed ? 'checked' : ''} onClick={onSwitchCompletedStatus(item.id)} readOnly/>
                            <span>{item.text}</span>
                            <span onClick={onDelItem(item.id)}> 删除</span>
                        </li>
                    ))
                }
            </ul>
            <ul>
                <li onClick={switchFilter('all')} className={filterType === 'all' ? 'active' : ''}>all</li>
                <li onClick={switchFilter('completed')} className={filterType === 'completed' ? 'active' : ''}>completed</li>
                <li onClick={switchFilter('uncompleted')} className={filterType === 'uncompleted' ? 'active' : ''}>uncompleted</li>
            </ul>
        </div>
    )
}

TodoList.PropTypes = {
    todos: PropTypes.array.isRequired,
    onSwitchCompletedStatus: PropTypes.func.isRequired,
    onDelItem: PropTypes.func.isRequired,
    filterType: PropTypes.string.isRequired,
    switchFilter: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        todos: (({list, filterType}) => {
            return list.filter((item) => {
                if (filterType == 'completed') {
                    return item.completed
                } else if (filterType == 'uncompleted') {
                    return !item.completed
                } else {
                    return item
                }
            })
        })(state.todos),
        filterType: state.todos.filterType
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSwitchCompletedStatus: (id) => {
            return () => {
                dispatch(switchCompletedStatus(id))
            }
        },
        onDelItem: (id) => {
            return () => {
                dispatch(delItem(id))
            }
        },
        switchFilter: (filterType) => {
            return () => {
                dispatch(setFilterType(filterType))
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
