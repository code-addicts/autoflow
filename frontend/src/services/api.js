import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getVehicles = () => API.get('/vehicles');
export const deleteVehicle = (id) => API.delete(`/vehicles/${id}`);

// Add this function
export const createVehicle = (vehicleData) => API.post('/vehicles', vehicleData);

// GET a single vehicle by its ID
export const getVehicleById = (id) => API.get(`/vehicles/${id}`);

// PUT (update) a vehicle by its ID
export const updateVehicle = (id, vehicleData) => API.put(`/vehicles/${id}`, vehicleData);