import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { ErrorModal } from '../../shared/components/UIElements/ErrorModal';
import { LoadingSpinner } from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { ProductFullView } from '../components/ProductFullView';

export const ProductView = () => {
  const productId = useParams().productId;
  const [isLoading, error, sendHttpRequest, clearError] = useHttpClient();
  const [product, setProduct] = useState();

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
  }, [sendHttpRequest, productId]);

  return (
    <>
      {error && <ErrorModal error={error} clearError={clearError} />}
      <div>
        {isLoading && <LoadingSpinner />}
        {product && <ProductFullView product={product} buyButton />}
      </div>
    </>
  );
};
