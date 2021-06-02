import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import { ProductFullView } from '../../Products/components/ProductFullView';
import CartContext from '../../shared/context/cart-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

export const Cart = () => {
  const auth = useContext(AuthContext);
  const [cart, setCart] = useContext(CartContext);
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
