// API configuration for different environments
export const getApiBaseUrl = (): string => {
  if (typeof window === 'undefined') {
    // Server-side (SSR)
    return process.env.REACT_APP_API_URL || 'http://localhost:3000';
  }

  // Client-side
  if (process.env.NODE_ENV === 'production') {
    // In production on Vercel, use relative URL to same domain
    return '';
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
