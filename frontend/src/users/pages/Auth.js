import React, { useState, useContext } from 'react';
import { Card } from '@material-ui/core';

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

export const Auth = () => {
  const [authFormState, inputHandler, setDataHandler] = useForm({
    email: {
      value: '',
      isValid: false,
    },
    password: {
      value: '',
      isValid: false,
    },
  });
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
    console.log(authFormState.inputs);
    setIsLoading(true);
    if (isLoginMode) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: authFormState.inputs.email.value,
            password: authFormState.inputs.password.value,
          }),
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login();
      } catch (err) {
        console.log(err.message || 'Unknown error occured :(');
      }
    } else {
      try {
        const response = await fetch(`http://localhost:5000/api/users/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: authFormState.inputs.name.value,
            email: authFormState.inputs.email.value,
            password: authFormState.inputs.password.value,
          }),
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login();
      } catch (err) {
        console.log(err.message || 'Unknown error occured :(');
      }
    }
  };

  return (
    <Card>
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
        <Input
          id='password'
          label='Password'
          validators={[VALIDATOR_MINLENGTH(4)]}
          errorText='Please enter a valid password of at least 4 characters'
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!authFormState.isValid}>
          LOGIN
        </Button>
      </form>
      <Button onClick={changeLoginModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
  );
};
