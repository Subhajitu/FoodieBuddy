'use client';

import { Box, Container, Typography, Link as MuiLink, Grid } from '@mui/material';
import Link from 'next/link';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, mt: 'auto', borderTop: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }} gutterBottom>
              FoodieBuddy
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Delivering happiness to your doorstep, one meal at a time.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <MuiLink component={Link} href="/" color="inherit" sx={{ display: 'block', mb: 1 }}>Home</MuiLink>
            <MuiLink component={Link} href="/restaurants" color="inherit" sx={{ display: 'block', mb: 1 }}>Restaurants</MuiLink>
            <MuiLink component={Link} href="/about" color="inherit" sx={{ display: 'block', mb: 1 }}>About Us</MuiLink>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: support@foodiebuddy.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 234 567 890
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 5 }}>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            {'Copyright © '}
            <MuiLink color="inherit" href="/">
              FoodieBuddy
            </MuiLink>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
