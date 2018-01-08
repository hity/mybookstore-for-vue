// reducer.js
import { ADD_TODO, DEL_ITEM, SWITCH_STATUS, SET_FILTER_TYPE } from './actionTypes.js'

export default ({list, filterType} = {list: [], filterType: 'all'}, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                list: [{
                    id: action.id,
                    text: action.text,
                    completed: false
                }, ...list],
                filterType
            }
        case DEL_ITEM:
            return {
                list: list.filter((item) => {
                    return item.id != action.id
                }),
                filterType
            }
        case SWITCH_STATUS:
            return {
                list: list.map((item) => {
                    if (item.id == action.id) {
                        return {
                            ...item,
                            completed: !item.completed
                        }
                    } else {
                        return item
                    }
                }),
                filterType
            }
        case SET_FILTER_TYPE:
            return {
                list,
                filterType: action.filterType
            }
        default:
            return {
                list,
                filterType
            }
    }
}
