import React, { useContext, useState } from 'react';
import { Card } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/product-form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validation';
import { Password } from '../../shared/components/FormElements/Password';
import { LoadingSpinner } from '../../shared/components/UIElements/LoadingSpinner';
import { ErrorModal } from '../../shared/components/UIElements/ErrorModal';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';

export const ChangePassword = () => {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      oldPassword: {
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
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [isLoading, error, sendHttpRequest, clearError] = useHttpClient();
  const [open, setOpen] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendHttpRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/profile`,
        'PATCH',
        {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
        JSON.stringify({
          email: formState.inputs.email.value,
          oldPassword: formState.inputs.oldPassword.value,
          password: formState.inputs.password.value,
        })
      );
      if (responseData) {
        setOpen(true);
      }
    } catch (err) {}
  };

  const closeModalHandler = () => {
    setOpen(false);
    history.push('/');
  };

  return (
    <>
      {error && <ErrorModal error={error} clearError={clearError} />}
      <Card>
        {isLoading && <LoadingSpinner />}
        {open && (
          <Modal
            open={open}
            onClose={closeModalHandler}
            onClickOk={closeModalHandler}
          >
            Changed Password Successfully!
          </Modal>
        )}
        {!open && (
          <form className='authentication-form' onSubmit={onSubmitHandler}>
            <h2>Change Password</h2>
            <hr />
            <Input
              id='email'
              label='Email'
              validators={[VALIDATOR_EMAIL()]}
              errorText='Please enter a valid email address'
              onInput={inputHandler}
            />
            <Password
              id='oldPassword'
              doublePassCheck={false}
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText='Please enter your current password'
              onInput={inputHandler}
            />
            <Password
              id='password'
              doublePassCheck={true}
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText='Please enter a new valid password of at least 6 characters'
              onInput={inputHandler}
            />
            <Button type='submit' disabled={!formState.isValid}>
              CHANGE PASSWORD
            </Button>
          </form>
        )}
      </Card>
    </>
  );
};
