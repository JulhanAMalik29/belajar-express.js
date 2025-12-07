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
                  <li className="list-group-item bg-dark border-0 d-flex justify-content-between">
                    <a href="/contact" className="btn btn-outline-light btn-sm">
                      Kembali
                    </a>
                    <div className="aksi d-flex gap-2">
                      <a
                        href={`/contact/edit/${contact.nama}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Edit
                      </a>
                      <form action="/contact?_method=DELETE" method="POST">
                        <input type="hidden" name="nama" value={contact.nama} />
                        <button
                          type="submit"
                          className="btn btn-outline-danger btn-sm"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
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
