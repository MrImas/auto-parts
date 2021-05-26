import { useState, useCallback } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendHttpRequest = useCallback(
    async (url, method = 'GET', headers = {}, body = null) => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setIsLoading(false);
        setError(err.message || 'Unknown error occured :(');
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return [isLoading, error, sendHttpRequest, clearError];
};
