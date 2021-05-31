import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { IconButton } from '@material-ui/core';

import Button from '../FormElements/Button';
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

export const NavLinks = () => {
  const auth = useContext(AuthContext);
  return (
    <ul className='nav-links'>
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
      <li>
        <NavLink to='/' exact>
          <IconButton>
            <ShoppingCartIcon />
          </IconButton>
        </NavLink>
      </li>
    </ul>
  );
};
