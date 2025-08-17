import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api'; // We will add this to api.js

export default function RegistrationPage() {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }

    try {
      await registerUser({ email: formData.email, password: formData.password });
      navigate('/login'); // Redirect to login page on successful registration
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-slate-700 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-slate-600 font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-slate-600 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-slate-600 font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-slate-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-slate-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}