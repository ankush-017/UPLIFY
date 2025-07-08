import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { AdminBg } from '../../assets/image';

function AdminDashboard() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content with glassy effect */}
      <div
        className="flex-1 flex flex-col relative"
        style={{
          backgroundImage: `url(${AdminBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-black/5 backdrop-blur-sm z-0" />

        {/* Top bar */}
        <div className="pt-32 pb-2 px-4 relative z-10 text-white shadow-md flex items-center lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu className="w-6 h-6 text-white" />
          </button>
          <h1 className="ml-4 text-xl font-semibold text-white">Admin Panel</h1>
        </div>

        {/* Page Content */}
        <main className="pt-4 relative z-10 overflow-y-auto px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;