'use client';

import { AppBar, Toolbar, Typography, Button, Stack, Container, Badge } from '@mui/material';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import ThemeToggle from '@/components/ThemeToggle';
import { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface NavLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const totalItems = useCartStore((state) => state.totalItems());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const customerLinks: NavLink[] = [
    { label: 'Restaurants', href: '/' },
    { label: 'Orders', href: '/orders' },
    { 
      label: 'Cart', 
      href: '/cart', 
      icon: <Badge badgeContent={isHydrated ? totalItems : 0} color="primary"><ShoppingCartIcon fontSize="small" /></Badge> 
    },
  ];

  const adminLinks: NavLink[] = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Restaurants', href: '/admin/restaurants' },
    { label: 'Users', href: '/admin/users' },
  ];

  const deliveryLinks: NavLink[] = [
    { label: 'Tasks', href: '/delivery' },
    { label: 'Profile', href: '/delivery/profile' },
  ];

  const getLinks = (): NavLink[] => {
    if (!user) return [{ label: 'Home', href: '/' }];
    switch (user.role) {
      case 'ADMIN': return adminLinks;
      case 'DELIVERY': return deliveryLinks;
      default: return customerLinks;
    }
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'primary.main', 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            FoodieBuddy
          </Typography>

          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            {getLinks().map((link) => (
              <Button 
                key={link.href} 
                component={Link} 
                href={link.href} 
                color="inherit"
                startIcon={'icon' in link ? link.icon : null}
              >
                {link.label}
              </Button>
            ))}
            
            <ThemeToggle />

            {user ? (
              <Button onClick={logout} variant="outlined" color="primary">
                Logout
              </Button>
            ) : (
              <Button component={Link} href="/login" variant="contained" color="primary">
                Login
              </Button>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
