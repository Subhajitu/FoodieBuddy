import apiClient from './apiClient';

export const deliveryApi = {
  getAssignedOrders: async () => {
    const response = await apiClient.get('/delivery/assigned');
    return response.data;
  },
  getDeliveryById: async (id: string) => {
    const response = await apiClient.get(`/delivery/${id}`);
    return response.data;
  },
  updateStatus: async (deliveryId: string, status: string) => {
    const response = await apiClient.put(`/delivery/${deliveryId}/status`, { status });
    return response.data;
  },
};
