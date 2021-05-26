import React, { useReducer, useCallback } from 'react';
import { Button, Typography } from '@material-ui/core';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { VALIDATOR_REQUIRE } from '../../shared/util/validation';
import Input from '../../shared/components/FormElements/Input';
import './AddCategory.css';
import { ErrorModal } from '../../shared/components/UIElements/ErrorModal';
import { LoadingSpinner } from '../../shared/components/UIElements/LoadingSpinner';

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
    default:
      return state;
  }
};

export const AddCategory = (props) => {
  const [addCategoryState, dispatch] = useReducer(addCategoryReducer, {
    value: '',
    isValid: false,
  });
  const [isLoading, error, sendHttpRequest, clearError] = useHttpClient();

  const inputHandler = useCallback(
    (id, categoryVal, isValid) => {
      dispatch({
        type: 'CHANGE',
        value: categoryVal,
        isValid,
        categories: props.categories,
      });
    },
    [props.categories]
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendHttpRequest(
        'http://localhost:5000/api/categories',
        'POST',
        {
          'Content-Type': 'application/json',
        },
        JSON.stringify({
          name: addCategoryState.value,
        })
      );
      props.onAdd(addCategoryState.value);
    } catch (err) {}
  };

  return (
    <>
      {error && <ErrorModal error={error} clearError={clearError} />}
      {isLoading && <LoadingSpinner />}
      <div className='add-category'>
        <Typography variant='h6'>CATEGORY</Typography>
        <form className='category-form' onSubmit={onSubmitHandler}>
          <Input
            id='category'
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            errorText={'Please enter a category name. The name must be unique.'}
            isValid={addCategoryState.isValid}
            initialValue={addCategoryState.value}
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
    </>
  );
};
