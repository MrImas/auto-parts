import React, { useState, useContext } from 'react';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/product-form-hook';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validation';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';
import { LoadingSpinner } from '../../shared/components/UIElements/LoadingSpinner';
import { ErrorModal } from '../../shared/components/UIElements/ErrorModal';
import { Password } from '../../shared/components/FormElements/Password';

const useStyles = makeStyles({
  root: {
    minHeight: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  switchBtn: {
    maxWidth: '20%',
  },
});

export const Auth = () => {
  const classes = useStyles();
  const [authFormState, inputHandler, setDataHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, error, sendHttpRequest, clearError] = useHttpClient();

  const auth = useContext(AuthContext);

  const changeLoginModeHandler = () => {
    if (!isLoginMode) {
      setDataHandler(
        { ...authFormState.inputs, name: undefined },
        authFormState.inputs.email.isValid &&
          authFormState.inputs.password.isValid
      );
    } else {
      setDataHandler(
        {
          ...authFormState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendHttpRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          'POST',
          {
            'Content-Type': 'application/json',
          },
          JSON.stringify({
            email: authFormState.inputs.email.value,
            password: authFormState.inputs.password.value,
          })
        );
        if (responseData) {
          const isAdmin = responseData.role === 1;
          auth.login(responseData.userId, responseData.token, isAdmin);
        }
      } catch (err) {}
    } else {
      try {
        const responseData = await sendHttpRequest(
          process.env.REACT_APP_BACKEND_URL + '/users/signup',
          'POST',
          {
            'Content-Type': 'application/json',
          },
          JSON.stringify({
            name: authFormState.inputs.name.value,
            email: authFormState.inputs.email.value,
            password: authFormState.inputs.password.value,
          })
        );
        if (responseData) {
          const isAdmin = responseData.role === 1;
          auth.login(responseData.userId, responseData.token, isAdmin);
        }
      } catch (err) {}
    }
  };

  return (
    <>
      {error && <ErrorModal error={error} clearError={clearError} />}
      <Card className={classes.root}>
        {isLoading && <LoadingSpinner />}
        <form className='authentication-form' onSubmit={onSubmitHandler}>
          <h2>LOGIN</h2>
          <hr />
          {!isLoginMode && (
            <Input
              id='name'
              label='Name'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter a valid name'
              onInput={inputHandler}
            />
          )}
          <Input
            id='email'
            label='Email'
            validators={[VALIDATOR_EMAIL()]}
            errorText='Please enter a valid email address'
            onInput={inputHandler}
          />
          <Password
            id='password'
            doublePassCheck={!isLoginMode}
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText='Please enter a valid password of at least 6 characters'
            onInput={inputHandler}
          />
          <Button type='submit' disabled={!authFormState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button className={classes.switchBtn} onClick={changeLoginModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
    </>
  );
};
