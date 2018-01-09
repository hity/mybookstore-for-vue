// action.js
import {
    FILTER_DOUBAN
} from './actionTypes.js'

export const filterDouban = (books) => ({
    type: FILTER_DOUBAN,
    books
})
