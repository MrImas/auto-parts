import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@material-ui/core';

import './ProductItem.css';

const useStyles = makeStyles({
  cardActionsContainer: {
    justifyContent: 'space-between',
  },
  actionButton: {
    padding: '8px 45px',
  },
});

export const ProductItem = (props) => {
  const classes = useStyles();
  return (
    <li className='product-item'>
      <Card>
        <CardActionArea>
          <CardMedia
            style={{ height: '140px', width: '100px' }}
            image={props.image}
            title={props.title}
          />
        </CardActionArea>
        <CardContent>
          <Typography variant='h4'>{props.title}</Typography>
          <Typography variant='h6'>${props.price}</Typography>
          <Typography variant='body1'>{props.description}</Typography>
        </CardContent>
        <CardActions className={classes.cardActionsContainer}>
          <Button variant='contained' size='large' color='primary'>
            BUY
          </Button>
          <Button variant='contained' size='large' color='secondary'>
            VIEW
          </Button>
        </CardActions>
      </Card>
    </li>
  );
};
