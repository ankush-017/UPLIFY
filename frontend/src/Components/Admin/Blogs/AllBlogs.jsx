import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Eye, Calendar, User, Search, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import Seo from '../../Seo.jsx';
import API from '../../../API.js';

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const darkMode = useSelector((state) => state.theme.darkMode);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await API.get('/api/all-blogs');
      if (res.data.success) {
        setBlogs(res.data.blogs);
      }
    } 
    catch (err) {
      toast.error("Error fetching blogs");
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Seo title="Manage All Blogs | Uplify Admin" />

      <div className="pb-14">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Blog <span className="text-[#108B3E]">Library</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">Manage, edit, and monitor your published articles.</p>
          </div>
          
          <Link 
            to="/admin/add-blogs"
            className="flex items-center gap-2 bg-[#108B3E] hover:bg-[#0D7232] text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-green-900/20 transition-all active:scale-95"
          >
            <Plus size={18} />
            Create Post
          </Link>
        </div>

        {/* Search Bar */}
        <div className={`mb-8 flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all ${
          darkMode ? 'bg-slate-900/50 border-slate-800 focus-within:border-emerald-500' : 'bg-white border-slate-200 focus-within:border-[#108B3E]'
        }`}>
          <Search size={20} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search blogs by title..." 
            className="bg-transparent border-none outline-none w-full text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          /* Professional Loading State */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-80 rounded-3xl animate-pulse ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
            ))}
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-slate-400 mb-4 flex justify-center"><Search size={48} opacity={0.5}/></div>
            <p className="text-slate-500 font-medium">No blogs match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredBlogs.map((blog) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={blog.id}
                  className={`group rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${
                    darkMode 
                      ? 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/50 shadow-black' 
                      : 'bg-white border-slate-100 hover:border-[#108B3E] shadow-slate-200'
                  }`}
                >
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={blog.image || 'https://via.placeholder.com/400x200'} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#FFD700] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                        {blog.category || 'Article'}
                      </span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6">
                    <h2 className={`text-xl font-bold mb-2 line-clamp-2 leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {blog.title}
                    </h2>
                    <p className="text-slate-500 text-xs line-clamp-2 mb-4">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-6">
                      <span className="flex items-center gap-1"><User size={12} className="text-[#108B3E]"/> {blog.author}</span>
                      <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(blog.date).toLocaleDateString()}</span>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        to={`/blog/${blog.id}`}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          darkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <Eye size={14} /> View
                      </Link>
                      <Link
                        to={`/admin/update-blog/${blog.id}`}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#108B3E] hover:bg-[#0D7232] text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-green-900/20"
                      >
                        <Edit3 size={14} /> Edit
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </>
  );
}