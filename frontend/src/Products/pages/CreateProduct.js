import React, { useState, useEffect } from 'react';
import { Card } from '@material-ui/core';

import { ErrorModal } from '../../shared/components/UIElements/ErrorModal';
import { LoadingSpinner } from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/product-form-hook';
import { VALIDATOR_REQUIRE } from '../../shared/util/validation';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import './ProductForm.css';

export const CreateProduct = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      price: {
        value: 5,
        isValid: true,
      },
      description: {
        value: '',
        isValid: false,
      },
      content: {
        value: '',
        isValid: false,
      },
      category: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  const [isLoading, error, sendHttpRequest, clearError] = useHttpClient();
  const [loadedCategories, setLoadedCategories] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseData = await sendHttpRequest(
          'http://localhost:5000/api/categories'
        );
        setLoadedCategories(responseData.categories);
      } catch (err) {}
    };
    fetchCategories();
  }, [sendHttpRequest]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      await sendHttpRequest(
        'http://localhost:5000/api/products',
        'POST',
        {
          'Content-Type': 'application/json',
        },
        JSON.stringify({
          title: formState.inputs.title.value,
          price: formState.inputs.price.value,
          description: formState.inputs.description.value,
          content: formState.inputs.content.value,
          category: formState.inputs.category.value,
        })
      );
    } catch (err) {}
  };

  return (
    <>
      {error && <ErrorModal error={error} clearError={clearError} />}
      <Card>
        {isLoading && <LoadingSpinner />}
        {loadedCategories && (
          <form className='product-form' onSubmit={onSubmitHandler}>
            <Input
              id='title'
              label='title'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter a title.'
              onInput={inputHandler}
              variant='outlined'
            />
            <Input
              id='price'
              type='number'
              initialValue={formState.inputs.price.value}
              label='price $'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter a price.'
              onInput={inputHandler}
              variant='outlined'
              initialValid
            />
            <Input
              id='description'
              label='description'
              rows={3}
              errorText='Please enter a description.'
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              variant='outlined'
            />
            <Input
              id='content'
              label='content'
              rows={6}
              validators={[]}
              onInput={inputHandler}
              variant='outlined'
              initialValid
            />
            <Input
              id='category'
              type='select'
              label='category'
              selectItems={loadedCategories}
              onInput={inputHandler}
            />
            <Button type='submit' disabled={!formState.isValid}>
              SUBMIT
            </Button>
          </form>
        )}
      </Card>
    </>
  );
};
