import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { IconButton, Typography } from '@material-ui/core';

import Button from '../FormElements/Button';
import CartContext from '../../context/cart-context';
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

export const NavLinks = () => {
  const auth = useContext(AuthContext);
  const [cart] = useContext(CartContext);
  return (
    <ul className='nav-links'>
      <li>
        <Typography variant='h6'>Hello {auth.userName}</Typography>
      </li>
      <li>
        {auth.isLoggedIn && (
          <NavLink to='/profile' exact>
            CHANGE PASSWORD
          </NavLink>
        )}
      </li>
      <li>
        <NavLink to='/' exact>
          SHOP
        </NavLink>
      </li>
      {auth.isLoggedIn && auth.isAdmin && (
        <li>
          <NavLink to='/products/new' exact>
            CREATE PRODUCT
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && auth.isAdmin && (
        <li>
          <NavLink to='/category' exact>
            CATEGORIES
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to='/auth' exact>
            LOGIN&REGISTER
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to='/history' exact>
            HISTORY
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <Button onClick={auth.logout}>LOGOUT</Button>
        </li>
      )}
      {!auth.isAdmin && (
        <li>
          <div className='cart-icon'>
            <span className='num-of-products'>{cart.length}</span>
            <NavLink to='/cart' exact>
              <IconButton>
                <ShoppingCartIcon />
              </IconButton>
            </NavLink>
          </div>
        </li>
      )}
    </ul>
  );
};
