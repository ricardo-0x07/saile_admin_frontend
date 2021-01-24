import React, { useState, useEffect } from 'react';
import { useAsync } from 'react-async';
import {Helmet} from 'react-helmet';
import Button from "@material-ui/core/Button";
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
// import { verifyLogin } from '../../actions';
import * as actions from '../../actions';
import { getJWTAuth } from '../../utils/rest_api'
// import Alert from '@material-ui/lab/Alert';


import background from './SS.png';
const styles = require('./Login.scss');
// const logo = require('./Sailebot.png');

const Login = ({ admin, dispatch, requestAction, login, ...props}) => {
  // request state
  const [loading, setLoading] = useState(false);
  const [old_error, setError] = useState(null);

  // should persist admin secret
  const [shouldPersist, setShouldPersist] = useState(true);

  // input handler
  // const [adminSecretInput, setAdminSecretInput] = useState('');
  // const [adminEmailInput, setAdminEmailInput] = useState('');
  const { data, error, isPending, run } = useAsync({ deferFn: getJWTAuth });
  console.log("error: ", error)
  console.log("isPending: ", isPending)

  const [credentials, updateCredentials] = useState({
    email: '',
    password: ''
  });
  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: { pathname: '/app/companies' } };

  useEffect(() => {
    if (data) login(data);
  }, [dispatch, data, login]);

  useEffect(() => {
    if (admin.loggedIn) history.replace(from);
  }, [admin, from, history]);

  const authenticate = () => {
    run({entity: credentials});
  };

  const handleFormChange = event => {
    updateCredentials({
      ...credentials,
      [event.target.type]: event.target.value
    });
  };



  const getLoginForm = () => {
    const getLoginButtonText = () => {
      // login button text
      let loginText = 'Enter';
      if (loading) {
        loginText = (
          <span>
            Verifying...
            <i className="fa fa-spinner fa-spin" aria-hidden="true" />
          </span>
        );
      } else if (old_error) {
        loginText = 'Error. Try again?';
      }

      return loginText;
    };

    const toggleShouldPersist = () => setShouldPersist(!shouldPersist);

    // const onAdminSecretChange = e => setAdminSecretInput(e.target.value);
    // const onAdminEmailChange = e => setAdminEmailInput(e.target.value);

    // form submit handler
    const onSubmit = e => {
        e.preventDefault();

        // const successCallback = () => {
        //     setLoading(false);
        //     setError(null);
        //     login({token: adminSecretInput, user: {}})
        //     props.history.push('/app');
        // };

        // const errorCallback = err => {
        //     setAdminSecretInput('');
        //     setLoading(false);
        //     setError(err);
        // };

        // if (adminSecretInput) {
        //     setLoading(false);
        //     setError(null);
        // } else {
        //     setLoading(false);
        //     setError('adminSecretInput err');
        // }
        

      setLoading(true);

      setLoading(false);
      setError(null);
      authenticate()
      // login({token: adminSecretInput, user: {}})
      // props.history.push('/app');
        // verifyLogin({
        //     adminSecret: adminSecretInput,
        //     shouldPersist,
        //     successCallback,
        //     errorCallback,
        //     requestAction
        // });
    };

    return (
      <form className="form-horizontal" onSubmit={onSubmit} >
        <div
            className={styles.input_addon_group + ' ' + styles.padd_top}
        >
            <div 
                className={'input-group ' + styles.input_group}
            >
              <input
                onChange={handleFormChange}
                  className={styles.form_input + ' form-control'}
                type="email"
                placeholder={'Enter email'}
                name="email"
              />
            </div>
            <div 
                className={'input-group ' + styles.input_group}
            >
            <input
              onChange={handleFormChange}
                className={styles.form_input + ' form-control'}
              type="password"
              placeholder={'Enter password'}
              name="password"
            />
          </div>
        </div>
        <div 
            className={styles.login_btn}
        >
          <Button
            type="submit"
            // color="green"
            className="form-control"
            disabled={loading}
          >
            {getLoginButtonText()}
          </Button>
        </div>
        <div 
            className={styles.add_pad_left}
        >
          <label 
            className={`${styles.cursorPointer}`}
          >
            <input
              type="checkbox"
              checked={shouldPersist}
              onChange={toggleShouldPersist}
              className={`${styles.add_mar_right_small} ${styles.remove_margin_top} ${styles.cursorPointer}`}
            />
            Remember in this browser
          </label>
        </div>
      </form>
    );
  };


  return (
    <div
        className={styles.mainWrapper + ' container-fluid'}
        // style={{ backgroundImage: `url(${require("./SS.png")})`}}
        style={{ backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}
    >
      <div
        className={styles.container + ' containerx'}
        id="login"
      >
        <div
            className={styles.loginCenter}
        >
          <Helmet title={'Login | Sailestack'} />
          <div style={{ width: '100%', height: 'auto', paddingBottom: '20px', display: 'flex', alignItemsm:'center', flexDirection:'column'}}>
            {/* <img alt='logo' src={logo} style={{ width: '100px', height: 'auto' }}/>
            <h2>Admin</h2> */}
          </div>
          <div
            className={styles.loginWrapper}
          >
            { 
              getLoginForm()

              // <main
              //   className={'sign-in sign-in--container'}
              //   style={{
              //     backgroundPosition: 'center',
              //     backgroundRepeat: 'no-repeat',
              //     backgroundSize: 'cover',
              //     width: '100vw',
              //     height: '100vh'
              //   }}
              // >
              //   <Box className={'sign-in--form sign-in--form__container'}>
              //     <img
              //       className={'sign-in--form__logo'}
              //       src="/Sailebot.png"
              //       alt="Sailebot logo"
              //     />
              //     {error && (
              //       <Alert className="form-alert" severity="error">
              //         Please check your credentials
              //       </Alert>
              //     )}
              //     <form>
              //       <div>
              //         <TextField
              //           required
              //           id="sign-in-email"
              //           label="email"
              //           type="email"
              //           variant="outlined"
              //           error={Boolean(error)}
              //           onChange={event => handleFormChange(event)}
              //           value={credentials.email}
              //         />
              //       </div>
              //       <div>
              //         <TextField
              //           required
              //           id="sign-in-password"
              //           label="password"
              //           type="password"
              //           variant="outlined"
              //           error={Boolean(error)}
              //           onChange={event => handleFormChange(event)}
              //           value={credentials.password}
              //         />
              //       </div>
              //     </form>
              //     <Button
              //       className="sign-in--form__submit"
              //       type="button"
              //       color="primary"
              //       variant="contained"
              //       onClick={authenticate}
              //       disabled={isPending || !credentials.email || !credentials.password}
              //     >
              //       Sign In
              //     </Button>
              //   </Box>
              // </main>
        
            }
          </div>
        </div>
      </div>
    </div>
  );
};

// const generatedLoginConnector = connect => {
//   return connect()(Login);
// };

// export default generatedLoginConnector;

export default connect(
    state => ({
      admin: state.admin,
      routing: state.routing
    }),
    actions
)(Login);