import React from 'react';
import MainLayout from './MainLayout';

export default function Product({ title, id, category }) {
  return (
    <MainLayout title={title}>
      <h2>Halaman Product</h2>
      <p>Product ID: {id}</p>
      <p>Category: {category}</p>
    </MainLayout>
  );
}
