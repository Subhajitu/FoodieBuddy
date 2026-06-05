import { Box } from '@mui/material';

export default function AuthGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: 'background.default' }}>
      {children}
    </Box>
  );
}
