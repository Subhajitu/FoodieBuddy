import apiClient from './apiClient';

export const authApi = {
  login: async (credentials: Record<string, unknown>) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData: Record<string, unknown>) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },
  me: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};
