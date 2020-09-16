import {
  ApolloProvider,
  ApolloClient,
  createHttpLink
  //InMemoryCache
} from '@apollo/client';
import fetch from 'node-fetch';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Express from 'express';
import { StaticRouter } from 'react-router';
import React from 'react';
import App from './src/routes/App';
import { getDataFromTree } from '@apollo/client/react/ssr';
import OrderState from './src/context/orders/OrderState';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Html } from './server/Html';

const app = new Express();

app.use((req, res) => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4001',
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
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link: authLink.concat(httpLink),
    cache
  });

  // cache.writeData({
  //   data: {
  //     isSignedIn:
  //       typeof localStorage !== 'undefined' && !!localStorage.getItem('token')
  //   }
  // });

  const context = {};

  // The client-side App will instead use <BrowserRouter>
  const AppApollo = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <OrderState>
          <App />
        </OrderState>
      </StaticRouter>
    </ApolloProvider>
  );

  // rendering code (see below)
  // during request (see above)
  getDataFromTree(AppApollo).then(() => {
    // We are ready to render for real
    const content = renderToString(AppApollo);
    const initialState = client.extract();

    const html = <Html content={content} state={initialState} />;

    res.status(200);
    res.send(`<!doctype html>\n${renderToStaticMarkup(html)}`);
    res.end();
  });
});

const port = 3000;

app.listen(port, () =>
  console.log(
    // eslint-disable-line no-console
    `app Server is now running on http://localhost:${port}`
  )
);
