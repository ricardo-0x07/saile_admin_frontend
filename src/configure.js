import { compose, createStore, applyMiddleware } from 'redux'
import { routerMiddleware, push } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Router, Route, browserHistory } from 'react-router'
// Apply the middleware to the store
const middlewarex = routerMiddleware(browserHistory)

import thunk from 'redux-thunk'
import rootReducer from './reducers';
const middleware = applyMiddleware(thunk)
const store = createStore(rootReducer, composeWithDevTools(middleware))
export default store;