import React, { useReducer, useCallback } from 'react';
import { Button, Typography } from '@material-ui/core';

import { VALIDATOR_REQUIRE } from '../../shared/util/validation';
import Input from '../../shared/components/FormElements/Input';
import './AddCategory.css';

const addCategoryReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      const foundCategory = action.categories.find(
        (cat) => cat.name === action.value.trim()
      );
      return {
        ...state,
        value: action.value,
        isValid: !Boolean(foundCategory) && action.isValid,
      };
    case 'SET':
      return {
        value: action.value,
        isValid: false,
      };
    default:
      return state;
  }
};

export const AddCategory = (props) => {
  const [addCategoryState, dispatch] = useReducer(addCategoryReducer, {
    value: '',
    isValid: false,
  });

  const inputHandler = useCallback(
    (categoryVal, isValid) => {
      dispatch({
        type: 'CHANGE',
        value: categoryVal,
        isValid,
        categories: props.categories,
      });
    },
    [props.categories]
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onAdd(addCategoryState.value);
  };

  return (
    <div className='add-category'>
      <Typography variant='h6'>CATEGORY</Typography>
      <form className='category-form' onSubmit={onSubmitHandler}>
        <Input
          id='category'
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={'Please enter a category name. The name must be unique.'}
          isValid={addCategoryState.isValid}
        />
        <Button
          disabled={!addCategoryState.isValid}
          type='submit'
          variant='contained'
          size='large'
          color='secondary'
        >
          ADD
        </Button>
      </form>
    </div>
  );
};
