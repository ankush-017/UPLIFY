import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  ArrowLeft, Briefcase, MapPin, IndianRupee, 
  Code, Save, Zap, Globe, Link as LinkIcon, Database
} from 'lucide-react';
import API from '../../../API.js';

export default function UpdateInternship() {
  const { id } = useParams();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [form, setForm] = useState({
    title: '', company: '', location: '', stipend: '',
    type: '', job_type: '', link: '', source_type: '', skills: '',
  });

  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // SaaS Theme Map
  const theme = {
    bg: darkMode ? 'bg-[#080808]' : 'bg-[#F9FAFB]',
    card: darkMode ? 'bg-[#111111] border-white/5' : 'bg-white border-slate-200 shadow-sm',
    input: darkMode ? 'bg-white/[0.02] border-white/10 text-white focus:border-lime-500/50' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-yellow-500',
    text: darkMode ? 'text-white' : 'text-slate-900',
    muted: darkMode ? 'text-slate-500' : 'text-slate-400',
    accent: 'from-yellow-400 to-lime-500'
  };

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const res = await API.get(`/api/job-single/${id}`);
        if (res.data.success) setForm(res.data.data);
      } catch (error) {
        toast.error("Fetch failed");
      } finally {
        setInitializing(false);
      }
    };
    fetchInternship();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.put(`/api/update-job/${id}`, form);
      if (res.data.success) {
        toast.success("Database updated");
        navigate("/admin/all-internships");
      }
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (initializing) return (
    <div className={`h-screen flex items-center justify-center font-mono text-xs tracking-widest ${theme.bg} ${theme.muted}`}>
      LOADING_RECORDS...
    </div>
  );

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-300 font-sans selection:bg-lime-500/30`}>
      
      {/* Header */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b ${darkMode ? 'bg-black/40 border-white/5' : 'bg-white/70 border-slate-200'} px-6 py-3`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate(-1)} className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${theme.muted} hover:text-lime-500 transition-colors`}>
            <ArrowLeft size={14} /> Back to Hub
          </button>
          <div className="flex items-center gap-3">
            <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded border ${darkMode ? 'border-lime-500/30 text-lime-400' : 'border-yellow-500/30 text-yellow-600'}`}>
              Admin v2.0
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-10 pb-24">
        
        {/* Compact Title Section */}
        <div className="mb-10 flex items-center gap-4">
            <div className={`p-3 rounded-xl border ${theme.card}`}>
                <Database size={24} className="text-lime-500" />
            </div>
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Edit Opportunity</h1>
                <p className={`text-xs ${theme.muted}`}>Modify listing details for <span className="text-blue-500 font-mono italic">{id.slice(0,8)}</span></p>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Core Section Bento */}
            <div className={`p-6 rounded-2xl border ${theme.card} space-y-6`}>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-lime-500 uppercase tracking-widest">Job Headline</label>
                    <input name="title" value={form.title} onChange={handleChange} className="w-full bg-transparent text-lg font-bold outline-none border-b border-transparent focus:border-white/5 pb-1" placeholder="Title..." required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Company</label>
                        <div className="flex items-center gap-2 border-b border-inherit pb-1">
                            <Briefcase size={14} className="opacity-30" />
                            <input name="company" value={form.company} onChange={handleChange} className="w-full bg-transparent text-sm font-semibold outline-none" required />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Location</label>
                        <div className="flex items-center gap-2 border-b border-inherit pb-1 text-blue-500">
                            <MapPin size={14} />
                            <input name="location" value={form.location} onChange={handleChange} className="w-full bg-transparent text-sm font-semibold outline-none" placeholder="Remote/Hybrid" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Logistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'Stipend', name: 'stipend', icon: <IndianRupee size={12}/> },
                    { label: 'Mode', name: 'type', isSelect: true, options: ['Remote', 'On-Site', 'Hybrid'] },
                    { label: 'Contract', name: 'job_type', isSelect: true, options: ['Internships', 'Full-Time'] },
                ].map((f) => (
                    <div key={f.name} className={`p-4 rounded-xl border ${theme.input}`}>
                        <label className="flex items-center gap-2 text-[9px] font-bold text-slate-500 uppercase mb-2">
                           {f.icon} {f.label}
                        </label>
                        {f.isSelect ? (
                            <select name={f.name} value={form[f.name]} onChange={handleChange} className="w-full bg-transparent outline-none text-xs font-bold appearance-none cursor-pointer">
                                {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        ) : (
                            <input name={f.name} value={form[f.name]} onChange={handleChange} className="w-full bg-transparent outline-none text-xs font-bold" />
                        )}
                    </div>
                ))}
            </div>

            {/* Technical Group */}
            <div className={`p-6 rounded-2xl border ${theme.card} grid grid-cols-1 md:grid-cols-2 gap-6`}>
                <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Required Stack</label>
                    <div className="flex items-center gap-2 text-purple-400">
                        <Code size={14} />
                        <input name="skills" value={form.skills} onChange={handleChange} className="w-full bg-transparent text-xs font-bold outline-none" placeholder="Skill tags..." />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">External URL</label>
                    <div className="flex items-center gap-2 text-yellow-500">
                        <LinkIcon size={14} />
                        <input name="link" value={form.link} onChange={handleChange} className="w-full bg-transparent text-[10px] font-mono outline-none opacity-60 focus:opacity-100" placeholder="https://..." />
                    </div>
                </div>
            </div>

            {/* Source Origin Picker */}
            <div className="flex flex-col sm:flex-row gap-3">
                {[
                    { id: 'on-uplify', label: 'Uplify Native', icon: <Zap size={14}/> },
                    { id: 'forwarded', label: 'Forwarded Stream', icon: <Globe size={14}/> }
                ].map((s) => (
                    <button
                        key={s.id}
                        type="button"
                        onClick={() => setForm(p => ({...p, source_type: s.id}))}
                        className={`flex-1 flex items-center justify-between p-4 rounded-xl border transition-all ${
                            form.source_type === s.id 
                            ? 'bg-lime-500/5 border-lime-500 text-lime-500' 
                            : 'bg-transparent border-inherit opacity-40 hover:opacity-100'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            {s.icon}
                            <span className="text-[10px] font-black uppercase tracking-widest">{s.label}</span>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${form.source_type === s.id ? 'bg-lime-500' : 'bg-slate-700'}`} />
                    </button>
                ))}
            </div>

            {/* Final Deploy Button */}
            <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl bg-gradient-to-r ${theme.accent} text-black font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:scale-[1.01] active:scale-95 shadow-lg shadow-lime-500/10 flex items-center justify-center gap-3`}
            >
                {loading ? 'SYNCING_CLOUD...' : <>DEPLOY UPDATES <Save size={16} /></>}
            </button>
        </form>
      </main>
    </div>
  );
}