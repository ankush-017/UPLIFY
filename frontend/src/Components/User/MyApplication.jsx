import React, { useEffect, useState } from 'react';
import { supabase } from '../../../superbaseClient.js';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MapPin, Wallet, CheckCircle, ListFilter, Users,
  Map, FileUser, Zap, Building2, ChevronRight,
  Globe, Target, Cpu, Activity, Fingerprint, X, ShieldCheck, Box
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

function MyApplication() {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const uid = user?.uid;

  const filters = ['All', 'Full-time', 'Internship', 'Remote', 'On-Site', 'Hybrid'];

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      if (!uid) { setLoading(false); return; }

      const { data, error } = await supabase
        .from('applyapplications')
        .select(`*, internships(*)`)
        .eq('uid', uid);

      if (error) {
        console.error('Error fetching:', error.message);
      } 
      else {
        setApplications(data || []);
        setFilteredApps(data || []);
      }
      setLoading(false);
    };
    fetchApplications();
  }, [uid]);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredApps(applications);
    } else {
      const query = activeFilter.toLowerCase();
      const filtered = applications.filter(app => {
        const intern = app.internships || {};
        const target = `${intern.type} ${intern.job_type} ${intern.location} ${intern.company}`.toLowerCase();
        return target.includes(query);
      });
      setFilteredApps(filtered);
    }
  }, [activeFilter, applications]);

  return (
    <>
      <Helmet>
        <title>Vault | Node Alpha-7</title>
      </Helmet>

      <section className={`min-h-screen relative transition-colors duration-1000 font-sans ${darkMode ? 'bg-[#030503] text-slate-200' : 'bg-[#fcfdfe] text-slate-900'
        }`}>

        {/* --- AMBIENCE --- */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-5%] left-[-2%] w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-5%] right-[-2%] w-[400px] h-[400px] bg-yellow-500/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 relative z-10">

          {/* --- SLIM HEADER --- */}
          <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-3">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={14} className="text-yellow-500" />
                <span className="text-[9px] font-black tracking-[0.4em] text-emerald-500 uppercase">
                  Secure Protocol v3.1
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-none mb-6">
                THE <span className="text-emerald-500">VA</span><span className="text-yellow-500">ULT</span>
              </h1>

              {/* New Instruction Section */}
              <div className={`max-w-md border-l-2 pl-4 py-1 ${darkMode ? "border-emerald-500/50" : "border-emerald-500/30"
                }`}>
                <p className={`text-xs md:text-sm leading-relaxed ${darkMode ? "text-zinc-400" : "text-zinc-600"
                  }`}>
                  Only applications submitted directly through{" "}
                  <span className={`font-semibold ${darkMode ? "text-emerald-400" : "text-emerald-500"
                    }`}>
                    Uplify
                  </span>{" "}
                  are tracked and visible in your dashboard.
                </p>
                <p className={`text-[10px] md:text-xs mt-1 uppercase tracking-wider font-medium ${darkMode ? "text-red-500" : "text-red-600"
                  }`}>
                  Or Added Manually By You (For External Applications)
                </p>
              </div>
            </motion.div>
            <div className="hidden md:flex gap-2">
              <div className={`px-5 py-3 rounded-2xl border backdrop-blur-md transition-all ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl'}`}>
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 leading-none">Active Records</p>
                <p className="text-2xl font-black text-emerald-500 leading-none tabular-nums">{applications.length}</p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* --- SIDEBAR (Desktop Only) --- */}
            <aside className="hidden lg:block lg:col-span-3 space-y-8">
              <div className={`p-6 rounded-[2.2rem] border backdrop-blur-xl ${darkMode ? 'bg-black/40 border-white/5' : 'bg-white border-slate-200 shadow-lg'}`}>
                <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-yellow-500">
                  <ListFilter size={14} /> Intelligence Filter
                </h3>
                <div className="space-y-1">
                  {filters.map((name) => (
                    <button
                      key={name}
                      onClick={() => setActiveFilter(name)}
                      className={`w-full flex items-center justify-between px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${activeFilter === name
                        ? 'bg-emerald-500 border-emerald-400 text-black shadow-lg shadow-emerald-500/30'
                        : darkMode ? 'bg-transparent border-transparent text-slate-400 hover:bg-white/5' : 'bg-transparent border-transparent text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                      {name}
                      {activeFilter === name && <Zap size={10} fill="currentColor" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] px-2">Ecosystem Modules</p>
                {[
                  { to: "/user/resume-builder", label: "Ai resume Builder", sub: "Ats based", icon: <Target />, color: "emerald" },
                  { to: "/ai-resume-builder", label: "Career roadmap", sub: "smooth", icon: <FileUser />, color: "yellow" },
                  { to: "/user/uplify-community", label: "Network", sub: "Uplify Community", icon: <Users />, color: "emerald" }
                ].map((item, i) => (
                  <Link key={i} to={item.to} className={`group flex items-center gap-4 p-5 rounded-[2rem] border transition-all hover:-translate-y-1 ${darkMode ? 'bg-white/5 border-white/5 hover:border-emerald-500/30' : 'bg-white border-slate-200 hover:shadow-xl'
                    }`}>
                    <div className={`p-3 rounded-xl bg-${item.color}-500/10 text-${item.color}-500 group-hover:bg-${item.color}-500 group-hover:text-black transition-all`}>
                      {React.cloneElement(item.icon, { size: 18 })}
                    </div>
                    <div>
                      <span className="block text-[11px] font-black uppercase tracking-tighter">{item.label}</span>
                      <span className="block text-[8px] text-slate-500 font-bold uppercase">{item.sub}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="lg:col-span-9">

              {/* --- STICKY MOBILE FILTERS --- */}
              <div className="sticky top-0 z-40 lg:hidden -mx-4 px-4 bg-inherit/80 backdrop-blur-md pb-4 border-b border-white/5 mb-4">
                <div className="flex overflow-x-auto gap-2 no-scrollbar scroll-smooth">
                  {filters.map((name) => (
                    <button
                      key={name}
                      onClick={() => setActiveFilter(name)}
                      className={`flex-shrink-0 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${activeFilter === name
                        ? 'bg-emerald-500 border-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                        : darkMode ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
                        }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              {/* --- DESKTOP TABLE HEADING --- */}
              <div className="hidden lg:flex items-center px-8 mb-4 opacity-70">
                <div className="w-[40%] text-[10px] font-mono uppercase tracking-[0.2em]">Company / Role</div>
                <div className="flex-1 grid grid-cols-3 text-[10px] font-mono uppercase tracking-[0.2em]">
                  <span>TYPE</span>
                  <span>WORKMODE</span>
                  <span>COMPENSATION</span>
                </div>
                <div className="w-[140px] text-right text-[10px] font-mono uppercase tracking-[0.2em]">PROTOCOL_STATUS</div>
              </div>

              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {loading ? (
                    [1, 2, 3].map(i => <div key={i} className="h-24 w-full rounded-[2rem] animate-pulse bg-white/5" />)
                  ) : filteredApps.length > 0 ? (
                    filteredApps.map((app) => (
                      <motion.div
                        layout
                        key={app.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className={`group relative flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-4 md:p-6 rounded-[1.8rem] md:rounded-[2rem] border transition-all duration-500 overflow-hidden ${darkMode ? 'bg-[#0a0c0a] border-white/5 hover:border-emerald-500/40' : 'bg-white border-slate-100 shadow-sm hover:shadow-xl'
                          }`}
                      >
                        {/* 1. Identity Segment */}
                        <div className="flex items-center gap-4 md:w-[40%]">
                          <div className={`h-12 w-12 md:h-14 md:w-14 rounded-2xl flex items-center justify-center border shrink-0 relative transition-all duration-500 group-hover:scale-110 ${darkMode ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-200'
                            }`}>
                            <Building2 size={22} className="text-yellow-500" />
                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-green-500 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] leading-none mb-1.5">{app.internships?.company}</p>
                            <h3 className="text-base font-black tracking-tight truncate uppercase italic leading-none group-hover:text-emerald-500 transition-colors">
                              {app.internships?.title}
                            </h3>
                          </div>
                        </div>

                        {/* 2. Technical Segment (Grid on Mobile, Row on Desktop) */}
                        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 items-center">
                          <div className={`w-fit px-3 py-1 rounded-lg border text-[8px] font-black uppercase tracking-widest ${app.internships?.type?.includes('Full')
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                            : 'bg-yellow-500/10 border-yellow-500/20 text-green-500'
                            }`}>
                            {app.internships?.type}
                          </div>
                          <div className="flex items-center gap-2 opacity-50">
                            <Globe size={14} className="text-emerald-500" />
                            <span className="text-[10px] font-black uppercase tracking-tighter italic">{app.internships?.job_type || 'On-Site'}</span>
                          </div>
                          <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                            <Wallet size={14} className="text-emerald-500/40" />
                            <span className="text-[10px] font-mono text-slate-500 font-bold tabular-nums">{app.internships?.stipend}</span>
                          </div>
                        </div>

                        {/* 3. Status Segment */}
                        <div className="flex md:w-[140px] justify-end items-center mt-2 md:mt-0 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                          <div className={`w-full md:w-auto flex items-center justify-center gap-3 px-5 py-2.5 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${darkMode ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-500' : 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm'
                            } group-hover:bg-emerald-500 group-hover:text-black group-hover:border-emerald-500`}>
                            <ShieldCheck size={14} />
                            <span>Applied</span>
                          </div>
                        </div>

                        {/* Hover Scanline Decor */}
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-emerald-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                      </motion.div>
                    ))
                  ) : (
                    <div className="py-32 text-center border-2 border-dashed border-white/10 rounded-[3rem]">
                      <Activity size={40} className="mx-auto mb-4 animate-pulse text-slate-800" />
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">No matching protocols in vault</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </main>
          </div>
        </div>

        {/* --- MOBILE ACCELERATOR FAB --- */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed bottom-6 right-6 lg:hidden w-14 h-14 bg-emerald-500 text-black rounded-2xl shadow-[0_10px_30px_rgba(16,185,129,0.4)] flex items-center justify-center z-[100] active:scale-90 transition-transform"
        >
          <Box size={24} />
        </button>

        {/* --- MOBILE OVERLAY --- */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] lg:hidden"
              />
              <motion.div
                initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                className={`fixed bottom-0 inset-x-0 rounded-t-[3rem] p-8 md:p-10 z-[120] lg:hidden border-t border-white/10 ${darkMode ? 'bg-[#0a0c0a]' : 'bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.2)]'}`}
              >
                <div className="w-12 h-1.5 bg-slate-800/20 rounded-full mx-auto mb-8" />
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xs font-black uppercase tracking-widest text-yellow-500">System Accelerator</h3>
                  <button onClick={() => setIsSidebarOpen(false)} className="p-3 bg-white/5 rounded-full hover:rotate-90 transition-transform"><X size={20} /></button>
                </div>
                <div className="space-y-4 pb-4">
                  {[
                    { to: "/ai-roadmap", label: "Strategic Roadmap", icon: <Target />, color: "emerald" },
                    { to: "/ai-resume-builder", label: "Identity Protocol", icon: <FileUser />, color: "yellow" },
                    { to: "/community", label: "Uplify Community", icon: <Users />, color: "emerald" }
                  ].map((item, i) => (
                    <Link key={i} to={item.to} className={`flex items-center gap-5 p-6 rounded-[1.8rem] border transition-all active:scale-[0.98] ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                      <div className={`p-4 rounded-xl bg-${item.color}-500/10 text-${item.color}-500`}>{React.cloneElement(item.icon, { size: 24 })}</div>
                      <div className="flex-1">
                        <span className="block text-sm font-black uppercase tracking-tight">{item.label}</span>
                        <span className="block text-[9px] text-slate-500 font-bold uppercase mt-1 tracking-widest">Active Module</span>
                      </div>
                      <ChevronRight size={18} className="opacity-20" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>

      {/* --- PRO GLOBAL STYLES --- */}
      <style jsx="true">{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}

export default MyApplication;