import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import { ErrorModal } from '../../shared/components/UIElements/ErrorModal';
import { LoadingSpinner } from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

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
    height: '30rem',
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

export const ProductView = () => {
  const classes = useStyles();
  const productId = useParams().productId;
  const [isLoading, error, sendHttpRequest, clearError] = useHttpClient();
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const responseData = await sendHttpRequest(
          `http://localhost:5000/api/products/${productId}`
        );
        setProduct(responseData.product);
      } catch (err) {}
    };
    fetchProduct();
  }, [sendHttpRequest, productId]);

  return (
    <>
      {error && <ErrorModal error={error} clearError={clearError} />}
      <div>
        {isLoading && <LoadingSpinner />}
        {product && (
          <Card className={classes.root}>
            <CardMedia
              component='img'
              className={classes.image}
              image={`http://localhost:5000/${product.image}`}
              title={product.title}
            />
            <CardContent className={classes.details}>
              <Typography
                className={classes.header}
                variant='h3'
                component='h3'
              >
                {product.title}
              </Typography>
              <Typography
                className={[classes.price, classes.header].join(' ')}
                variant='h5'
                component='h5'
              >
                $ {product.price}
              </Typography>
              <Typography variant='subtitle1' component='p'>
                {product.description}
              </Typography>
              <br />
              <Typography variant='body1' component='p'>
                {product.content}
              </Typography>
              <Button
                style={{
                  disply: 'inline-block',
                  width: '30%',
                  marginTop: '4rem',
                }}
              >
                BUY NOW
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};
