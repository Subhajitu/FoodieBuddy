'use client';

import { Container, Typography, Box, Grid, Skeleton, Button, Chip, Divider, Stack, Stepper, Step, StepLabel, Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/services/ordersApi';
import { useParams } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { OrderStatus, OrderItem } from '@/features/orders/types';

const statusSteps: OrderStatus[] = ['PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'];

const getActiveStep = (status: OrderStatus) => {
  const index = statusSteps.indexOf(status);
  return index === -1 ? 0 : index;
};

export default function OrderDetailPage() {
  const { id } = useParams();
  
  const { data: order, isLoading, isError } = useQuery({
    queryKey: ['order', id],
    queryFn: () => ordersApi.getOrderById(id as string),
  });

  if (isLoading) {
    return (
      <Container maxWidth="md">
        <Skeleton width="40%" height={60} sx={{ mb: 4 }} />
        <Skeleton variant="rectangular" height={150} sx={{ mb: 4, borderRadius: 3 }} />
        <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 3 }} />
      </Container>
    );
  }

  if (isError || !order) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h5" color="error">Order not found</Typography>
          <Button component={Link} href="/orders" sx={{ mt: 2 }}>Back to Orders</Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Button 
        component={Link} 
        href="/orders" 
        startIcon={<ArrowBackIcon />} 
        sx={{ mb: 4 }}
      >
        Back to Orders
      </Button>

      <Box sx={{ mb: 6 }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Order #{order.id.slice(-6).toUpperCase()}</Typography>
          <Chip 
            label={order.status.replace(/_/g, ' ')} 
            color={order.status === 'CANCELLED' ? 'error' : 'primary'} 
            sx={{ fontWeight: 'bold' }} 
          />
        </Stack>
        <Typography variant="body1" color="text.secondary">
          Placed on {new Date(order.createdAt).toLocaleString()}
        </Typography>
      </Box>

      {order.status !== 'CANCELLED' && (
        <Paper variant="outlined" sx={{ p: 4, mb: 4, borderRadius: 4 }}>
          <Stepper activeStep={getActiveStep(order.status)} alternativeLabel>
            {statusSteps.map((label) => (
              <Step key={label}>
                <StepLabel>{label.replace(/_/g, ' ')}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>
      )}

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>Items</Typography>
            <Stack spacing={2}>
              {order.items.map((item: OrderItem) => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">
                    {item.quantity} x {item.name}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              ))}
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total</Typography>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                  ${order.totalPrice.toFixed(2)}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={3}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Restaurant</Typography>
              <Typography variant="body1">{order.restaurantName}</Typography>
              <Button 
                component={Link} 
                href={`/restaurants/${order.restaurantId}`}
                variant="text" 
                size="small" 
                sx={{ mt: 1, p: 0 }}
              >
                View Restaurant
              </Button>
            </Paper>

            <Paper variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Delivery Address</Typography>
              <Typography variant="body2" color="text.secondary">
                {order.deliveryAddress.street}<br />
                {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
              </Typography>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
