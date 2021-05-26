import React, { useEffect, useState } from 'react';
import { ErrorModal } from '../../shared/components/UIElements/ErrorModal';
import { LoadingSpinner } from '../../shared/components/UIElements/LoadingSpinner';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AddCategory } from '../components/AddCategory';
import { CategoryList } from '../components/CategoryList';
import './Categories.css';

export const Categories = () => {
  const [isLoading, error, sendHttpRequest, clearError] = useHttpClient();
  const [categories, setCategories] = useState();

  const addCategoryHandler = (categoryName) => {
    setCategories([...categories, { name: categoryName.trim() }]);
  };

  const deleteCategoryHandler = (categoryName) => {
    setCategories(
      categories.filter((category) => category.name !== categoryName)
    );
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseData = await sendHttpRequest(
          'http://localhost:5000/api/categories'
        );
        setCategories(responseData.categories);
      } catch (err) {}
    };
    fetchCategories();
  }, [sendHttpRequest]);

  return (
    <>
      {error && <ErrorModal error={error} clearError={clearError} />}
      {isLoading && <LoadingSpinner />}
      {!isLoading && categories && (
        <div className='categories'>
          <AddCategory categories={categories} onAdd={addCategoryHandler} />
          <CategoryList items={categories} onDelete={deleteCategoryHandler} />
        </div>
      )}
    </>
  );
};
