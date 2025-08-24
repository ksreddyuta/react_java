// Base URL for API - Change this to your Java Spring backend URL when available
const BASE_URL = 'http://localhost:8080/api';

// Error codes
const ERROR_CODES = {
  SUCCESS: 'SUCCESS',
  DUPLICATE_EMAIL: 'DUPLICATE_EMAIL',
  DUPLICATE_PHONE: 'DUPLICATE_PHONE',
  DUPLICATE_ADDRESS: 'DUPLICATE_ADDRESS',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  DATA_INTEGRITY_ERROR: 'DATA_INTEGRITY_ERROR',
  DELETE_ERROR: 'DELETE_ERROR',
  ADDRESS_NOT_FOUND: 'ADDRESS_NOT_FOUND',
  CUSTOMER_NOT_FOUND: 'CUSTOMER_NOT_FOUND'
};

// Helper function for making HTTP requests
// eslint-disable-next-line no-unused-vars
const apiRequest = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  
  try {
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

    const data = await response.json();
    
    // Check for API-level errors in response
    if (data.errorCode && data.errorCode !== ERROR_CODES.SUCCESS) {
      throw new Error(data.errorMessage || `API Error: ${data.errorCode}`);
    }
    
    return data;
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
};

// Sample data for demonstration
let sampleCustomers = {
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

// Helper function to simulate API response format
const createApiResponse = (data, errorCode = ERROR_CODES.SUCCESS, errorMessage = null) => {
  return {
    ...data,
    errorCode,
    errorMessage,
    success: errorCode === ERROR_CODES.SUCCESS
  };
};

// Customer API functions

// Get all customers with pagination and sorting
export const getAllCustomers = async (page = 0, size = 10, sortBy = 'lastName', sortDir = 'asc') => {
  /*
  // For real API (uncomment when backend is available):
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sortBy,
      sortDir
    });
    
    const response = await apiRequest(`/customers?${params}`);
    return createApiResponse(response);
  } catch (error) {
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
  */
  
  // Sample data implementation:
  try {
    await delay(500);
    
    // Simulate sorting for sample data
    let sortedContent = [...sampleCustomers.content];
    if (sortBy) {
      sortedContent.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];
        
        if (sortBy === 'createdAt') {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        }
        
        if (aValue < bValue) return sortDir === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    // Simulate pagination for sample data
    const startIndex = page * size;
    const paginatedContent = sortedContent.slice(startIndex, startIndex + size);
    
    const responseData = {
      ...sampleCustomers,
      content: paginatedContent,
      totalElements: sortedContent.length,
      totalPages: Math.ceil(sortedContent.length / size),
      number: page,
      size
    };
    
    return createApiResponse(responseData);
  } catch (error) {
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
};

// Get customer by ID
export const getCustomerById = async (id) => {
  /*
  // For real API (uncomment when backend is available):
  try {
    const response = await apiRequest(`/customers/${id}`);
    return createApiResponse(response);
  } catch (error) {
    if (error.message.includes('404')) {
      return createApiResponse(null, ERROR_CODES.CUSTOMER_NOT_FOUND, 'Customer not found');
    }
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
  */
  
  // Sample data implementation:
  try {
    await delay(300);
    const customer = sampleCustomers.content.find(c => c.id === parseInt(id));
    
    if (!customer) {
      return createApiResponse(null, ERROR_CODES.CUSTOMER_NOT_FOUND, 'Customer not found');
    }
    
    return createApiResponse(customer);
  } catch (error) {
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
};

// Add customer
export const addCustomer = async (customerData) => {
  /*
  // For real API (uncomment when backend is available):
  try {
    const response = await apiRequest('/customers', {
      method: 'POST',
      body: JSON.stringify(customerData),
    });
    return createApiResponse(response);
  } catch (error) {
    if (error.message.includes('DUPLICATE_EMAIL')) {
      return createApiResponse(null, ERROR_CODES.DUPLICATE_EMAIL, 'Customer with this email already exists');
    }
    if (error.message.includes('DUPLICATE_PHONE')) {
      return createApiResponse(null, ERROR_CODES.DUPLICATE_PHONE, 'Customer with this phone number already exists');
    }
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
  */
  
  // Sample data implementation:
  try {
    await delay(400);
    
    // Check for duplicate email
    const duplicateEmail = sampleCustomers.content.find(c => 
      c.email.toLowerCase() === customerData.email.toLowerCase()
    );
    
    if (duplicateEmail) {
      return createApiResponse(null, ERROR_CODES.DUPLICATE_EMAIL, 'Customer with this email already exists');
    }
    
    // Check for duplicate phone
    const duplicatePhone = sampleCustomers.content.find(c => 
      c.phone === customerData.phone
    );
    
    if (duplicatePhone) {
      return createApiResponse(null, ERROR_CODES.DUPLICATE_PHONE, 'Customer with this phone number already exists');
    }
    
    const newCustomer = {
      ...customerData,
      id: Date.now(),
      numAddresses: customerData.addresses?.length || 1,
      createdAt: new Date().toISOString()
    };
    
    // Ensure at least one address
    if (!newCustomer.addresses || newCustomer.addresses.length === 0) {
      newCustomer.addresses = [{
        id: Date.now(),
        street: '',
        street2: '',
        city: '',
        state: '',
        pincode: '',
        country: 'USA'
      }];
    }
    
    sampleCustomers.content.push(newCustomer);
    sampleCustomers.totalElements += 1;
    
    return createApiResponse(newCustomer);
  } catch (error) {
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
};

// Update customer
export const updateCustomer = async (customerData) => {
  /*
  // For real API (uncomment when backend is available):
  try {
    const response = await apiRequest('/customers', {
      method: 'PUT',
      body: JSON.stringify(customerData),
    });
    return createApiResponse(response);
  } catch (error) {
    if (error.message.includes('DUPLICATE_EMAIL')) {
      return createApiResponse(null, ERROR_CODES.DUPLICATE_EMAIL, 'Customer with this email already exists');
    }
    if (error.message.includes('DUPLICATE_PHONE')) {
      return createApiResponse(null, ERROR_CODES.DUPLICATE_PHONE, 'Customer with this phone number already exists');
    }
    if (error.message.includes('404')) {
      return createApiResponse(null, ERROR_CODES.CUSTOMER_NOT_FOUND, 'Customer not found');
    }
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
  */
  
  // Sample data implementation:
  try {
    await delay(400);
    const index = sampleCustomers.content.findIndex(c => c.id === customerData.id);
    
    if (index === -1) {
      return createApiResponse(null, ERROR_CODES.CUSTOMER_NOT_FOUND, 'Customer not found');
    }
    
    // Check for duplicate email (excluding current customer)
    const duplicateEmail = sampleCustomers.content.find(c => 
      c.email.toLowerCase() === customerData.email.toLowerCase() && c.id !== customerData.id
    );
    
    if (duplicateEmail) {
      return createApiResponse(null, ERROR_CODES.DUPLICATE_EMAIL, 'Customer with this email already exists');
    }
    
    // Check for duplicate phone (excluding current customer)
    const duplicatePhone = sampleCustomers.content.find(c => 
      c.phone === customerData.phone && c.id !== customerData.id
    );
    
    if (duplicatePhone) {
      return createApiResponse(null, ERROR_CODES.DUPLICATE_PHONE, 'Customer with this phone number already exists');
    }
    
    sampleCustomers.content[index] = {
      ...sampleCustomers.content[index],
      ...customerData,
      numAddresses: customerData.addresses?.length || sampleCustomers.content[index].numAddresses
    };
    
    return createApiResponse(sampleCustomers.content[index]);
  } catch (error) {
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
};

// Delete customer
// Delete customer - Allow deletion even with addresses
export const deleteCustomer = async (id) => {
  /*
  // For real API (uncomment when backend is available):
  try {
    const response = await apiRequest(`/customers/${id}`, {
      method: 'DELETE',
    });
    return createApiResponse(response);
  } catch (error) {
    if (error.message.includes('404')) {
      return createApiResponse(null, ERROR_CODES.CUSTOMER_NOT_FOUND, 'Customer not found');
    }
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
  */
  
  // Sample data implementation:
  try {
    await delay(300);
    const index = sampleCustomers.content.findIndex(c => c.id === parseInt(id));
    
    if (index === -1) {
      return createApiResponse(null, ERROR_CODES.CUSTOMER_NOT_FOUND, 'Customer not found');
    }
    
    // Allow deletion even if customer has addresses
    sampleCustomers.content.splice(index, 1);
    sampleCustomers.totalElements -= 1;
    
    return createApiResponse({ message: 'Customer deleted successfully' });
  } catch (error) {
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
};

// Search customers by query
export const searchCustomers = async (query, page = 0, size = 10, sortBy = 'lastName', sortDir = 'asc') => {
  /*
  // For real API (uncomment when backend is available):
  try {
    const params = new URLSearchParams({
      query: query || '',
      page: page.toString(),
      size: size.toString(),
      sortBy,
      sortDir
    });
    
    const response = await apiRequest(`/customers/search?${params}`);
    return createApiResponse(response);
  } catch (error) {
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
  */
  
  // Sample data implementation:
  try {
    await delay(500);
    
    let filtered = sampleCustomers.content;
    if (query) {
      filtered = filtered.filter(customer =>
        `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
        customer.email.toLowerCase().includes(query.toLowerCase()) ||
        customer.phone.includes(query)
      );
    }
    
    // Simulate sorting for sample data
    if (sortBy) {
      filtered.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];
        
        if (sortBy === 'createdAt') {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        }
        
        if (aValue < bValue) return sortDir === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    // Simulate pagination for sample data
    const startIndex = page * size;
    const paginatedContent = filtered.slice(startIndex, startIndex + size);
    
    const responseData = {
      ...sampleCustomers,
      content: paginatedContent,
      totalElements: filtered.length,
      totalPages: Math.ceil(filtered.length / size),
      number: page,
      size
    };
    
    return createApiResponse(responseData);
  } catch (error) {
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
};

// Advanced search customers by address details
export const advancedSearchCustomers = async (filters, page = 0, size = 10, sortBy = 'lastName', sortDir = 'asc') => {
  /*
  // For real API (uncomment when backend is available):
  try {
    const params = new URLSearchParams({
      ...filters,
      page: page.toString(),
      size: size.toString(),
      sortBy,
      sortDir
    });
    
    const response = await apiRequest(`/customers/search/advanced?${params}`);
    return createApiResponse(response);
  } catch (error) {
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
  */
  
  // Sample data implementation:
  try {
    await delay(500);
    
    const filtered = sampleCustomers.content.filter(customer =>
      customer.addresses.some(address => 
        (!filters.city || address.city.toLowerCase().includes(filters.city.toLowerCase())) &&
        (!filters.state || address.state.toLowerCase().includes(filters.state.toLowerCase())) &&
        (!filters.pincode || address.pincode.includes(filters.pincode))
      )
    );
    
    // Simulate sorting for sample data
    let sortedContent = [...filtered];
    if (sortBy) {
      sortedContent.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];
        
        if (sortBy === 'createdAt') {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        }
        
        if (aValue < bValue) return sortDir === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    // Simulate pagination for sample data
    const startIndex = page * size;
    const paginatedContent = sortedContent.slice(startIndex, startIndex + size);
    
    const responseData = {
      ...sampleCustomers,
      content: paginatedContent,
      totalElements: filtered.length,
      totalPages: Math.ceil(filtered.length / size),
      number: page,
      size
    };
    
    return createApiResponse(responseData);
  } catch (error) {
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
};

// Address API functions

// Get addresses by customer ID
export const getAddressesByCustomerId = async (customerId) => {
  /*
  // For real API (uncomment when backend is available):
  try {
    const response = await apiRequest(`/addresses/${customerId}`);
    return createApiResponse(response);
  } catch (error) {
    if (error.message.includes('404')) {
      return createApiResponse(null, ERROR_CODES.CUSTOMER_NOT_FOUND, 'Customer not found');
    }
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
  */
  
  // Sample data implementation:
  try {
    await delay(300);
    const customer = sampleCustomers.content.find(c => c.id === parseInt(customerId));
    
    if (!customer) {
      return createApiResponse(null, ERROR_CODES.CUSTOMER_NOT_FOUND, 'Customer not found');
    }
    
    return createApiResponse(customer.addresses);
  } catch (error) {
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
};

// Get address by ID
export const getAddressById = async (addressId) => {
  /*
  // For real API (uncomment when backend is available):
  try {
    const response = await apiRequest(`/addresses/getAddress/${addressId}`);
    return createApiResponse(response);
  } catch (error) {
    if (error.message.includes('404')) {
      return createApiResponse(null, ERROR_CODES.ADDRESS_NOT_FOUND, 'Address not found');
    }
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
  */
  
  // Sample data implementation:
  try {
    await delay(300);
    for (const customer of sampleCustomers.content) {
      const address = customer.addresses.find(a => a.id === parseInt(addressId));
      if (address) return createApiResponse(address);
    }
    
    return createApiResponse(null, ERROR_CODES.ADDRESS_NOT_FOUND, 'Address not found');
  } catch (error) {
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
};

// Add address
export const addAddress = async (customerId, addressData) => {
  /*
  // For real API (uncomment when backend is available):
  try {
    const response = await apiRequest(`/addresses/${customerId}`, {
      method: 'POST',
      body: JSON.stringify(addressData),
    });
    return createApiResponse(response);
  } catch (error) {
    if (error.message.includes('DUPLICATE_ADDRESS')) {
      return createApiResponse(null, ERROR_CODES.DUPLICATE_ADDRESS, 'This address already exists for this customer');
    }
    if (error.message.includes('404')) {
      return createApiResponse(null, ERROR_CODES.CUSTOMER_NOT_FOUND, 'Customer not found');
    }
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
  */
  
  // Sample data implementation:
  try {
    await delay(400);
    const customer = sampleCustomers.content.find(c => c.id === parseInt(customerId));
    
    if (!customer) {
      return createApiResponse(null, ERROR_CODES.CUSTOMER_NOT_FOUND, 'Customer not found');
    }
    
    // Check for duplicate address
    const duplicateAddress = customer.addresses.find(a => 
      a.street === addressData.street &&
      a.city === addressData.city &&
      a.state === addressData.state &&
      a.pincode === addressData.pincode
    );
    
    if (duplicateAddress) {
      return createApiResponse(null, ERROR_CODES.DUPLICATE_ADDRESS, 'This address already exists for this customer');
    }
    
    const newAddress = {
      ...addressData,
      id: Date.now()
    };
    
    customer.addresses.push(newAddress);
    customer.numAddresses = customer.addresses.length;
    
    return createApiResponse(newAddress);
  } catch (error) {
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
};

// Update address
export const updateAddress = async (addressId, addressData) => {
  /*
  // For real API (uncomment when backend is available):
  try {
    const response = await apiRequest(`/addresses/${addressId}`, {
      method: 'PUT',
      body: JSON.stringify(addressData),
    });
    return createApiResponse(response);
  } catch (error) {
    if (error.message.includes('DUPLICATE_ADDRESS')) {
      return createApiResponse(null, ERROR_CODES.DUPLICATE_ADDRESS, 'This address already exists for this customer');
    }
    if (error.message.includes('404')) {
      return createApiResponse(null, ERROR_CODES.ADDRESS_NOT_FOUND, 'Address not found');
    }
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
  */
  
  // Sample data implementation:
  try {
    await delay(400);
    for (const customer of sampleCustomers.content) {
      const addressIndex = customer.addresses.findIndex(a => a.id === parseInt(addressId));
      if (addressIndex !== -1) {
        // Check for duplicate address (excluding current address)
        const duplicateAddress = customer.addresses.find((a, idx) => 
          idx !== addressIndex &&
          a.street === addressData.street &&
          a.city === addressData.city &&
          a.state === addressData.state &&
          a.pincode === addressData.pincode
        );
        
        if (duplicateAddress) {
          return createApiResponse(null, ERROR_CODES.DUPLICATE_ADDRESS, 'This address already exists for this customer');
        }
        
        customer.addresses[addressIndex] = {
          ...customer.addresses[addressIndex],
          ...addressData
        };
        
        return createApiResponse(customer.addresses[addressIndex]);
      }
    }
    
    return createApiResponse(null, ERROR_CODES.ADDRESS_NOT_FOUND, 'Address not found');
  } catch (error) {
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
};

// Delete address
export const deleteAddress = async (addressId) => {
  /*
  // For real API (uncomment when backend is available):
  try {
    const response = await apiRequest(`/addresses/${addressId}`, {
      method: 'DELETE',
    });
    return createApiResponse(response);
  } catch (error) {
    if (error.message.includes('404')) {
      return createApiResponse(null, ERROR_CODES.ADDRESS_NOT_FOUND, 'Address not found');
    }
    if (error.message.includes('DATA_INTEGRITY')) {
      return createApiResponse(null, ERROR_CODES.DATA_INTEGRITY_ERROR, 'Cannot delete the only address of a customer');
    }
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
  */
  
  // Sample data implementation:
  try {
    await delay(300);
    for (const customer of sampleCustomers.content) {
      const addressIndex = customer.addresses.findIndex(a => a.id === parseInt(addressId));
      if (addressIndex !== -1) {
        // Ensure customer has at least one address
        if (customer.addresses.length <= 1) {
          return createApiResponse(null, ERROR_CODES.DATA_INTEGRITY_ERROR, 'Cannot delete the only address of a customer');
        }
        
        customer.addresses.splice(addressIndex, 1);
        customer.numAddresses = customer.addresses.length;
        
        return createApiResponse({ message: 'Address deleted successfully' });
      }
    }
    
    return createApiResponse(null, ERROR_CODES.ADDRESS_NOT_FOUND, 'Address not found');
  } catch (error) {
    return createApiResponse(null, ERROR_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
};

// Export error codes for use in components
export { ERROR_CODES };