import { LOGIN_ACTION, SET_USER, LOGOUT_ACTION } from '../actions/types'
const aminState = {  
  loggedIn: false,
  admin_secret: '',
  user: null
} 
const aminReducer = (state = aminState, action) => {                          
switch(action.type) {     
 case LOGIN_ACTION:   
  return {   ...state, admin_secret: action.payload.token, user: action.payload.user, loggedIn: true   }  
 case LOGOUT_ACTION:
  return aminState 
case SET_USER:
  return {
    ...state,
    user: action.payload
  };
default:    
  return state 
 }
} 
export default aminReducer