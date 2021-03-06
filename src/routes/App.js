import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from '../containers/Signin';
import SignUp from '../containers/SignUp';
import Home from '../containers/Home';

import '../styles/tailwind.css';
import { IS_SIGNED_IN } from '../apollo/queries/isSignedIn';
import { GET_USER } from '../apollo/queries/getUser';
import { useQuery } from '@apollo/client';
import Orders from '../containers/Order/Orders';
import Products from '../containers/Product/Products';
import NewOrder from '../containers/Order/NewOrder';
import NewCustomer from '../containers/Customer/NewCustomer';
import BestSellers from '../containers/BestSellers';
import BestCustomers from '../containers/BestCustomers';
import EditCustomer from '../containers/Customer/EditCustomer';
import EditProduct from '../containers/Product/EditProduct';
import NewProduct from '../containers/Product/NewProduct';

const App = () => {
  const {
    data: { isSignedIn }
  } = useQuery(IS_SIGNED_IN);

  return (
    <Switch>
      <Route exact path="/signIn" component={SignIn} />
      <Route exact path="/signUp" component={SignUp} />

      <Route exact path="/" component={isSignedIn ? Home : SignIn} />
      <Route
        exact
        path="/products"
        component={isSignedIn ? Products : SignIn}
      />
      <Route
        exact
        path="/new-product"
        component={isSignedIn ? NewProduct : SignIn}
      />
      <Route
        exact
        path="/edit-product/:id"
        component={isSignedIn ? EditProduct : SignIn}
      />
      <Route exact path="/orders" component={isSignedIn ? Orders : SignIn} />
      <Route
        exact
        path="/new-order"
        component={isSignedIn ? NewOrder : SignIn}
      />
      <Route
        exact
        path="/new-customer"
        component={isSignedIn ? NewCustomer : SignIn}
      />
      <Route
        exact
        path="/edit-customer/:id"
        component={isSignedIn ? EditCustomer : SignIn}
      />
      <Route
        exact
        path="/best-sellers"
        component={isSignedIn ? BestSellers : SignIn}
      />
      <Route
        exact
        path="/best-customers"
        component={isSignedIn ? BestCustomers : SignIn}
      />
    </Switch>
  );
};

export default App;
