'use client';

import { Container, Typography, Box, Grid, Skeleton, Button, Chip, Divider } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { restaurantsApi } from '@/services/restaurantsApi';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

export default function RestaurantDetailPage() {
  const { id } = useParams();
  
  const { data: restaurant, isLoading, isError } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => restaurantsApi.getRestaurantById(id as string),
  });

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2, mb: 4 }} />
        <Skeleton width="40%" height={40} />
        <Skeleton width="20%" />
      </Container>
    );
  }

  if (isError || !restaurant) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h5" color="error">Restaurant not found</Typography>
          <Button component={Link} href="/restaurants" sx={{ mt: 2 }}>Back to Restaurants</Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Button 
        component={Link} 
        href="/restaurants" 
        startIcon={<ArrowBackIcon />} 
        sx={{ mb: 4 }}
      >
        Back to Restaurants
      </Button>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ position: 'relative', height: 400, borderRadius: 4, overflow: 'hidden', mb: 4 }}>
            <Image
              src={restaurant.imageUrl || 'https://via.placeholder.com/800x400?text=Restaurant+Image'}
              alt={restaurant.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{restaurant.name}</Typography>
            <Chip label={`${restaurant.rating} Stars`} color="primary" sx={{ fontWeight: 'bold', fontSize: '1.1rem', py: 2, px: 1 }} />
          </Box>
          <Typography variant="h6" color="text.secondary" gutterBottom>{restaurant.cuisine}</Typography>
          <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>{restaurant.description}</Typography>
          
          <Divider sx={{ mb: 4 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Menu</Typography>
            <Button component={Link} href={`/restaurants/${id}/menu`} variant="contained" size="large">
              View Full Menu
            </Button>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 4, border: 1, borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>Info</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>Address</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{restaurant.address}</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>Phone</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{restaurant.phoneNumber}</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>Availability</Typography>
            <Chip 
              label={restaurant.isAvailable ? 'Open Now' : 'Closed'} 
              color={restaurant.isAvailable ? 'success' : 'error'} 
              variant="outlined" 
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
