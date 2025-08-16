import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVehicle } from '../services/api';

export default function AddVehiclePage() {
  const [formData, setFormData] = useState({
    ownerName: '', registrationNumber: '', type: '', brand: '', model: '', year: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVehicle(formData);
      navigate('/'); // Go back to the list after successful submission
    } catch (error) {
      console.error('Failed to add vehicle:', error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Add a New Vehicle</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <input name="ownerName" onChange={handleChange} placeholder="Owner Name" className="w-full mb-4 px-3 py-2 border rounded" required />
        <input name="registrationNumber" onChange={handleChange} placeholder="Registration No." className="w-full mb-4 px-3 py-2 border rounded" required />
        <input name="type" onChange={handleChange} placeholder="Type (e.g., Car)" className="w-full mb-4 px-3 py-2 border rounded" required />
        <input name="brand" onChange={handleChange} placeholder="Brand (e.g., Mahindra)" className="w-full mb-4 px-3 py-2 border rounded" required />
        <input name="model" onChange={handleChange} placeholder="Model (e.g., XUV 3XO)" className="w-full mb-4 px-3 py-2 border rounded" required />
        <input type="number" name="year" onChange={handleChange} placeholder="Year (e.g., 2024)" className="w-full mb-4 px-3 py-2 border rounded" required />
        <button type="submit" className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-600">
          Add Vehicle
        </button>
      </form>
    </div>
  );
}