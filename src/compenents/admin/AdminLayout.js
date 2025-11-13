import React from 'react';
import AdminNavbar from './navbar';

export function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <section className="pt-16">
        {children}
      </section>
    </div>
  );
}