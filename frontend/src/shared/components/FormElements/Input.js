import React, { useReducer } from 'react';
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
    value: '',
    isValid: false,
  });
  const changeInputHandler = (event) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: event.target.value,
      validators: props.validators || [],
    });
  };

  return <TextField value={inputState.value} onChange={changeInputHandler} />;
};

export default InputCustomized;
