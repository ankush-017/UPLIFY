import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CheckCircle, Search, Loader2, ShieldCheck,
  MapPin, Briefcase, Wallet, Calendar, Code2,
  XCircle, Zap, Globe2, Layers, Trash2, Cpu, Activity, Clock, ChevronRight
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import API from '../../../API.js'

function ApproveJob() {

  const { darkMode } = useSelector((state) => state.theme);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPendingInternships();
  }, []);

  const fetchPendingInternships = async () => {
    
    setLoading(true);
    try {
      const res = await API.get('/api/internships-jobs-all/pending');
      console.log(res.data.internships);
      if (res.data.success) setInternships(res.data.internships || []);
    } 
    catch (error) {
      toast.error("Sync failed");
    } 
    finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await API.put(`/api/internships-jobs-all/approve/${id}`);
      if (res.data.success) {
        toast.success("Published");
        setInternships(internships.filter(item => item.id !== id));
      }
    } catch (error) { toast.error("Approval failed"); }
  };

  const handleReject = async (id) => {
    if (window.confirm("Purge entry?")) {
      try {
        const res = await API.delete(`/api/internships-jobs-all/reject/${id}`);
        if (res.data.success) {
          toast.error("Purged");
          setInternships(internships.filter(item => item.id !== id));
        }
      } catch (error) { toast.error("Purge failed"); }
    }
  };

  const filteredData = internships.filter(item =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const theme = {
    bg: darkMode ? 'bg-[#080808]' : 'bg-[#F9FAFB]',
    card: darkMode ? 'bg-[#111111] border-white/5' : 'bg-white border-slate-200 shadow-sm',
    input: darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-slate-50 border-slate-200',
    textMain: darkMode ? 'text-white' : 'text-slate-900',
    textMuted: darkMode ? 'text-slate-500' : 'text-slate-400',
    accent: 'from-yellow-400 to-lime-500'
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans pb-20 ${theme.bg} ${theme.textMain} selection:bg-lime-500/30`}>
      <Toaster position="top-right" />

      {/* SaaS Compact Header */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b ${darkMode ? 'bg-black/40 border-white/5' : 'bg-white/70 border-slate-200'} px-6 py-3`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-black uppercase tracking-tighter italic">
              Verification <span className={`bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>Queue</span>
            </h2>
            <div className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${darkMode ? 'bg-lime-500/10 text-lime-400 border border-lime-500/20' : 'bg-lime-50 text-lime-700 border border-lime-200'}`}>
               {internships.length} Pending
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`relative flex items-center rounded-lg border ${theme.input}`}>
                <Search size={12} className="absolute left-3 opacity-30" />
                <input 
                  type="text" 
                  placeholder="Quick filter..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent pl-8 pr-3 py-1.5 outline-none text-[10px] w-48" 
                />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-3">
            <Loader2 className="w-6 h-6 text-lime-500 animate-spin" />
            <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">Syncing_Nodes</span>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-32 opacity-20 italic">
            <Zap size={32} className="mx-auto mb-3" />
            <p className="text-[10px] font-bold uppercase tracking-widest">Queue Clear</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredData.map((item) => (
              <div key={item.id} className={`group rounded-xl border p-4 flex flex-col md:flex-row md:items-center gap-6 transition-all hover:border-lime-500/30 ${theme.card}`}>
                
                {/* Brand Identity */}
                <div className="flex items-center gap-4 min-w-[240px]">
                   <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl font-black ${darkMode ? 'bg-white/5 text-lime-400' : 'bg-slate-900 text-white'}`}>
                      {item.company?.charAt(0)}
                   </div>
                   <div>
                      <h3 className="text-sm font-bold leading-tight">{item.title}</h3>
                      <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest mt-0.5">{item.company}</p>
                   </div>
                </div>

                {/* Compact Metrics Grid */}
                <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
                   <MetricItem icon={<MapPin size={12}/>} label="Loc" value={item.location} />
                   <MetricItem icon={<Layers size={12}/>} label="Mode" value={item.job_type} />
                   <MetricItem icon={<Wallet size={12}/>} label="Pay" value={item.stipend} isGreen />
                   <MetricItem icon={<Globe2 size={12}/>} label="Src" value={item.source_type} />
                </div>

                {/* Vertical Divider */}
                <div className="hidden lg:block w-[1px] h-10 bg-inherit opacity-10" />

                {/* SaaS Actions */}
                <div className="flex items-center gap-2">
                   <button 
                    onClick={() => handleApprove(item.id)}
                    className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${theme.accent} text-black font-black text-[9px] uppercase tracking-widest active:scale-95 transition-all`}
                   >
                     <CheckCircle size={14} /> Approve
                   </button>
                   <button 
                    onClick={() => handleReject(item.id)}
                    className={`p-2 rounded-lg border transition-colors ${darkMode ? 'border-white/5 hover:bg-red-500/10 text-red-500' : 'border-slate-200 hover:bg-red-50 text-red-600'}`}
                   >
                     <Trash2 size={14} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
const MetricItem = ({ icon, label, value, isGreen }) => (
  <div className="overflow-hidden">
    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter flex items-center gap-1.5 mb-0.5">
      {icon} {label}
    </p>
    <p className={`text-[10px] font-bold truncate uppercase ${isGreen ? 'text-emerald-500' : 'opacity-80'}`}>
      {value || '---'}
    </p>
  </div>
);

export default ApproveJob;