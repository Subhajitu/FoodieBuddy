'use client';

import { Container, Typography, Box, Alert, Skeleton, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { deliveryApi } from '@/services/deliveryApi';
import DeliveryItemCard from '@/features/delivery/components/DeliveryItemCard';
import { Delivery } from '@/features/delivery/types';

export default function DeliveryDashboardPage() {
  const { data: deliveries, isLoading, isError } = useQuery({
    queryKey: ['assigned-deliveries'],
    queryFn: () => deliveryApi.getAssignedOrders(),
  });

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Delivery Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your assigned tasks and update delivery status
        </Typography>
      </Box>

      {isLoading ? (
        <Stack spacing={3}>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={220} sx={{ borderRadius: 3 }} />
          ))}
        </Stack>
      ) : isError ? (
        <Alert severity="error">Failed to load assigned deliveries. Please try again later.</Alert>
      ) : !deliveries || deliveries.length === 0 ? (
        <Box sx={{ py: 12, textAlign: 'center', bgcolor: 'background.paper', borderRadius: 4, border: 1, borderColor: 'divider' }}>
          <Typography variant="h6" color="text.secondary">
            No active deliveries assigned to you.
          </Typography>
        </Box>
      ) : (
        <Box>
          {deliveries.map((delivery: Delivery) => (
            <DeliveryItemCard key={delivery.id} delivery={delivery} />
          ))}
        </Box>
      )}
    </Container>
  );
}
