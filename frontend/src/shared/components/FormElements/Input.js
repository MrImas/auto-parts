import React, { useEffect, useReducer } from 'react';
import {
  InputLabel,
  Select,
  TextField,
  FormControl,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { validate } from '../../util/validation';

const useStyles = makeStyles({
  formElement: {
    minWidth: '250px',
  },
});

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

  const classes = useStyles();

  const { onInput, id } = props;

  useEffect(() => {
    onInput(id, inputState.value, inputState.isValid);
  }, [onInput, id, inputState.value, inputState.isValid]);

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

  if (props.type === 'select') {
    return (
      <FormControl className={classes.formElement}>
        <InputLabel shrink id={`${props.id}-select`}>
          {props.label}
        </InputLabel>
        <Select
          labelId={`${props.id}-select`}
          id={props.id}
          value={inputState.value}
          onChange={changeInputHandler}
          displayEmpty
        >
          <MenuItem value=''>Please Select Category</MenuItem>
          {props.selectItems.map((selectItem) => (
            <MenuItem key={selectItem.id} value={selectItem.id}>
              {selectItem.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
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
