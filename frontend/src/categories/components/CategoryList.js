import React from 'react';
import { CategoryItem } from './CategoryItem';

import './CategoryList.css';

export const CategoryList = (props) => {
  return (
    <ul className='category-list'>
      {props.items.map((category) => (
        <CategoryItem key={category.name} name={category.name} />
      ))}
    </ul>
  );
};
