import React from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { IconButton } from '@material-ui/core';

export const NavLinks = () => {
  return (
    <ul>
      <li>
        <NavLink to='/' exact>
          PRODUCTS
        </NavLink>
        <NavLink to='/' exact>
          SHOP
        </NavLink>
        <NavLink to='/products/new' exact>
          CREATE PRODUCT
        </NavLink>
        <NavLink to='/category' exact>
          CATEGORIES
        </NavLink>
        <NavLink to='/login' exact>
          LOGIN&REGISTER
        </NavLink>
        <NavLink to='/history' exact>
          HISTORY
        </NavLink>
        <NavLink to='/' exact>
          LOGOUT
        </NavLink>
        <NavLink to='/' exact>
          <IconButton>
            <ShoppingCartIcon />
          </IconButton>
        </NavLink>
      </li>
    </ul>
  );
};
