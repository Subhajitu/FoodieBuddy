import { OrderStatus } from '../orders/types';

export type DeliveryStatus = 'ASSIGNED' | 'PICKED_UP' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';

export interface Delivery {
  id: string;
  orderId: string;
  restaurantName: string;
  restaurantAddress: string;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  customerName: string;
  customerPhone: string;
  status: DeliveryStatus;
  orderStatus: OrderStatus;
  assignedAt: string;
  pickedUpAt?: string;
  deliveredAt?: string;
}
