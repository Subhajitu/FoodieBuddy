'use client';
import { Container, Typography, Box, Stack, CircularProgress, Alert } from '@mui/material';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Card } from '@/components/common/Card';
import ThemeToggle from '@/components/ThemeToggle';
import { useQuery } from '@tanstack/react-query';
import { restaurantsApi } from '@/services/restaurantsApi';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

export default function HomeClient() {
  const { user, logout } = useAuthStore();
  const { data: restaurants, isLoading, isError, refetch, error } = useQuery({
    queryKey: ['restaurants'],
    queryFn: restaurantsApi.getRestaurants,
    enabled: false,
  });

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
          FoodieBuddy
        </Typography>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <ThemeToggle />
          {user ? (
            <Button onClick={logout} variant="outlined" color="secondary">Logout</Button>
          ) : (
            <Button component={Link} href="/login">Login</Button>
          )}
        </Stack>
      </Box>

      <Stack spacing={4}>
        {user && (
          <Alert severity="info">
            Logged in as: <strong>{user.name}</strong> ({user.role})
          </Alert>
        )}

        <Card title="API Layer Test">
          <Typography variant="body1" gutterBottom>
            Click the button below to test the <code>restaurantsApi.getRestaurants()</code> call. 
            (Note: This will fail if the backend is not running, which is expected).
          </Typography>
          <Button onClick={() => refetch()} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Fetch Restaurants'}
          </Button>

          {isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Error fetching restaurants: {(error as Error)?.message || 'Unknown error'}
            </Alert>
          )}

          {restaurants && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Results:</Typography>
              <pre>{JSON.stringify(restaurants, null, 2)}</pre>
            </Box>
          )}
        </Card>

        <Card title="Buttons">
          <Stack direction="row" spacing={2}>
            <Button>Primary Button</Button>
            <Button color="secondary">Secondary Button</Button>
            <Button variant="outlined">Outlined Button</Button>
            <Button variant="text">Text Button</Button>
          </Stack>
        </Card>

        <Card title="Typography">
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="body1">
            This is body text. FoodieBuddy makes it easy to find and order delicious food from local restaurants.
          </Typography>
        </Card>

        <Card title="Inputs">
          <Stack spacing={2}>
            <Input label="Standard Input" placeholder="Type something..." />
            <Input label="Password" type="password" />
            <Input label="Error State" error helperText="Something went wrong" />
          </Stack>
        </Card>

        <Card title="Cards and Containers">
          <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
            <Typography variant="body2">
              This is a container with background.default inside a Card with background.paper.
            </Typography>
          </Box>
        </Card>
      </Stack>
    </Container>
  );
}
