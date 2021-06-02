import React, { useState, createContext, useEffect } from 'react';

const CartContext = createContext({
  cart: [],
  setCart: () => {},
});

const CartProvider = (props) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (props.token) {
      const fetchCart = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/users/cart`, {
            headers: {
              Authorization: `Bearer ${props.token}`,
            },
          });
          const responseData = await response.json();
          setCart(responseData.cart);
        } catch (err) {
          console.log(err);
        }
      };
      fetchCart();
    } else {
      setCart([]);
    }
  }, [props.token]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  );
};

export { CartContext as default, CartProvider };
