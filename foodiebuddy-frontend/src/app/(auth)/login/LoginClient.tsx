'use client';

import { Container, Typography, Box, Link as MuiLink } from '@mui/material';
import { Card } from '@/components/common/Card';
import LoginForm from '@/features/auth/LoginForm';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Alert } from '@mui/material';
import { Suspense } from 'react';

function LoginContent() {
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
          Welcome Back
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Login to your FoodieBuddy account
        </Typography>
      </Box>

      {registered && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Registration successful! Please login with your credentials.
        </Alert>
      )}

      <Card>
        <LoginForm />
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            Don&apos;t have an account?{' '}
            <MuiLink component={Link} href="/register" underline="hover">
              Register here
            </MuiLink>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
}

export default function LoginClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
