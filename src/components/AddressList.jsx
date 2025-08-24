import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Alert
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import AddressForm from './AddressForm';
import { deleteAddress } from '../services/api';

const AddressList = ({ customer, onRefresh }) => {
  const [open, setOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDelete = async () => {
    try {
      await deleteAddress(deleteConfirm.id);
      setDeleteConfirm(null);
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error deleting address:', error);
      alert('Error deleting address: ' + error.message);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Addresses
          {customer.numAddresses === 1 && (
            <Chip 
              label="Only One Address" 
              color="primary" 
              size="small" 
              sx={{ ml: 2 }} 
            />
          )}
        </Typography>
        <Button
          startIcon={<Add />}
          variant="outlined"
          onClick={() => setOpen(true)}
        >
          Add Address
        </Button>
      </Box>

      {customer.numAddresses === 1 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          This customer has only one address. Adding at least one more address will allow customer deletion.
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Street</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Pincode</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customer.addresses.map((address) => (
              <TableRow key={address.id}>
                <TableCell>
                  {address.street}
                  {address.street2 && <div>{address.street2}</div>}
                </TableCell>
                <TableCell>{address.city}</TableCell>
                <TableCell>{address.state}</TableCell>
                <TableCell>{address.pincode}</TableCell>
                <TableCell>{address.country}</TableCell>
                <TableCell>
                  <IconButton onClick={() => setEditAddress(address)}>
                    <Edit />
                  </IconButton>
                  <IconButton 
                    onClick={() => setDeleteConfirm(address)}
                    disabled={customer.numAddresses === 1}
                    sx={{ 
                      opacity: customer.numAddresses === 1 ? 0.5 : 1,
                      '&:hover': {
                        backgroundColor: customer.numAddresses === 1 ? 'transparent' : 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {customer.addresses.length === 0 && (
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          No addresses found for this customer.
        </Typography>
      )}

      <AddressForm
        open={open || !!editAddress}
        customerId={customer.id}
        address={editAddress}
        onClose={() => {
          setOpen(false);
          setEditAddress(null);
          if (onRefresh) onRefresh();
        }}
      />

      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this address?
          {customer.numAddresses === 1 && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              This is the only address for this customer and cannot be deleted.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Cancel</Button>
          <Button 
            onClick={handleDelete} 
            color="error"
            disabled={customer.numAddresses === 1}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddressList;