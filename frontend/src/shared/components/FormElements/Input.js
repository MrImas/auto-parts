import React, { useEffect, useReducer } from 'react';
import { TextField } from '@material-ui/core';

import { validate } from '../../util/validation';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case 'TOUCHED':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const InputCustomized = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { onInput } = props;

  useEffect(() => {
    onInput(inputState.value, inputState.isValid);
  }, [onInput, inputState.value, inputState.isValid]);

  const changeInputHandler = (event) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: event.target.value,
      validators: props.validators || [],
    });
  };

  const onBlurHandler = () => {
    dispatch({ type: 'TOUCHED' });
  };

  return (
    <TextField
      type={props.type || 'text'}
      label={props.label}
      value={inputState.value}
      multiline={Boolean(props.rows)}
      rows={props.rows || 1}
      onBlur={onBlurHandler}
      onChange={changeInputHandler}
      error={!inputState.isValid && inputState.isTouched}
      helperText={
        !inputState.isValid && inputState.isTouched && props.errorText
      }
      variant={props.variant || 'standard'}
    />
  );
};

export default InputCustomized;
