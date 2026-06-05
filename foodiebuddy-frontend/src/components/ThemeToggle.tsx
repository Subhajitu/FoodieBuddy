'use client';

import { IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from './Providers';

export default function ThemeToggle() {
  const theme = useTheme();
  const colorMode = useColorMode();

  return (
    <IconButton 
      onClick={colorMode.toggleColorMode} 
      color="inherit"
      aria-label={`Switch to ${theme.palette.mode === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
