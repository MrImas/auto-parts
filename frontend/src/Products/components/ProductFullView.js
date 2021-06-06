import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';

import Button from '../../shared/components/FormElements/Button';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    position: 'relative',
  },
  image: {
    height: '200px',
    margin: 'auto',
    objectFit: 'contain',
  },
  header: {
    fontWeight: 'bold',
  },
  price: {
    color: '#0040BF',
  },
});

export const ProductFullView = (props) => {
  const classes = useStyles();
  const [disableCartButtons, setDisableCartButtons] = useState(false);
  const [qunatity, setQuantity] = useState(props.quantity || 1);
  const { id, image, title, price, description, content } = props.product;

  const increaseQuantityHandler = async () => {
    setDisableCartButtons(true);
    setQuantity((prevQunatity) => {
      return prevQunatity + 1;
    });
    await props.increaseQuantityHandler(id);
    setDisableCartButtons(false);
  };

  const decreaseQunatityHandler = async () => {
    setDisableCartButtons(true);
    setQuantity((prevQunatity) => {
      if (prevQunatity > 1) {
        return prevQunatity - 1;
      }
      return 1;
    });
    await props.decreaseQuantityHandler(id);
    setDisableCartButtons(false);
  };

  const deleteProductFromCartHandler = async () => {
    await props.removeProductFromCartHandler(id);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        component='img'
        className={classes.image}
        image={`http://localhost:5000/${image}`}
        title={props.title}
      />
      <CardContent className={classes.details}>
        {props.cartMode && (
          <IconButton
            className='close-img-btn'
            style={{ position: 'absolute' }}
            onClick={deleteProductFromCartHandler}
          >
            <CloseIcon color='secondary' />
          </IconButton>
        )}
        <Typography className={classes.header} variant='h3' component='h3'>
          {title}
        </Typography>
        <Typography
          className={[classes.price, classes.header].join(' ')}
          variant='h5'
          component='h5'
        >
          $ {price * qunatity}
        </Typography>
        <Typography variant='subtitle1' component='p'>
          {description}
        </Typography>
        <br />
        <Typography variant='body1' component='p'>
          {content}
        </Typography>
        {props.cartMode && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              disabled={disableCartButtons}
              onClick={decreaseQunatityHandler}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant='h6'>{qunatity}</Typography>
            <IconButton
              disabled={disableCartButtons}
              onClick={increaseQuantityHandler}
            >
              <AddIcon />
            </IconButton>
          </div>
        )}
        {props.buyButton && (
          <Button
            style={{
              disply: 'inline-block',
              width: '30%',
              marginTop: '4rem',
            }}
            onClick={() => props.onBuyClick(id)}
          >
            BUY NOW
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
