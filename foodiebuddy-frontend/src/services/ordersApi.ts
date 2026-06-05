import apiClient from './apiClient';

export const ordersApi = {
  getOrders: async () => {
    const response = await apiClient.get('/orders');
    return response.data;
  },
  getOrderById: async (id: string) => {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },
  placeOrder: async (orderData: Record<string, unknown>) => {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  },
};
