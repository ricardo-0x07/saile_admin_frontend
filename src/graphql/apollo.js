import { split } from 'apollo-link';
import ApolloClient from 'apollo-client';
// import ApolloClient from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import gql from 'graphql-tag';

const graphqlApiUri = 'http://localhost:8080/v1/graphql';
const graphqlApiUri_remote = 'https://saile-graph-api.net/v1/graphql';
const graphqlSocketUri = 'wss://saile-graph-api.net/v1/graphql';//'ws://localhost:8080/v1/graphql';


export const createClient = (secret) => {
  const hasuraReqHeaders = {
    'content-type': 'application/json',
    'x-hasura-admin-secret': secret
  };

  const httpLink = new HttpLink({
    uri: graphqlApiUri_remote, 
    headers: hasuraReqHeaders
  });

  const webSocketLink = new WebSocketLink({
    uri: graphqlSocketUri, 
    options: {
      reconnect: true,
      connectionParams: { headers: hasuraReqHeaders }
    }}
  );

  const link = split(
    ({ query }) => {
      const { kind, operation }: Definition = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    webSocketLink,
    httpLink
  );
  const typeDefs = gql`
    extend type Query {
      progress: Int!
    }

    extend type Mutation {
      updateProgress(progress: Int!): [Launch]
    }
  `;
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    link,
    cache,
    typeDefs,
    resolvers: {}
  });

  cache.writeData({
    data: {
      progress: null,
      progressMessage: 'Click the Aegis to initialise the app',
      visibilityFilter: 'SHOW_ALL',
      networkStatus: {
        __typename: 'NetworkStatus',
        isConnected: false,
      },
    },
  });
  return client;
}
// type Definition = { kind: string; operation?: string; };

// export type Client = typeof client;