import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from './containers/Signin';
import SignUp from './containers/SignUp';
import Home from './containers/Home';

import './styles/tailwind.css';

const App = () => {
  return (
    <Switch>
      <Route exact path="/signIn" component={SignIn} />
      <Route exact path="/signUp" component={SignUp} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default App;
