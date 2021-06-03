import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

import Button from '../../shared/components/FormElements/Button';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
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
  const { id, image, title, price, description, content } = props.product;

  return (
    <Card className={classes.root}>
      <CardMedia
        component='img'
        className={classes.image}
        image={`http://localhost:5000/${image}`}
        title={props.title}
      />
      <CardContent className={classes.details}>
        <Typography className={classes.header} variant='h3' component='h3'>
          {title}
        </Typography>
        <Typography
          className={[classes.price, classes.header].join(' ')}
          variant='h5'
          component='h5'
        >
          $ {price}
        </Typography>
        <Typography variant='subtitle1' component='p'>
          {description}
        </Typography>
        <br />
        <Typography variant='body1' component='p'>
          {content}
        </Typography>
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
