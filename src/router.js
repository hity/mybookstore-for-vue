// router.js
import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './pages/app'
const getTodoApp = (location, callback) => {
    require.ensure([], (require) => {
        document.title = 'todoList'
        callback(null, require('./pages/todo/index').default)
    }, 'todoList')
}

const getHomePage = (location, callback) => {
    require.ensure([], (require) => {
        document.title = '我的藏书'
        callback(null, require('./pages/home/index').default)
    }, 'home')
}

const getCreateBookPage = (location, callback) => {
    require.ensure([], (require) => {
        document.title = '录入书本'
        callback(null, require('./pages/createbook/index').default)
    }, 'createBook')
}

const getMsgboardPage = (location, callback) => {
    require.ensure([], (require) => {
        document.title = '留言板'
        callback(null, require('./pages/msgboard/index').default)
    }, 'msgboard')
}

const getPlanPage = (location, callback) => {
    require.ensure([], (require) => {
        document.title = '书本计划'
        callback(null, require('./pages/plan/index').default)
    }, 'plan')
}

const getTrendsPage = (location, callback) => {
    require.ensure([], (require) => {
        document.title = '动态'
        callback(null, require('./pages/trends/index').default)
    }, 'trends')
}

const Routes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute name="home" getComponent={getHomePage}/>
            <Route path="/home" name="home" getComponent={getHomePage}></Route>
            <Route path="/createbook" name="createBook" getComponent={getCreateBookPage}></Route>
            <Route path="/msgboard" name="msgboard" getComponent={getMsgboardPage}></Route>
            <Route path="/plan" name="plan" getComponent={getPlanPage}></Route>
            <Route path="/trends" name="trends" getComponent={getTrendsPage}></Route>
            <Route path="/todo" name="todoList" getComponent={getTodoApp}></Route>
        </Route>
    </Router>
)

export default Routes
