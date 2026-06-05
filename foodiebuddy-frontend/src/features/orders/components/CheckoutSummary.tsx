'use client';

import { Box, Typography, Stack, Divider, Paper } from '@mui/material';
import { useCartStore } from '@/store/cartStore';

export default function CheckoutSummary() {
  const { items, totalPrice } = useCartStore();
  const subtotal = totalPrice();
  const tax = subtotal * 0.05;
  const deliveryFee = subtotal > 0 ? 5.00 : 0;
  const finalTotal = subtotal + tax + deliveryFee;

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>Your Order</Typography>
      
      <Stack spacing={2} sx={{ mb: 3 }}>
        {items.map((item) => (
          <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">
              {item.quantity} x {item.name}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Divider sx={{ my: 2 }} />
      
      <Stack spacing={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography color="text.secondary" variant="body2">Subtotal</Typography>
          <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography color="text.secondary" variant="body2">Tax (5%)</Typography>
          <Typography variant="body2">${tax.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography color="text.secondary" variant="body2">Delivery Fee</Typography>
          <Typography variant="body2">${deliveryFee.toFixed(2)}</Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Total</Typography>
          <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold' }}>
            ${finalTotal.toFixed(2)}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
