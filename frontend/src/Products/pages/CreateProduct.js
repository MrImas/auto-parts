import React from 'react';

import { VALIDATOR_REQUIRE } from '../../shared/util/validation';
import Input from '../../shared/components/FormElements/Input';
import './ProductForm.css';

export const CreateProduct = () => {
  return (
    <form className='product-form'>
      <Input
        label='title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a title.'
        onInput={() => {}}
        variant='outlined'
      />
      <Input
        type='number'
        initialValue={5}
        label='price $'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a price.'
        onInput={() => {}}
        variant='outlined'
      />
      <Input
        label='description'
        rows={3}
        validators={[VALIDATOR_REQUIRE()]}
        onInput={() => {}}
        variant='outlined'
        initialValid
      />
      <Input
        label='content'
        rows={6}
        validators={[]}
        onInput={() => {}}
        variant='outlined'
        initialValid
      />
    </form>
  );
};
