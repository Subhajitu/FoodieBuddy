'use client';

import { Container, Typography, Box, Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/services/adminApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function UserManagementPage() {
  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => adminApi.getUsers(),
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Full Name', width: 200, flex: 1 },
    { field: 'email', headerName: 'Email', width: 250, flex: 1 },
    { 
      field: 'role', 
      headerName: 'Role', 
      width: 150,
      renderCell: (params) => (
        <Box sx={{ 
          px: 1, 
          py: 0.5, 
          borderRadius: 1, 
          bgcolor: params.value === 'ADMIN' ? 'error.light' : params.value === 'DELIVERY' ? 'info.light' : 'success.light',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '0.75rem',
          display: 'inline-block'
        }}>
          {params.value}
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
          <IconButton size="small" color="primary" aria-label="Edit user">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" aria-label="Delete user">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const mockUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'ADMIN' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'USER' },
    { id: '3', name: 'Bob Delivery', email: 'bob@example.com', role: 'DELIVERY' },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>User Management</Typography>
          <Typography variant="body1" color="text.secondary">Manage system users and their roles</Typography>
        </Box>
        <Button variant="contained" startIcon={<PersonAddIcon />}>Add User</Button>
      </Box>

      <Box sx={{ height: 600, width: '100%', bgcolor: 'background.paper', borderRadius: 4, border: 1, borderColor: 'divider', overflow: 'hidden' }}>
        <DataGrid
          rows={users || mockUsers}
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
