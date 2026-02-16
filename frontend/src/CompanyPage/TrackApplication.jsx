import React, { useEffect, useState } from 'react';
import { supabase } from '../../superbaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Briefcase, FileUser, IndianRupee, MapPin, Pencil, Trash2, LayoutDashboard, Clock, Sparkles, PlusCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Spin } from 'antd';

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
      .eq('status', 'approved')   // filter here
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Network sync failed');
    } else {
      setApplications(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirm deletion of this listing?")) return;
    const { error } = await supabase.from('internships').delete().eq('id', id);
    if (error) {
      toast.error('Action failed');
    } else {
      toast.success('Listing permanently removed');
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
    <div className={`min-h-screen transition-colors duration-700 ${darkMode ? 'bg-[#020617] text-white' : 'bg-[#FCFDF2] text-slate-900'}`}>

      {/* --- CINEMATIC AMBIENCE --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full blur-[140px] opacity-20 ${darkMode ? 'bg-[#3DDC84]' : 'bg-[#C7EE3F]'}`} />
        <div className={`absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[140px] opacity-10 ${darkMode ? 'bg-[#C7EE3F]' : 'bg-[#3DDC84]'}`} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- HERO HEADER --- */}
        <div className="pt-10 pb-20 text-center flex flex-col items-center">
          <div className="flex flex-col items-center justify-center text-center mb-3 px-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm backdrop-blur-md ${darkMode ? 'bg-emerald-500/10 text-[#3DDC84] border border-emerald-500/20' : 'bg-[#3DDC84]/10 text-[#166534] border border-[#3DDC84]/20'}`}>
              <Sparkles size={14} className="animate-pulse" /> Intelligence Management Console
            </motion.div>
            <h1 className={`text-4xl md:text-6xl font-black tracking-tighter leading-none ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Monitor Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3DDC84] via-[#C7EE3F] to-[#3DDC84] bg-[length:200%_auto] animate-text-gradient pl-2"> Opportunities.</span>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.4 }}
            className="max-w-xl text-sm md:text-base font-medium tracking-wide leading-relaxed"
          >
            Track, edit, and manage your live internship listings. <br className="hidden md:block" />
            Analyze engagement and manage incoming student talent.
          </motion.p>
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="pb-32">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-6">
              <Spin size="large" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 animate-pulse">Syncing Database</span>
            </div>
          ) : applications.length === 0 ? (
            <div className={`text-center py-32 rounded-[4rem] border-2 border-dashed ${darkMode ? 'border-white/5 bg-white/5' : 'border-slate-200 bg-slate-100/50'}`}>
              <Briefcase size={48} className="mx-auto mb-6 opacity-10" />
              <p className="text-slate-500 font-black uppercase tracking-widest text-xs mb-8">Your dashboard is empty.</p>
              <button
                onClick={() => navigate('/company/post-internship')}
                className="px-8 py-4 rounded-2xl bg-[#3DDC84] text-[#002D15] font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-emerald-500/20"
              >
                Post New Role
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <AnimatePresence mode="popLayout">
                {applications.map((job, idx) => (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    className={`group relative p-8 md:p-10 rounded-[3.5rem] border transition-all duration-500 hover:-translate-y-2
              ${darkMode
                        ? "bg-[#0f172a]/40 border-white/5 hover:border-[#3DDC84]/40 shadow-2xl shadow-black/60 backdrop-blur-3xl"
                        : "bg-white border-slate-200 hover:border-[#3DDC84] shadow-[0_20px_50px_rgba(0,0,0,0.04)] shadow-slate-200/50"
                      }`}
                  >
                    {/* Top Bar: Source & Work Type */}
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex flex-col gap-2">
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] w-fit ${darkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>
                          {job.job_type || 'Internship'}
                        </span>
                        <span className={`text-[8px] font-bold uppercase tracking-widest opacity-40 ml-1`}>
                          Source: {job.source_type}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 opacity-30 text-[10px] font-black uppercase tracking-widest">
                        <Clock size={12} /> {timeAgo(job.created_at)}
                      </div>
                    </div>

                    {/* Title & Environment */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-black tracking-tight mb-2 line-clamp-1 italic group-hover:text-[#3DDC84] transition-colors">
                        {job.title}
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${job.type === 'Remote' ? 'text-blue-500 bg-blue-500/10' : 'text-amber-500 bg-amber-500/10'}`}>
                        {job.type}
                      </span>
                    </div>

                    {/* Primary Details */}
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3 text-xs font-bold opacity-50 uppercase tracking-wider">
                        <MapPin size={16} className="text-[#3DDC84]" /> {job.location || 'Global/Remote'}
                      </div>
                      <div className="flex items-center gap-3 text-xs font-black text-[#3DDC84]">
                        <IndianRupee size={16} /> {job.stipend || 'Competitive'}
                      </div>
                    </div>

                    {/* Skills Segment - The "Intelligence" touch */}
                    <div className="mb-10">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">Required Expertise</p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills?.split(',').map((skill, i) => (
                          <span
                            key={i}
                            className={`text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-tighter transition-all
                                ${darkMode
                                ? "bg-white/5 text-slate-400 border border-white/5 group-hover:border-[#3DDC84]/30"
                                : "bg-slate-100 text-slate-500 border border-transparent group-hover:bg-white group-hover:border-slate-200 shadow-sm"
                              }`}
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Elite Action Bar */}
                    <div className={`pt-8 border-t flex items-center justify-between ${darkMode ? 'border-white/5' : 'border-slate-100'}`}>
                      <div className="flex gap-3">
                        {job.source_type === 'on-uplify' && (
                          <Link
                            to={`/company/job-applicants/${job.id}`}
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${darkMode ? 'bg-white/5 hover:bg-blue-600/20 text-blue-400' : 'bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white shadow-sm shadow-blue-500/10'}`}
                            title="View Applicants"
                          >
                            <FileUser size={20} />
                          </Link>
                        )}
                        <Link
                          to={`/company/update-internship/${job.id}`}
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${darkMode ? 'bg-white/5 hover:bg-[#3DDC84]/20 text-[#3DDC84]' : 'bg-emerald-50 hover:bg-[#3DDC84] text-emerald-700 hover:text-[#002D15] shadow-sm shadow-emerald-500/10'}`}
                          title="Edit Details"
                        >
                          <Pencil size={20} />
                        </Link>
                      </div>

                      <button
                        onClick={() => handleDelete(job.id)}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${darkMode ? 'bg-white/5 hover:bg-red-500/20 text-red-400' : 'bg-red-50 hover:bg-red-600 text-red-600 hover:text-white shadow-sm shadow-red-500/10'}`}
                        title="Delete Listing"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    {/* Gradient Border Accent */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#3DDC84]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default TrackApplication;