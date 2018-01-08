// action.js
import {
    ADD_TODO,
    SWITCH_STATUS,
    DEL_ITEM,
    SET_FILTER_TYPE
} from './actionTypes.js'

let nextId = 10
export const addTodo = (text) => ({
    type: ADD_TODO,
    id: nextId++,
    text
})

export const switchCompletedStatus = (id) => ({
    type: SWITCH_STATUS,
    id
})

export const delItem = (id) => ({
    type: DEL_ITEM,
    id
})

export const setFilterType = (filterType) => ({
    type: SET_FILTER_TYPE,
    filterType
})
