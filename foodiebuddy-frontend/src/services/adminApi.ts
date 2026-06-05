import apiClient from './apiClient';

export const adminApi = {
  getStats: async () => {
    const response = await apiClient.get('/admin/stats');
    return response.data;
  },
  getUsers: async () => {
    const response = await apiClient.get('/admin/users');
    return response.data;
  },
  updateUser: async (id: string, userData: Record<string, unknown>) => {
    const response = await apiClient.put(`/admin/users/${id}`, userData);
    return response.data;
  },
  deleteUser: async (id: string) => {
    const response = await apiClient.delete(`/admin/users/${id}`);
    return response.data;
  },
  getAllOrders: async () => {
    const response = await apiClient.get('/admin/orders');
    return response.data;
  },
};
