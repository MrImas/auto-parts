import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@material-ui/core';

import { useProductForm } from '../../shared/hooks/product-form-hook';
import { VALIDATOR_REQUIRE } from '../../shared/util/validation';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

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

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    title: 'Wheel',
    price: 10,
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    content: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod`,
    image:
      'https://static3.depositphotos.com/1003854/262/i/950/depositphotos_2622850-stock-photo-car-wheel-with-aluminum-rim.jpg',
    category: 'category 1',
  },
  {
    id: 'p2',
    title: 'Car Battery',
    price: 35,
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    content: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod`,
    image:
      'https://media.tractorsupply.com/is/image/TractorSupplyCompany/1323449?$456$',
    category: 'category 2',
  },
];

export const UpdateProduct = () => {
  const [isLoading, setIsLoading] = useState(true);
  const productId = useParams().productId;

  const [formState, inputHandler, setDataHandler] = useProductForm(
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

  const identifiedProduct = DUMMY_PRODUCTS.find(
    (product) => product.id === productId
  );

  useEffect(() => {
    setDataHandler(
      {
        title: {
          value: identifiedProduct.title,
          isValid: true,
        },
        price: {
          value: identifiedProduct.price,
          isValid: true,
        },
        description: {
          value: identifiedProduct.description,
          isValid: true,
        },
        content: {
          value: identifiedProduct.content,
          isValid: true,
        },
        category: {
          value: identifiedProduct.category,
          isValid: true,
        },
      },
      true
    );
    setIsLoading(false);
  }, [setDataHandler, identifiedProduct]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  if (!identifiedProduct) {
    return (
      <Card>
        <h2>Could not find Product!</h2>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <h2>Loading...</h2>
      </Card>
    );
  }

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
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.isValid}
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
          initialValid={formState.inputs.price.isValid}
        />
        <Input
          id='description'
          label='description'
          rows={3}
          errorText='Please enter a description.'
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          variant='outlined'
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.isValid}
        />
        <Input
          id='content'
          label='content'
          rows={6}
          validators={[]}
          onInput={inputHandler}
          variant='outlined'
          initialValue={formState.inputs.content.value}
          initialValid={formState.inputs.content.isValid}
        />
        <Input
          id='category'
          type='select'
          label='category'
          selectItems={DUMMY_CATEGORIES.map((cat) => cat.name)}
          onInput={inputHandler}
          initialValue={formState.inputs.category.value}
          initialValid={formState.inputs.category.isValid}
        />
        <Button type='submit' disabled={!formState.isValid}>
          SUBMIT
        </Button>
      </form>
    </Card>
  );
};
