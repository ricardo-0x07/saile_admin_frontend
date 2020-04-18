import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import adminReducer from './admin' 

const rootReducer = combineReducers({  
   admin: adminReducer,
   routing: routerReducer
}) 
export default rootReducer