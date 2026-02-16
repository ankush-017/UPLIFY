import React, { useEffect, useState } from 'react';
import { supabase } from '../../superbaseClient';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Loader2, Briefcase, MapPin, IndianRupee, Clock, Sparkles, ArrowUpRight } from 'lucide-react';
import { useSelector } from 'react-redux';

function InternshipCompany() {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const fetchInterns = async () => {
    setLoading(true);

    // Logic: Calculate date 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data, error } = await supabase
      .from('internships')
      .select('*')
      .eq('status', 'approved')
      .gte('created_at', thirtyDaysAgo.toISOString()) // Only show last 30 days
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Error fetching opportunities");
    } else {
      setInterns(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchInterns(); }, []);

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'}`}>

      {/* --- PREMIUM MESH HEADER --- */}
      <div className="relative overflow-hidden pt-14 pb-16 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
          <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-b from-emerald-500/20 to-transparent' : 'bg-gradient-to-b from-blue-500/10 to-transparent'}`} />
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#3DDC84]/20 blur-[120px] rounded-full animate-pulse" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3DDC84]/10 border border-[#3DDC84]/20 mb-4">
            <Sparkles size={14} className={`${darkMode ? "text-[#3DDC84]" : "text-[#0ba751]"}`} />
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${darkMode ? "text-[#3DDC84]" : "text-[#0ba751]"}`}>Fresh Opportunities</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
            Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3DDC84] to-[#C7EE3F]">Latest.</span>
          </h1>
          <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'} max-w-xl mx-auto font-medium`}>
            Showing verified internships posted in the last 30 days.
          </p>
        </motion.div>
      </div>

      {/* --- GRID FEED --- */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-[#3DDC84]" />
            <span className="text-xs font-bold uppercase tracking-widest opacity-50">Curating Feed...</span>
          </div>
        ) : interns.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-dashed border-slate-700">
            <p className="text-slate-500 font-bold uppercase tracking-widest">No fresh posts found in 30 days.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interns.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 
                ${darkMode
                    ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#d8e337] shadow-2xl"
                    : "bg-white border-slate-200 hover:shadow-2xl hover:border-[#c2d001] shadow-sm"
                  }`}
              >
                {/* Top Row: Company & Source */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#3DDC84]/10 flex items-center justify-center">
                      <Briefcase size={20} className="text-[#3DDC84]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm leading-none mb-1">{job.company}</h4>
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{job.source_type}</span>
                    </div>
                  </div>
                  <button className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-[#3DDC84] hover:text-[#002D15] transition-all">
                    <ArrowUpRight size={18} />
                  </button>
                </div>

                {/* Title & Skills */}
                <h3 className="text-xl font-black tracking-tight mb-4 group-hover:text-[#11cc65] transition-colors line-clamp-1">
                  {job.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills?.split(',').map((skill, i) => (
                    <span
                      key={i}
                      className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-[0.1em] transition-all duration-300 border
    ${darkMode
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                          : "bg-slate-100 border-slate-200 text-slate-600 group-hover:bg-white"
                        }`}
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>

                {/* Details Footer */}
                <div className={`pt-6 border-t ${darkMode?"border-white/20":"border-slate-200"} space-y-3`}>
                  <div className="flex items-center justify-between text-xs font-medium">
                    <div className="flex items-center gap-2 opacity-60"><MapPin size={14} /> {job.location}</div>
                    <div className="flex items-center gap-2 text-[#3DDC84] font-bold"><IndianRupee size={14} /> {job.stipend}</div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${job.type === 'Remote' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1.5 opacity-40 text-[10px] font-bold uppercase tracking-widest">
                      <Clock size={12} /> {timeAgo(job.created_at)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default InternshipCompany;