// website/src/lib/api.ts

export const getApiBaseUrl = (): string => {
  if (process.env.NODE_ENV === 'production') {
    // On Vercel, use backend URL from env
    return process.env.REACT_APP_API_URL || '';
  }

  // Local development
  return 'http://localhost:5000';
};

export const API_ENDPOINTS = {
  ORDERS: '/api/orders',
};

export const makeApiUrl = (endpoint: string): string => {
  const baseUrl = getApiBaseUrl();
  return baseUrl + endpoint;
};
