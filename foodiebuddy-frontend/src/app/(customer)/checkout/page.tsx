'use client';

import { Container, Typography, Box, Grid, TextField, Stack, Button, Alert, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, CheckoutInput } from '@/features/orders/orderSchemas';
import { useCartStore } from '@/store/cartStore';
import CheckoutSummary from '@/features/orders/components/CheckoutSummary';
import { ordersApi } from '@/services/ordersApi';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
  });

  if (!isHydrated) return null;

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const onSubmit = async (data: CheckoutInput) => {
    setLoading(true);
    setError(null);
    try {
      const orderData = {
        items: items.map((i) => ({ menuItemId: i.id, quantity: i.quantity })),
        deliveryAddress: data.address,
        paymentInfo: { ...data.payment, type: 'CARD' },
      };
      await ordersApi.placeOrder(orderData);
      clearCart();
      router.push('/orders?success=true');
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>Checkout</Typography>

      {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={4}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Delivery Address</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Street Address"
                      {...register('address.street')}
                      error={!!errors.address?.street}
                      helperText={errors.address?.street?.message}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="City"
                      {...register('address.city')}
                      error={!!errors.address?.city}
                      helperText={errors.address?.city?.message}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="State"
                      {...register('address.state')}
                      error={!!errors.address?.state}
                      helperText={errors.address?.state?.message}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="ZIP Code"
                      {...register('address.zipCode')}
                      error={!!errors.address?.zipCode}
                      helperText={errors.address?.zipCode?.message}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Payment Details</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Card Number"
                      {...register('payment.cardNumber')}
                      error={!!errors.payment?.cardNumber}
                      helperText={errors.payment?.cardNumber?.message}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Expiry Date (MM/YY)"
                      placeholder="MM/YY"
                      {...register('payment.expiryDate')}
                      error={!!errors.payment?.expiryDate}
                      helperText={errors.payment?.expiryDate?.message}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="CVV"
                      type="password"
                      {...register('payment.cvv')}
                      error={!!errors.payment?.cvv}
                      helperText={errors.payment?.cvv?.message}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3}>
              <CheckoutSummary />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                sx={{ py: 1.5, fontWeight: 'bold' }}
              >
                {loading ? <CircularProgress size={24} /> : 'Place Order'}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
