import React from 'react';
import { Card } from '@material-ui/core';

import { useProductForm } from '../../shared/hooks/product-form-hook';
import { VALIDATOR_REQUIRE } from '../../shared/util/validation';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import './ProductForm.css';

const DUMMY_CATEGORIES = [
  {
    name: 'category 1',
  },
  {
    name: 'category 2',
  },
  {
    name: 'category 3',
  },
];

export const CreateProduct = () => {
  const [formState, inputHandler] = useProductForm(
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

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <Card>
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
          selectItems={DUMMY_CATEGORIES.map((cat) => cat.name)}
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!formState.isValid}>
          SUBMIT
        </Button>
      </form>
    </Card>
  );
};
