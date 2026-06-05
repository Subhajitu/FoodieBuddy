'use client';

import { Container, Typography, Box, Skeleton, Button, Stack, Fab, Badge } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { restaurantsApi } from '@/services/restaurantsApi';
import { useParams, useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import MenuCategory from '@/features/menu/components/MenuCategory';
import { useCartStore } from '@/store/cartStore';
import { MenuItem } from '@/features/restaurants/types';

export default function MenuPage() {
  const { id } = useParams();
  const router = useRouter();
  const totalItems = useCartStore((state) => state.totalItems());

  const { data: restaurant } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => restaurantsApi.getRestaurantById(id as string),
  });

  const { data: menuItems, isLoading, isError } = useQuery({
    queryKey: ['restaurant-menu', id],
    queryFn: () => restaurantsApi.getMenuByRestaurantId(id as string),
  });

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Skeleton width="30%" height={40} sx={{ mb: 2 }} />
        <Skeleton width="60%" height={60} sx={{ mb: 4 }} />
        <Skeleton variant="rectangular" height={200} sx={{ mb: 4, borderRadius: 2 }} />
        <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
      </Container>
    );
  }

  if (isError || !menuItems) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h5" color="error">Failed to load menu</Typography>
          <Button component={Link} href={`/restaurants/${id}`} sx={{ mt: 2 }}>Back to Restaurant</Button>
        </Box>
      </Container>
    );
  }

  // Group items by category
  const categories = menuItems.reduce((acc: Record<string, MenuItem[]>, item: MenuItem) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <Container maxWidth="lg" sx={{ pb: 10 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 4, alignItems: 'center' }}>
        <Button 
          component={Link} 
          href={`/restaurants/${id}`} 
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }} color="primary">
            {restaurant?.name || 'Restaurant'} Menu
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {menuItems.length} items available
          </Typography>
        </Box>
      </Stack>

      {Object.entries(categories).map(([category, items]) => (
        <MenuCategory key={category} category={category} items={items as MenuItem[]} />
      ))}

      {totalItems > 0 && (
        <Fab
          color="primary"
          aria-label="cart"
          sx={{ position: 'fixed', bottom: 32, right: 32 }}
          onClick={() => router.push('/cart')}
        >
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </Fab>
      )}
    </Container>
  );
}
