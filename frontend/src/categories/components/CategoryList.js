import React from 'react';

export const CategoryList = (props) => {
  return (
    <ul>
      {props.items.map((category) => (
        <li key={category.name}>{category.name}</li>
      ))}
    </ul>
  );
};
