import React, { useEffect, useState } from 'react';
import { ErrorModal } from '../../shared/components/UIElements/ErrorModal';
import { LoadingSpinner } from '../../shared/components/UIElements/LoadingSpinner';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { ProductList } from '../components/ProductList';

export const Products = () => {
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

  return (
    <>
      {error && <ErrorModal error={error} clearError={clearError} />}
      <div>
        {isLoading && <LoadingSpinner />}
        {loadedProducts && <ProductList items={loadedProducts} />}
      </div>
    </>
  );
};
