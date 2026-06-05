'use client';

import { useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 15, textAlign: 'center' }}>
        <Typography variant="h4" color="error" gutterBottom>Something went wrong!</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {error.message || 'An unexpected error occurred. Our team has been notified.'}
        </Typography>
        <Button onClick={() => reset()} variant="contained" color="primary">
          Try again
        </Button>
      </Box>
    </Container>
  );
}
