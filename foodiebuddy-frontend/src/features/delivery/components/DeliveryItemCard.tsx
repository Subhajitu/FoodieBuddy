'use client';

import { Card, CardContent, Typography, Box, Chip, Button, Stack } from '@mui/material';
import { Delivery, DeliveryStatus } from '../types';
import Link from 'next/link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StorefrontIcon from '@mui/icons-material/Storefront';

interface DeliveryItemCardProps {
  delivery: Delivery;
}

const statusColors: Record<DeliveryStatus, "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"> = {
  ASSIGNED: 'info',
  PICKED_UP: 'primary',
  IN_TRANSIT: 'warning',
  DELIVERED: 'success',
  CANCELLED: 'error',
};

export default function DeliveryItemCard({ delivery }: DeliveryItemCardProps) {
  return (
    <Card sx={{ mb: 3, borderRadius: 3, border: 1, borderColor: 'divider', boxShadow: 'none' }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Order #{delivery.orderId.slice(-6).toUpperCase()}</Typography>
            <Typography variant="body2" color="text.secondary">Assigned: {new Date(delivery.assignedAt).toLocaleTimeString()}</Typography>
          </Box>
          <Chip 
            label={delivery.status.replace(/_/g, ' ')} 
            color={statusColors[delivery.status]} 
            size="small" 
            sx={{ fontWeight: 'bold' }} 
          />
        </Stack>

        <Stack spacing={2} sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <StorefrontIcon sx={{ mr: 1, color: 'text.secondary', fontSize: '1.2rem' }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{delivery.restaurantName}</Typography>
              <Typography variant="caption" color="text.secondary">{delivery.restaurantAddress}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <LocationOnIcon sx={{ mr: 1, color: 'primary.main', fontSize: '1.2rem' }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{delivery.customerName}</Typography>
              <Typography variant="caption" color="text.secondary">
                {delivery.deliveryAddress.street}, {delivery.deliveryAddress.city}
              </Typography>
            </Box>
          </Box>
        </Stack>

        <Button 
          component={Link} 
          href={`/delivery/${delivery.id}`} 
          variant="contained" 
          fullWidth
          endIcon={<ChevronRightIcon />}
        >
          View & Update Status
        </Button>
      </CardContent>
    </Card>
  );
}
