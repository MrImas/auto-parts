import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { Categories } from './categories/pages/Categories';
import { CreateProduct } from './Products/pages/CreateProduct';
import { Products } from './Products/pages/Products';
import { UpdateProduct } from './Products/pages/UpdateProduct';
import { MainNavigation } from './shared/components/Navigation/MainNavigation';
import { Auth } from './users/pages/Auth';

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
          <Route path='/products/:productId' exact>
            <UpdateProduct />
          </Route>
          <Route path='/auth' exact>
            <Auth />
          </Route>
          <Redirect to='/' />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
