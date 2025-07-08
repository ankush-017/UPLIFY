import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { useSelector } from 'react-redux';

const Sidebar = ({ isOpen, setIsOpen }) => {

    const location = useLocation();
    const active = "bg-pink-500 text-white";
    const darkMode = useSelector((state) => state.theme.darkMode);

    return (
        <>
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                />
            )}

            <div
                className={`fixed top-0 left-0 z-40 h-full w-64
                    ${darkMode?"bg-[#0b204a]":"bg-blue-800"}
                 backdrop-blur-2xl text-white p-6 transform
                     ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    transition-transform duration-300 ease-in-out 
                    lg:translate-x-0 lg:static lg:block border-r-2 border-gray-600 shadow-md`}
            >
                {/* Close button on mobile */}
                <div className="lg:hidden flex justify-end mb-4">
                    <button onClick={() => setIsOpen(false)}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>

                <h2 className="text-2xl font-bold mb-6 border-blue-400 border-b-2 text-pink-400 text-center pb-3">Admin Panel</h2>

                <nav className="space-y-3">
                    <Link to="/admin" className={`block px-4 py-2 rounded ${location.pathname === '/admin' ? active : 'hover:bg-gray-800'}`}>Dashboard</Link>
                    <Link to="/admin/add-internships" className={`block px-4 py-2 rounded ${location.pathname === '/admin/add-internships' ? active : 'hover:bg-gray-800'}`}>Add Internships</Link>
                    <Link to="/admin/add-blog" className={`block px-4 py-2 rounded ${location.pathname === '/admin/add-blog' ? active : 'hover:bg-gray-800'}`}>Add Blog</Link>
                    <Link to="/admin/add-blog" className={`block px-4 py-2 rounded ${location.pathname === '/admin/add-blog' ? active : 'hover:bg-gray-800'}`}>Add Resources</Link>
                    <Link to="/admin/all-internships" className={`block px-4 py-2 rounded ${location.pathname === '/admin/all-internships' ? active : 'hover:bg-gray-800'}`}>All Internships</Link>
                    <Link to="/admin/add-blog" className={`block px-4 py-2 rounded ${location.pathname === '/admin/add-blog' ? active : 'hover:bg-gray-800'}`}>All Resources</Link>
                    <Link to="/admin/all-blogs" className={`block px-4 py-2 rounded ${location.pathname === '/admin/all-blogs' ? active : 'hover:bg-gray-800'}`}>All Blogs</Link>
                </nav>
            </div>
        </>
    );
}

export default Sidebar;