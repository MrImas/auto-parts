import { useState, useCallback } from 'react';
/*
[
    {pid:<PID>, quantity:<NUMBER>}
]
*/

export const useCart = () => {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((pid) => {
    setCart((prevProducts) => {
      const productsIds = prevProducts.map((product) => product.pid);
      const indexOfPid = productsIds.indexOf(pid);
      if (indexOfPid < 0) {
        return [...prevProducts, { pid, qunatity: 1 }];
      }
      return [...prevProducts];
    });
  }, []);

  const removeFromCart = useCallback((pid) => {
    setCart((prevProducts) => prevProducts.filter((p) => p.id !== pid));
  }, []);

  return [cart, addToCart, removeFromCart];
};
