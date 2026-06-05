import apiClient from './apiClient';

export const restaurantsApi = {
  getRestaurants: async () => {
    const response = await apiClient.get('/restaurants');
    return response.data;
  },
  getRestaurantById: async (id: string) => {
    const response = await apiClient.get(`/restaurants/${id}`);
    return response.data;
  },
  getMenuByRestaurantId: async (id: string) => {
    const response = await apiClient.get(`/restaurants/${id}/menu`);
    return response.data;
  },
};
