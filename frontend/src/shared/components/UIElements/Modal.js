import React from 'react';
import {
  Modal,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Button from '../FormElements/Button';

const useStyles = makeStyles({
  root: {
    zIndex: '100',
    position: 'fixed',
    top: '22vh',
    left: '10%',
    width: '65%',
    background: 'white',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
    borderRadius: '8px',
  },
});

const ModalCustomized = (props) => {
  const classes = useStyles();
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Card className={classes.root}>
        <CardHeader title={props.title} />
        <CardContent>
          <Typography component='p'>{props.children}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={props.onClickOk}>OK</Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default ModalCustomized;
