import apiClient from './apiClient';

export const cartApi = {
  getCart: async () => {
    const response = await apiClient.get('/cart');
    return response.data;
  },
  addToCart: async (item: Record<string, unknown>) => {
    const response = await apiClient.post('/cart', item);
    return response.data;
  },
  updateCartItem: async (itemId: string, quantity: number) => {
    const response = await apiClient.put(`/cart/${itemId}`, { quantity });
    return response.data;
  },
  removeFromCart: async (itemId: string) => {
    const response = await apiClient.delete(`/cart/${itemId}`);
    return response.data;
  },
};
