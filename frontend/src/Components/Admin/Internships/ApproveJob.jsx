import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../superbaseClient';
import { useSelector } from 'react-redux';
import { 
  CheckCircle, Search, Loader2, ShieldCheck, 
  MapPin, Briefcase, Wallet, Calendar, Code2, 
  XCircle, Zap, Globe2, Layers, Trash2
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

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
    const { data, error } = await supabase
      .from('internships')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Failed to sync with cloud engine");
      console.error(error);
    } else {
      setInternships(data || []);
    }
    setLoading(false);
  };

  const handleApprove = async (id) => {
    const { error } = await supabase
      .from('internships')
      .update({ status: 'approved' })
      .eq('id', id);

    if (error) {
      toast.error("Approval failed");
    } else {
      toast.success("Listing Published Successfully!", {
        icon: '🚀',
        style: {
          borderRadius: '15px',
          background: darkMode ? '#1e293b' : '#fff',
          color: darkMode ? '#fff' : '#1e293b',
          fontWeight: 'bold'
        },
      });
      setInternships(internships.filter(item => item.id !== id));
    }
  };

  const handleReject = async (id) => {
    if (window.confirm("Permanently delete this submission? This cannot be undone.")) {
      const { error } = await supabase.from('internships').delete().eq('id', id);
      
      if (error) {
        toast.error("Deletetion failed");
      } else {
        toast.error("Listing Rejected & Purged", {
            icon: '🗑️',
        });
        setInternships(internships.filter(item => item.id !== id));
      }
    }
  };

  const filteredData = internships.filter(item => 
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen transition-all duration-700 font-sans pb-32 ${
      darkMode ? 'bg-[#030712] text-slate-200' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[120px] opacity-20 ${darkMode ? 'bg-blue-500' : 'bg-blue-200'}`}></div>
        <div className={`absolute top-1/2 -right-24 w-80 h-80 rounded-full blur-[120px] opacity-20 ${darkMode ? 'bg-purple-600' : 'bg-purple-300'}`}></div>
      </div>

      <div className="relative p-4 md:p-8 max-w-7xl mx-auto">
        
        {/* Header Architecture */}
        <header className="mb-12 pt-8 md:pt-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="space-y-4">
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-black tracking-[0.2em] uppercase ${
                darkMode ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}>
                <ShieldCheck size={14} /> Admin Verification Portal
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic">
                Approve <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">Jobs.</span>
              </h1>
            </div>

            <div className={`grid grid-cols-2 gap-4 p-2 rounded-[2.5rem] border backdrop-blur-3xl ${
              darkMode ? 'bg-white/5 border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
            }`}>
              <StatBox label="Waiting" value={internships.length} color="text-blue-500" />
              <div className={`p-6 text-center rounded-[2rem] ${darkMode ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'}`}>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">System</p>
                <p className="text-xl font-black italic">Active</p>
              </div>
            </div>
          </div>
        </header>

        {/* Search Architecture */}
        <div className="relative group mb-12">
          <Search className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors duration-300 ${darkMode ? 'text-slate-600 group-focus-within:text-blue-500' : 'text-slate-400'}`} size={24} />
          <input 
            type="text" 
            placeholder="Search by role or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-16 pr-8 py-6 rounded-3xl border transition-all duration-300 text-lg font-bold outline-none ${
              darkMode ? 'bg-white/5 border-white/10 focus:bg-white/10 focus:border-blue-500/50' : 'bg-white border-slate-200 focus:shadow-2xl focus:border-blue-500'
            }`}
          />
        </div>

        {/* Content System */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">Querying Supabase</span>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-32 opacity-30 italic">
            <h3 className="text-3xl font-black uppercase">No pending requests</h3>
          </div>
        ) : (
          <div className="grid gap-8">
            {filteredData.map((item) => (
              <div key={item.id} className="group relative">
                <div className={`relative overflow-hidden rounded-[3rem] border transition-all duration-500 hover:translate-y-[-4px] ${
                  darkMode ? 'bg-[#0f172a]/60 border-white/10' : 'bg-white border-slate-200 shadow-lg'
                }`}>
                  <div className="p-8 md:p-12">
                    <div className="flex flex-col lg:flex-row gap-10">
                      
                      {/* Section 1: Brand */}
                      <div className="flex items-center gap-6 min-w-[320px]">
                        <div className={`w-20 h-20 md:w-24 md:h-24 rounded-[2rem] flex items-center justify-center text-4xl font-black shadow-inner ${
                          darkMode ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' : 'bg-slate-900 text-white'
                        }`}>
                          {item.company?.charAt(0)}
                        </div>
                        <div className="space-y-1">
                          <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-none italic uppercase">
                            {item.title}
                          </h2>
                          <div className="flex flex-wrap gap-2 pt-2">
                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${darkMode ? 'bg-white/10 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                              {item.company}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Info Bento */}
                      <div className="flex-1 space-y-6">
                        <div className="flex flex-wrap gap-2">
                          {item.skills?.split(',').map((skill, i) => (
                            <span key={i} className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase border ${
                              darkMode ? 'border-white/5 bg-white/5 text-slate-400' : 'border-slate-100 bg-slate-50 text-slate-500'
                            }`}>
                              {skill.trim()}
                            </span>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-dashed border-slate-500/20">
                          <MiniMetric icon={<MapPin size={14}/>} label="Loc" value={item.location} darkMode={darkMode} />
                          <MiniMetric icon={<Layers size={14}/>} label="Type" value={item.job_type} darkMode={darkMode} />
                          <MiniMetric icon={<Wallet size={14}/>} label="Pay" value={item.stipend} darkMode={darkMode} isEmerald />
                          <MiniMetric icon={<Globe2 size={14}/>} label="Src" value={item.source_type} darkMode={darkMode} />
                        </div>
                      </div>

                      {/* Section 3: Admin Actions */}
                      <div className="flex flex-row lg:flex-col justify-center items-center gap-4">
                        <button 
                          onClick={() => handleApprove(item.id)}
                          className="flex-1 lg:flex-none flex items-center gap-2 px-8 py-4 rounded-[1.5rem] bg-emerald-500 text-white font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                        >
                          <CheckCircle size={18} /> Approve
                        </button>
                        <button 
                          onClick={() => handleReject(item.id)}
                          className={`flex-1 lg:flex-none flex items-center gap-2 px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${
                            darkMode ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white'
                          }`}
                        >
                          <XCircle size={18} /> Reject
                        </button>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-500/10 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] opacity-40 italic">
                       <span>Submitted: {new Date(item.created_at).toLocaleDateString()}</span>
                       <span>ID: {item.id.slice(0, 8)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* --- Optimized Sub-Components --- */

const StatBox = ({ label, value, color }) => (
  <div className="p-6 text-center">
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{label}</p>
    <p className={`text-4xl font-black ${color}`}>{value}</p>
  </div>
);

const MiniMetric = ({ icon, label, value, isEmerald, darkMode }) => (
  <div className="space-y-1 overflow-hidden">
    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
      {icon} {label}
    </p>
    <p className={`text-xs font-black truncate uppercase ${
      isEmerald ? 'text-emerald-500' : darkMode ? 'text-slate-200' : 'text-slate-800'
    }`}>
      {value || '---'}
    </p>
  </div>
);

export default ApproveJob;