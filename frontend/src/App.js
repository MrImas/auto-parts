import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Products } from './Products/pages/Products';

import { MainNavigation } from './shared/components/MainNavigation';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path='/' exact>
            <Products />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
