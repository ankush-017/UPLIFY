import React, { useEffect, useState } from 'react';
import { supabase } from '../../superbaseClient';
import { useSelector } from 'react-redux';
import { 
  Clock, MapPin, Briefcase, Wallet, Trash2, 
  CheckCircle, Rocket, ShieldCheck, Search, Loader2, Info, Calendar,
  Cpu,
  SoapDispenserDroplet
} from 'lucide-react';

function ReviewPage() {
  const { user } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.theme);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user?.uid) fetchInternships();
  }, [user?.uid]);

  const fetchInternships = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('internships')
      .select('*')
      .eq('uid', user.uid)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else setInternships(data || []);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Withdrawing this listing will remove it from the verification queue. Proceed?")) {
      const { error } = await supabase.from('internships').delete().eq('id', id);
      if (error) alert("Error withdrawing listing");
      else setInternships(internships.filter(item => item.id !== id));
    }
  };

  const filteredData = internships.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen transition-all duration-700 font-sans pb-24 ${
      darkMode ? 'bg-[#030712] text-slate-200' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-[10%] -left-[10%] w-[70%] h-[70%] rounded-full blur-[120px] opacity-[0.15] ${darkMode ? 'bg-emerald-500' : 'bg-emerald-200'}`}></div>
        <div className={`absolute -bottom-[10%] -right-[10%] w-[70%] h-[70%] rounded-full blur-[120px] opacity-[0.15] ${darkMode ? 'bg-blue-600' : 'bg-blue-200'}`}></div>
      </div>

      <div className="relative p-4 md:p-8 max-w-7xl mx-auto">
        
        {/* Responsive Header */}
        <header className="mb-8 pt-6 text-center md:text-left">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-2 text-[10px] font-bold tracking-widest uppercase ${
            darkMode ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-700'
          }`}>
            <ShieldCheck size={12} />
            Management Console
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 italic">
                Pending <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Queue.</span>
              </h1>
              <p className={`text-base md:text-lg max-w-xl font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Quality assurance is processing your listings. Verification usually takes less than 24 hours.
              </p>
            </div>

            {/* Stats: Optimized for Mobile */}
            <div className={`flex items-center justify-around md:justify-start gap-4 md:gap-10 p-6 rounded-[2rem] border backdrop-blur-xl ${
              darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
            }`}>
              <StatItem label="In Review" value={internships.length} color="text-amber-500" />
              <div className="h-10 w-px bg-slate-500/20"></div>
              <StatItem label="Priority" value="High" color="text-emerald-500" />
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="relative group mb-8">
          <Search className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${darkMode ? 'text-slate-500 group-focus-within:text-emerald-500' : 'text-slate-400'}`} size={20} />
          <input 
            type="text" 
            placeholder="Search roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-14 pr-6 py-5 rounded-2xl border transition-all outline-none text-sm font-bold ${
              darkMode ? 'bg-white/5 border-white/10 focus:bg-white/10' : 'bg-white border-slate-200 focus:border-emerald-500'
            }`}
          />
        </div>

        {/* List Section */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Syncing Data</span>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-20 opacity-50">
            <CheckCircle size={48} className="mx-auto mb-4 text-emerald-500" />
            <p className="font-bold">No items found in review.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredData.map((item) => (
              <div key={item.id} className={`group relative rounded-[2.5rem] border overflow-hidden transition-all duration-300 ${
                darkMode ? 'bg-[#111827]/80 border-white/10' : 'bg-white border-slate-200 shadow-lg'
              }`}>
                <div className="p-6 md:p-10">
                  <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
                    
                    {/* Brand Section */}
                    <div className="flex items-center gap-5 min-w-[300px]">
                      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-3xl font-black shrink-0 ${
                        darkMode ? 'bg-emerald-500 text-slate-900' : 'bg-slate-900 text-white'
                      }`}>
                        {item.company?.charAt(0)}
                      </div>
                      <div className="overflow-hidden">
                        <h2 className="text-xl md:text-3xl font-black truncate">{item.title}</h2>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-slate-500">{item.company}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-500"></span>
                          <span className="text-[10px] font-black text-amber-500 uppercase">Reviewing</span>
                        </div>
                      </div>
                    </div>

                    {/* Info Grid - 2 cols on mobile, 4 on desktop */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
                      <Metric icon={<MapPin size={14} />} label="Location" value={item.location} darkMode={darkMode} />
                      <Metric icon={<Briefcase size={14} />} label="Type" value={item.type} darkMode={darkMode} />
                      <Metric icon={<Wallet size={14} />} label="Stipend" value={item.stipend} darkMode={darkMode} isEmerald />
                      <Metric icon={<Calendar size={14} />} label="Submitted" value={new Date(item.created_at).toLocaleDateString()} darkMode={darkMode} />
                      <Metric icon={<Cpu size={14} />} label="Skills" value={item.skills} darkMode={darkMode} />
                      <Metric icon={<Briefcase size={14} />} label="Job Type" value={item.job_type} darkMode={darkMode} />
                      <Metric icon={<SoapDispenserDroplet size={14} />} label="Source-Type" value={item.source_type} darkMode={darkMode} />
                    </div>

                    {/* Action Button */}
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className={`py-4 px-8 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${
                        darkMode ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white'
                      }`}
                    >
                      Withdraw
                    </button>
                  </div>

                  {/* Progressive Stepper - Adaptive for Mobile */}
                  <div className="mt-6 pt-6 border-t border-dashed border-slate-500/20">
                    {/* Desktop Pipeline */}
                    <div className="hidden md:flex items-center justify-between max-w-4xl mx-auto">
                      <PipelineStep label="Submitted" status="complete" darkMode={darkMode} />
                      <PipelineDivider active />
                      <PipelineStep label="QA Review" status="current" darkMode={darkMode} />
                      <PipelineDivider />
                      <PipelineStep label="Live" status="pending" darkMode={darkMode} />
                    </div>

                    {/* Mobile Pipeline (Vertical or Mini-Bar) */}
                    <div className="md:hidden">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black uppercase text-slate-500">Status: Reviewing</span>
                        <span className="text-[10px] font-black text-emerald-500">66% Complete</span>
                      </div>
                      <div className="h-2 w-full bg-slate-500/10 rounded-full overflow-hidden flex">
                        <div className="h-full w-1/3 bg-emerald-500"></div>
                        <div className="h-full w-1/3 bg-amber-500 animate-pulse"></div>
                        <div className="h-full w-1/3 opacity-20"></div>
                      </div>
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

const StatItem = ({ label, value, color }) => (
  <div className="text-center">
    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-2xl font-black ${color}`}>{value}</p>
  </div>
);

const Metric = ({ icon, label, value, isEmerald, darkMode }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-1.5 opacity-50">
      {icon}
      <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <p className={`text-sm font-bold truncate ${isEmerald ? 'text-emerald-500' : darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
      {value || '---'}
    </p>
  </div>
);

const PipelineStep = ({ label, status, darkMode }) => {
  const isComplete = status === 'complete';
  const isCurrent = status === 'current';
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
        isComplete ? 'bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/20' : 
        isCurrent ? 'bg-amber-500 text-slate-900 animate-pulse' : 
        'bg-slate-500/10 text-slate-500'
      }`}>
        {isComplete ? <CheckCircle size={18} /> : <Clock size={18} />}
      </div>
      <span className={`text-[10px] font-black uppercase tracking-tighter ${isCurrent ? 'text-amber-500' : 'opacity-40'}`}>{label}</span>
    </div>
  );
};

const PipelineDivider = ({ active }) => (
  <div className={`flex-1 h-px border-t-2 border-dashed mx-4 ${active ? 'border-emerald-500/50' : 'border-slate-500/20'}`} />
);

export default ReviewPage;