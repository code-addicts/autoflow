import React, { useState } from 'react';
import { createWorkflow } from '../services/api';

export default function AddWorkflowModal({ isOpen, onClose, vehicleId, onWorkflowAdded }) {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await createWorkflow({ ...formData, vehicleId });
      onWorkflowAdded(); // Notify the parent component that a workflow was added
    } catch (err) {
      setError('Failed to create workflow.');
      console.error(err);
    }
  };

  // If the modal is not open, render nothing
  if (!isOpen) {
    return null;
  }

  return (
    // Modal Overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal Content */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-slate-700 mb-6">Add New Workflow</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-slate-600 font-semibold mb-2">
              Workflow Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              placeholder="e.g., Annual Service"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-slate-600 font-semibold mb-2">
              Description (Optional)
            </label>
            <textarea
              name="description"
              id="description"
              onChange={handleChange}
              rows="3"
              placeholder="e.g., Includes oil change, tire rotation, and inspection."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}


            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onClose}
                    // Add a smooth color transition
                    className="px-4 py-2 rounded-lg text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold transition-colors duration-300"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    // Add the same dynamic hover effect as the main button
                    className="px-4 py-2 rounded-lg bg-slate-800 text-white font-bold hover:bg-primary-600 transition-all duration-300 transform hover:scale-105"
                >
                    Create Workflow
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}