import React, { useState } from 'react';
import {
  TextField,
  Box,
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material';
import { FilterList, Clear, ExpandMore } from '@mui/icons-material';

const SearchBar = ({ onSearch, onFilterChange, onClearFilters, searchQuery, searchFilters }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery || '');
  const [localFilters, setLocalFilters] = useState(searchFilters || {
    city: '',
    state: '',
    pincode: ''
  });

  const handleSearchChange = (value) => {
    setLocalQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...localFilters, [filterType]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    setLocalQuery('');
    setLocalFilters({ city: '', state: '', pincode: '' });
    onClearFilters();
  };

  return (
    <Box>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Search by name, email, or phone..."
            value={localQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={() => setShowAdvanced(!showAdvanced)}
            fullWidth
          >
            Advanced Filters
          </Button>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Button
            variant="outlined"
            startIcon={<Clear />}
            onClick={handleClearFilters}
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
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="City"
                  value={localFilters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="State"
                  value={localFilters.state}
                  onChange={(e) => handleFilterChange('state', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Pincode"
                  value={localFilters.pincode}
                  onChange={(e) => handleFilterChange('pincode', e.target.value)}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Display active filters */}
      {(localFilters.city || localFilters.state || localFilters.pincode) && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Active Filters:</Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
            {localFilters.city && (
              <Box sx={{ bgcolor: 'primary.main', color: 'white', px: 1, borderRadius: 1 }}>
                City: {localFilters.city}
              </Box>
            )}
            {localFilters.state && (
              <Box sx={{ bgcolor: 'primary.main', color: 'white', px: 1, borderRadius: 1 }}>
                State: {localFilters.state}
              </Box>
            )}
            {localFilters.pincode && (
              <Box sx={{ bgcolor: 'primary.main', color: 'white', px: 1, borderRadius: 1 }}>
                Pincode: {localFilters.pincode}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;