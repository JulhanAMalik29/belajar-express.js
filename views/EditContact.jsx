import React from 'react';
import MainLayout from './MainLayout';

export default function EditContact({ title, errors, contact }) {
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

          <h3 className="mt-4">Form Edit Contact</h3>
          <form action="/contact?_method=PUT" method="POST" className="p-3">
            <input type="hidden" name="_id" defaultValue={contact._id} />
            <input
              type="hidden"
              name="oldNama"
              defaultValue={contact.oldNama || contact.nama}
            />

            <div className="mb-3">
              <label htmlFor="nama" className="form-label">
                Nama
              </label>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary "
                id="nama"
                name="nama"
                defaultValue={contact.nama}
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
                defaultValue={contact.nohp}
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
                defaultValue={contact.email}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Simpan Perubahan
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
