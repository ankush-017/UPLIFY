import React, { useEffect, useState } from 'react';
import { supabase } from '../../superbaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Mail, Phone, Linkedin, Github, Globe, FileText, Sparkles, Target, ShieldCheck, Loader2, ChevronRight, MessageSquare, Lock, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

function JobApplicant() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiScores, setAiScores] = useState({}); 
  const [skillsRequired, setSkillsRequired] = useState([]);
  const [scoreVisibility, setScoreVisibility] = useState({});

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase.from('internships').select('skills').eq('id', id).single();
      if (!error && data.skills) setSkillsRequired(data.skills.split(',').map(s => s.trim()));
    };
    fetchSkills();
  }, [id]);

  const fetchApplicants = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('applyapplications').select('*').eq('internship_id', id).order('created_at', { ascending: false });
    if (error) toast.error('Sync failed');
    else setApplicants(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchApplicants();
  }, [id]);

  // --- DELETE FUNCTION ---
  const handleDeleteApplicant = async (applicantId) => {
    if (!window.confirm("Are you sure you want to remove this applicant?")) return;
    
    try {
      const { error } = await supabase
        .from('applyapplications')
        .delete()
        .eq('id', applicantId);

      if (error) throw error;

      toast.success("Applicant removed from grid");
      setApplicants(prev => prev.filter(app => app.id !== applicantId));
    } catch (err) {
      toast.error("Purge failed");
      console.error(err);
    }
  };

  const evaluateResume = async (resumeUrl, applicantId) => {
    setAiScores(prev => ({ ...prev, [applicantId]: { loading: true } }));
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/gemini/evaluate-resume`, {
        resumeUrl,
        skills: skillsRequired.join(', '),
      });
      const result = res.data.result;
      setAiScores(prev => ({ ...prev, [applicantId]: { ...result, loading: false } }));
      setScoreVisibility(prev => ({ ...prev, [applicantId]: true }));
      toast.success("Intelligence report ready");
    } catch (err) {
      toast.error('Evaluation failed');
      setAiScores(prev => ({ ...prev, [applicantId]: { loading: false } }));
    }
  };

  const highlightKeywords = (text, keywords) => {
    if (!text) return "";
    const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
    return text.replace(regex, (match) => `<span class="text-[#3DDC84] font-bold">${match}</span>`);
  };

  return (
    <div className={`min-h-screen pt-4 md:pt-8 pb-20 px-4 md:px-6 transition-all duration-700 selection:bg-[#3DDC84] ${darkMode ? 'bg-[#020617] text-white' : 'bg-[#F8FAFC] text-slate-900'}`}>
      
      {/* --- BACKGROUND ACCENTS --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full blur-[100px] md:blur-[120px] opacity-10 ${darkMode ? 'bg-[#3DDC84]' : 'bg-[#3DDC84]'}`} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-4">
          <div className="space-y-2">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-[0.4em] border ${darkMode ? 'bg-emerald-500/5 border-emerald-500/20 text-[#3DDC84]' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
              <ShieldCheck size={12} /> Management Interface
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-none uppercase italic">
              Candidate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3DDC84] to-[#C7EE3F]">Pool.</span>
            </h1>
          </div>
          <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/5 md:bg-transparent md:border-none md:p-0">
            <p className="text-[10px] font-black opacity-30 uppercase tracking-widest">Database Sync</p>
            <p className="text-xl md:text-2xl font-black tracking-tighter tabular-nums">{applicants.length} Profiles</p>
          </div>
        </div>

        {/* --- LISTING ENGINE --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4 opacity-40">
            <Loader2 className="w-8 h-8 animate-spin text-[#3DDC84]" />
            <span className="text-[9px] font-black uppercase tracking-[0.5em]">Polling Applicants...</span>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-3">
            {/* Desktop Headers (Hidden on Mobile) */}
            <div className="hidden lg:grid grid-cols-12 px-8 py-2 text-[8px] font-black uppercase tracking-[0.3em] opacity-60">
              <div className="col-span-4">Candidate Identity</div>
              <div className="col-span-3">Contact Details</div>
              <div className="col-span-3 text-center">AI Probability Match</div>
              <div className="col-span-2 text-right pr-4">Actions</div>
            </div>

            <AnimatePresence mode="popLayout">
              {applicants.length === 0 ? (
                <div className={`py-20 text-center border-2 border-dashed rounded-[3rem] ${darkMode ? 'border-white/5' : 'border-slate-200'}`}>
                  <Target size={48} className="mx-auto mb-4 opacity-10" />
                  <h3 className="text-sm font-black opacity-30 uppercase tracking-widest">No Applicants in Database</h3>
                </div>
              ) : (
                applicants.map((applicant, idx) => {
                  const ai = aiScores[applicant.id] || {};
                  const visible = scoreVisibility[applicant.id];

                  return (
                    <motion.div
                      key={applicant.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`group relative flex flex-col lg:grid lg:grid-cols-12 items-start lg:items-center p-5 md:px-8 md:py-5 rounded-2xl border transition-all duration-300 gap-4 lg:gap-0
                        ${darkMode 
                          ? "bg-[#151d2b] border-white/5 hover:border-[#3DDC84]/30" 
                          : "bg-white border-slate-100 shadow-sm hover:border-[#3DDC84]"
                        }`}
                    >
                      {/* --- DELETE BUTTON (TOP RIGHT) --- */}
                      <button 
                        onClick={() => handleDeleteApplicant(applicant.id)}
                        className="absolute top-[-15px] right-0 p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-all opacity-60 hover:opacity-100 z-20"
                        title="Remove Candidate"
                      >
                        <Trash2 size={18} />
                      </button>

                      {/* 1. Identity Segment */}
                      <div className="col-span-4 flex items-center gap-4 w-full">
                        <div className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center text-base font-black transition-all ${darkMode ? 'bg-white/5 text-[#3DDC84]' : 'bg-emerald-50 text-emerald-700'}`}>
                          {applicant.name.charAt(0)}
                        </div>
                        <div className="min-w-0 pr-10 md:pr-6">
                          <h2 className={`text-sm md:text-lg font-black tracking-tight leading-none uppercase italic truncate`}>{applicant.name}</h2>
                          <div className="flex gap-3 mt-2 opacity-60 md:opacity-30 group-hover:opacity-100 transition-opacity">
                             {[
                                { icon: Linkedin, url: applicant.linkedin },
                                { icon: Github, url: applicant.github },
                                { icon: Globe, url: applicant.portfolio }
                             ].map((link, i) => link.url && (
                                <a key={i} href={link.url} target="_blank" rel="noreferrer">
                                   <link.icon size={15} className="hover:text-[#3DDC84]" />
                                </a>
                             ))}
                          </div>
                        </div>
                      </div>

                      {/* 2. Contact Details */}
                      <div className="col-span-3 space-y-1 w-full border-t border-white/5 pt-3 lg:border-none lg:pt-0">
                        <div className="flex items-center gap-2 text-[11px] font-bold opacity-50 truncate"><Mail size={12} className="shrink-0 text-[#3DDC84]" /> {applicant.email}</div>
                        <div className="flex items-center gap-2 text-[11px] font-bold opacity-50 truncate"><Phone size={12} className="shrink-0 text-[#3DDC84]" /> {applicant.phone}</div>
                      </div>

                      {/* 3. AI Score Segment */}
                      <div className="col-span-3 flex lg:justify-center w-full">
                        {ai.loading ? (
                          <div className="flex items-center gap-2">
                             <Loader2 size={12} className="animate-spin text-[#3DDC84]" />
                             <span className="text-[8px] font-black uppercase tracking-widest opacity-40">Analyzing...</span>
                          </div>
                        ) : ai.score ? (
                          <div className="flex items-center justify-between lg:justify-center w-full gap-6 bg-white/5 p-3 rounded-xl lg:bg-transparent lg:p-0 border lg:border-none border-white/5">
                             <div className="flex items-baseline gap-1">
                               <span className="text-3xl font-black text-[#3DDC84] leading-none">{ai.score}</span>
                               <span className="text-[10px] font-black opacity-30">% Match</span>
                             </div>
                             <button onClick={() => setScoreVisibility(p => ({...p, [applicant.id]: !p[applicant.id]}))}
                               className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 hover:opacity-100 underline decoration-[#3DDC84]">
                               {visible ? 'Hide report' : 'Insights'}
                             </button>
                          </div>
                        ) : (
                          <button onClick={() => evaluateResume(applicant.resume_url, applicant.id)}
                            className={`w-full lg:w-auto flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] ${darkMode ? 'text-[#0aab52] border-[#3DDC84]/90' : 'text-[#108042] border-[#3DDC84]/90'} border px-4 py-2.5 rounded-xl hover:bg-[#3DDC84] hover:text-[#002D15] transition-all`}>
                            <Sparkles size={12} /> AI Score Match
                          </button>
                        )}
                      </div>

                      {/* 4. Actions */}
                      <div className="col-span-2 flex justify-end items-center gap-3 w-full border-t border-white/5 pt-3 lg:border-none lg:pt-0">
                        <div className="relative group/chat">
                          <button className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all grayscale ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200 cursor-not-allowed'}`}>
                            <MessageSquare size={18} className="text-slate-400" />
                          </button>
                          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover/chat:opacity-100 transition-all pointer-events-none">
                             <span className="whitespace-nowrap bg-[#3DDC84] text-[#002D15] text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-widest flex items-center gap-1 shadow-lg">
                                <Lock size={8} /> Coming Soon
                             </span>
                          </div>
                        </div>

                        <a href={applicant.resume_url} target="_blank" rel="noreferrer"
                          className={`flex-1 lg:flex-none h-10 px-5 rounded-xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all ${darkMode ? 'bg-white text-black hover:bg-[#3DDC84]' : 'bg-slate-900 text-white hover:bg-[#3DDC84] hover:text-black shadow-lg shadow-emerald-500/10'}`}>
                          <FileText size={16} /> Resume
                        </a>
                      </div>

                      {/* AI report breakdown */}
                      <AnimatePresence>
                        {visible && ai.explanation && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="col-span-12 w-full overflow-hidden">
                            <div className={`mt-4 p-5 rounded-2xl border ${darkMode ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                               <p className="text-[11px] md:text-xs leading-relaxed font-medium opacity-80" 
                                  dangerouslySetInnerHTML={{ __html: `💡 Logic: ${highlightKeywords(ai.explanation, skillsRequired)}` }} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* SOP Dropdown */}
                      <div className="col-span-12 w-full mt-2 lg:mt-3 lg:pt-3 lg:border-t lg:border-inherit">
                        <details className="group">
                          <summary className="list-none cursor-pointer flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] opacity-40 hover:opacity-60 transition-all">
                            <ChevronRight size={12} className="group-open:rotate-90 transition-transform" /> Candidate Statement
                          </summary>
                          <p className={`mt-3 p-5 rounded-xl text-[11px] leading-relaxed font-medium ${darkMode ? 'bg-white/5 text-slate-300' : 'bg-slate-100/50 text-slate-600 border border-slate-100'}`}>
                             {applicant.cover_letter}
                          </p>
                        </details>
                      </div>

                      {/* Vertical Accent */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 group-hover:h-1/2 bg-[#3DDC84] transition-all duration-300 rounded-r-full shadow-[0_0_10px_#3DDC84]" />
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobApplicant;