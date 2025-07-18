import React, { useState } from 'react';
import API from '../services/api';
export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const submit = async e => {
    e.preventDefault();
    await API.post('/auth/forgotpassword', { email });
    alert('Reset email sent');
  };
  return (
    <form onSubmit={submit} className="p-4">
      <input type="email" placeholder="Your email" onChange={e=>setEmail(e.target.value)} />
      <button type="submit">Send Reset Link</button>
    </form>
  );
}