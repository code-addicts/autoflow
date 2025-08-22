import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getVehicles, deleteVehicle } from '../services/api';

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true); // Added for the next step
  const [error, setError] = useState(null); // Added for the next step

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await getVehicles();
      setVehicles(data);
    } catch (err) {
      setError('Could not fetch vehicles.');
      console.error('Error fetching vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await deleteVehicle(id);
        fetchData(); // Refetch data to update the list
      } catch (err) {
        console.error('Error deleting vehicle:', err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Vehicle Fleet</h1>
        <Link to="/add" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-semibold shadow-md transition-colors">
          Add Vehicle
        </Link>
      </div>

      {/* This is the new, styled table structure */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Owner Name</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Registration No.</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Brand & Model</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Year</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length > 0 && vehicles.map((vehicle) => (
              <tr key={vehicle._id} className="hover:bg-gray-100 border-b border-gray-200">
                
                {/* --- THIS IS THE CHANGED PART --- */}
                <td className="px-5 py-4 whitespace-nowrap">
                  <Link to={`/vehicle/${vehicle._id}`} className="text-gray-900 hover:text-indigo-600 font-semibold">
                    {vehicle.ownerName}
                  </Link>
                </td>
                {/* ------------------------------------ */}

                <td className="px-5 py-4 whitespace-nowrap">
                  <p className="text-gray-900">{vehicle.registrationNumber}</p>
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <p className="text-gray-900">{vehicle.brand} {vehicle.model}</p>
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <p className="text-gray-900">{vehicle.year}</p>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-right">
                  <Link
                    to={`/edit/${vehicle._id}`}
                    className="text-indigo-600 hover:text-indigo-900 font-semibold mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(vehicle._id)}
                    className="text-red-600 hover:text-red-900 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {vehicles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No vehicles found. Add one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}