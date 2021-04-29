import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Categories } from './categories/pages/Categories';
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
          <Route path='/category' exact>
            <Categories />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
