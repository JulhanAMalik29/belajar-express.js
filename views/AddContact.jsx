import React from 'react';
import MainLayout from './MainLayout';

export default function AddContact({ title, errors }) {
  return (
    <MainLayout title={title}>
      <div className="row">
        <div className="col-md-6">
          <h2>{title}</h2>

          {errors && (
            <div className="alert alert-danger">
              <ul className="mb-0">
                {errors.map((error, index) => (
                  <li key={index}>{error.msg}</li>
                ))}
              </ul>
            </div>
          )}

          <h3 className="mt-4">Form Tambah Contact</h3>
          <form action="/contact" method="POST" className="p-3">
            <div className="mb-3">
              <label htmlFor="nama" className="form-label">
                Nama
              </label>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary "
                id="nama"
                name="nama"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nohp" className="form-label">
                No HP
              </label>
              <input
                type="number"
                className="form-control bg-dark text-light border-secondary"
                id="nohp"
                name="nohp"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control bg-dark text-light border-secondary"
                id="email"
                name="email"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
