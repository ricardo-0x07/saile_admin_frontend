import { LOGIN_ACTION, LOGOUT_ACTION } from '../actions/types'
const aminState = {  
  loggedIn: false,
  admin_secret: ''
} 
const aminReducer = (state = aminState, action) => {                          
switch(action.type) {     
 case LOGIN_ACTION:   
  return {   ...state, admin_secret: action.payload, loggedIn: true   }  
 case LOGOUT_ACTION:
  return aminState 
 default:    
  return state 
 }
} 
export default aminReducer