import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';

import { AuthContext } from '../../shared/context/auth-context';
import { ProductFullView } from '../../Products/components/ProductFullView';
import CartContext from '../../shared/context/cart-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { ErrorModal } from '../../shared/components/UIElements/ErrorModal';
import { LoadingSpinner } from '../../shared/components/UIElements/LoadingSpinner';
import Button from '../../shared/components/FormElements/Button';

export const Cart = () => {
  const auth = useContext(AuthContext);
  const [cart, setCart] = useContext(CartContext);
  const [isLoading, error, sendHttpRequest, clearError] = useHttpClient();
  const [products, setProducts] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      const [...products] = await Promise.all(
        cart.map(
          async (obj) =>
            await sendHttpRequest(
              `http://localhost:5000/api/products/${obj.productId}`,
              'GET',
              {
                Authorization: `Bearer ${auth.token}`,
              }
            )
        )
      );
      setProducts(products);
      if (products.length > 0) {
        setTotalPrice(
          cart
            .map((productQuantityObj, indexOfProduct) => {
              return (
                productQuantityObj.quantity *
                products[indexOfProduct].product.price
              );
            })
            .reduce((totalPrice, currPrice) => (totalPrice += currPrice))
        );
      }
    };
    fetchProducts();
  }, [sendHttpRequest, auth.token, cart]);

  const removeProductFromCartHandler = async (pid) => {
    let cartUpdated;
    setCart((prevCart) => {
      cartUpdated = prevCart.filter(
        (prodQuanObj) => prodQuanObj.productId !== pid
      );
      return cartUpdated;
    });
    await sendHttpRequest(
      `http://localhost:5000/api/users/setcart`,
      'PATCH',
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      JSON.stringify({
        cart: cartUpdated,
      })
    );
  };

  const increaseQuantityHandler = async (pid) => {
    setCart((prevCart) => {
      return prevCart.map((productQunatityObj) => {
        if (productQunatityObj.productId === pid) {
          productQunatityObj.quantity++;
        }
        return productQunatityObj;
      });
    });
    await sendHttpRequest(
      `http://localhost:5000/api/users/addtocart`,
      'PATCH',
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      JSON.stringify({
        pid,
      })
    );
  };

  const decreaseQuantityHandler = async (pid) => {
    setCart((prevCart) => {
      return prevCart.map((productQunatityObj) => {
        if (productQunatityObj.productId === pid) {
          if (productQunatityObj.quantity > 1) {
            productQunatityObj.quantity--;
          }
        }
        return productQunatityObj;
      });
    });
    await sendHttpRequest(
      `http://localhost:5000/api/users/removefromcart/${pid}`,
      'DELETE',
      {
        Authorization: `Bearer ${auth.token}`,
      }
    );
  };

  const orderCartHandler = async () => {
    try {
      await sendHttpRequest(
        `http://localhost:5000/api/payments`,
        'POST',
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        JSON.stringify({
          cart: cart.map((obj) => ({
            productId: obj.productId,
            quantity: obj.quantity,
          })),
        })
      );
      setCart([]);
      history.push('/');
    } catch (err) {}
  };

  return (
    <div>
      <ErrorModal error={error} clearError={clearError} />
      {isLoading && <LoadingSpinner />}
      {products &&
        cart.map((productQuantityObj, indexOfProduct) => (
          <ProductFullView
            cartMode
            isLoading={isLoading}
            key={productQuantityObj.id}
            product={products[indexOfProduct].product}
            quantity={productQuantityObj.quantity}
            decreaseQuantityHandler={decreaseQuantityHandler}
            increaseQuantityHandler={increaseQuantityHandler}
            removeProductFromCartHandler={removeProductFromCartHandler}
          />
        ))}
      {products && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h3'>Total Price: ${totalPrice}</Typography>
          <Button
            disabled={cart.length === 0 ? true : false}
            onClick={orderCartHandler}
          >
            Order
          </Button>
        </div>
      )}
    </div>
  );
};
