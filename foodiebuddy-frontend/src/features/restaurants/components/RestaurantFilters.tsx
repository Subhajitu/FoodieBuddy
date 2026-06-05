'use client';

import { TextField, MenuItem, Stack, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface RestaurantFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  cuisine: string;
  onCuisineChange: (value: string) => void;
}

const cuisines = [
  'All',
  'Italian',
  'Indian',
  'Chinese',
  'American',
  'Japanese',
  'Mexican',
];

export default function RestaurantFilters({
  search,
  onSearchChange,
  cuisine,
  onCuisineChange,
}: RestaurantFiltersProps) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
      <TextField
        placeholder="Search for restaurants..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        select
        label="Cuisine"
        value={cuisine}
        onChange={(e) => onCuisineChange(e.target.value)}
        sx={{ minWidth: 200 }}
      >
        {cuisines.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}
