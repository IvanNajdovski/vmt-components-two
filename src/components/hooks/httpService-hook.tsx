//@ts-nocheck
import { useState, useCallback } from "react";

export const useHttpServiceClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (reqService, id, data) => {
    setIsLoading(true);
    try {
      const responseData = await reqService(id, data);
      setIsLoading(false);
      return responseData;
    } catch (err) {
      setIsLoading(false);
      setError(err);
      throw new Error(err);
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  return [sendRequest, isLoading, error, clearError];
};
