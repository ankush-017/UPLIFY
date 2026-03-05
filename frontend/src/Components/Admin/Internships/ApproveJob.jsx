import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CheckCircle, Search, Loader2, ShieldCheck,
  MapPin, Briefcase, Wallet, Calendar, Code2,
  Zap, Globe2, Layers, Trash2, Clock, Hash, ExternalLink
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import API from '../../../API.js';

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
      if (res.data.success) setInternships(res.data.internships || []);
    } catch (error) {
      toast.error("Database synchronization failed");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await API.put(`/api/internships-jobs-all/approve/${id}`);
      if (res.data.success) {
        toast.success("Listing published successfully");
        setInternships(internships.filter(item => item.id !== id));
      }
    } catch (error) { toast.error("Approval failed"); }
  };

  const handleReject = async (id) => {
    if (window.confirm("Delete this submission permanently?")) {
      try {
        const res = await API.delete(`/api/internships-jobs-all/reject/${id}`);
        if (res.data.success) {
          toast.error("Entry purged from system");
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
    bg: darkMode ? 'bg-[#050505]' : 'bg-[#F9FAFB]',
    card: darkMode ? 'bg-[#0D0D0D] border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-sm',
    input: darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-slate-50 border-slate-200',
    textMain: darkMode ? 'text-white' : 'text-slate-900',
    accent: 'from-yellow-400 to-lime-500'
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans pb-20 ${theme.bg} ${theme.textMain} selection:bg-lime-500/30`}>
      <Toaster position="top-right" />

      {/* Global Navigation */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b ${darkMode ? 'bg-black/40 border-white/5' : 'bg-white/70 border-slate-200'} px-6 py-4`}>
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-lime-500 shadow-lg shadow-lime-500/20">
               <ShieldCheck size={18} className="text-black" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-tight leading-none">Verification</h2>
              <p className="text-[10px] opacity-50 font-bold uppercase tracking-widest mt-1">Pending: {internships.length} Submissions</p>
            </div>
          </div>
          
          <div className={`relative flex items-center rounded-xl border transition-all ${theme.input} focus-within:border-lime-500/50`}>
              <Search size={14} className="absolute left-3 opacity-30" />
              <input 
                type="text" 
                placeholder="Search Listings..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent pl-10 pr-4 py-2 outline-none text-xs w-64 lg:w-96 font-medium" 
              />
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-6 py-10">
        
        {/* Simple Heading & Description */}
        <div className="mb-10">
            <h1 className="text-2xl font-bold tracking-tight">Review Submissions</h1>
            <p className="text-sm mt-1 opacity-60">Manage and verify pending job or internship applications.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-3">
            <Loader2 className="w-8 h-8 text-lime-500 animate-spin" />
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Connecting to Server...</span>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-32 opacity-20 border-2 border-dashed border-inherit rounded-3xl">
            <Zap size={32} className="mx-auto mb-3" />
            <p className="text-xs font-bold uppercase tracking-[0.3em]">Queue is Clear</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Table Header */}
            <div className="hidden xl:grid grid-cols-12 px-8 py-2 text-[10px] font-bold uppercase tracking-widest opacity-80">
                <div className={`col-span-3 ${darkMode ? "text-lime-500" : "text-lime-800"} `} >Position & Organization</div>
                <div className={`col-span-3 ${darkMode ? "text-lime-500" : "text-lime-800"}`}>Requirements & Meta</div>
                <div className={`col-span-4 ${darkMode ? "text-lime-500" : "text-lime-800"}`}>Logistics & Compensation</div>
                <div className={`col-span-2 text-right ${darkMode ? "text-lime-500" : "text-lime-800"}`}>Actions</div>
            </div>

            {filteredData.map((item) => (
              <div key={item.id} className={`rounded-2xl border p-2 transition-all hover:border-lime-500/30 ${theme.card}`}>
                <div className="grid grid-cols-1 xl:grid-cols-12 items-center gap-6 p-4">
                  
                  {/* Column 1: Organization */}
                  <div className="xl:col-span-3 flex items-center gap-4">
                     <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-inner ${darkMode ? 'bg-white/5 text-lime-400 border border-white/5' : 'bg-slate-900 text-white'}`}>
                        {item.company?.charAt(0)}
                     </div>
                     <div className="overflow-hidden">
                        <h3 className="text-base font-bold leading-tight truncate uppercase tracking-tighter">{item.title}</h3>
                        <p className="text-xs font-bold text-blue-500 uppercase tracking-wide mt-1">{item.company}</p>
                        <p className="text-[9px] font-mono opacity-30 mt-1 truncate">{item.id}</p>
                     </div>
                  </div>

                  {/* Column 2: Skills & Meta */}
                  <div className="xl:col-span-3 space-y-3">
                     <div className="flex flex-wrap gap-1.5">
                        {item.skills?.split(',').map((skill, i) => (
                           <span key={i} className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${darkMode ? 'bg-lime-500/5 border-lime-500/10 text-lime-500' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                              {skill.trim()}
                           </span>
                        ))}
                     </div>
                     <div className="flex items-center gap-3 text-[9px] font-bold opacity-40 uppercase tracking-widest">
                        <span className="flex items-center gap-1"><Clock size={10} /> {new Date(item.created_at).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1 font-mono">{item.source_type}</span>
                     </div>
                  </div>

                  {/* Column 3: Logistics (Structured Grid) */}
                  <div className="xl:col-span-4 grid grid-cols-3 gap-4 border-l border-inherit pl-6">
                     <MetricItem icon={<MapPin size={14}/>} label="Location" value={item.location} />
                     <MetricItem icon={<Layers size={14}/>} label="Contract" value={item.job_type} />
                     <MetricItem icon={<Wallet size={14}/>} label="Stipend" value={item.stipend} isGreen />
                  </div>

                  {/* Column 4: Admin Controls */}
                  <div className="xl:col-span-2 flex items-center justify-end gap-2">
                     <button 
                        onClick={() => handleApprove(item.id)}
                        className={`flex-1 xl:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r ${theme.accent} text-black font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-lime-500/10`}
                     >
                       <CheckCircle size={16} /> Approve
                     </button>
                     <button 
                        onClick={() => handleReject(item.id)}
                        className={`p-3 rounded-xl border transition-all ${darkMode ? 'border-red-500/20 hover:bg-red-500/10 text-red-500' : 'border-red-100 hover:bg-red-50 text-red-600'}`}
                        title="Delete Submission"
                     >
                       <Trash2 size={18} />
                     </button>
                  </div>

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
  <div className="space-y-1">
    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter flex items-center gap-2">
      {icon} {label}
    </p>
    <p className={`text-[11px] font-bold uppercase leading-tight truncate ${isGreen ? 'text-emerald-500' : 'opacity-90'}`}>
      {value || 'Not Set'}
    </p>
  </div>
);

export default ApproveJob;