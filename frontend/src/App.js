import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { CartProvider } from './shared/context/cart-context';
import { AuthContext } from './shared/context/auth-context';
import { Categories } from './categories/pages/Categories';
import { CreateProduct } from './Products/pages/CreateProduct';
import { Products } from './Products/pages/Products';
import { UpdateProduct } from './Products/pages/UpdateProduct';
import { MainNavigation } from './shared/components/Navigation/MainNavigation';
import { Auth } from './users/pages/Auth';
import { useAuth } from './shared/hooks/auth-hook';
import { ProductView } from './Products/pages/ProductView';
import { Cart } from './cart/pages/Cart';

const App = () => {
  const [isLoggedIn, isAdmin, userId, token, login, logout] = useAuth();
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
          {isAdmin ? <UpdateProduct /> : <ProductView />}
        </Route>
        <Route path='/cart' exact>
          <Cart />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        userId,
        token,
        login,
        logout,
      }}
    >
      <CartProvider token={token}>
        <Router>
          <MainNavigation />
          <main>{routes}</main>
        </Router>
      </CartProvider>
    </AuthContext.Provider>
  );
};

export default App;
