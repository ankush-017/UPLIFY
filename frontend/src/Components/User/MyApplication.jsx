import React, { useEffect, useState } from 'react';
import { supabase } from '../../../superbaseClient.js';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Briefcase, MapPin, Wallet, Clock, CheckCircle, 
  Sparkles, LayoutGrid, ListFilter, Users, Map, 
  Code2, Globe2, FileUser, Zap, GraduationCap 
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

function MyApplication() {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  const { user } = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const uid = user?.uid;

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      if (!uid) { setLoading(false); return; }

      const { data, error } = await supabase
        .from('applyapplications')
        .select(`*, internships(id, title, company, location, stipend, type, skills)`)
        .eq('uid', uid);

      if (error) {
        console.error('Error fetching:', error.message);
      } else {
        setApplications(data);
        setFilteredApps(data);
      }
      setLoading(false);
    };
    fetchApplications();
  }, [uid]);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredApps(applications);
    } else {
      setFilteredApps(applications.filter(app => app.internships?.type === activeFilter));
    }
  }, [activeFilter, applications]);

  return (
    <>
      <Helmet>
        <title>Vault | My Applications</title>
      </Helmet>

      <section className={`min-h-screen relative overflow-hidden transition-colors duration-700 ${
        darkMode ? 'bg-[#010401] text-white' : 'bg-[#f8fafc] text-slate-900'
      }`}>
        
        {/* --- PREMIUM BACKGROUND ELEMENTS --- */}
        <div className="fixed inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-500/5 blur-[100px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
          <header className="mb-12">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-5xl font-black tracking-tighter uppercase italic leading-none">
                The <span className="text-emerald-500">Vault</span>
              </h2>
              <div className="flex items-center gap-4 mt-3">
                <div className="h-[2px] w-12 bg-yellow-500" />
                <p className="text-slate-500 font-bold tracking-[0.3em] text-[10px] uppercase">Command Center</p>
              </div>
            </motion.div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* --- LEFT SIDEBAR (PREMIUM BLOCKS) --- */}
            <aside className="lg:col-span-3 space-y-6">
              
              {/* Filter Module */}
              <div className={`p-6 rounded-[2.5rem] border backdrop-blur-md ${darkMode ? 'bg-white/5 border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
                <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-emerald-500">
                  <ListFilter size={14} /> Catalog Filter
                </h3>
                <div className="space-y-2">
                  {['All', 'Full-time', 'Remote', 'Internship'].map((name) => (
                    <button
                      key={name}
                      onClick={() => setActiveFilter(name)}
                      className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                        activeFilter === name 
                        ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30' 
                        : darkMode ? 'text-slate-400 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {name} {activeFilter === name && <Zap size={12} fill="currentColor" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Ecosystem Module */}
              <div className={`p-7 rounded-[2.5rem] border relative overflow-hidden group ${
                darkMode ? 'bg-gradient-to-br from-black to-emerald-950/30 border-white/5' : 'bg-white border-slate-200 shadow-lg'
              }`}>
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Sparkles size={60} className="text-yellow-500" />
                </div>
                
                <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 text-yellow-500">AI Ecosystem</h3>
                <div className="space-y-5 relative z-10">
                  <Link to="/ai-resume-builder" className="flex items-center gap-4 group/item">
                    <div className="p-3 bg-yellow-400/10 text-yellow-500 rounded-2xl group-hover/item:bg-yellow-400 group-hover/item:text-black transition-all">
                      <FileUser size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-tighter">Resume Builder by AI</p>
                      <p className="text-[9px] text-slate-500 font-bold uppercase">ATS-Optimized</p>
                    </div>
                  </Link>

                  <Link to="/ai-roadmap" className="flex items-center gap-4 group/item">
                    <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl group-hover/item:bg-emerald-500 group-hover/item:text-black transition-all">
                      <Map size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-tighter">Career Roadmap</p>
                      <p className="text-[9px] text-slate-500 font-bold uppercase">Guided by AI</p>
                    </div>
                  </Link>

                  <Link to="/community" className="flex items-center gap-4 group/item">
                    <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl group-hover/item:bg-blue-500 group-hover/item:text-black transition-all">
                      <Users size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-tighter">Elite Community</p>
                      <p className="text-[9px] text-slate-500 font-bold uppercase">Network Access</p>
                    </div>
                  </Link>
                </div>
              </div>
            </aside>

            {/* --- RIGHT SIDE: HORIZONTAL HIGH-DENSITY LIST --- */}
            <main className="lg:col-span-9 space-y-4">
              {loading ? (
                [1, 2, 3].map(i => <div key={i} className={`h-24 w-full rounded-[2rem] animate-pulse ${darkMode ? 'bg-white/5' : 'bg-slate-200'}`} />)
              ) : (
                <AnimatePresence mode='popLayout'>
                  {filteredApps.map((app) => (
                    <motion.div
                      layout
                      key={app.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`group flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-[2rem] border transition-all duration-500 ${
                        darkMode ? 'bg-black/60 border-white/5 hover:border-emerald-500/40 hover:bg-black' : 'bg-white border-slate-100 shadow-sm hover:shadow-xl'
                      }`}
                    >
                      {/* Section 1: Identity */}
                      <div className="flex items-center gap-5 md:w-1/4">
                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                          <GraduationCap size={20} className="text-emerald-500" />
                        </div>
                        <div>
                          <h3 className="text-md font-black tracking-tight leading-none mb-1 group-hover:text-emerald-500 transition-colors">
                            {app.internships?.title}
                          </h3>
                          <p className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.15em]">
                            {app.internships?.company}
                          </p>
                        </div>
                      </div>

                      {/* Section 2: Metadata Rows */}
                      <div className="flex-1 flex flex-wrap items-center gap-x-8 gap-y-3">
                        <div className="flex items-center gap-2">
                          <Globe2 size={14} className="text-slate-600" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                             {app.internships?.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-slate-600" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            {app.internships?.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                          <Wallet size={14} className="text-emerald-500/50" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/80">
                            {app.internships?.stipend}
                          </span>
                        </div>
                      </div>

                      {/* Section 3: Skills Inline */}
                      <div className="hidden xl:flex items-center gap-2 max-w-[200px] overflow-hidden">
                        {(app.internships?.skills || "JS, React").split(',').slice(0, 2).map((s, i) => (
                          <span key={i} className="text-[8px] font-black uppercase px-2 py-1 rounded-md bg-white/5 border border-white/10 text-slate-500">
                            {s.trim()}
                          </span>
                        ))}
                      </div>

                      {/* Section 4: Pure Status (No View Button) */}
                      <div className="flex items-center justify-end md:w-[120px]">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500 transition-all duration-500">
                          <CheckCircle size={12} className="text-emerald-500 group-hover:text-black" />
                          <span className="text-[9px] font-black uppercase tracking-tighter text-emerald-500 group-hover:text-black">
                            Subscribed
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </main>
          </div>
        </div>
      </section>
    </>
  );
}
export default MyApplication;