import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Box,
  Typography,
  TablePagination,
  TableSortLabel
} from '@mui/material';
import { Edit, Delete, Add, Visibility } from '@mui/icons-material';
import CustomerForm from './CustomerForm';
import SearchBar from './SearchBar';
import { getAllCustomers, deleteCustomer, searchCustomers, advancedSearchCustomers } from '../services/api';

const CustomerList = ({ onSelectCustomer, refreshTrigger }) => {
  const [customers, setCustomers] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [open, setOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Sorting state
  const [orderBy, setOrderBy] = useState('lastName');
  const [order, setOrder] = useState('asc');

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    city: '',
    state: '',
    pincode: ''
  });

  const fetchCustomers = useCallback(async () => {
    try {
      let response;
      
      if (searchQuery) {
        // Simple search
        response = await searchCustomers(
          searchQuery,
          page,
          rowsPerPage,
          orderBy,
          order
        );
      } else if (searchFilters.city || searchFilters.state || searchFilters.pincode) {
        // Advanced search
        response = await advancedSearchCustomers(
          searchFilters,
          page,
          rowsPerPage,
          orderBy,
          order
        );
      } else {
        // Get all customers
        response = await getAllCustomers(
          page,
          rowsPerPage,
          orderBy,
          order
        );
      }
      
      setCustomers(response.content);
      setTotalElements(response.totalElements);
    } catch (error) {
      console.error('Error fetching customers:', error);
      alert('Error fetching customers: ' + error.message);
    }
  }, [page, rowsPerPage, orderBy, order, searchQuery, searchFilters]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers, refreshTrigger]);

  const handleDelete = async () => {
    try {
      await deleteCustomer(deleteConfirm.id);
      setDeleteConfirm(null);
      fetchCustomers(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Error deleting customer: ' + error.message);
    }
  };

  // Sorting function
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Pagination functions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Search functions
  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(0);
  };

  const handleFilterChange = (filters) => {
    setSearchFilters(filters);
    setPage(0);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSearchFilters({ city: '', state: '', pincode: '' });
    setPage(0);
  };

  return (
    <Box>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid xs={12} md={8}>
          <SearchBar
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
            searchQuery={searchQuery}
            searchFilters={searchFilters}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpen(true)}
            fullWidth
          >
            Add Customer
          </Button>
        </Grid>
      </Grid>

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Showing {customers.length} of {totalElements} customers
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sortDirection={orderBy === 'firstName' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'firstName'}
                  direction={orderBy === 'firstName' ? order : 'asc'}
                  onClick={() => handleRequestSort('firstName')}
                >
                  First Name
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'lastName' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'lastName'}
                  direction={orderBy === 'lastName' ? order : 'asc'}
                  onClick={() => handleRequestSort('lastName')}
                >
                  Last Name
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'email' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'email'}
                  direction={orderBy === 'email' ? order : 'asc'}
                  onClick={() => handleRequestSort('email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>Phone</TableCell>
              <TableCell sortDirection={orderBy === 'numAddresses' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'numAddresses'}
                  direction={orderBy === 'numAddresses' ? order : 'asc'}
                  onClick={() => handleRequestSort('numAddresses')}
                >
                  Addresses
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow 
                key={customer.id}
                sx={{
                  backgroundColor: customer.numAddresses === 1 ? '#fffde7' : 'inherit',
                  '&:hover': {
                    backgroundColor: customer.numAddresses === 1 ? '#fff9c4' : '#f5f5f5'
                  }
                }}
              >
                <TableCell>{customer.firstName}</TableCell>
                <TableCell>{customer.lastName}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.numAddresses}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onSelectCustomer(customer)}>
                    <Visibility />
                  </IconButton>
                  <IconButton onClick={() => setEditCustomer(customer)}>
                    <Edit />
                  </IconButton>
                  <IconButton 
                    onClick={() => setDeleteConfirm(customer)}
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

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalElements}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {customers.length === 0 && (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No customers found
        </Typography>
      )}

      <CustomerForm
        open={open || !!editCustomer}
        customer={editCustomer}
        onClose={() => {
          setOpen(false);
          setEditCustomer(null);
          fetchCustomers(); // Refresh the list after adding/editing
        }}
      />

      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {deleteConfirm?.firstName} {deleteConfirm?.lastName}?
          {deleteConfirm?.numAddresses === 1 && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              This customer has only one address and cannot be deleted.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Cancel</Button>
          <Button 
            onClick={handleDelete} 
            color="error"
            disabled={deleteConfirm?.numAddresses === 1}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerList;