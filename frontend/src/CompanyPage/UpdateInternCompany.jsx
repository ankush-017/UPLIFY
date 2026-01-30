import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { supabase } from '../../superbaseClient.js';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { postCompany } from '../assets/image.js';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { Briefcase, MapPin, IndianRupee, Link as LinkIcon, Sparkles, Send, Globe, Zap, ArrowLeft, Loader2 } from 'lucide-react';

/** * Reusable Elite Input Component 
 * Defined outside to prevent focus-loss on re-renders
 */
const InputField = ({ label, icon: Icon, darkMode, ...props }) => (
    <div className="space-y-2 w-full group">
        <label className={`text-[10px] font-black uppercase tracking-[0.25em] ml-1 transition-colors duration-300 ${darkMode ? 'text-[#3DDC84]/60 group-focus-within:text-[#3DDC84]' : 'text-slate-400 group-focus-within:text-[#166534]'}`}>
            {label}
        </label>
        <div className="relative">
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-all duration-300 ${darkMode ? 'text-slate-600 group-focus-within:text-[#3DDC84] group-focus-within:scale-110' : 'text-slate-300 group-focus-within:text-[#166534] group-focus-within:scale-110'}`}>
                <Icon size={18} strokeWidth={2.5} />
            </div>
            <input
                {...props}
                className={`w-full pl-12 pr-4 py-4 rounded-[1.5rem] outline-none border transition-all duration-300 text-sm font-black ${darkMode 
                    ? 'bg-slate-900/50 border-white/5 text-white placeholder:text-slate-700 focus:border-[#3DDC84] focus:ring-[6px] focus:ring-[#3DDC84]/10 focus:bg-slate-900' 
                    : 'bg-slate-100/50 border-slate-200 text-slate-900 placeholder:text-slate-300 focus:border-[#3DDC84] focus:ring-[6px] focus:ring-[#3DDC84]/10 focus:bg-white shadow-sm'}`}
            />
            <div className={`absolute bottom-0 left-6 right-6 h-[2px] rounded-full transition-all duration-500 scale-x-0 group-focus-within:scale-x-100 ${darkMode ? 'bg-[#3DDC84] shadow-[0_0_15px_#3DDC84]' : 'bg-[#166534]'}`} />
        </div>
    </div>
);

function UpdateInternCompany() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
      title: '', company: '', location: '', stipend: '',
      type: '', job_type: '', link: '', source_type: '', skills: '',
  });
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const fetchInternship = async () => {
      const { data, error } = await supabase.from('internships').select('*').eq('id', id).single();
      if (error) {
        toast.error('Failed to fetch details');
        navigate('/company/track-application');
      } else {
        setForm(data || {});
      }
      setInitializing(false);
    };
    fetchInternship();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Clean link if it's an internal application
    const updateData = { ...form, link: form.source_type === 'on-uplify' ? '' : form.link };
    
    const { error } = await supabase.from('internships').update(updateData).eq('id', id);
    setLoading(false);

    if (error) {
      toast.error('Sync failed!');
    } else {
      toast.success('Opportunity updated successfully!');
      navigate('/company/track-application');
    }
  };

  if (initializing) {
    return (
      <div className={`flex flex-col justify-center items-center h-screen gap-4 ${darkMode ? 'bg-[#020617]' : 'bg-[#fcfdf2]'}`}>
        <Loader2 className="w-12 h-12 animate-spin text-[#3DDC84]" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Loading Assets</span>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-10 pb-20 px-6 transition-colors duration-700 ${darkMode ? 'bg-[#020617]' : 'bg-[#fcfdf2]'}`}>
      
      {/* Cinematic Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-0 right-0 w-[50%] h-[50%] rounded-full blur-[160px] opacity-20 ${darkMode ? 'bg-[#3DDC84]' : 'bg-[#C7EE3F]'}`} />
          <div className={`absolute bottom-0 left-0 w-[50%] h-[50%] rounded-full blur-[160px] opacity-15 ${darkMode ? 'bg-[#C7EE3F]' : 'bg-[#3DDC84]'}`} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- CENTERED HERO --- */}
        <div className="flex flex-col items-center justify-center text-center mb-16 px-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm backdrop-blur-md ${darkMode ? 'bg-emerald-500/10 text-[#3DDC84] border border-emerald-500/20' : 'bg-[#3DDC84]/10 text-[#166534] border border-[#3DDC84]/20'}`}>
                <Sparkles size={14} className="animate-pulse" /> Asset Management
            </motion.div>
            <h1 className={`text-4xl md:text-6xl font-black tracking-tighter leading-none ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Refine Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3DDC84] via-[#C7EE3F] to-[#3DDC84] bg-[length:200%_auto] animate-text-gradient pl-2">Listing.</span>
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} className={`mt-6 text-sm font-medium tracking-wide ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Update your opportunity details to reach the best candidates.
            </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* --- LEFT VISUAL PANEL --- */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-4 flex flex-col gap-6">
              <div className="relative group overflow-hidden rounded-[3rem] h-[450px] shadow-2xl">
                  <img src={postCompany} alt="Update" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-10 left-10 right-10 text-white">
                      <p className="font-black text-xl leading-tight">Maintaining excellence <br /> leads to better talent.</p>
                  </div>
              </div>
          </motion.div>

          {/* --- RIGHT FORM PANEL --- */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-8">
            <form onSubmit={handleSubmit} className={`p-8 md:p-14 rounded-[3.5rem] border shadow-2xl ${darkMode ? 'bg-slate-900/40 border-white/5 backdrop-blur-3xl' : 'bg-white border-slate-200 shadow-slate-200/60'}`}>
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField darkMode={darkMode} label="Role Title" icon={Zap} name="title" value={form.title} onChange={handleChange} required />
                  <InputField darkMode={darkMode} label="Organization" icon={Briefcase} name="company" value={form.company} onChange={handleChange} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField darkMode={darkMode} label="Office Location" icon={MapPin} name="location" value={form.location} onChange={handleChange} />
                  <InputField darkMode={darkMode} label="Stipend" icon={IndianRupee} name="stipend" value={form.stipend} onChange={handleChange} />
                </div>

                {/* Application Strategy Selection */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 pl-1">Application Strategy</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'on-uplify', label: 'On Uplify App', sub: 'Internal Dashboard' },
                      { id: 'forwarded', label: 'Forwarded Source', sub: 'External Site Link' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setForm({ ...form, source_type: opt.id })}
                        className={`text-left p-5 rounded-3xl border transition-all duration-300 ${form.source_type === opt.id ? 'border-[#3DDC84] bg-[#3DDC84]/5 ring-4 ring-[#3DDC84]/5' : 'border-slate-200 dark:border-white/10'}`}
                      >
                        <div className="flex items-center gap-3 mb-1">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${form.source_type === opt.id ? 'border-[#3DDC84]' : 'border-slate-400'}`}>
                            {form.source_type === opt.id && <div className="w-2.5 h-2.5 bg-[#3DDC84] rounded-full" />}
                          </div>
                          <span className={`text-xs font-black uppercase tracking-wider ${darkMode ? 'text-white' : 'text-slate-900'}`}>{opt.label}</span>
                        </div>
                        <p className={`text-[10px] font-bold ml-8 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{opt.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conditional Link Appearance */}
                <AnimatePresence mode="wait">
                    {form.source_type === 'forwarded' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <InputField darkMode={darkMode} label="Forwarding URL" icon={LinkIcon} name="link" value={form.link} onChange={handleChange} placeholder="https://..." required />
                        </motion.div>
                    )}
                </AnimatePresence>

                <InputField darkMode={darkMode} label="Core Skills" icon={Globe} name="skills" value={form.skills} onChange={handleChange} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 pl-1">Work Setup</label>
                    <div className="flex flex-wrap gap-3">
                      {['Remote', 'In-office', 'Hybrid'].map((val) => (
                        <button key={val} type="button" onClick={() => setForm({ ...form, type: val })} className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all active:scale-95 ${form.type === val ? 'bg-[#3DDC84] border-[#3DDC84] text-[#002D15] shadow-lg' : 'bg-transparent border-slate-200 dark:border-white/10 text-slate-500'}`}>{val}</button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 pl-1">Contract Type</label>
                    <div className="flex gap-3">
                      {[
                        { id: 'Internship', label: 'Intern' },
                        { id: 'Full-time', label: 'Full-Time' }
                      ].map((val) => (
                        <button key={val.id} type="button" onClick={() => setForm({ ...form, job_type: val.id })} className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all active:scale-95 ${form.job_type === val.id ? 'bg-[#C7EE3F] border-[#C7EE3F] text-[#002D15] shadow-lg shadow-yellow-500/20' : 'bg-transparent border-slate-200 dark:border-white/10 text-slate-500'}`}>{val.label}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8 flex flex-col md:flex-row gap-4">
                  <button type="submit" disabled={loading} className="flex-1 relative group py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] overflow-hidden transition-all active:scale-[0.98] shadow-xl shadow-emerald-500/20">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#3DDC84] via-[#C7EE3F] to-[#3DDC84] bg-[length:200%_auto] animate-text-gradient" />
                      <span className="relative z-10 text-[#002D15] flex items-center justify-center gap-4">
                          {loading ? <Loader2 className="animate-spin" size={18} /> : <>Sync Updates <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" /></>}
                      </span>
                  </button>
                  <button type="button" onClick={() => navigate(-1)} className={`px-10 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] border transition-all ${darkMode ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-200 text-slate-900 hover:bg-slate-50'}`}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default UpdateInternCompany;