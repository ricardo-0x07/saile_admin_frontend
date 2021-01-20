import { LOGIN_ACTION, LOGOUT_ACTION, SET_USER, Endpoints, globalCookiePolicy, ADMIN_SECRET_HEADER_KEY } from './types'

// import requestAction from './requestAction';
import { push } from 'react-router-redux';
//Sample Login Function
export function login(payload) {
    return dispatch => {
        dispatch({ type: LOGIN_ACTION, payload: payload });
    }
}

//Sample Logout Function
export function logout() {
 return dispatch => dispatch({type: LOGOUT_ACTION});
}

export const setUser = payload => ({ type: SET_USER, payload });

export const verifyLogin = ({
    adminSecret,
    shouldPersist,
    successCallback,
    errorCallback,
    requestAction,
  }) => {
    const url = Endpoints.getSchema;
    const requestOptions = {
      credentials: globalCookiePolicy,
      method: 'POST',
      headers: {
        [ADMIN_SECRET_HEADER_KEY]: adminSecret,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        type: 'select',
        args: {
          table: {
            name: 'hdb_table',
            schema: 'hdb_catalog',
          },
          columns: ['table_schema'],
          where: { table_schema: 'public' },
          limit: 1,
        },
      }),
    };
  
    requestAction(url, requestOptions).then(
      () => {
        if (adminSecret) {
        //   if (globals.consoleMode !== CLI_CONSOLE_MODE) {
        //     // set admin secret to local storage
        //     if (shouldPersist) {
        //       saveAdminSecretState(adminSecret);
        //     }
  
        //     // set admin secret in globals
        //     globals.adminSecret = adminSecret;
        //   }
  
        //   // set data headers in redux
        //   dispatch({
        //     type: UPDATE_DATA_HEADERS,
        //     data: {
        //       'content-type': 'application/json',
        //       [ADMIN_SECRET_HEADER_KEY]: adminSecret,
        //     },
        //   });
            sessionStorage.setItem(ADMIN_SECRET_HEADER_KEY, adminSecret);
            sessionStorage.setItem('token', adminSecret);
        }
        if (successCallback) {
          successCallback();
        }
      },
      error => {
        errorCallback(error);
      }
    );
  };

export const clearAdminSecretState = () => {
  return dispatch => {
    sessionStorage.removeItem(ADMIN_SECRET_HEADER_KEY);
    sessionStorage.removeItem('token');
    dispatch(push('/auth'))
    dispatch(logout())
  }
};