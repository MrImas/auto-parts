import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { MainNavigation } from './shared/components/MainNavigation';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <Switch>
        <Route path='/' exact>
          <div>hello /</div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
