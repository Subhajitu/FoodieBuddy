'use client';

import { Card, CardContent, Typography, Box, Button, IconButton, Stack } from '@mui/material';
import { MenuItem } from '@/features/restaurants/types';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Image from 'next/image';

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    addItem(item, quantity);
    setQuantity(1); // Reset quantity after adding
  };

  return (
    <Card sx={{ display: 'flex', mb: 2, borderRadius: 3, overflow: 'hidden', border: 1, borderColor: 'divider', boxShadow: 'none' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }}>
                {item.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ fontWeight: 'medium' }}>
                ${item.price.toFixed(2)}
              </Typography>
            </Box>
            {item.imageUrl && (
              <Box sx={{ position: 'relative', width: 100, height: 100, borderRadius: 2, overflow: 'hidden', ml: 2 }}>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            )}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: '80%' }}>
            {item.description}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, pt: 0 }}>
          {!item.isAvailable ? (
            <Typography color="error" variant="body2" sx={{ fontWeight: 'bold' }}>Out of Stock</Typography>
          ) : (
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Stack direction="row" sx={{ alignItems: 'center', border: 1, borderColor: 'divider', borderRadius: 2 }}>
                <IconButton 
                  size="small" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography sx={{ px: 2, minWidth: 20, textAlign: 'center' }}>{quantity}</Typography>
                <IconButton 
                  size="small" 
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Stack>
              <Button variant="contained" color="primary" onClick={handleAdd} size="small">
                Add to Cart
              </Button>
            </Stack>
          )}
        </Box>
      </Box>
    </Card>
  );
}
