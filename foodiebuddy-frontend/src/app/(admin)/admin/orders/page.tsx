'use client';

import { Container, Typography, Box, IconButton, Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/services/adminApi';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import { OrderStatus } from '@/features/orders/types';

const statusColors: Record<OrderStatus, "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"> = {
  PENDING: 'warning',
  CONFIRMED: 'info',
  PREPARING: 'info',
  OUT_FOR_DELIVERY: 'primary',
  DELIVERED: 'success',
  CANCELLED: 'error',
};

export default function OrderManagementPage() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: () => adminApi.getAllOrders(),
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'restaurantName', headerName: 'Restaurant', width: 200, flex: 1 },
    { field: 'customerName', headerName: 'Customer', width: 180 },
    { 
      field: 'totalPrice', 
      headerName: 'Amount', 
      width: 120,
      valueFormatter: (value) => `$${(value as number).toFixed(2)}`
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          color={statusColors[params.value as OrderStatus] || 'default'} 
          size="small" 
          sx={{ fontWeight: 'bold', mt: 1 }} 
        />
      )
    },
    { 
      field: 'createdAt', 
      headerName: 'Date', 
      width: 180,
      valueFormatter: (value) => new Date(value).toLocaleString()
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: () => (
        <Box>
          <IconButton size="small" color="primary" aria-label="View order details">
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" aria-label="Edit order">
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const mockOrders = [
    { id: 'ORD-123', restaurantName: 'Pizza Hut', customerName: 'John Doe', totalPrice: 45.50, status: 'DELIVERED', createdAt: new Date().toISOString() },
    { id: 'ORD-124', restaurantName: 'Burger King', customerName: 'Jane Smith', totalPrice: 22.00, status: 'PREPARING', createdAt: new Date().toISOString() },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Order Management</Typography>
        <Typography variant="body1" color="text.secondary">Monitor and manage all system orders</Typography>
      </Box>

      <Box sx={{ height: 600, width: '100%', bgcolor: 'background.paper', borderRadius: 4, border: 1, borderColor: 'divider', overflow: 'hidden' }}>
        <DataGrid
          rows={orders || mockOrders}
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
