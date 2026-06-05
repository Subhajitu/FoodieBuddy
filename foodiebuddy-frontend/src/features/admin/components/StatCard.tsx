'use client';

import { Card, CardContent, Typography, Box, Stack } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

export default function StatCard({ title, value, icon, color = 'primary.main' }: StatCardProps) {
  return (
    <Card sx={{ borderRadius: 4, height: '100%', border: 1, borderColor: 'divider', boxShadow: 'none' }}>
      <CardContent>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Box sx={{ 
            p: 1.5, 
            borderRadius: 3, 
            bgcolor: `${color}15`, // Lighten the color
            color: color,
            display: 'flex'
          }}>
            {icon}
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
              {title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {value}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
