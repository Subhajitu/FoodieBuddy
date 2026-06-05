'use client';

import { Container, Typography, Box, Link as MuiLink } from '@mui/material';
import { Card } from '@/components/common/Card';
import RegisterForm from '@/features/auth/RegisterForm';
import Link from 'next/link';

export default function RegisterClient() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
          Join FoodieBuddy
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create an account to start ordering delicious food
        </Typography>
      </Box>

      <Card>
        <RegisterForm />
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <MuiLink component={Link} href="/login" underline="hover">
              Login here
            </MuiLink>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
}
