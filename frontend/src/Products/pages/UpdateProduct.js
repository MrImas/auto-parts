import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@material-ui/core';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/product-form-hook';
import { VALIDATOR_REQUIRE } from '../../shared/util/validation';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { LoadingSpinner } from '../../shared/components/UIElements/LoadingSpinner';
import { ErrorModal } from '../../shared/components/UIElements/ErrorModal';
import { ImageUpload } from '../../shared/components/FormElements/ImageUpload';

export const UpdateProduct = () => {
  const auth = useContext(AuthContext);
  const productId = useParams().productId;
  const [isLoading, error, sendHttpRequest, clearError] = useHttpClient();
  const [loadedCategories, setLoadedCategories] = useState();
  const [loadedProduct, setLoadedProduct] = useState();

  const [formState, inputHandler, setDataHandler] = useForm(
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
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const responseData = await sendHttpRequest(
          `http://localhost:5000/api/products/${productId}`
        );
        const product = responseData.product;
        setDataHandler(
          {
            title: {
              value: product.title,
              isValid: true,
            },
            price: {
              value: product.price,
              isValid: true,
            },
            description: {
              value: product.description,
              isValid: true,
            },
            content: {
              value: product.content,
              isValid: true,
            },
            category: {
              value: product.category,
              isValid: true,
            },
            image: {
              value: product.image,
              isValid: true,
            },
          },
          true
        );
        setLoadedProduct(product);
      } catch (err) {}
    };
    fetchProduct();
  }, [sendHttpRequest, productId, setDataHandler]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', formState.inputs.title.value);
    formData.append('price', formState.inputs.price.value);
    formData.append('description', formState.inputs.description.value);
    formData.append('content', formState.inputs.content.value);
    formData.append('category', formState.inputs.category.value);
    formData.append('image', formState.inputs.image.value);
    try {
      await sendHttpRequest(
        `http://localhost:5000/api/products/${productId}`,
        'PATCH',
        {
          // 'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        formData
      );
    } catch (err) {}
  };

  if (!isLoading && !loadedProduct) {
    return (
      <Card>
        <h2>Could not find Product!</h2>
      </Card>
    );
  }

  return (
    <>
      {error && <ErrorModal error={error} clearError={clearError} />}
      <Card>
        {isLoading && <LoadingSpinner />}
        {loadedProduct && loadedCategories && (
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
              selectItems={loadedCategories}
              onInput={inputHandler}
              initialValue={formState.inputs.category.value}
              initialValid={formState.inputs.category.isValid}
            />
            <div className='product-form__file-input'>
              <ImageUpload
                id='image'
                onInput={inputHandler}
                errorText={'Please provide an image.'}
              />
            </div>
            <Button type='submit' disabled={!formState.isValid}>
              SUBMIT
            </Button>
          </form>
        )}
      </Card>
    </>
  );
};
