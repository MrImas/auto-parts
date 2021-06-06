import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';
import CartContext from '../../shared/context/cart-context';
import { ErrorModal } from '../../shared/components/UIElements/ErrorModal';
import { LoadingSpinner } from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { ProductFullView } from '../components/ProductFullView';

export const ProductView = () => {
  const productId = useParams().productId;
  const [isLoading, error, sendHttpRequest, clearError] = useHttpClient();
  const [product, setProduct] = useState();
  const auth = useContext(AuthContext);
  const [cart, setCart] = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const responseData = await sendHttpRequest(
          `http://localhost:5000/api/products/${productId}`
        );
        setProduct(responseData.product);
      } catch (err) {}
    };
    fetchProduct();
  }, [sendHttpRequest, productId, cart]);

  const buyingHandler = async (pid) => {
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
        {product && (
          <ProductFullView
            product={product}
            buyButton
            onBuyClick={buyingHandler}
          />
        )}
      </div>
    </>
  );
};
