import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from '../../superbaseClient';
import {
  Briefcase, IndianRupee, MapPin, Filter, Calendar,
  Clock, ChevronRight, Star, Sparkles, Search,
  RotateCcw, Cpu, Layers, Target, Award, Zap, ShieldCheck, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spin, Slider, Tooltip } from 'antd';
import Login from '../Components/Login';
import toast from 'react-hot-toast';
import FilterInternship from '../Components/Tools/FilterInternship';

export default function Internships() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [internships, setInternships] = useState([]);
  const [loginShow, setLoginShow] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Advanced Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    types: [],
    skills: [],
    minStipend: 0,
  });

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    setLoading(true);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const dateString = thirtyDaysAgo.toISOString();

    const { data, error } = await supabase
      .from('internships')
      .select('*')
      .gte('created_at', dateString)
      .order('created_at', { ascending: false });

    if (!error) setInternships(data);
    else toast.error("Live feed interrupted. Try again.");
    setLoading(false);
  };

  const filteredData = useMemo(() => {
    return internships.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filters.types.length === 0 || filters.types.includes(item.type);
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(item.job_type);
      const itemSkills = item.skills?.toLowerCase() || "";
      const matchesSkills = filters.skills.length === 0 ||
        filters.skills.every(skill => itemSkills.includes(skill.toLowerCase()));
      const stipendNum = parseInt(item.stipend?.replace(/[^0-9]/g, '')) || 0;
      const matchesStipend = stipendNum >= filters.minStipend;

      return matchesSearch && matchesType && matchesCategory && matchesSkills && matchesStipend;
    });
  }, [internships, searchQuery, filters]);

  const resetFilters = () => {
    setFilters({ categories: [], types: [], skills: [], minStipend: 0 });
    setSearchQuery('');
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${darkMode ? "bg-[#020602] text-white" : "bg-[#f4fcf6] text-slate-900"}`}>

      {/* --- Mobile Filter Overlay --- */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed inset-x-0 bottom-0 z-[80] lg:hidden rounded-t-[3rem] p-6 max-h-[90vh] overflow-y-auto border-t-2 ${darkMode ? "bg-[#050a05] border-emerald-500/30" : "bg-white border-emerald-100"
                }`}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-black uppercase tracking-widest text-emerald-500">Filter Options</h2>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className={`p-2 rounded-full ${darkMode ? "bg-white/10" : "bg-emerald-50 text-emerald-600"}`}
                >
                  <X size={20} />
                </button>
              </div>
              {/* Reusing the Filter Component logic inside the mobile drawer */}
              <FilterInternship filters={filters} setFilters={setFilters} resetFilters={resetFilters} darkMode={darkMode} />

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-4 mt-6 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20"
              >
                Apply Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Floating Filter Button */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMobileFilterOpen(true)}
          className="flex items-center gap-3 px-8 py-4 bg-emerald-500 text-white rounded-full shadow-[0_20px_40px_rgba(16,185,129,0.4)] font-black text-xs uppercase tracking-widest"
        >
          <Filter size={18} /> Filters
          {filters.categories.length > 0 && (
            <span className="w-5 h-5 bg-yellow-400 text-black rounded-full flex items-center justify-center text-[10px]">
              {filters.categories.length}
            </span>
          )}
        </motion.button>
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-20 ${darkMode ? 'bg-emerald-500' : 'bg-emerald-300'}`} />
        <div className={`absolute top-1/2 -left-24 w-72 h-72 rounded-full blur-[100px] opacity-10 ${darkMode ? 'bg-yellow-500' : 'bg-emerald-200'}`} />
      </div>

      <div className="container mx-auto px-4 pt-10 pb-16 max-w-7xl relative z-10">

        {/* --- Header Section --- */}
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black tracking-widest uppercase">Live Pulse</span>
              <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
              FIND YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-yellow-500 italic">EDGE.</span>
            </h1>
            <p className="text-sm font-medium opacity-50 max-w-md">Access exclusive roles from global tech leaders, updated in real-time. Verified for 2025.</p>
          </div>

          <div className="relative group w-full md:w-[400px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500 group-focus-within:scale-110 transition-transform" size={20} />
            <input
              type="text"
              value={searchQuery}
              placeholder="Search by role, tech, or company..."
              className={`pl-14 pr-6 py-5 rounded-[2rem] w-full border-2 outline-none transition-all font-bold text-sm
                ${darkMode ? "bg-white/5 border-white/10 focus:border-emerald-500 focus:bg-white/10" : "bg-white border-emerald-100 focus:border-emerald-500 shadow-xl shadow-emerald-900/5"}`}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">

          {/* --- Desktop Sidebar Filters (Hidden on Mobile) --- */}
          <div className="hidden lg:block">
            <FilterInternship filters={filters} setFilters={setFilters} resetFilters={resetFilters} darkMode={darkMode} />
          </div>

          {/* --- Grid Main --- */}
          <main className="flex-1">
            {loading ? (
              <div className="h-96 flex flex-col items-center justify-center gap-6">
                <Spin size="large" />
                <p className="text-xs font-black uppercase tracking-[0.4em] text-emerald-500">Syncing database...</p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredData.map((job, index) => {
                    const getRelativeTime = (dateString) => {
                      const now = new Date();
                      const created = new Date(dateString);
                      const diffInDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));
                      if (diffInDays < 1) return 'Today';
                      if (diffInDays === 1) return '1d ago';
                      if (diffInDays < 7) return `${diffInDays}d ago`;
                      return `${Math.floor(diffInDays / 7)}w ago`;
                    };

                    return (
                      <motion.div
                        layout
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`group relative rounded-[2rem] p-5 md:p-8 border-2 transition-all duration-300
                ${darkMode
                            ? "bg-[#050a05] border-emerald-900/30 hover:border-yellow-500/40"
                            : "bg-white border-emerald-50 shadow-xl shadow-emerald-900/5 hover:border-yellow-200"}`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500 mb-3">
                              <span className="opacity-60">#{index + 1}</span>
                              <div className="flex items-center gap-1">
                                <Clock size={12} />
                                <span>{getRelativeTime(job.created_at)}</span>
                              </div>
                            </div>

                            <h3 className={`text-lg md:text-xl font-black leading-tight mb-3 tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}>
                              {job.title} - {job.job_type || 'HIH'} - {job.company}
                            </h3>

                            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mb-4">
                              <div className="flex items-center gap-2 text-sm font-bold text-emerald-500">
                                <Briefcase size={16} />
                                <span className={darkMode ? "text-emerald-400" : "text-emerald-700"}>{job.company}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm font-medium opacity-60">
                                <MapPin size={16} className="text-yellow-500" />
                                <span>{job.location || 'Hyderabad'}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm font-medium opacity-60">
                                <Award size={16} className="text-yellow-500" />
                                <span>{job.experience || 'Fresher'}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm font-medium">
                                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] border transition-all duration-300
    ${job.type?.toLowerCase() === 'remote'
                                    ? "bg-yellow-500/5 text-yellow-400 border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.05)] group-hover:border-yellow-500/50"
                                    : job.type?.toLowerCase() === 'onsite'
                                      ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)] group-hover:border-emerald-500/50"
                                      : "bg-cyan-500/5 text-cyan-400 border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.05)] group-hover:border-cyan-500/50"
                                  }`}>

                                  {/* Animated Dot for "Live" feel */}
                                  <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 animate-pulse
      ${job.type?.toLowerCase() === 'remote' ? "bg-yellow-400" : job.type?.toLowerCase() === 'onsite' ? "bg-emerald-400" : "bg-cyan-400"}`}
                                  />

                                  {job.type || 'Onsite'}
                                </span>
                              </div>
                            </div>

                            <div className="mb-4 md:mb-0">
                              <p className="text-[11px] md:text-xs leading-relaxed opacity-70 italic">
                                <span className={`font-black ${darkMode ? "text-emerald-400" : "text-emerald-600"} not-italic mr-2`}>**Key Skills**</span>
                                {job.skills || "Unix Performance tuning Linux JDBC Informatica SQL Python Firewall"}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-start md:items-end justify-between self-stretch gap-4">
                            <button
                              onClick={() => {
                                if (!isAuthenticated) setLoginShow(true);
                                else if (job.source_type === "on-uplify") navigate(`/user/job-internships/u/apply-internships/${job.id}`);
                                else window.open(job.link, '_blank');
                              }}
                              className="w-full md:w-auto px-10 py-3.5 bg-gradient-to-r from-emerald-700 to-emerald-500 hover:from-yellow-600 hover:to-yellow-500 text-white md:text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg shadow-emerald-500/20"
                            >
                              <Zap size={16} fill="currentColor" /> Apply
                            </button>

                            <div className="flex items-center justify-between w-full md:w-auto gap-4">
                              <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest
                      ${darkMode ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" : "bg-yellow-50 text-yellow-700 border border-yellow-100"}`}>
                                {job.job_type || 'Developer'}
                              </span>
                              <span className="text-[10px] font-bold opacity-60 md:hidden">
                                Posted: {new Date(job.created_at).toLocaleDateString('en-GB')}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className={`hidden md:block absolute bottom-4 right-8 opacity-60 text-[9px] ${darkMode ? "text-gray-50" : "text-gray-900"} font-black uppercase tracking-tighter`}>
                          Published: {new Date(job.created_at).toLocaleDateString('en-GB')}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </main>
        </div>
      </div>

      {loginShow && <Login onClose={() => setLoginShow(false)} />}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #10b981; border-radius: 20px; }
      `}</style>
    </div>
  );
}