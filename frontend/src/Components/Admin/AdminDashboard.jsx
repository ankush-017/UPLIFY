import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Menu, ChevronRight } from 'lucide-react';
import Seo from '../Seo.jsx';

function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <>
      <Seo title="Admin Dashboard | Uplify" />

      <div className={`flex h-screen overflow-hidden transition-colors duration-500 ${
        darkMode ? 'bg-[#030304]' : 'bg-[#fcfcfd]'
      }`}>
        
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative overflow-hidden">

          <div className="absolute inset-0 pointer-events-none">
            <div className={`absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full blur-[120px] transition-opacity duration-1000 ${
              darkMode ? 'bg-emerald-900/10 opacity-40' : 'bg-emerald-100/30 opacity-60'
            }`} />
          </div>

          <div className="lg:hidden absolute top-4 left-4 z-50">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`p-3 rounded-2xl shadow-xl backdrop-blur-md border ${
                darkMode 
                  ? 'bg-slate-900/80 border-slate-700 text-white' 
                  : 'bg-white/80 border-slate-200 text-slate-800'
              }`}
            >
              <Menu size={20} />
            </button>
          </div>

          <main className="flex-1 relative z-10 overflow-y-auto overflow-x-hidden p-6 md:p-12 custom-scrollbar">
            <div className="max-w-6xl mx-auto h-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
export default AdminDashboard;