import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { CartProvider } from './shared/context/cart-context';
import { AuthContext } from './shared/context/auth-context';
import { MainNavigation } from './shared/components/Navigation/MainNavigation';
import { useAuth } from './shared/hooks/auth-hook';
import { LoadingSpinner } from './shared/components/UIElements/LoadingSpinner';
import { Categories } from './categories/pages/Categories';
import { CreateProduct } from './Products/pages/CreateProduct';
import { Products } from './Products/pages/Products';
import { UpdateProduct } from './Products/pages/UpdateProduct';
import { Auth } from './users/pages/Auth';
import { ProductView } from './Products/pages/ProductView';
import { Cart } from './cart/pages/Cart';
import { History } from './orders/pages/History';
import { PaymentsApproval } from './orders/pages/PaymentsApproval';
import { ChangePassword } from './users/components/ChangePassword';
import { Home } from './main/pages/Home';

const App = () => {
  const [isLoggedIn, isAdmin, userId, token, login, logout, userName] =
    useAuth();
  let routes;

  if (!isLoggedIn) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/shop' exact>
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
          <Home />
        </Route>
        <Route path='/shop' exact>
          <Products />
        </Route>
        <Route path='/profile' exact>
          <ChangePassword />
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
        <Route path='/history' exact>
          {isAdmin ? <PaymentsApproval /> : <History />}
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
        userName,
      }}
    >
      <CartProvider token={token}>
        <Router>
          <MainNavigation />
          <main>
            <Suspense fallback={<LoadingSpinner />}>{routes}</Suspense>
          </main>
        </Router>
      </CartProvider>
    </AuthContext.Provider>
  );
};

export default App;
