import React from 'react';
import MainLayout from './main-layout';

export default function About({ title }) {
  return (
    <MainLayout title={title}>
      <h2>Halaman About</h2>
    </MainLayout>
  );
}
