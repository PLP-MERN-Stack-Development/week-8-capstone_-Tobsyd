import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
export default function Register() {
  const [form, setForm] = useState({ name:'',email:'',password:'' });
  const [error, setError]= useState('');
  const nav = useNavigate();
  const handleChange= (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = async (e) => {
    e.preventDefault();
   try {
     const { data } = await API.post('/auth/register', form);
     localStorage.setItem('token', data.token);
     nav('/dashboard');
   } catch (err) {
     setError(
      err?.response?.data?.message || 'Login failed. Please try again.'
     )
   }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      {error && <div className="text-red-500 mb-3">{error}</div>}

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name ="name"
            placeholder='name'
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            placeholder='johndoe@example.com'
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
            placeholder='password'
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
        <p>
          Already have an account? {""}
          <Link className="" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}