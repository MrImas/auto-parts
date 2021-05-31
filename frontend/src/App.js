import React, { useCallback, useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { AuthContext } from './shared/context/auth-context';
import { Categories } from './categories/pages/Categories';
import { CreateProduct } from './Products/pages/CreateProduct';
import { Products } from './Products/pages/Products';
import { UpdateProduct } from './Products/pages/UpdateProduct';
import { MainNavigation } from './shared/components/Navigation/MainNavigation';
import { Auth } from './users/pages/Auth';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();

  const login = useCallback((token) => {
    setIsLoggedIn(true);
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setToken(false);
  }, []);

  let routes;

  if (!isLoggedIn) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Products />
        </Route>
        <Route path='/auth' exact>
          <Auth />
        </Route>
        <Redirect to='/auth' />
      </Switch>
    );
  } else {
    routes = (
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
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        login,
        logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
