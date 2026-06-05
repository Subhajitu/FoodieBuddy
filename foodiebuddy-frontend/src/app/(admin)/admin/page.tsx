'use client';

import { Container, Typography, Box, Grid, Alert } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/services/adminApi';
import StatCard from '@/features/admin/components/StatCard';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function AdminDashboardPage() {
  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminApi.getStats(),
    retry: false, // For development ease
  });

  // Mock stats for demonstration if API fails or is loading
  const mockStats = {
    totalUsers: 1250,
    totalOrders: 450,
    totalRestaurants: 85,
    totalRevenue: 15200.50,
  };

  const displayStats = stats || mockStats;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Overview of system performance and activity
        </Typography>
      </Box>

      {isError && (
        <Alert severity="warning" sx={{ mb: 4 }}>
          Unable to fetch real-time stats. Showing sample data.
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard 
            title="Total Users" 
            value={isLoading ? '...' : displayStats.totalUsers} 
            icon={<PeopleIcon />} 
            color="#2196f3"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard 
            title="Total Orders" 
            value={isLoading ? '...' : displayStats.totalOrders} 
            icon={<ShoppingBagIcon />} 
            color="#ff9800"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard 
            title="Restaurants" 
            value={isLoading ? '...' : displayStats.totalRestaurants} 
            icon={<RestaurantIcon />} 
            color="#4caf50"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard 
            title="Revenue" 
            value={isLoading ? '...' : `$${displayStats.totalRevenue.toFixed(2)}`} 
            icon={<AttachMoneyIcon />} 
            color="#f44336"
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 4, border: 1, borderColor: 'divider', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="text.disabled">Chart Visualization Coming Soon</Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 4, border: 1, borderColor: 'divider', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="text.disabled">Recent Activity Feed</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
