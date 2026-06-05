'use client';

import { Container, Typography, Box, Grid, Button } from '@mui/material';
import { useCartStore } from '@/store/cartStore';
import CartItemRow from '@/features/cart/components/CartItemRow';
import CartSummary from '@/features/cart/components/CartSummary';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartClient() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  
  // Hydration fix for persisted store
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  if (items.length === 0) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 12, textAlign: 'center' }}>
          <ShoppingCartOutlinedIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 3 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>Your cart is empty</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Looks like you haven&apos;t added anything to your cart yet.
          </Typography>
          <Button 
            component={Link} 
            href="/restaurants" 
            variant="contained" 
            size="large"
            sx={{ fontWeight: 'bold' }}
          >
            Start Ordering
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>
        Your Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {items.length} {items.length === 1 ? 'Item' : 'Items'}
            </Typography>
            <Button color="error" variant="text" onClick={clearCart} size="small">
              Clear All
            </Button>
          </Box>
          
          <Box>
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </Box>
          
          <Button 
            component={Link} 
            href="/restaurants" 
            variant="outlined" 
            sx={{ mt: 2, fontWeight: 'bold' }}
          >
            Add More Items
          </Button>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <CartSummary />
        </Grid>
      </Grid>
    </Container>
  );
}
