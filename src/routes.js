import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import MyMusic from './containers/MyMusic';

const AppRoutes = () => (
  <Route path="/" component={App}>
    <IndexRoute component={MyMusic} />
  </Route>
);

export default AppRoutes;
