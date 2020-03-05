import React, { useEffect, useReducer } from "react";
import Amplify from "@aws-amplify/core";
import { API, graphqlOperation } from "aws-amplify";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// import { createCampaign } from "./graphql/mutations";
// import { listCampaigns } from "./graphql/queries";
// import { onCreateCampaign, onUpdateCampaign } from "./graphql/subscriptions";

import config from "./aws-exports";
import Routes from './routes';



function App(props) {

  return (
    <div>
      <Paper style={{paddingTop: '5em', display: 'flex', flex: 1, height: '100vh'}} elevation={0}>
        <Routes />
      </Paper>
    </div>
  );
}

const styles = {
  root: {
    width: '100%',
    overflowX: 'visible',
  },
  table: {
    minWidth: 700,
  },
};

export default withStyles(styles)(App);