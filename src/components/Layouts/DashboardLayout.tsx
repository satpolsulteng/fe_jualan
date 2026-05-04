import React from 'react';
import Navbar from '@/components/Fragments/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[var(--bg-color)] transition-colors duration-300">
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
