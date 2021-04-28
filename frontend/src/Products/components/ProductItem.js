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
  image: {
    height: '250px',
    margin: 'auto',
    objectFit: 'contain',
  },
});

export const ProductItem = (props) => {
  const classes = useStyles();
  return (
    <li className='product-item'>
      <Card>
        <CardActionArea>
          <CardMedia
            className={classes.image}
            image={props.image}
            title={props.title}
          />
        </CardActionArea>
        <CardContent>
          <Typography variant='h4'>{props.title}</Typography>
          <Typography color='secondary' variant='h6'>
            ${props.price}
          </Typography>
          <Typography variant='body1'>{props.description}</Typography>
        </CardContent>
        <CardActions className={classes.cardActionsContainer}>
          <Button
            className={classes.actionButton}
            variant='contained'
            size='large'
            color='primary'
          >
            BUY
          </Button>
          <Button
            className={classes.actionButton}
            variant='contained'
            size='large'
            color='secondary'
          >
            VIEW
          </Button>
        </CardActions>
      </Card>
    </li>
  );
};
