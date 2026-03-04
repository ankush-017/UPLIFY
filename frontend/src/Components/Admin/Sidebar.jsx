import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X, 
  LayoutDashboard, 
  PlusCircle, 
  FileText, 
  FolderPlus, 
  Briefcase, 
  BookOpen, 
  CheckCircle,
  Settings,
  LogOut
} from 'lucide-react';
import { useSelector } from 'react-redux';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const darkMode = useSelector((state) => state.theme.darkMode);

  // Brand Colors (Uplify Green & Yellow)
  const brandGreen = "#108B3E";

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Add Internships', path: '/admin/add-internships', icon: PlusCircle },
    { name: 'Add Blog', path: '/admin/add-blogs', icon: FileText },
    { name: 'Add Resources', path: '/admin/add-resources', icon: FolderPlus },
    { name: 'All Internships', path: '/admin/all-internships', icon: Briefcase },
    { name: 'All Resources', path: '/admin/all-resources', icon: BookOpen },
    { name: 'All Blogs', path: '/admin/all-blogs', icon: FileText },
    { name: 'Approve Job', path: '/admin/approve-job', icon: CheckCircle },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 transition-all duration-300 ease-in-out transform border-r
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:block
          ${darkMode 
            ? "bg-[#000000] border-slate-800 text-slate-300 shadow-2xl shadow-black" 
            : "bg-white border-slate-200 text-slate-600 shadow-xl "} 
        `}
      >
        {/* 1. Header / Logo */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg bg-[#108B3E]`}>
               <span className="text-white font-black text-xl">U</span>
            </div>
            <div>
              <h2 className={`text-lg font-black tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                UPLIFY <span className="text-[#108B3E]">ADMIN</span>
              </h2>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">Management</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-1 hover:bg-slate-500/10 rounded-lg">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* 2. Navigation List */}
        <nav className="px-4 py-4 space-y-1 h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide">
          <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">General</div>
          
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative
                  ${isActive 
                    ? "bg-[#108B3E] text-white shadow-lg shadow-emerald-900/20" 
                    : darkMode 
                      ? "hover:bg-slate-800 text-slate-400 hover:text-white" 
                      : "hover:bg-slate-50 text-slate-500 hover:text-[#108B3E]"}
                `}
              >
                <item.icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                <span className="text-sm font-semibold tracking-tight">{item.name}</span>
                
                {/* Active Indicator Pin */}
                {isActive && (
                   <div className="absolute left-0 w-1 h-5 bg-white rounded-r-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* 3. Bottom Profile / Quick Actions */}
        <div className={`absolute bottom-0 left-0 w-full p-4 border-t ${darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50'}`}>
          <div className="flex items-center gap-3 px-2 py-3 rounded-xl">
             <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 font-bold border-2 border-white dark:border-slate-800">
                AD
             </div>
             <div className="flex-1 overflow-hidden">
                <p className={`text-xs font-bold truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>Admin Master</p>
                <p className="text-[10px] text-slate-500 truncate">master@uplify.in</p>
             </div>
             <button className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors">
                <LogOut size={16} />
             </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;