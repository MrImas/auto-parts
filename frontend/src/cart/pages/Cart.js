import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import { ProductFullView } from '../../Products/components/ProductFullView';
import CartContext from '../../shared/context/cart-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { ErrorModal } from '../../shared/components/UIElements/ErrorModal';
import { LoadingSpinner } from '../../shared/components/UIElements/LoadingSpinner';

export const Cart = () => {
  const auth = useContext(AuthContext);
  const [cart] = useContext(CartContext);
  const [isLoading, error, sendHttpRequest, clearError] = useHttpClient();
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const [...products] = await Promise.all(
        cart.map((obj) =>
          sendHttpRequest(
            `http://localhost:5000/api/products/${obj.productId}`,
            'GET',
            {
              Authorization: `Bearer ${auth.token}`,
            }
          )
        )
      );
      setProducts(products);
    };
    fetchProducts();
  }, [sendHttpRequest, auth.token, cart]);

  return (
    <div>
      <ErrorModal error={error} clearError={clearError} />
      {isLoading && <LoadingSpinner />}
      {products &&
        cart.map((productQuantityObj, indexOfProduct) => (
          <ProductFullView
            key={productQuantityObj.id}
            product={products[indexOfProduct].product}
          />
        ))}
    </div>
  );
};
