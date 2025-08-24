import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Dialog,
  Chip,
  Alert
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import CustomerForm from './CustomerForm';
import AddressList from './AddressList';

const CustomerDetail = ({ customer, onBack, onRefresh }) => {
  const [editMode, setEditMode] = useState(false);

  if (!customer) return null;

  return (
    <Box>
      <Button startIcon={<ArrowBack />} onClick={onBack} sx={{ mb: 2 }}>
        Back to List
      </Button>

      {customer.numAddresses === 1 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          This customer has only one address and cannot be deleted.
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Customer Information
            </Typography>
            <Typography><strong>Name:</strong> {customer.firstName} {customer.lastName}</Typography>
            <Typography><strong>Email:</strong> {customer.email}</Typography>
            <Typography><strong>Phone:</strong> {customer.phone}</Typography>
            <Typography><strong>Created:</strong> {new Date(customer.createdAt).toLocaleDateString()}</Typography>
            {customer.numAddresses === 1 && (
              <Chip 
                label="Only One Address" 
                color="primary" 
                size="small" 
                sx={{ mt: 1 }} 
              />
            )}
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={() => setEditMode(true)}
            >
              Edit Customer
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <AddressList customer={customer} onRefresh={onRefresh} />

      <Dialog open={editMode} onClose={() => setEditMode(false)} maxWidth="md" fullWidth>
        <CustomerForm
          customer={customer}
          onClose={() => {
            setEditMode(false);
            if (onRefresh) onRefresh();
          }}
        />
      </Dialog>
    </Box>
  );
};

export default CustomerDetail;