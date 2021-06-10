import React, { useEffect } from 'react';

import { useForm } from '../../hooks/product-form-hook';
import Input from './Input';

export const Password = (props) => {
  const [formState, inputHandler] = useForm(
    {
      pass1: {
        value: '',
        isValid: false,
      },
      pass2: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const { onInput, id, doublePassCheck } = props;

  useEffect(() => {
    if (doublePassCheck) {
      onInput(
        id,
        formState.inputs.pass1.value,
        formState.inputs.pass1.isValid &&
          formState.inputs.pass1.value === formState.inputs.pass2.value
      );
    } else {
      onInput(id, formState.inputs.pass1.value, formState.inputs.pass1.isValid);
    }
  }, [
    onInput,
    id,
    doublePassCheck,
    formState.inputs.pass1.isValid,
    formState.inputs.pass1.value,
    formState.inputs.pass2.value,
  ]);

  return (
    <>
      <Input
        id='pass1'
        type='password'
        label='Password'
        validators={props.validators || []}
        errorText='Please enter a valid password of at least 6 characters'
        onInput={inputHandler}
      />
      {props.doublePassCheck && (
        <Input
          id='pass2'
          type='password'
          label='Re Enter Password'
          validators={props.validators || []}
          errorText='Please re enter your password.'
          onInput={inputHandler}
          error={formState.inputs.pass1.value !== formState.inputs.pass2.value}
        />
      )}
    </>
  );
};
