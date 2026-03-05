import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  FileText, 
  User, 
  Tag, 
  Image as ImageIcon, 
  Calendar, 
  AlignLeft, 
  Send 
} from 'lucide-react';
import Seo from '../../Seo';
import API from '../../../API.js';

function AddBlog() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    author: '',
    category: '',
    image: '',
    fullContent: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/api/add-blogs/admin-blogs", form);
      if (res.data.success) {
        toast.success('Blog published successfully!');
        setForm({ title: '', excerpt: '', author: '', category: '', image: '', fullContent: '', date: '' });
      } else {
        toast.error('Failed to add blog');
      }
    } catch (err) {
      console.error("Error adding blog:", err);
      toast.error('Internal Server Error');
    } finally {
      setLoading(false);
    }
  };

  // Professional Theme Classes
  const inputBg = darkMode ? "bg-slate-800/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-900";
  const labelStyle = "text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block ml-1";

  return (
    <>
      <Seo
        title="Create Post | Uplify Admin"
        description="Write and publish a new blog post."
      />

      <div className="pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header Section */}
          <div className="mb-8">
            <h1 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Write <span className="text-[#108B3E]">Blog Post</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">Share insights, tutorials, or company updates with the Uplify community.</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content Area (Left 2 Columns) */}
            <div className={`lg:col-span-2 p-6 md:p-8 rounded-3xl border backdrop-blur-md shadow-xl ${
              darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100'
            }`}>
              <div className="space-y-6">
                <div>
                  <label className={labelStyle}>Post Title</label>
                  <input
                    name="title"
                    required
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter a catchy title..."
                    className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-[#108B3E] transition-all text-lg font-bold ${inputBg}`}
                  />
                </div>

                <div>
                  <label className={labelStyle}>Full Content (Markdown Supported)</label>
                  <textarea
                    name="fullContent"
                    value={form.fullContent}
                    onChange={handleChange}
                    rows={15}
                    required
                    placeholder="# Hello World..."
                    className={`w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-[#108B3E] transition-all font-mono text-sm leading-relaxed ${inputBg}`}
                  />
                </div>
              </div>
            </div>

            {/* Sidebar Settings (Right 1 Column) */}
            <div className="space-y-6">
              <div className={`p-6 rounded-3xl border backdrop-blur-md shadow-lg ${
                darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100'
              }`}>
                <h3 className={`text-sm font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  <AlignLeft size={16} className="text-[#108B3E]" /> Post Metadata
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className={labelStyle}>Author</label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input name="author" value={form.author} onChange={handleChange} required className={`w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none text-sm ${inputBg}`} />
                    </div>
                  </div>

                  <div>
                    <label className={labelStyle}>Category</label>
                    <div className="relative">
                      <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input name="category" value={form.category} onChange={handleChange} placeholder="AI, Tech, Careers" className={`w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none text-sm ${inputBg}`} />
                    </div>
                  </div>

                  <div>
                    <label className={labelStyle}>Publish Date</label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="date" name="date" value={form.date} onChange={handleChange} required className={`w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none text-sm ${inputBg}`} />
                    </div>
                  </div>

                  <div>
                    <label className={labelStyle}>Cover Image URL</label>
                    <div className="relative">
                      <ImageIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="url" name="image" value={form.image} onChange={handleChange} placeholder="https://..." className={`w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none text-sm ${inputBg}`} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-3xl border backdrop-blur-md shadow-lg ${
                darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100'
              }`}>
                <label className={labelStyle}>Excerpt</label>
                <textarea
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  rows={3}
                  required
                  placeholder="Short summary for the card view..."
                  className={`w-full p-3 rounded-xl border outline-none text-xs leading-normal ${inputBg}`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#108B3E] hover:bg-[#0D7232] text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-emerald-900/20 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={18} />
                    Publish Post
                  </>
                )}
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </>
  );
}

export default AddBlog;