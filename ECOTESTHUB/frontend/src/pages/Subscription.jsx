import React, { useState } from 'react';
import API from '../services/api';

const prices = [
  { id: 'price_monthly', label: 'Monthly - $5' },
  { id: 'price_unlimited', label: 'Unlimited - $20' }
];

export default function Subscription() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (priceId) => {
    setLoading(true);
    const { data } = await API.post('/payments/create-session', { priceId });
    window.location = data.url;
  };

  return (
    <div className="p-4">
      <h1>Choose Subscription</h1>
      {prices.map(p => (
        <button
          key={p.id}
          onClick={() => handleSubscribe(p.id)}
          disabled={loading}
          className="block mb-2 p-2 border rounded"
        >{p.label}</button>
      ))}
    </div>
  );
}