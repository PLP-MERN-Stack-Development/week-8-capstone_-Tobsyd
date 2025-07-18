import React, { useState } from 'react';
import API from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
export default function ResetPassword() {
  const { token } = useParams();
  const nav = useNavigate();
  const [password, setPassword] = useState('');
  const submit = async e => {
    e.preventDefault();
    await API.put(`/auth/resetpassword/${token}`, { password });
    alert('Password reset successful');
    nav('/login');
  };
  return (
    <form onSubmit={submit} className="p-4">
      <input type="password" placeholder="New Password" onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Reset Password</button>
    </form>
  );
}