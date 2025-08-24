import React, { useState, useEffect } from 'react';
import { Container, Typography, Alert } from '@mui/material';
import CustomerList from './components/CustomerList';
import CustomerDetail from './components/CustomerDetail';
import { getAllCustomers } from './services/api';
import './App.css';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [view, setView] = useState('list');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getAllCustomers();
      setCustomers(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch customers: ' + err.message);
      console.error('Error fetching customers:', err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Customer Management System
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {view === 'list' ? (
        <CustomerList
          onSelectCustomer={(customer) => {
            setSelectedCustomer(customer);
            setView('detail');
          }}
          onRefresh={fetchCustomers}
        />
      ) : (
        <CustomerDetail
          customer={selectedCustomer}
          onBack={() => setView('list')}
          onRefresh={fetchCustomers}
        />
      )}
    </Container>
  );
}

export default App;