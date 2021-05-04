import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import './CategoryItem.css';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    maxWidth: '340px',
    justifyContent: 'space-between',
  },
});

export const CategoryItem = (props) => {
  const classes = useStyles();
  return (
    <li className='category-item'>
      <Card className={classes.root}>
        <CardContent>
          <Typography>{props.name}</Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => props.onDelete(props.name)}
            variant='contained'
            size='large'
            color='secondary'
          >
            DELETE
          </Button>
        </CardActions>
      </Card>
    </li>
  );
};
