'use client';

import { Container, Typography, Box, Grid, Skeleton, Button, Stack, Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { deliveryApi } from '@/services/deliveryApi';
import { useParams } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import DeliveryStatusForm from '@/features/delivery/components/DeliveryStatusForm';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

export default function DeliveryDetailPage() {
  const { id } = useParams();
  
  const { data: delivery, isLoading, isError } = useQuery({
    queryKey: ['delivery', id],
    queryFn: () => deliveryApi.getDeliveryById(id as string),
  });

  if (isLoading) {
    return (
      <Container maxWidth="md">
        <Skeleton width="40%" height={60} sx={{ mb: 4 }} />
        <Skeleton variant="rectangular" height={250} sx={{ mb: 4, borderRadius: 3 }} />
        <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3 }} />
      </Container>
    );
  }

  if (isError || !delivery) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h5" color="error">Delivery task not found</Typography>
          <Button component={Link} href="/delivery" sx={{ mt: 2 }}>Back to Dashboard</Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Button 
        component={Link} 
        href="/delivery" 
        startIcon={<ArrowBackIcon />} 
        sx={{ mb: 4 }}
      >
        Dashboard
      </Button>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Order #{delivery.orderId.slice(-6).toUpperCase()}</Typography>
        <Typography variant="body1" color="text.secondary">
          Assigned on {new Date(delivery.assignedAt).toLocaleString()}
        </Typography>
      </Box>

      <Stack spacing={4}>
        <DeliveryStatusForm delivery={delivery} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 4, height: '100%' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
                <StorefrontIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Pickup Location</Typography>
              </Stack>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{delivery.restaurantName}</Typography>
              <Typography variant="body2" color="text.secondary">{delivery.restaurantAddress}</Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 4, height: '100%' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
                <LocationOnIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Delivery Destination</Typography>
              </Stack>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{delivery.customerName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {delivery.deliveryAddress.street}<br />
                {delivery.deliveryAddress.city}, {delivery.deliveryAddress.state} {delivery.deliveryAddress.zipCode}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mt: 2 }}>
                <PhoneIcon fontSize="small" color="action" />
                <Typography variant="body2">{delivery.customerPhone}</Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
