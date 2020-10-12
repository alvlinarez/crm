import { ApolloClient, createHttpLink } from '@apollo/client';
import fetch from 'node-fetch';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  //uri: 'http://localhost:4001',
  uri: 'https://alg-crm-server.herokuapp.com',
  fetch
});

const authLink = setContext((_, { headers }) => {
  // Read localstorage
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  connectToDevTools: true,
  cache,
  link: authLink.concat(httpLink)
});

cache.writeData({
  data: {
    isSignedIn: !!localStorage.getItem('token')
  }
});

export default client;
