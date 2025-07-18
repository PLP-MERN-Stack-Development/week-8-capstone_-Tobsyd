import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Login() {
  const [form, setForm] = useState({ email:'',password:'' });
  const [error, setError] = useState('');
  const nav = useNavigate();
  const handleChange =(e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await API.post('/auth/login', form);
      //Save token
      localStorage.setItem('token', data.token);
        // Optionally save user info(including role)
      localStorage.setItem('role', data.user.role);
      if(data.user.role === 'admin'){
        nav('/admin')
      } else{

      nav('/dashboard');
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || 'Login failed. Please try again.')
    }
  };
  return (
       <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      {error && <div className="text-red-500 mb-3">{error}</div>}

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <p>
        Don't have an account? {""}
        <Link className="" to="/register">
            Register
        </Link>
      </p>
    </div>
  );
}