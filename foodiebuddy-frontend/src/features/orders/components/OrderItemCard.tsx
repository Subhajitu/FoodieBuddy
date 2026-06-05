'use client';

import { Card, CardContent, Typography, Box, Chip, Button, Stack, Divider } from '@mui/material';
import { Order, OrderStatus } from '../types';
import Link from 'next/link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface OrderItemCardProps {
  order: Order;
}

const statusColors: Record<OrderStatus, "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"> = {
  PENDING: 'warning',
  CONFIRMED: 'info',
  PREPARING: 'info',
  OUT_FOR_DELIVERY: 'primary',
  DELIVERED: 'success',
  CANCELLED: 'error',
};

export default function OrderItemCard({ order }: OrderItemCardProps) {
  const date = new Date(order.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Card sx={{ mb: 3, borderRadius: 3, border: 1, borderColor: 'divider', boxShadow: 'none' }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{order.restaurantName}</Typography>
            <Typography variant="body2" color="text.secondary">{date}</Typography>
          </Box>
          <Chip 
            label={order.status.replace(/_/g, ' ')} 
            color={statusColors[order.status]} 
            size="small" 
            sx={{ fontWeight: 'bold', fontSize: '0.75rem' }} 
          />
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          {order.items.map((item) => (
            <Typography key={item.id} variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {item.quantity} x {item.name}
            </Typography>
          ))}
        </Box>

        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Total: ${order.totalPrice.toFixed(2)}
          </Typography>
          <Button 
            component={Link} 
            href={`/orders/${order.id}`} 
            variant="outlined" 
            size="small" 
            endIcon={<ChevronRightIcon />}
          >
            View Details
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
