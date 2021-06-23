import React, { useState } from 'react';
import { Modal, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';

import { VALIDATOR_EMAIL } from '../../shared/util/validation';
import { useForm } from '../../shared/hooks/product-form-hook';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

const useStyles = makeStyles({
  root: {
    // height: '300px',
    position: 'absolute',
    top: 70,
    left: 70,
    // transform: `translate(-50%, -50%)`,
    width: 400,
    backgroundColor: '#f2e6ff',
    // backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
  },
});

export const ForogtPassword = (props) => {
  const classes = useStyles();
  const [displayAlert, setDisplayAlert] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setDisplayAlert(true);
    setTimeout(props.onClose, 3000);
  };

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <div className={classes.root}>
        <form className='authentication-form' onSubmit={onSubmitHandler}>
          <Typography variant='h6'>
            Forgot Your Password?
            <br /> No problem, we will send you new one!
          </Typography>
          <Input
            id='email'
            label='Enter your email...'
            validators={[VALIDATOR_EMAIL()]}
            errorText='Please enter a valid email address'
            onInput={inputHandler}
          />
          <Button type='submit' disabled={!formState.isValid}>
            SEND ME NEW PASSWORD
          </Button>
          {displayAlert && (
            <Alert severity='success' variant='outlined'>
              Password was sent to {formState.inputs.email.value}
            </Alert>
          )}
        </form>
      </div>
    </Modal>
  );
};
