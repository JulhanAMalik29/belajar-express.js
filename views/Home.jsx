import React from 'react';
import MainLayout from './MainLayout';

function Home({ name, title, mahasiswa, children }) {
  return (
    <MainLayout title={title}>
      <h2>Halo, {name}!</h2>

      <h2>List Mahasiswa</h2>

      {mahasiswa.length === 0 ? (
        <p>Tidak ada data mahasiswa.</p>
      ) : (
        mahasiswa.map((mhs, index) => (
          <ul key={index}>
            <li>Nama: {mhs.nama}</li>
            <li>Email: {mhs.email}</li>
          </ul>
        ))
      )}
    </MainLayout>
  );
}

module.exports = Home;
