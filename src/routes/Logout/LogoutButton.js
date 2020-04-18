import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from "@material-ui/core/Button";
import * as actions from '../../actions';


class LogoutButton extends Component {
  constructor() {
    super();

    this.state = {
      isClearing: false,
    };
  }

  render() {

    // const { isClearing } = this.state;

    return (
      <div>
        <Button
          style={{backgroundColor:"white"}}
          size="small"
          onClick={e => {
            e.preventDefault();

            this.setState({ isClearing: true });

            this.props.clearAdminSecretState();

            this.setState({ isClearing: false });

            // this.props.history.push('/auth');
          }}
        >
           Logout
        </Button>
      </div>
    );
  }
}


export default connect(
    state => ({
      admin: state.admin
    }),
    actions
)(LogoutButton);