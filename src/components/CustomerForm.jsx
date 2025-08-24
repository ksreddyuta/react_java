import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Box
} from '@mui/material';
import { addCustomer, updateCustomer } from '../services/api';

const CustomerForm = ({ open, customer, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addresses: []
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (customer) {
      setFormData({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        addresses: customer.addresses || []
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        addresses: []
      });
    }
    setErrors({});
    setTouched({});
  }, [customer, open]);

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
        if (!value) return 'First name is required';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'First name should contain only letters';
        return '';
      case 'lastName':
        if (!value) return 'Last name is required';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Last name should contain only letters';
        return '';
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email is not valid';
        return '';
      case 'phone':
        if (!value) return 'Phone is required';
        if (!/^\d{10}$/.test(value)) return 'Phone number must be 10 digits';
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, formData[name]);
    setErrors({ ...errors, [name]: error });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validate field if it's been touched before
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'addresses') {
        newErrors[key] = validateField(key, formData[key]);
      }
    });
    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true
    });
    return Object.values(newErrors).every(x => x === '');
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (customer) {
        await updateCustomer({ ...formData, id: customer.id });
      } else {
        await addCustomer(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving customer:', error);
      alert('Error saving customer: ' + error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {customer ? 'Edit Customer' : 'Add New Customer'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.firstName}
                helperText={errors.firstName}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.lastName}
                helperText={errors.lastName}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.email}
                helperText={errors.email}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                name="phone"
                label="Phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.phone}
                helperText={errors.phone}
                required
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {customer ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomerForm;