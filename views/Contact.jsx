import React from 'react';
import MainLayout from './MainLayout';

export default function Contact({
  title,
  contacts,
  successMessage,
  errorMessage,
}) {
  return (
    <MainLayout title={title}>
      <div className="row">
        <div className="col-md-6">
          <h2>{title}</h2>

          <a href="/contact/add" className="btn btn-primary m-3">
            Tambah Contact
          </a>

          {successMessage.length > 0 && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}

          {errorMessage.length > 0 && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama</th>
                <th scope="col">No. HP</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <td colSpan="4">
                  <div className="p-2">
                    <div className="alert alert-danger" role="alert">
                      Data Contacts belum ada <br />
                    </div>
                  </div>
                </td>
              ) : (
                <>
                  {contacts.map((contact, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{contact.nama}</td>
                      <td>{contact.nohp}</td>
                      <td>
                        <a
                          href={`/contact/${contact.nama}`}
                          className="btn btn-success badge rounded-pill"
                        >
                          detail
                        </a>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}
