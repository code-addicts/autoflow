import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVehicleById, updateVehicle } from '../services/api';

export default function EditVehiclePage() {
  // 1. Get the vehicle ID from the URL and the navigate function for redirection
  const { id } = useParams();
  const navigate = useNavigate();

  // 2. Set up state to hold the vehicle data
  const [vehicle, setVehicle] = useState({
    ownerName: '', registrationNumber: '', type: '', brand: '', model: '', year: ''
  });
  const [loading, setLoading] = useState(true);

  // 3. Fetch the vehicle's current data when the page loads
  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const { data } = await getVehicleById(id);
        setVehicle(data);
      } catch (error) {
        console.error('Failed to fetch vehicle data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicleData();
  }, [id]); // This effect runs again if the ID in the URL changes

  // 4. Handle changes in the form inputs
  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  // 5. Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateVehicle(id, vehicle);
      navigate('/'); // Redirect to the main list after a successful update
    } catch (error) {
      console.error('Failed to update vehicle:', error);
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Loading vehicle data...</p>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Vehicle</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">Owner Name</label>
          <input name="ownerName" value={vehicle.ownerName} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Registration No.</label>
          <input name="registrationNumber" value={vehicle.registrationNumber} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Type</label>
          <input name="type" value={vehicle.type} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Brand</label>
          <input name="brand" value={vehicle.brand} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Model</label>
          <input name="model" value={vehicle.model} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Year</label>
          <input type="number" name="year" value={vehicle.year} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
          Save Changes
        </button>
      </form>
    </div>
  );
}