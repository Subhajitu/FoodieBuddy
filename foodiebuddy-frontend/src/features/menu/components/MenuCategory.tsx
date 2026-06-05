'use client';

import { Box, Typography, Divider, Badge } from '@mui/material';
import MenuItemCard from './MenuItemCard';
import { MenuItem } from '@/features/restaurants/types';

interface MenuCategoryProps {
  category: string;
  items: MenuItem[];
}

export default function MenuCategory({ category, items }: MenuCategoryProps) {
  return (
    <Box sx={{ mb: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ mr: 2, fontWeight: 'bold' }}>
          {category}
        </Typography>
        <Badge badgeContent={items.length} color="primary" sx={{ '& .MuiBadge-badge': { fontWeight: 'bold' } }} />
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </Box>
      <Divider sx={{ mt: 4 }} />
    </Box>
  );
}
