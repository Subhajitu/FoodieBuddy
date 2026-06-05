'use client';

import { Box, Typography, Stack, Button, Divider, Paper, TextField } from '@mui/material';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

export default function CartSummary() {
  const totalPrice = useCartStore((state) => state.totalPrice());
  
  const taxRate = 0.05; // 5% tax
  const deliveryFee = totalPrice > 0 ? 5.00 : 0;
  const tax = totalPrice * taxRate;
  const finalTotal = totalPrice + tax + deliveryFee;

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 4, position: 'sticky', top: 100 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>Order Summary</Typography>
      
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography color="text.secondary">Subtotal</Typography>
          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>${totalPrice.toFixed(2)}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography color="text.secondary">Tax (5%)</Typography>
          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>${tax.toFixed(2)}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography color="text.secondary">Delivery Fee</Typography>
          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>${deliveryFee.toFixed(2)}</Typography>
        </Box>
        
        <Divider sx={{ my: 1 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total</Typography>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
            ${finalTotal.toFixed(2)}
          </Typography>
        </Box>
      </Stack>
      
      <Box sx={{ mt: 4 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Promo Code"
          sx={{ mb: 2 }}
        />
        <Button 
          variant="contained" 
          fullWidth 
          size="large" 
          component={Link}
          href="/checkout"
          disabled={totalPrice === 0}
          sx={{ py: 1.5, fontWeight: 'bold' }}
        >
          Proceed to Checkout
        </Button>
      </Box>
      
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Estimated delivery time: 30-45 mins
        </Typography>
      </Box>
    </Paper>
  );
}
