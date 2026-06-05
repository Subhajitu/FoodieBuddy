'use client';

import { Container, Typography, Box, Button, IconButton, Rating } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { restaurantsApi } from '@/services/restaurantsApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function RestaurantManagementPage() {
  const { data: restaurants, isLoading } = useQuery({
    queryKey: ['admin-restaurants'],
    queryFn: () => restaurantsApi.getRestaurants(),
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Restaurant Name', width: 200, flex: 1 },
    { field: 'cuisine', headerName: 'Cuisine', width: 150 },
    { 
      field: 'rating', 
      headerName: 'Rating', 
      width: 150,
      renderCell: (params) => (
        <Rating value={params.value} readOnly size="small" sx={{ mt: 1.5 }} />
      )
    },
    { 
      field: 'isAvailable', 
      headerName: 'Status', 
      width: 120,
      renderCell: (params) => (
        <Box sx={{ 
          px: 1, 
          py: 0.5, 
          borderRadius: 1, 
          bgcolor: params.value ? 'success.light' : 'error.light',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '0.75rem',
          display: 'inline-block',
          mt: 1
        }}>
          {params.value ? 'OPEN' : 'CLOSED'}
        </Box>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: () => (
        <Box>
          <IconButton size="small" color="primary" aria-label="Edit restaurant">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" aria-label="Delete restaurant">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Restaurant Management</Typography>
          <Typography variant="body1" color="text.secondary">Manage restaurant profiles and availability</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />}>Add Restaurant</Button>
      </Box>

      <Box sx={{ height: 600, width: '100%', bgcolor: 'background.paper', borderRadius: 4, border: 1, borderColor: 'divider', overflow: 'hidden' }}>
        <DataGrid
          rows={restaurants || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20, 50]}
          disableRowSelectionOnClick
          loading={isLoading}
          sx={{ border: 'none' }}
        />
      </Box>
    </Container>
  );
}
