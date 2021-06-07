import React, { useEffect, useState, useContext } from 'react';
import { ErrorModal } from '../../shared/components/UIElements/ErrorModal';
import { LoadingSpinner } from '../../shared/components/UIElements/LoadingSpinner';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AddCategory } from '../components/AddCategory';
import { CategoryList } from '../components/CategoryList';
import './Categories.css';

export const Categories = () => {
  const auth = useContext(AuthContext);
  const [isLoading, error, sendHttpRequest, clearError] = useHttpClient();
  const [categories, setCategories] = useState([]);

  const addCategoryHandler = async (categoryName) => {
    try {
      const responseData = await sendHttpRequest(
        process.env.REACT_APP_BACKEND_URL + '/categories',
        'POST',
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        JSON.stringify({
          name: categoryName,
        })
      );
      setCategories([...categories, responseData.category]);
    } catch (err) {}
  };

  const deleteCategoryHandler = async (categoryId) => {
    try {
      const responseData = await sendHttpRequest(
        `${process.env.REACT_APP_BACKEND_URL}/categories/${categoryId}`,
        'DELETE',
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      if (responseData) {
        setCategories(
          categories.filter((category) => category.id !== categoryId)
        );
      }
    } catch (err) {}
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseData = await sendHttpRequest(
          process.env.REACT_APP_BACKEND_URL + '/categories'
        );
        setCategories(responseData.categories);
      } catch (err) {}
    };
    fetchCategories();
  }, [sendHttpRequest]);

  return (
    <>
      {error && <ErrorModal error={error} clearError={clearError} />}
      {categories && (
        <div className='categories'>
          {isLoading && <LoadingSpinner />}
          <AddCategory categories={categories} onAdd={addCategoryHandler} />
          <CategoryList items={categories} onDelete={deleteCategoryHandler} />
        </div>
      )}
    </>
  );
};
