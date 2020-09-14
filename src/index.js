import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import client from './config/apollo';
import OrderState from './context/orders/OrderState';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <OrderState>
        <App />
      </OrderState>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('app')
);
