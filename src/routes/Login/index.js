import React, { useState } from 'react';
import {Helmet} from 'react-helmet';
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import { verifyLogin } from '../../actions';
import * as actions from '../../actions';

import background from './SS.png';
const styles = require('./Login.scss');
// const logo = require('./Sailebot.png');

const Login = ({ admin, dispatch, requestAction, login, ...props}) => {
  // request state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // should persist admin secret
  const [shouldPersist, setShouldPersist] = useState(true);

  // input handler
  const [adminSecretInput, setAdminSecretInput] = useState('');

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
      } else if (error) {
        loginText = 'Error. Try again?';
      }

      return loginText;
    };

    const toggleShouldPersist = () => setShouldPersist(!shouldPersist);

    const onAdminSecretChange = e => setAdminSecretInput(e.target.value);

    // form submit handler
    const onSubmit = e => {
        e.preventDefault();

        const successCallback = () => {
            setLoading(false);
            setError(null);
            login(adminSecretInput)
            props.history.push('/app');
        };

        const errorCallback = err => {
            setAdminSecretInput('');
            setLoading(false);
            setError(err);
        };
        if (adminSecretInput) {
            setLoading(false);
            setError(null);
        } else {
            setLoading(false);
            setError('adminSecretInput err');
        }
        

      setLoading(true);

        verifyLogin({
            adminSecret: adminSecretInput,
            shouldPersist,
            successCallback,
            errorCallback,
            requestAction
        });
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
              onChange={onAdminSecretChange}
                className={styles.form_input + ' form-control'}
              type="password"
              placeholder={'Enter admin-secret'}
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

  // const getCLIAdminSecretErrorMessage = () => {
  //   const adminSecret = "getAdminSecret()";

  //   const missingAdminSecretMessage = (
  //     <span>
  //       Seems like your Hasura GraphQL engine instance has an admin-secret
  //       configured.
  //       <br />
  //       Run console with the admin-secret using:
  //       <br />
  //       <br />
  //       hasura console --admin-secret=&lt;your-admin-secret&gt;
  //     </span>
  //   );

  //   const invalidAdminSecretMessage = (
  //     <span>Invalid admin-secret passed from CLI</span>
  //   );

  //   return (
  //     <div
  //       className={styles.text_center}
  //     >
  //       {adminSecret ? invalidAdminSecretMessage : missingAdminSecretMessage}
  //     </div>
  //   );
  // };

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
            { getLoginForm() }
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