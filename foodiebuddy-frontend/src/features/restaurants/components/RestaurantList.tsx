'use client';

import { Grid, Skeleton, Box, Typography } from '@mui/material';
import RestaurantCard from './RestaurantCard';
import { Restaurant } from '../types';

interface RestaurantListProps {
  restaurants: Restaurant[] | undefined;
  isLoading: boolean;
}

export default function RestaurantList({ restaurants, isLoading }: RestaurantListProps) {
  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {[...Array(6)].map((_, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Skeleton variant="rectangular" height={160} sx={{ borderRadius: 2 }} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton width="60%" />
              <Skeleton width="40%" />
            </Box>
          </Grid>
        ))}
      </Grid>

    );
  }

  if (!restaurants || restaurants.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          No restaurants found. Try adjusting your filters.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {restaurants.map((restaurant) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={restaurant.id}>
          <RestaurantCard restaurant={restaurant} />
        </Grid>
      ))}
    </Grid>
  );
}
