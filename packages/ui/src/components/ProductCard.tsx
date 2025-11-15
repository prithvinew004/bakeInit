import React from 'react';

export default function ProductCard({ name, price }: { name: string; price: number }) {
  return (
    <div style={{ border: '1px solid #eee', padding: 12, borderRadius: 8 }}>
      <h3>{name}</h3>
      <div>₹{(price / 100).toFixed(2)}</div>
    </div>
  );
}