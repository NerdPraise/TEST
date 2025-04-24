import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import ParticleBackground from './ParticleBackground';

const Layout: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-slate-900 overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;