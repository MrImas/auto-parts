import React from 'react';
import CircularProgerss from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
  },
});

export const LoadingSpinner = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgerss
        thickness={props.thickness || 5}
        size={props.size || '5rem'}
        variant={props.variant || 'indeterminate'}
      />
    </div>
  );
};
