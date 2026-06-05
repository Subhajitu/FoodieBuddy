'use client';

import { Box, Typography, IconButton, Stack, Divider } from '@mui/material';
import { CartItem, useCartStore } from '@/store/cartStore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <Box sx={{ mb: 2 }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Box sx={{ position: 'relative', width: 80, height: 80, borderRadius: 2, overflow: 'hidden', flexShrink: 0 }}>
          <Image
            src={item.imageUrl || 'https://via.placeholder.com/80/808080/FFFFFF?text=Food'}
            alt={item.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>
        
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            ${item.price.toFixed(2)} each
          </Typography>
          
          <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1}>
            <Stack direction="row" sx={{ alignItems: 'center', border: 1, borderColor: 'divider', borderRadius: 1 }}>
              <IconButton 
                size="small" 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                aria-label={`Decrease quantity of ${item.name}`}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography sx={{ px: 1, minWidth: 20, textAlign: 'center', fontSize: '0.9rem' }}>
                {item.quantity}
              </Typography>
              <IconButton 
                size="small" 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                aria-label={`Increase quantity of ${item.name}`}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Stack>
            
            <IconButton 
              color="error" 
              size="small" 
              onClick={() => removeItem(item.id)}
              aria-label={`Remove ${item.name} from cart`}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
        
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: 80, textAlign: 'right' }}>
          ${(item.price * item.quantity).toFixed(2)}
        </Typography>
      </Stack>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
}
