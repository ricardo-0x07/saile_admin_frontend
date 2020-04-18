import { combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import adminReducer from './admin' 

const rootReducer = combineReducers({  
   admin: adminReducer,
   routing: routerReducer
}) 
export default rootReducer