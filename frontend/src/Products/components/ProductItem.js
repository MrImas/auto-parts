import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from '@material-ui/core';

import { CartContext } from '../../shared/context/cart-context';
import { AuthContext } from '../../shared/context/auth-context';
import Button from '../../shared/components/FormElements/Button';
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
  const auth = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  return (
    <li className='product-item'>
      <Card>
        <CardActionArea>
          <CardMedia
            component='img'
            className={classes.image}
            image={`http://localhost:5000/${props.image}`}
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
            to={`products/${props.id}`}
            size='large'
            color='primary'
          >
            {auth.isAdmin ? 'EDIT' : 'VIEW'}
          </Button>
          <Button
            className={classes.actionButton}
            variant='contained'
            size='large'
            color='secondary'
            onClick={
              auth.isAdmin
                ? () => props.onDelete(props.id)
                : () => cartContext.addToCart(props.id)
            }
          >
            {auth.isAdmin ? 'DELETE' : 'BUY'}
          </Button>
        </CardActions>
      </Card>
    </li>
  );
};
