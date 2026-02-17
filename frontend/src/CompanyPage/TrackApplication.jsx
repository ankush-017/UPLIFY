import React, { useEffect, useState } from 'react';
import { supabase } from '../../superbaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  FileUser, IndianRupee, MapPin, Pencil, Trash2, 
  Clock, Terminal, Globe2, BarChart3, Target, 
  Activity, LayoutGrid, Plus
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Spin, Tooltip } from 'antd';

function TrackApplication() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();
  const { uid } = JSON.parse(localStorage.getItem('uplify_user')) || {};
  const uidString = uid ? uid.toString() : '';

  const fetchApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('internships')
      .select('*')
      .eq('uid', uidString)
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Network sync failed');
    } else {
      setApplications(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirm: Permanent removal of this node?")) return;
    const { error } = await supabase.from('internships').delete().eq('id', id);
    if (error) {
      toast.error('Purge failed');
    } else {
      toast.success('Node removed successfully');
      setApplications(prev => prev.filter(app => app.id !== id));
    }
  };

  useEffect(() => { fetchApplications(); }, []);

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 3600) return 'Recent';
    const hours = Math.floor(seconds / 3600);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 selection:bg-[#3DDC84] selection:text-[#002D15] ${darkMode ? 'bg-[#020617] text-slate-200' : 'bg-[#F9FAFB] text-slate-900'}`}>
      
      {/* --- BEST-IN-CLASS BACKGROUND --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* --- COMPACT PROFESSIONAL HEADER --- */}
        <header className="pt-10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-[#3DDC84] font-black text-[9px] uppercase tracking-[0.4em]">
              <Terminal size={14} /> Intelligence Console
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none italic uppercase">
              Monitor <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0bb457] to-[#99bd13] not-italic">Your Listing.</span>
            </h1>
            <p className="text-sm font-medium opacity-50 tracking-wide max-w-md leading-snug">
              Manage opportunities and track student talent in real-time.
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl border backdrop-blur-md ${darkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200'} hidden sm:flex`}>
              <Activity size={16} className="text-[#3DDC84]" />
              <div className="leading-none">
                <p className={`text-[10px] font-black ${darkMode ? 'text-slate-400' : 'text-gray-500'} opacity-70 uppercase mb-1`}>Active Nodes</p>
                <p className="text-lg font-mono font-bold text-[#3DDC84]">{applications.length}</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/company/post-internship')}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#3DDC84] text-[#002D15] font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-emerald-500/20"
            >
              <Plus size={16} strokeWidth={3} /> Create New Listing
            </button>
          </div>
        </header>

        {/* --- HORIZONTAL LISTING ENGINE --- */}
        <main className="pb-32">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Spin size="large" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">Syncing Grid...</span>
            </div>
          ) : applications.length === 0 ? (
            <div className={`py-40 text-center border-2 border-dashed rounded-[3rem] ${darkMode ? 'border-white/5' : 'border-slate-200'}`}>
               <Target size={48} className="mx-auto mb-4 opacity-10" />
               <h3 className="text-sm font-black opacity-30 uppercase tracking-widest">Sector Empty: Deploy New Listing</h3>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {/* Table Header Labels */}
              <div className="hidden lg:grid grid-cols-12 px-12 py-3 text-[9px] font-black uppercase tracking-[0.3em] opacity-30">
                <div className="col-span-4">Operational Identity</div>
                <div className="col-span-4">Technology Stack</div>
                <div className="col-span-2">Yield / Origin</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              <AnimatePresence mode="popLayout">
                {applications.map((job) => (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className={`group relative grid grid-cols-1 lg:grid-cols-12 items-center px-8 lg:px-12 py-6 rounded-[2rem] border transition-all duration-300 backdrop-blur-sm
                      ${darkMode 
                        ? "bg-white/[0.03] border-white/5 hover:border-[#3DDC84]/30 hover:bg-white/[0.06]" 
                        : "bg-white border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-[#3DDC84]"
                      }`}
                  >
                    {/* 1. Identity */}
                    <div className="col-span-1 lg:col-span-4 mb-4 lg:mb-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-0.5 rounded bg-[#3DDC84]/10 text-[#3DDC84] text-[8px] font-black uppercase italic">
                          {job.job_type}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] font-bold opacity-30 uppercase tracking-tighter">
                          <Clock size={12} /> {timeAgo(job.created_at)}
                        </div>
                      </div>
                      <h3 className="text-xl font-black tracking-tighter truncate group-hover:text-[#3DDC84] transition-colors uppercase">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 opacity-50 text-[10px] font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-1"><MapPin size={12} /> {job.location || 'Global'}</span>
                        <span className="flex items-center gap-1"><Globe2 size={12} /> {job.type}</span>
                      </div>
                    </div>

                    {/* 2. Skills Stack */}
                    <div className="col-span-1 lg:col-span-4 mb-6 lg:mb-0 pr-4">
                      <div className="flex flex-wrap gap-1.5">
                        {job.skills?.split(',').map((skill, i) => (
                          <span 
                            key={i} 
                            className={`text-[9px] font-black px-2.5 py-1 rounded-md border transition-all
                              ${darkMode 
                                ? 'bg-white/5 border-white/5 text-slate-400 group-hover:text-[#3DDC84]' 
                                : 'bg-slate-50 border-slate-100 text-slate-500 group-hover:bg-white group-hover:border-[#3DDC84]'}`}
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 3. Stipend & Source */}
                    <div className="col-span-1 lg:col-span-2 mb-6 lg:mb-0">
                      <div className="flex items-center gap-1 text-xl font-black text-[#3DDC84] mb-0.5">
                        <IndianRupee size={18} strokeWidth={3} /> {job.stipend}
                      </div>
                      <p className="text-[9px] font-black uppercase tracking-widest opacity-50">Source: {job.source_type}</p>
                    </div>

                    {/* 4. Action Nexus */}
                    <div className="col-span-1 lg:col-span-2 flex justify-end items-center gap-2">
                      {job.source_type === 'on-uplify' && (
                        <Tooltip title="View Talent Pipeline">
                          <Link
                            to={`/company/job-applicants/${job.id}`}
                            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${darkMode ? 'bg-white/5 text-blue-400 hover:bg-blue-500 hover:text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'}`}
                          >
                            <BarChart3 size={18} />
                          </Link>
                        </Tooltip>
                      )}
                      
                      <Tooltip title="Update Listing">
                        <Link
                          to={`/company/update-internship/${job.id}`}
                          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${darkMode ? 'bg-white/5 text-white hover:bg-white/20' : 'bg-slate-100 text-slate-900 hover:bg-slate-900 hover:text-white'}`}
                        >
                          <Pencil size={18} />
                        </Link>
                      </Tooltip>

                      <Tooltip title="Delete Listing">
                        <button
                          onClick={() => handleDelete(job.id)}
                          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${darkMode ? 'bg-white/5 text-red-400 hover:bg-red-500 hover:text-white' : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white'}`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </Tooltip>
                    </div>

                    {/* Indicator Glow */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 group-hover:h-1/2 bg-[#3DDC84] transition-all duration-500 rounded-r-full" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default TrackApplication;