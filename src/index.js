import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import AWSAppSyncClient from "aws-appsync";
import { ApolloProvider} from "react-apollo";
import { getApolloContext } from 'react-apollo';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { client } from './graphql/apollo';


ReactDOM.render(
  <ApolloProvider client={client}>
    <App client={client}/>
  </ApolloProvider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
