import React from 'react';

export const ProductList = (props) => {
  return (
    <ul>
      {props.items.map((product) => (
        <li key={product.id}>item</li>
      ))}
    </ul>
  );
};
