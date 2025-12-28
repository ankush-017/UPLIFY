import { useEffect, useState } from 'react';
import { supabase } from '../../superbaseClient.js';
import { 
  ExternalLink, Search, X, Filter, BookOpen, Briefcase, 
  Users, Map, FileText, Sparkles, Zap, ChevronRight, 
  Rocket, Gift, ShieldCheck, Cpu, Star, Layout, Wand2, Menu
} from 'lucide-react';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResourses, setSearchResources] = useState([]);
  const [activeTab, setActiveTab] = useState('All'); 
  const [selectedRole, setSelectedRole] = useState('All');

  const roles = ['All', 'Web Development', 'Data Science', 'Data Structure and Algorithm', 'UI/UX', 'Cloud'];

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('resources').select('*');
      if (!error) setResources(data);
      setLoading(false);
    };
    fetchResources();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim() === '') {
        setSearchResources([]);
        return;
      }
      try {
        setLoading(true);
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/resourses-search`, { query: searchQuery });
        if (res.data?.data?.searchResults) setSearchResources(res.data?.data?.searchResults);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    handleSearch();
  }, [searchQuery]);

  const filteredDisplay = (searchResourses.length > 0 ? searchResourses : resources).filter(item => {
    const matchesPrice = activeTab === 'All' || 
      (activeTab === 'Free' && (Number(item.sellprice) === 0 || !item.sellprice)) || 
      (activeTab === 'Paid' && Number(item.sellprice) > 0);
    const matchesRole = selectedRole === 'All' || 
      item.title.toLowerCase().includes(selectedRole.toLowerCase());
    return matchesPrice && matchesRole;
  });

  return (
    <div className={`h-screen flex overflow-hidden font-sans transition-colors duration-500 ${darkMode ? "bg-[#0a0b10] text-slate-200" : "bg-[#f4f7f5] text-slate-900"}`}>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* SIDEBAR - Responsive Drawer Logic */}
      <AnimatePresence>
        {(isMobileMenuOpen || window.innerWidth >= 1024) && (
          <motion.aside 
            initial={window.innerWidth < 1024 ? { x: "-100%" } : { x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`
              fixed lg:relative inset-y-0 left-0 z-[100] w-[300px] 
              flex flex-col border-r h-full overflow-hidden transition-all 
              ${darkMode ? "border-white/5 bg-[#12141c]" : "border-slate-200 bg-white"}
            `}
          >
            <div className="px-6 mb-6 pt-10 lg:pt-5">
              {/* Preferences Container */}
              <div className={`p-5 rounded-[32px] border ${darkMode ? "bg-white/[0.03] border-white/5 shadow-2xl shadow-black/50" : "bg-slate-50 border-slate-200 shadow-inner"}`}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Filter size={14} className="text-yellow-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Preferences</span>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-1 rounded-full hover:bg-white/10 transition-colors">
                    <X size={16} />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className={`relative flex p-1 rounded-2xl ${darkMode ? "bg-black/40" : "bg-slate-200"}`}>
                    {['All', 'Free', 'Paid'].map(t => (
                      <button 
                        key={t}
                        onClick={() => { setActiveTab(t); if(window.innerWidth < 1024) setIsMobileMenuOpen(false); }}
                        className={`relative z-10 flex-1 py-2 text-[10px] font-bold rounded-xl transition-all duration-300 ${activeTab === t ? 'text-black font-black' : 'text-slate-500'}`}
                      >
                        {t}
                        {activeTab === t && (
                          <motion.div layoutId="activeFilter" className="absolute inset-0 bg-yellow-400 rounded-xl -z-10 shadow-lg" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1.5 max-h-[180px] overflow-y-auto no-scrollbar pr-1">
                    {roles.map(role => (
                      <button 
                        key={role}
                        onClick={() => { setSelectedRole(role); if(window.innerWidth < 1024) setIsMobileMenuOpen(false); }}
                        className={`w-full text-left px-4 py-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-between group ${selectedRole === role ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' : 'text-slate-500 hover:bg-emerald-500/5'}`}
                      >
                        {role}
                        {selectedRole === role && <Star size={10} className="fill-emerald-400 text-emerald-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <nav className="flex-1 px-6 overflow-y-auto no-scrollbar mb-4">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 block px-2">Ecosystem</span>
              <div className="space-y-1">
                {[
                  { icon: BookOpen, label: 'Resources', to: '/resources', active: true },
                  { icon: FileText, label: 'AI Resume', to: '/user/resume-builder' },
                  { icon: Map, label: 'Roadmaps', to: '/user/roadmaps' },
                  { icon: Users, label: 'Community', to: '/user/uplify-community' },
                ].map((link) => (
                  <Link key={link.label} to={link.to} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${link.active ? (darkMode ? 'bg-white/5 text-emerald-400 font-bold' : 'bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/30') : 'text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/5'}`}>
                    <link.icon size={18} />
                    <span className="text-xs">{link.label}</span>
                  </Link>
                ))}
              </div>
            </nav>

            <div className="p-6">
              <motion.div whileHover={{ y: -5 }} className={`p-5 rounded-[28px] border relative overflow-hidden group ${darkMode ? "bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20" : "bg-emerald-50 border-emerald-100 shadow-sm"}`}>
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform duration-500"><Wand2 size={80} className="text-emerald-500" /></div>
                <div className="flex items-center gap-2 mb-2 text-emerald-500"><Zap size={16} /><span className="text-[10px] font-black uppercase tracking-tight">Free AI Curations</span></div>
                <p className={`text-[11px] leading-relaxed font-bold mb-3 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>Instantly get <span className="text-emerald-500 underline decoration-2 underline-offset-4">Free recommendations</span> by our neural engine.</p>
                <button className="w-full py-2 bg-emerald-500 text-black text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">Ask AI Assistant</button>
              </motion.div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 h-full overflow-y-auto no-scrollbar flex flex-col relative">
        
        {/* TOP SEARCH HEADER */}
        <header className={`sticky top-0 z-40 px-6 lg:px-10 py-5 backdrop-blur-md flex items-center justify-between ${darkMode ? "bg-[#0a0b10]/70" : "bg-[#f4f7f5]/70"}`}>
          <div className="relative group w-full max-w-2xl">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-yellow-500 rounded-2xl blur opacity-10 group-focus-within:opacity-40 transition duration-500" />
            <div className={`relative flex items-center w-full px-4 lg:px-6 py-3.5 rounded-2xl border transition-all ${darkMode ? 'bg-[#1a1c26] border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-sm'}`}>
              <Search className="text-emerald-500 mr-3 lg:mr-4 shrink-0" size={18} />
              <input 
                type="text" 
                placeholder="Find anything... or type 'Recommend best AI courses' to let our AI assist you"
                className="bg-transparent outline-none w-full text-[11px] lg:text-xs font-bold placeholder:text-slate-500 tracking-tight"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setSearchQuery(inputValue)}
              />
              <div className="flex items-center gap-2">
                {inputValue && <X className="cursor-pointer text-slate-500" size={16} onClick={() => {setInputValue(''); setSearchQuery('');}} />}
                <div className="hidden sm:block h-5 w-[1px] bg-slate-700 mx-2" />
                <Cpu size={18} className="text-slate-600 hidden sm:block" />
              </div>
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-4">
             <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.25em]">Search Engine</span>
                <span className={`text-[10px] font-bold opacity-60 italic ${darkMode ? "text-slate-400" : "text-slate-600"}`}>Uplify AI v2.4 Active</span>
             </div>
          </div>
        </header>

        <div className="px-6 lg:px-10 flex-1">
          <div className="mb-8 lg:mb-12">
            <h1 className="text-3xl lg:text-5xl font-black tracking-tighter mb-4 leading-none">
              Infinite <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-yellow-400">Learning.</span>
            </h1>
            <p className="text-slate-500 font-bold text-[11px] lg:text-sm max-w-2xl leading-relaxed">
              Unlock industry-standard roadmaps. <span className="text-emerald-500">Search for both Paid and Free courses above to receive instant, tailored recommendations from our AI.</span>
            </p>
          </div>

          {loading ? (
            <div className="h-[40vh] flex flex-col items-center justify-center">
              <Spin size="large" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mt-6 animate-pulse">Syncing Hub...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 pb-20">
              <AnimatePresence>
                {filteredDisplay.map((item, idx) => {
                  const isFree = Number(item.sellprice) === 0 || !item.sellprice;
                  return (
                    <motion.div key={item.id || idx} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="group">
                      <div className={`h-full flex flex-col rounded-[32px] lg:rounded-[42px] border overflow-hidden transition-all duration-500 ${darkMode ? 'bg-gradient-to-br from-white/[0.05] to-transparent border-white/5 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50 hover:border-emerald-400'}`}>
                        <div className="relative h-48 lg:h-56 m-3 lg:m-4 rounded-[24px] lg:rounded-[32px] overflow-hidden bg-slate-900 shadow-lg">
                          <img src={item.image || item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                          <div className="absolute top-4 right-4">
                             <div className={`p-2 lg:p-2.5 rounded-2xl backdrop-blur-md border ${isFree ? "bg-emerald-500/20 border-emerald-500/40" : "bg-yellow-400/20 border-yellow-400/40"}`}>
                                {isFree ? <Gift size={14} className="text-emerald-400" /> : <ShieldCheck size={14} className="text-yellow-400" />}
                             </div>
                          </div>
                          <div className="absolute bottom-4 left-6">
                             <span className={`px-3 lg:px-4 py-1 rounded-full text-[9px] lg:text-[10px] font-black uppercase tracking-widest ${isFree ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20" : "bg-yellow-400 text-black shadow-lg shadow-yellow-500/20"}`}>
                                {isFree ? "Full Access" : "Pro Series"}
                             </span>
                          </div>
                        </div>

                        <div className="px-6 lg:px-8 pb-6 lg:pb-8 pt-2 flex flex-col flex-grow">
                          <div className="flex items-center gap-2 mb-3 lg:mb-4">
                            <Cpu size={12} className="text-emerald-500" />
                            <span className="text-[9px] lg:text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.author || "Certified Author"}</span>
                          </div>
                          <h3 className={`text-lg lg:text-xl font-extrabold leading-tight mb-3 transition-colors ${darkMode ? "text-white group-hover:text-emerald-400" : "text-slate-800"}`}>
                            {item.title}
                          </h3>
                          
                          <p className={`text-[11px] lg:text-xs leading-relaxed mb-6 line-clamp-2 font-medium ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                            {item.description || "Access the complete curriculum and mastering project files for this industry-standard technical course."}
                          </p>
                          <div className="mt-auto flex items-center justify-between pt-5 lg:pt-6 border-t border-white/5">
                            <div className="flex flex-col">
                                <span className="text-[8px] lg:text-[9px] font-black text-emerald-500 uppercase tracking-widest">Status</span>
                                <span className={`text-[10px] lg:text-[11px] font-bold ${darkMode ? "text-slate-200" : "text-slate-700"}`}>Verified by AI</span>
                            </div>
                            <motion.a 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={item.courseUrl || item.videoUrl}
                              target="_blank"
                              className={`px-5 lg:px-7 py-2 lg:py-3 rounded-2xl text-[9px] lg:text-[11px] font-black uppercase tracking-tighter transition-all shadow-lg flex items-center gap-2 ${darkMode ? "bg-white text-black hover:bg-emerald-500" : "bg-slate-900 text-white hover:bg-emerald-500"}`}
                            >
                              View <ExternalLink size={10} />
                            </motion.a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* BOTTOM RIGHT FLOATING FILTER BUTTON (MOBILE ONLY) */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden fixed bottom-8 right-8 z-[80] w-14 h-14 bg-emerald-500 text-black rounded-full shadow-[0_8px_30px_rgb(16,185,129,0.4)] flex items-center justify-center border-4 border-white/10"
        >
          <Filter size={24} />
        </motion.button>
      </main>
    </div>
  );
}