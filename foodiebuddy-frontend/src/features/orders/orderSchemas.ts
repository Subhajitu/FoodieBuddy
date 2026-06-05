import { z } from 'zod';

export const checkoutSchema = z.object({
  address: z.object({
    street: z.string().min(5, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zipCode: z.string().min(5, 'Valid ZIP code is required'),
  }),
  payment: z.object({
    cardNumber: z.string().length(16, 'Card number must be 16 digits'),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry must be in MM/YY format'),
    cvv: z.string().length(3, 'CVV must be 3 digits'),
  }),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
