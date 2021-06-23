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
              `${process.env.REACT_APP_BACKEND_URL}/products/${obj.productId}`,
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
    let quantityOfRemovedProduct = 0;
    setCart((prevCart) => {
      cartUpdated = prevCart.filter((prodQuanObj) => {
        if (prodQuanObj.productId === pid) {
          quantityOfRemovedProduct = prodQuanObj.quantity;
        }
        return prodQuanObj.productId !== pid;
      });
      return cartUpdated;
    });
    const productToRemove = products.find(
      (elem) => elem.product.id === pid
    ).product;
    const priceOfRemovedProducts =
      quantityOfRemovedProduct * productToRemove.price;
    setTotalPrice((prevPrice) =>
      prevPrice - priceOfRemovedProducts > 0
        ? prevPrice - priceOfRemovedProducts
        : 0
    );
    await sendHttpRequest(
      `${process.env.REACT_APP_BACKEND_URL}/users/setcart`,
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
      `${process.env.REACT_APP_BACKEND_URL}/users/addtocart`,
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
      `${process.env.REACT_APP_BACKEND_URL}/users/removefromcart/${pid}`,
      'DELETE',
      {
        Authorization: `Bearer ${auth.token}`,
      }
    );
  };

  const orderCartHandler = async () => {
    try {
      await sendHttpRequest(
        `${process.env.REACT_APP_BACKEND_URL}/payments`,
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
