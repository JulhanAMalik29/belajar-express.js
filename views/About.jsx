import React from 'react';
import MainLayout from './MainLayout';

export default function About({ title }) {
  return (
    <MainLayout title={title}>
      <h2>Halaman About</h2>
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <img
              src="/img/julhan.jpg"
              alt="Julhan Abdul Malik"
              className="img-thumbnail rounded-circle"
              width="200"
            />
            <h1>Julhan Abdul Malik</h1>
            <p className="lead">
              Fullstack Web Developer | Academy Code Reviewer
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
