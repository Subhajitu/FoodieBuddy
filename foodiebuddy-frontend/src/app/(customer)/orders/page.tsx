'use client';

import { Container, Typography, Box, Alert, Button, Skeleton, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/services/ordersApi';
import OrderItemCard from '@/features/orders/components/OrderItemCard';
import { Order } from '@/features/orders/types';

function OrdersContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get('success');

  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: () => ordersApi.getOrders(),
  });

  return (
    <Container maxWidth="md">
      {success && (
        <Box sx={{ mb: 6, textAlign: 'center', py: 4, bgcolor: 'success.light', borderRadius: 4, color: 'success.contrastText' }}>
          <CheckCircleIcon sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>Order Placed Successfully!</Typography>
          <Typography variant="body1">
            Thank you for your order. Our restaurant has started preparing your food.
          </Typography>
        </Box>
      )}

      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>My Orders</Typography>
      
      {isLoading ? (
        <Stack spacing={3}>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={200} sx={{ borderRadius: 3 }} />
          ))}
        </Stack>
      ) : isError ? (
        <Alert severity="error">Failed to load orders. Please try again later.</Alert>
      ) : !orders || orders.length === 0 ? (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            You haven&apos;t placed any orders yet.
          </Typography>
          <Button component={Link} href="/restaurants" variant="contained" size="large">
            Explore Restaurants
          </Button>
        </Box>
      ) : (
        <Box>
          {orders.map((order: Order) => (
            <OrderItemCard key={order.id} order={order} />
          ))}
        </Box>
      )}
    </Container>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrdersContent />
    </Suspense>
  );
}
