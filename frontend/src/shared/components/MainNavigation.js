import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import './MainNavigation.css';

const useStyles = makeStyles({
  toolbar: {
    justifyContent: 'space-between',
  },
});

export const MainNavigation = () => {
  const classes = useStyles();

  return (
    <AppBar position='fixed'>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h3'>Auto Parts</Typography>
        <nav>...</nav>
      </Toolbar>
    </AppBar>
  );
};
