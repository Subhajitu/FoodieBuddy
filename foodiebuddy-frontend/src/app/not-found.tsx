'use client';

import { Container, Typography, Box, Button } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 15, textAlign: 'center' }}>
        <Typography variant="h1" color="primary" sx={{ fontWeight: 'bold' }}>404</Typography>
        <Typography variant="h4" gutterBottom>Page Not Found</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Oops! The page you are looking for doesn&apos;t exist or has been moved.
        </Typography>
        <Button component={Link} href="/" variant="contained" size="large">
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}
