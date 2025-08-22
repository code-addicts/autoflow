import axios from 'axios';

// 1. Create the base Axios instance
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// 2. Create the interceptor
// This function will run before every single request is sent from the frontend
API.interceptors.request.use((config) => {
  // Get the token from localStorage
  const token = localStorage.getItem('authToken');
  
  // If the token exists, add it to the 'Authorization' header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Return the modified request configuration
  return config;
}, (error) => {
  // Handle any errors that occur during the request setup
  return Promise.reject(error);
});


// --- AUTH ROUTES ---
export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);


// --- VEHICLE ROUTES (NOW SECURE) ---
export const getVehicles = () => API.get('/vehicles');
export const getVehicleById = (id) => API.get(`/vehicles/${id}`);
export const createVehicle = (vehicleData) => API.post('/vehicles', vehicleData);
export const updateVehicle = (id, vehicleData) => API.put(`/vehicles/${id}`, vehicleData);
export const deleteVehicle = (id) => API.delete(`/vehicles/${id}`);


// --- WORKFLOW ROUTES ---
export const getWorkflowsForVehicle = (vehicleId) => API.get(`/workflows/vehicle/${vehicleId}`);
export const createWorkflow = (workflowData) => API.post('/workflows', workflowData);
export const deleteWorkflow = (workflowId) => API.delete(`/workflows/${workflowId}`);


// --- DOCUMENT ROUTES ---
// Note: We use FormData here to handle the file upload
export const getDocumentsForVehicle = (vehicleId) => API.get(`/documents/vehicle/${vehicleId}`); 
export const uploadDocument = (formData) => {
  return API.post('/documents/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const deleteDocument = (documentId) => API.delete(`/documents/${documentId}`);