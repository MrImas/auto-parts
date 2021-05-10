import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Categories } from './categories/pages/Categories';
import { CreateProduct } from './Products/pages/CreateProduct';
import { Products } from './Products/pages/Products';

import { MainNavigation } from './shared/components/Navigation/MainNavigation';

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
          <Route path='/products/new' exact>
            <CreateProduct />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
