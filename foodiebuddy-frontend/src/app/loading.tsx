'use client';

import { Box, CircularProgress, Container, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '60vh' 
      }}>
        <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
        <Typography variant="h6" color="text.secondary">
          Loading FoodieBuddy...
        </Typography>
      </Box>
    </Container>
  );
}
