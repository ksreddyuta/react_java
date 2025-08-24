/* eslint-disable no-unused-vars */
// Base URL for API - Change this to your Java Spring backend URL
const BASE_URL = 'http://localhost:8080/api';

// Helper function to simulate API delay - Remove this when using real API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function for making HTTP requests - Use this for real API calls
const apiRequest = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Mock data for demonstration - Remove this when using real API
let customers = [
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
  },
  {
    id: 4,
    firstName: "Maria",
    lastName: "Garcia",
    phone: "5559876543",
    email: "maria.g@example.com",
    numAddresses: 1,
    createdAt: "2024-01-18T14:45:00",
    addresses: [
      {
        id: 6,
        street: "303 Cedar Ave",
        street2: "Apt 5C",
        city: "Miami",
        state: "FL",
        pincode: "33101",
        country: "USA"
      }
    ]
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Wilson",
    phone: "5554567890",
    email: "david.w@example.com",
    numAddresses: 3,
    createdAt: "2024-01-19T16:30:00",
    addresses: [
      {
        id: 7,
        street: "404 Elm St",
        street2: null,
        city: "Boston",
        state: "MA",
        pincode: "02101",
        country: "USA"
      },
      {
        id: 8,
        street: "505 Oak Dr",
        street2: "Unit B",
        city: "Cambridge",
        state: "MA",
        pincode: "02138",
        country: "USA"
      },
      {
        id: 9,
        street: "606 Pine Cir",
        street2: null,
        city: "Quincy",
        state: "MA",
        pincode: "02169",
        country: "USA"
      }
    ]
  }
];

// Customer API functions

// Get all customers - Replace with real API call
export const getAllCustomers = async () => {
  // For real API:
  // return apiRequest('/customers');
  await delay(500);
  return customers;
};

// Get customer by ID - Replace with real API call
export const getCustomerById = async (id) => {
  // For real API:
  // return apiRequest(`/customers/${id}`);
  await delay(300);
  const customer = customers.find(c => c.id === parseInt(id));
  if (!customer) throw new Error('Customer not found');
  return customer;
};

// Add customer - Replace with real API call
export const addCustomer = async (customerData) => {
  // For real API:
  // return apiRequest('/customers', {
  //   method: 'POST',
  //   body: JSON.stringify(customerData),
  // });
  await delay(400);
  const newCustomer = {
    ...customerData,
    id: Date.now(),
    numAddresses: customerData.addresses?.length || 0,
    createdAt: new Date().toISOString()
  };
  customers.push(newCustomer);
  return newCustomer;
};

// Update customer - Replace with real API call
export const updateCustomer = async (customerData) => {
  // For real API:
  // return apiRequest('/customers', {
  //   method: 'PUT',
  //   body: JSON.stringify(customerData),
  // });
  await delay(400);
  const index = customers.findIndex(c => c.id === customerData.id);
  if (index === -1) throw new Error('Customer not found');
  
  customers[index] = {
    ...customers[index],
    ...customerData,
    numAddresses: customerData.addresses?.length || customers[index].numAddresses
  };
  return customers[index];
};

// Delete customer - Replace with real API call
export const deleteCustomer = async (id) => {
  // For real API:
  // return apiRequest(`/customers/${id}`, {
  //   method: 'DELETE',
  // });
  await delay(300);
  const index = customers.findIndex(c => c.id === parseInt(id));
  if (index === -1) throw new Error('Customer not found');
  customers.splice(index, 1);
};

// Address API functions

// Get addresses by customer ID - Replace with real API call
export const getAddressesByCustomerId = async (customerId) => {
  // For real API:
  // return apiRequest(`/addresses/${customerId}`);
  await delay(300);
  const customer = customers.find(c => c.id === parseInt(customerId));
  if (!customer) throw new Error('Customer not found');
  return customer.addresses;
};

// Get address by ID - Replace with real API call
export const getAddressById = async (addressId) => {
  // For real API:
  // return apiRequest(`/addresses/getAddress/${addressId}`);
  await delay(300);
  for (const customer of customers) {
    const address = customer.addresses.find(a => a.id === parseInt(addressId));
    if (address) return address;
  }
  throw new Error('Address not found');
};

// Add address - Replace with real API call
export const addAddress = async (customerId, addressData) => {
  // For real API:
  // return apiRequest(`/addresses/${customerId}`, {
  //   method: 'POST',
  //   body: JSON.stringify(addressData),
  // });
  await delay(400);
  const customer = customers.find(c => c.id === parseInt(customerId));
  if (!customer) throw new Error('Customer not found');
  
  const newAddress = {
    ...addressData,
    id: Date.now()
  };
  
  customer.addresses.push(newAddress);
  customer.numAddresses = customer.addresses.length;
  return newAddress;
};

// Update address - Replace with real API call
export const updateAddress = async (addressId, addressData) => {
  // For real API:
  // return apiRequest(`/addresses/${addressId}`, {
  //   method: 'PUT',
  //   body: JSON.stringify(addressData),
  // });
  await delay(400);
  for (const customer of customers) {
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

// Delete address - Replace with real API call
export const deleteAddress = async (addressId) => {
  // For real API:
  // return apiRequest(`/addresses/${addressId}`, {
  //   method: 'DELETE',
  // });
  await delay(300);
  for (const customer of customers) {
    const addressIndex = customer.addresses.findIndex(a => a.id === parseInt(addressId));
    if (addressIndex !== -1) {
      customer.addresses.splice(addressIndex, 1);
      customer.numAddresses = customer.addresses.length;
      return;
    }
  }
  throw new Error('Address not found');
};