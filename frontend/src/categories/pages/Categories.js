import React from 'react';
import { CategoryList } from '../components/CategoryList';

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
    <div>
      <CategoryList items={DUMMY_CATEGORIES} />
    </div>
  );
};
