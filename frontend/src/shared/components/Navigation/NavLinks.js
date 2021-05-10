import React from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { IconButton } from '@material-ui/core';

import './NavLinks.css';

export const NavLinks = () => {
  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/' exact>
          PRODUCTS
        </NavLink>
      </li>
      <li>
        <NavLink to='/' exact>
          SHOP
        </NavLink>
      </li>
      <li>
        <NavLink to='/products/new' exact>
          CREATE PRODUCT
        </NavLink>
      </li>
      <li>
        <NavLink to='/category' exact>
          CATEGORIES
        </NavLink>
      </li>
      <li>
        <NavLink to='/login' exact>
          LOGIN&REGISTER
        </NavLink>
      </li>
      <li>
        <NavLink to='/history' exact>
          HISTORY
        </NavLink>
      </li>
      <li>
        <NavLink to='/' exact>
          LOGOUT
        </NavLink>
      </li>
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
