'use client';

import { Container, Typography, Box, Pagination, Button } from '@mui/material';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { restaurantsApi } from '@/services/restaurantsApi';
import RestaurantList from '@/features/restaurants/components/RestaurantList';
import RestaurantFilters from '@/features/restaurants/components/RestaurantFilters';

export default function RestaurantsClient() {
  const [search, setSearch] = useState('');
  const [cuisine, setCuisine] = useState('All');
  const [page, setPage] = useState(1);

  const { data: restaurants, isLoading, isError, refetch } = useQuery({
    queryKey: ['restaurants', search, cuisine, page],
    queryFn: () => restaurantsApi.getRestaurants(), // In a real app, pass search, cuisine, page to API
  });

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }} color="primary" gutterBottom>
          Discover Restaurants
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Find the best food and drinks in your area
        </Typography>
      </Box>

      <RestaurantFilters 
        search={search} 
        onSearchChange={setSearch} 
        cuisine={cuisine} 
        onCuisineChange={setCuisine} 
      />

      {isError ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="error" gutterBottom>
            Failed to load restaurants.
          </Typography>
          <Button variant="outlined" onClick={() => refetch()} sx={{ mt: 2 }}>
            Try Again
          </Button>
        </Box>
      ) : (
        <>
          <RestaurantList restaurants={restaurants} isLoading={isLoading} />
          
          <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
            <Pagination 
              count={5} 
              page={page} 
              onChange={handlePageChange} 
              color="primary" 
              size="large"
            />
          </Box>
        </>
      )}
    </Container>
  );
}
