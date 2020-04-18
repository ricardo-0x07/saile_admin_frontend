import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension'
import { logger } from 'redux-logger';

const browserHistory = createBrowserHistory();
// Create an enhanced history that syncs navigation events with the store

// Apply the middleware to the store
const react_router_redux_middleware = routerMiddleware(browserHistory)


const middleware = applyMiddleware(thunk, logger, react_router_redux_middleware)
const store = createStore(
  rootReducer,
  composeWithDevTools(middleware)
)
const history = syncHistoryWithStore(browserHistory, store)

const Root = ({ store }) => (
  <Provider store={store} >
     <App history={history}/>
  </Provider>
)

ReactDOM.render(
    <Root store={store} />
  , document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
