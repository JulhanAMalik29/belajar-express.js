import React from 'react';
import Navbar from './components/Navbar';

export default function MainLayout({ title, children }) {
  return (
    <html>
      <head>
        <title>{title}</title>
      </head>

      <Navbar />

      <body>{children}</body>
    </html>
  );
}
