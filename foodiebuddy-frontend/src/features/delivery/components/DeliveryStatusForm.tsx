'use client';

import { Box, Typography, Button, Step, Stepper, StepLabel, CircularProgress, Alert } from '@mui/material';
import { Delivery, DeliveryStatus } from '../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deliveryApi } from '@/services/deliveryApi';
import { useState } from 'react';

interface DeliveryStatusFormProps {
  delivery: Delivery;
}

const steps: DeliveryStatus[] = ['ASSIGNED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED'];

const getNextStatus = (current: DeliveryStatus): DeliveryStatus | null => {
  const index = steps.indexOf(current);
  if (index !== -1 && index < steps.length - 1) {
    return steps[index + 1];
  }
  return null;
};

export default function DeliveryStatusForm({ delivery }: DeliveryStatusFormProps) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  
  const nextStatus = getNextStatus(delivery.status);

  const mutation = useMutation({
    mutationFn: (status: DeliveryStatus) => deliveryApi.updateStatus(delivery.id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['delivery', delivery.id] });
      queryClient.invalidateQueries({ queryKey: ['assigned-deliveries'] });
    },
    onError: (err: unknown) => {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message || 'Failed to update status');
    }
  });

  const handleUpdate = () => {
    if (nextStatus) {
      mutation.mutate(nextStatus);
    }
  };

  const getActiveStep = () => steps.indexOf(delivery.status);

  return (
    <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 4, border: 1, borderColor: 'divider' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 4 }}>Delivery Progress</Typography>
      
      <Stepper activeStep={getActiveStep()} alternativeLabel sx={{ mb: 6 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label.replace(/_/g, ' ')}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Box sx={{ textAlign: 'center' }}>
        {nextStatus ? (
          <Button
            variant="contained"
            size="large"
            onClick={handleUpdate}
            disabled={mutation.isPending}
            sx={{ px: 6, py: 1.5, fontWeight: 'bold' }}
          >
            {mutation.isPending ? <CircularProgress size={24} /> : `Mark as ${nextStatus.replace(/_/g, ' ')}`}
          </Button>
        ) : (
          <Alert severity="success">Delivery Completed!</Alert>
        )}
      </Box>
    </Box>
  );
}
