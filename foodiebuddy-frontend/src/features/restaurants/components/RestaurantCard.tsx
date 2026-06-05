'use client';

import { Card, CardContent, Typography, Box, Chip, CardActionArea } from '@mui/material';
import { Restaurant } from '../types';
import Link from 'next/link';

import Image from 'next/image';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea component={Link} href={`/restaurants/${restaurant.id}`} sx={{ flexGrow: 1 }}>
        <Box sx={{ position: 'relative', height: 160 }}>
          <Image
            src={restaurant.imageUrl || 'https://via.placeholder.com/300x160?text=FoodieBuddy'}
            alt={restaurant.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Box>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
              {restaurant.name}
            </Typography>
            <Chip 
              label={restaurant.rating || 'New'} 
              size="small" 
              color="primary" 
              sx={{ fontWeight: 'bold' }} 
            />
          </Box>
          <Typography variant="body2" color="text.secondary" noWrap>
            {restaurant.cuisine}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {restaurant.address}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
