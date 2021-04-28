import React from 'react';

import { ProductItem } from './ProductItem';
import './ProductList.css';

export const ProductList = (props) => {
  return (
    <ul className='product-list'>
      {props.items.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
          content={product.content}
          image={product.image}
          category={product.category}
        />
      ))}
    </ul>
  );
};
