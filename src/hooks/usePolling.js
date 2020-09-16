import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

const usePolling = (query) => {
  const { data, loading, error, startPolling, stopPolling } = useQuery(query);

  useEffect(() => {
    // Query db after 1 second if there are changes
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);
  return [data, loading, error, startPolling, stopPolling];
};

export default usePolling;
