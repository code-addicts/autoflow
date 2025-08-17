import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const { data } = await loginUser(formData);
      login(data.token); // Use the context's login function
      navigate('/');     // Redirect to the homepage
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-slate-700 mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-slate-600 font-semibold mb-2">Email Address</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              onChange={handleChange} 
              value={formData.email} 
              placeholder="you@example.com" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" 
              required 
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-slate-600 font-semibold mb-2">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              onChange={handleChange} 
              value={formData.password} 
              placeholder="••••••••" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" 
              required 
            />
          </div>
          
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <button 
            type="submit" 
            className="w-full bg-slate-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-slate-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-primary-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}