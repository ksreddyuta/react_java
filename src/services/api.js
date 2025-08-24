/* eslint-disable no-unused-vars */
// Base URL for API - Change this to your Java Spring backend URL when available
const BASE_URL = 'http://localhost:8080/api';

// Helper function for making HTTP requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  
  // For now, we'll use mock data instead of making actual API calls
  console.log(`Would call API: ${url}`, options);
  
  // Simulate API failure since we don't have a backend
  throw new Error('Backend not available - using mock data instead');
};

// Sample data for demonstration
const sampleCustomers = {
  content: [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      phone: "1234567890",
      email: "john.doe@example.com",
      numAddresses: 2,
      createdAt: "2024-01-15T10:30:00",
      addresses: [
        {
          id: 1,
          street: "123 Main St",
          street2: "Apt 4B",
          city: "New York",
          state: "NY",
          pincode: "10001",
          country: "USA"
        },
        {
          id: 2,
          street: "456 Oak Ave",
          street2: null,
          city: "Brooklyn",
          state: "NY",
          pincode: "11201",
          country: "USA"
        }
      ]
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      phone: "0987654321",
      email: "jane.smith@example.com",
      numAddresses: 1,
      createdAt: "2024-01-16T11:20:00",
      addresses: [
        {
          id: 3,
          street: "789 Pine Rd",
          street2: null,
          city: "Los Angeles",
          state: "CA",
          pincode: "90001",
          country: "USA"
        }
      ]
    },
    {
      id: 3,
      firstName: "Robert",
      lastName: "Johnson",
      phone: "5551234567",
      email: "robert.j@example.com",
      numAddresses: 2,
      createdAt: "2024-01-17T09:15:00",
      addresses: [
        {
          id: 4,
          street: "101 Maple St",
          street2: "Suite 200",
          city: "Chicago",
          state: "IL",
          pincode: "60601",
          country: "USA"
        },
        {
          id: 5,
          street: "202 Birch Ln",
          street2: null,
          city: "Evanston",
          state: "IL",
          pincode: "60201",
          country: "USA"
        }
      ]
    }
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      unsorted: false,
      sorted: true,
      empty: false
    },
    offset: 0,
    unpaged: false,
    paged: true
  },
  totalPages: 1,
  totalElements: 3,
  last: true,
  numberOfElements: 3,
  first: true,
  size: 10,
  number: 0,
  sort: {
    unsorted: false,
    sorted: true,
    empty: false
  },
  empty: false
};

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Customer API functions

// Get all customers with pagination and sorting
export const getAllCustomers = async (page = 0, size = 10, sortBy = 'lastName', sortDir = 'asc') => {
  // For real API (uncomment when backend is available):
  /*
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sortBy,
    sortDir
  });
  return apiRequest(`/customers?${params}`);
  */
  
  // Sample data implementation:
  await delay(500);
  return sampleCustomers;
};

// Get customer by ID
export const getCustomerById = async (id) => {
  // For real API (uncomment when backend is available):
  // return apiRequest(`/customers/${id}`);
  
  // Sample data implementation:
  await delay(300);
  const customer = sampleCustomers.content.find(c => c.id === parseInt(id));
  if (!customer) throw new Error('Customer not found');
  return customer;
};

// Add customer
export const addCustomer = async (customerData) => {
  // For real API (uncomment when backend is available):
  /*
  return apiRequest('/customers', {
    method: 'POST',
    body: JSON.stringify(customerData),
  });
  */
  
  // Sample data implementation:
  await delay(400);
  const newCustomer = {
    ...customerData,
    id: Date.now(),
    numAddresses: customerData.addresses?.length || 0,
    createdAt: new Date().toISOString()
  };
  sampleCustomers.content.push(newCustomer);
  sampleCustomers.totalElements += 1;
  return newCustomer;
};

// Update customer
export const updateCustomer = async (customerData) => {
  // For real API (uncomment when backend is available):
  /*
  return apiRequest('/customers', {
    method: 'PUT',
    body: JSON.stringify(customerData),
  });
  */
  
  // Sample data implementation:
  await delay(400);
  const index = sampleCustomers.content.findIndex(c => c.id === customerData.id);
  if (index === -1) throw new Error('Customer not found');
  
  sampleCustomers.content[index] = {
    ...sampleCustomers.content[index],
    ...customerData,
    numAddresses: customerData.addresses?.length || sampleCustomers.content[index].numAddresses
  };
  return sampleCustomers.content[index];
};

// Delete customer
export const deleteCustomer = async (id) => {
  // For real API (uncomment when backend is available):
  /*
  return apiRequest(`/customers/${id}`, {
    method: 'DELETE',
  });
  */
  
  // Sample data implementation:
  await delay(300);
  const index = sampleCustomers.content.findIndex(c => c.id === parseInt(id));
  if (index === -1) throw new Error('Customer not found');
  sampleCustomers.content.splice(index, 1);
  sampleCustomers.totalElements -= 1;
};

// Search customers by query
export const searchCustomers = async (query, page = 0, size = 10, sortBy = 'lastName', sortDir = 'asc') => {
  // For real API (uncomment when backend is available):
  /*
  const params = new URLSearchParams({
    query: query || '',
    page: page.toString(),
    size: size.toString(),
    sortBy,
    sortDir
  });
  return apiRequest(`/customers/search?${params}`);
  */
  
  // Sample data implementation:
  await delay(500);
  if (!query) return sampleCustomers;
  
  const filtered = sampleCustomers.content.filter(customer =>
    `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
    customer.email.toLowerCase().includes(query.toLowerCase()) ||
    customer.phone.includes(query)
  );
  
  return {
    ...sampleCustomers,
    content: filtered,
    totalElements: filtered.length
  };
};

// Advanced search customers by address details
export const advancedSearchCustomers = async (filters, page = 0, size = 10, sortBy = 'lastName', sortDir = 'asc') => {
  // For real API (uncomment when backend is available):
  /*
  const params = new URLSearchParams({
    ...filters,
    page: page.toString(),
    size: size.toString(),
    sortBy,
    sortDir
  });
  return apiRequest(`/customers/search/advanced?${params}`);
  */
  
  // Sample data implementation:
  await delay(500);
  const filtered = sampleCustomers.content.filter(customer =>
    customer.addresses.some(address => 
      (!filters.city || address.city.toLowerCase().includes(filters.city.toLowerCase())) &&
      (!filters.state || address.state.toLowerCase().includes(filters.state.toLowerCase())) &&
      (!filters.pincode || address.pincode.includes(filters.pincode))
    )
  );
  
  return {
    ...sampleCustomers,
    content: filtered,
    totalElements: filtered.length
  };
};

// Address API functions

// Get addresses by customer ID
export const getAddressesByCustomerId = async (customerId) => {
  // For real API (uncomment when backend is available):
  // return apiRequest(`/addresses/${customerId}`);
  
  // Sample data implementation:
  await delay(300);
  const customer = sampleCustomers.content.find(c => c.id === parseInt(customerId));
  if (!customer) throw new Error('Customer not found');
  return customer.addresses;
};

// Get address by ID
export const getAddressById = async (addressId) => {
  // For real API (uncomment when backend is available):
  // return apiRequest(`/addresses/getAddress/${addressId}`);
  
  // Sample data implementation:
  await delay(300);
  for (const customer of sampleCustomers.content) {
    const address = customer.addresses.find(a => a.id === parseInt(addressId));
    if (address) return address;
  }
  throw new Error('Address not found');
};

// Add address
export const addAddress = async (customerId, addressData) => {
  // For real API (uncomment when backend is available):
  /*
  return apiRequest(`/addresses/${customerId}`, {
    method: 'POST',
    body: JSON.stringify(addressData),
  });
  */
  
  // Sample data implementation:
  await delay(400);
  const customer = sampleCustomers.content.find(c => c.id === parseInt(customerId));
  if (!customer) throw new Error('Customer not found');
  
  const newAddress = {
    ...addressData,
    id: Date.now()
  };
  
  customer.addresses.push(newAddress);
  customer.numAddresses = customer.addresses.length;
  return newAddress;
};

// Update address
export const updateAddress = async (addressId, addressData) => {
  // For real API (uncomment when backend is available):
  /*
  return apiRequest(`/addresses/${addressId}`, {
    method: 'PUT',
    body: JSON.stringify(addressData),
  });
  */
  
  // Sample data implementation:
  await delay(400);
  for (const customer of sampleCustomers.content) {
    const addressIndex = customer.addresses.findIndex(a => a.id === parseInt(addressId));
    if (addressIndex !== -1) {
      customer.addresses[addressIndex] = {
        ...customer.addresses[addressIndex],
        ...addressData
      };
      return customer.addresses[addressIndex];
    }
  }
  throw new Error('Address not found');
};

// Delete address
export const deleteAddress = async (addressId) => {
  // For real API (uncomment when backend is available):
  /*
  return apiRequest(`/addresses/${addressId}`, {
    method: 'DELETE',
  });
  */
  
  // Sample data implementation:
  await delay(300);
  for (const customer of sampleCustomers.content) {
    const addressIndex = customer.addresses.findIndex(a => a.id === parseInt(addressId));
    if (addressIndex !== -1) {
      customer.addresses.splice(addressIndex, 1);
      customer.numAddresses = customer.addresses.length;
      return;
    }
  }
  throw new Error('Address not found');
};