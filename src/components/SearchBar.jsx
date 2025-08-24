/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  TextField,
  Box,
  MenuItem,
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material';
import { FilterList, Clear, ExpandMore } from '@mui/icons-material';

const SearchBar = ({ customers, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    city: '',
    state: '',
    pincode: ''
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
    applyFilters(value, filters);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    applyFilters(searchTerm, newFilters);
  };

  const applyFilters = (searchValue, filterValues) => {
    let filtered = customers;

    // Apply text search
    if (searchValue) {
      filtered = filtered.filter(customer =>
        `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchValue.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        customer.phone.includes(searchValue)
      );
    }

    // Apply advanced filters
    if (filterValues.city) {
      filtered = filtered.filter(customer =>
        customer.addresses.some(address => 
          address.city.toLowerCase().includes(filterValues.city.toLowerCase())
        )
      );
    }

    if (filterValues.state) {
      filtered = filtered.filter(customer =>
        customer.addresses.some(address => 
          address.state.toLowerCase().includes(filterValues.state.toLowerCase())
        )
      );
    }

    if (filterValues.pincode) {
      filtered = filtered.filter(customer =>
        customer.addresses.some(address => 
          address.pincode.includes(filterValues.pincode)
        )
      );
    }

    onSearch(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ city: '', state: '', pincode: '' });
    onSearch(customers);
  };

  // Get unique values for filter dropdowns
  const cities = [...new Set(customers.flatMap(c => c.addresses.map(a => a.city)))].filter(Boolean);
  const states = [...new Set(customers.flatMap(c => c.addresses.map(a => a.state)))].filter(Boolean);
  const pincodes = [...new Set(customers.flatMap(c => c.addresses.map(a => a.pincode)))].filter(Boolean);

  return (
    <Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={() => setShowAdvanced(!showAdvanced)}
            fullWidth
          >
            Advanced Filters
          </Button>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            variant="outlined"
            startIcon={<Clear />}
            onClick={clearFilters}
            fullWidth
          >
            Clear Filters
          </Button>
        </Grid>
      </Grid>

      {showAdvanced && (
        <Accordion expanded={showAdvanced} sx={{ mt: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Address Filters</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="City"
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="State"
                  value={filters.state}
                  onChange={(e) => handleFilterChange('state', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Pincode"
                  value={filters.pincode}
                  onChange={(e) => handleFilterChange('pincode', e.target.value)}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Display active filters */}
      {(filters.city || filters.state || filters.pincode) && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Active Filters:</Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
            {filters.city && (
              <Box sx={{ bgcolor: 'primary.main', color: 'white', px: 1, borderRadius: 1 }}>
                City: {filters.city}
              </Box>
            )}
            {filters.state && (
              <Box sx={{ bgcolor: 'primary.main', color: 'white', px: 1, borderRadius: 1 }}>
                State: {filters.state}
              </Box>
            )}
            {filters.pincode && (
              <Box sx={{ bgcolor: 'primary.main', color: 'white', px: 1, borderRadius: 1 }}>
                Pincode: {filters.pincode}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;