import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import AWSAppSyncClient from "aws-appsync";
import { ApolloProvider} from "react-apollo";
// import { Rehydrated } from "aws-appsync-react";
import { getApolloContext } from 'react-apollo';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AppSyncConfig from "./aws-exports";

const Rehydrated = ({ children }) => {
    const { client } = useContext(getApolloContext());
    const [rehydrated, setState] = useState(false);
  
    useEffect(() => {
      if (client instanceof AWSAppSyncClient) {
        (async () => {
          await client.hydrated();
          setState(true);
        })();
      }
    }, [client]);
    return rehydrated ? <>{children}</> : null;
};

const client = new AWSAppSyncClient({
    url: AppSyncConfig.aws_appsync_graphqlEndpoint,
    region: AppSyncConfig.aws_appsync_region,
    auth: {
        type: AppSyncConfig.aws_appsync_authenticationType,
        apiKey: AppSyncConfig.aws_appsync_apiKey,
        // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previousl
    },
});

ReactDOM.render(
    <ApolloProvider client={client}>
            <Rehydrated client={client}>
                <App />
            </Rehydrated>
    </ApolloProvider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
