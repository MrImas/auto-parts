import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import { NavLinks } from './NavLinks';
import { AuthContext } from '../../context/auth-context';

const useStyles = makeStyles({
  toolbar: {
    justifyContent: 'space-between',
  },
});

export const MainNavigation = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  return (
    <AppBar position='fixed'>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h3'>Auto Parts</Typography>
        <Typography variant='body1'>Hello {auth.userName}</Typography>
        <nav>
          <NavLinks />
        </nav>
      </Toolbar>
    </AppBar>
  );
};
