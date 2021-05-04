import React, { useState } from 'react';

import { AddCategory } from '../components/AddCategory';
import { CategoryList } from '../components/CategoryList';
import './Categories.css';

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

export const Categories = () => {
  const [categories, setCategories] = useState(DUMMY_CATEGORIES);

  const addCategoryHandler = (categoryName) => {
    setCategories([...categories, { name: categoryName.trim() }]);
  };

  const deleteCategoryHandler = (categoryName) => {
    setCategories(
      categories.filter((category) => category.name !== categoryName)
    );
  };

  return (
    <div className='categories'>
      <AddCategory categories={categories} onAdd={addCategoryHandler} />
      <CategoryList items={categories} onDelete={deleteCategoryHandler} />
    </div>
  );
};
