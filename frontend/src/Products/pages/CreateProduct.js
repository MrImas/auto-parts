import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from '@material-ui/core';

import { AuthContext } from '../../shared/context/auth-context';
import { ErrorModal } from '../../shared/components/UIElements/ErrorModal';
import { LoadingSpinner } from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/product-form-hook';
import { VALIDATOR_REQUIRE } from '../../shared/util/validation';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import './ProductForm.css';
import { ImageUpload } from '../../shared/components/FormElements/ImageUpload';

export const CreateProduct = () => {
  const auth = useContext(AuthContext);
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
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );
  const [isLoading, error, sendHttpRequest, clearError] = useHttpClient();
  const [loadedCategories, setLoadedCategories] = useState();
  const history = useHistory();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseData = await sendHttpRequest(
          process.env.REACT_APP_BACKEND_URL + '/categories'
        );
        setLoadedCategories(responseData.categories);
      } catch (err) {}
    };
    fetchCategories();
  }, [sendHttpRequest]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('price', formState.inputs.price.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('content', formState.inputs.content.value);
      formData.append('category', formState.inputs.category.value);
      formData.append('image', formState.inputs.image.value);
      await sendHttpRequest(
        process.env.REACT_APP_BACKEND_URL + '/products',
        'POST',
        {
          Authorization: `Bearer ${auth.token} `,
        },
        formData
      );
      history.push('/');
    } catch (err) {}
  };

  return (
    <>
      {error && <ErrorModal error={error} clearError={clearError} />}
      <Card>
        {isLoading && <LoadingSpinner />}
        {loadedCategories && (
          <form className='product-form' onSubmit={onSubmitHandler}>
            <div className='product-form__inputs'>
              <div className='product-form__text-inputs'>
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
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText='Please enter content.'
                  onInput={inputHandler}
                  variant='outlined'
                />
                <Input
                  id='category'
                  type='select'
                  label='category'
                  validators={[VALIDATOR_REQUIRE()]}
                  selectItems={loadedCategories}
                  onInput={inputHandler}
                />
                <Button
                  className={'product-form__submit-btn'}
                  type='submit'
                  disabled={!formState.isValid}
                >
                  SUBMIT
                </Button>
              </div>
              <div className='product-form__file-input'>
                <ImageUpload
                  id='image'
                  onInput={inputHandler}
                  errorText={'Please provide an image.'}
                />
              </div>
            </div>
          </form>
        )}
      </Card>
    </>
  );
};
