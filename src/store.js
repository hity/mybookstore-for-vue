// store.js
import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
} from 'redux'

import createbookReducer from './pages/createbook/redux/reducer'

const win = window

const reducer = combineReducers({
    createbook: createbookReducer
})

const middlewares = []

if (process.env.NODE_ENV !== 'production') {
    const Perf = require('react-addons-perf')
    win.Perf = Perf

    middlewares.push(require('redux-immutable-state-invariant').default())
}

const storeEnhancers = compose(
    applyMiddleware(...middlewares),
    (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f
)

export default createStore(reducer, {}, storeEnhancers)
