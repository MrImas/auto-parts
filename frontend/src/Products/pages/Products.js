import React, { useEffect, useState, useContext } from 'react';
import { Card } from '@material-ui/core';

import { ErrorModal } from '../../shared/components/UIElements/ErrorModal';
import { LoadingSpinner } from '../../shared/components/UIElements/LoadingSpinner';
import CartContext from '../../shared/context/cart-context';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { ProductList } from '../components/ProductList';

export const Products = () => {
  const auth = useContext(AuthContext);
  const [setCart] = useContext(CartContext);
  const [isLoading, error, sendHttpRequest, clearError] = useHttpClient();
  const [loadedProducts, setLoadedProducts] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendHttpRequest(
          'http://localhost:5000/api/products'
        );
        setLoadedProducts(responseData.products);
      } catch (err) {}
    };
    fetchProducts();
  }, [sendHttpRequest]);

  const deleteProductHandler = async (pid) => {
    try {
      await sendHttpRequest(
        `http://localhost:5000/api/products/${pid}`,
        'DELETE',
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setLoadedProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== pid)
      );
    } catch (err) {}
  };

  const addToCartHandler = async (pid) => {
    try {
      const responseData = await sendHttpRequest(
        'http://localhost:5000/api/users/addtocart',
        'PATCH',
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        JSON.stringify({
          pid,
        })
      );
      setCart(responseData.cart);
    } catch (err) {}
  };

  return (
    <>
      {error && <ErrorModal error={error} clearError={clearError} />}
      <div>
        {isLoading && <LoadingSpinner />}
        {loadedProducts && (
          <Card style={{ padding: '60px 0px' }}>
            <ProductList
              items={loadedProducts}
              onDelete={deleteProductHandler}
              addToCart={addToCartHandler}
            />
          </Card>
        )}
      </div>
    </>
  );
};
