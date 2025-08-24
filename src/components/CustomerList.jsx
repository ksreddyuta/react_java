import React, { useState, useEffect } from 'react';
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
import { getAllCustomers, deleteCustomer } from '../services/api';

const CustomerList = ({ onSelectCustomer, onRefresh }) => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Sorting state
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('firstName');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getAllCustomers();
      setCustomers(data);
      setFilteredCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
      alert('Error fetching customers: ' + error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCustomer(deleteConfirm.id);
      setDeleteConfirm(null);
      fetchCustomers();
      if (onRefresh) onRefresh();
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

  // Function to sort array
  const sortedCustomers = filteredCustomers.sort((a, b) => {
    let aValue = a[orderBy];
    let bValue = b[orderBy];
    if (orderBy === 'firstName' || orderBy === 'lastName') {
      aValue = a[orderBy].toLowerCase();
      bValue = b[orderBy].toLowerCase();
    }
    if (aValue < bValue) {
      return order === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Pagination functions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid empty rows when on last page
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedCustomers.length) : 0;

  return (
    <Box>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12} md={8}>
          <SearchBar
            customers={customers}
            onSearch={setFilteredCustomers}
          />
        </Grid>
        <Grid item xs={12} md={4}>
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
        Showing {filteredCustomers.length} of {customers.length} customers
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
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Addresses</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((customer) => (
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
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedCustomers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {filteredCustomers.length === 0 && (
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
          fetchCustomers();
          if (onRefresh) onRefresh();
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