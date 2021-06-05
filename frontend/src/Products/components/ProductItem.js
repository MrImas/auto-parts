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

import { AuthContext } from '../../shared/context/auth-context';
import Button from '../../shared/components/FormElements/Button';

const useStyles = makeStyles({
  root: {
    height: '500px',
    maxWidth: '320px',
  },
  cardActionsContainer: {
    justifyContent: 'space-between',
  },
  cardContentContainer: {
    height: '190px',
  },
  actionButton: {
    // padding: '8px 45px',
    width: '40%',
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
  return (
    <li>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component='img'
            className={classes.image}
            image={`http://localhost:5000/${props.image}`}
            title={props.title}
          />
        </CardActionArea>
        <CardContent className={classes.cardContentContainer}>
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
                : () => props.addToCart(props.id)
            }
          >
            {auth.isAdmin ? 'DELETE' : 'BUY'}
          </Button>
        </CardActions>
      </Card>
    </li>
  );
};
