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
    default:
      return state;
  }
};

const InputCustomized = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isValid: false,
  });

  useEffect(() => {
    props.onInput(inputState.value, inputState.isValid);
  }, [props.onInput, inputState.value, inputState.isValid]);

  const changeInputHandler = (event) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: event.target.value,
      validators: props.validators || [],
    });
  };

  return (
    <TextField
      value={inputState.value}
      onChange={changeInputHandler}
      error={!props.isValid || !inputState.isValid}
      helperText={(!props.isValid || !inputState.isValid) && props.errorText}
    />
  );
};

export default InputCustomized;
