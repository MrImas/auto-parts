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
  return (
    <div className='categories'>
      <AddCategory />
      <CategoryList items={DUMMY_CATEGORIES} />
    </div>
  );
};
