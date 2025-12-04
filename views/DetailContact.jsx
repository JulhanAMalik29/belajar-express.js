import React from 'react';
import MainLayout from './MainLayout';

export default function DetailContact({ title, contact }) {
  return (
    <MainLayout title={title}>
      <div className="row">
        <div className="col-md-6">
          <h2>{title}</h2>
          <div className="card text-bg-dark" style={{ width: '18rem' }}>
            <div className="card-header text-center fw-bold">Contact</div>
            <ul className="list-group list-group-flush ">
              {contact === undefined ? (
                <div className="p-2">
                  <div className="alert alert-danger" role="alert">
                    Data Contact tidak ditemukan <br />
                    <a
                      href="/contact"
                      className="btn btn-outline-danger btn-sm mt-2"
                    >
                      &laquo; Kembali
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <li className="list-group-item bg-dark text-white">
                    {contact.nama}
                  </li>
                  <li className="list-group-item bg-dark text-white">
                    {contact.nohp}
                  </li>
                  <li className="list-group-item bg-dark text-white">
                    {contact.email}
                  </li>
                  <li className="list-group-item bg-dark border-0 text-end">
                    <a href="/contact" className="btn btn-outline-light btn-sm">
                      &laquo; Kembali
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
