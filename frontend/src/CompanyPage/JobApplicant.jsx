import React, { useEffect, useState } from 'react';
import { supabase } from '../../superbaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { ExternalLink, Mail, Phone, Linkedin, Github, Globe, FileText, Sparkles, Zap, ArrowLeft, Target, ShieldCheck, Loader2 } from 'lucide-react';
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

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('applyapplications').select('*').eq('internship_id', id).order('created_at', { ascending: false });
      if (error) toast.error('Sync failed');
      else setApplicants(data || []);
      setLoading(false);
    };
    fetchApplicants();
  }, [id]);

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
    <div className={`min-h-screen pt-10 pb-20 px-6 transition-colors duration-700 ${darkMode ? 'bg-[#020617] text-white' : 'bg-[#FCFDF2] text-slate-900'}`}>
      
      {/* --- BACKGROUND ACCENTS --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full blur-[140px] opacity-20 ${darkMode ? 'bg-[#3DDC84]' : 'bg-[#3DDC84]/20'}`} />
        <div className={`absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[140px] opacity-10 ${darkMode ? 'bg-[#C7EE3F]' : 'bg-[#C7EE3F]/20'}`} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- CENTERED HERO HEADER --- */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-sm border ${darkMode ? 'bg-emerald-500/10 border-emerald-500/20 text-[#3DDC84]' : 'bg-[#3DDC84]/10 border-[#3DDC84]/20 text-[#166534]'}`}>
            <ShieldCheck size={14} className="animate-pulse" /> Verified Candidate Pool
          </motion.div>

          <h1 className={`text-4xl md:text-7xl font-black tracking-tighter leading-none mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Candidate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3DDC84] via-[#C7EE3F] to-[#3DDC84] bg-[length:200%_auto] animate-text-gradient">Intelligence.</span>
          </h1>
          <p className="max-w-xl text-sm font-medium opacity-60">Review applications with AI-assisted vetting to find your next high-impact hire instantly.</p>
        </div>

        {/* --- GRID VIEW --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <Loader2 className="w-12 h-12 animate-spin text-[#3DDC84]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Syncing Intelligence...</span>
          </div>
        ) : applicants.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-dashed border-slate-700">
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No candidates have surfaced yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            <AnimatePresence>
              {applicants.map((applicant, idx) => {
                const ai = aiScores[applicant.id] || {};
                const visible = scoreVisibility[applicant.id];

                return (
                  <motion.div
                    key={applicant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`group relative p-8 rounded-[3rem] border transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between
                      ${darkMode 
                        ? "bg-slate-900/40 border-white/5 hover:border-[#3DDC84]/40 shadow-2xl backdrop-blur-3xl" 
                        : "bg-white border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.04)]"
                      }`}
                  >
                    {/* Header: Identity */}
                    <div className="mb-8">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black ${darkMode ? 'bg-white/5 text-[#3DDC84]' : 'bg-[#3DDC84]/10 text-emerald-700'}`}>
                          {applicant.name.charAt(0)}
                        </div>
                        {/* <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${darkMode ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                          ID: {String(applicant.id).slice(-6)}
                        </div> */}
                      </div>
                      <h2 className="text-2xl font-black tracking-tight mb-2 italic group-hover:text-[#3DDC84] transition-colors">{applicant.name}</h2>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-[11px] font-bold opacity-50"><Mail size={12} /> {applicant.email}</div>
                        <div className="flex items-center gap-2 text-[11px] font-bold opacity-50"><Phone size={12} /> {applicant.phone}</div>
                      </div>
                    </div>

                    {/* Quick Links Row */}
                    <div className="flex gap-2 mb-8">
                      {[
                        { icon: Linkedin, url: applicant.linkedin, color: 'hover:bg-blue-600' },
                        { icon: Github, url: applicant.github, color: 'hover:bg-slate-800' },
                        { icon: Globe, url: applicant.portfolio, color: 'hover:bg-emerald-600' }
                      ].map((link, i) => link.url && (
                        <a key={i} href={link.url} target="_blank" rel="noreferrer" 
                          className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${darkMode ? 'border-white/5 bg-white/5 text-white' : 'border-slate-100 bg-slate-50 text-slate-600'} ${link.color} hover:text-white`}>
                          <link.icon size={16} />
                        </a>
                      ))}
                    </div>

                    {/* AI INTEL SECTION */}
                    <div className={`mb-8 p-6 rounded-[2rem] border transition-all ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                      <div className="flex justify-between items-center mb-4">
                         <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60">
                           <Sparkles size={14} className="text-[#3DDC84]" /> Intel Report
                         </div>
                         {!ai.score && !ai.loading && (
                           <button onClick={() => evaluateResume(applicant.resume_url, applicant.id)}
                            className="text-[9px] font-black uppercase bg-[#3DDC84] text-[#002D15] px-3 py-1.5 rounded-lg hover:scale-105 active:scale-95 transition-all">
                              Analyze
                           </button>
                         )}
                      </div>

                      {ai.loading ? (
                        <div className="py-4 flex flex-col items-center gap-2">
                           <Loader2 size={20} className="animate-spin text-[#3DDC84]" />
                           <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">Scanning Resume...</span>
                        </div>
                      ) : ai.score ? (
                        <div className="space-y-4">
                           <div className="flex items-center justify-between">
                              <span className="text-3xl font-black text-[#3DDC84]">{ai.score}<span className="text-sm opacity-40">/100</span></span>
                              <button onClick={() => setScoreVisibility(p => ({...p, [applicant.id]: !p[applicant.id]}))}
                                className="text-[9px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 underline">
                                {visible ? 'Hide Explanation' : 'View Breakdown'}
                              </button>
                           </div>
                           <AnimatePresence>
                             {visible && (
                               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                  <p className="text-[11px] leading-relaxed font-medium opacity-70 italic" 
                                     dangerouslySetInnerHTML={{ __html: `💡 ${highlightKeywords(ai.explanation, skillsRequired)}` }} />
                               </motion.div>
                             )}
                           </AnimatePresence>
                        </div>
                      ) : (
                        <p className="text-[10px] font-medium opacity-40 italic text-center">Run AI check to see matching probability.</p>
                      )}
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex flex-col gap-3">
                       <a href={applicant.resume_url} target="_blank" rel="noreferrer"
                        className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${darkMode ? 'bg-white text-black hover:bg-[#3DDC84]' : 'bg-slate-900 text-white hover:bg-[#3DDC84] hover:text-black'}`}>
                          <FileText size={16} /> Open Resume
                       </a>
                       
                       {/* Cover Letter Collapsible (Optional UX improvement) */}
                       <details className="group">
                          <summary className="list-none text-center cursor-pointer text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-all">
                             Read Statement of Purpose
                          </summary>
                          <div className={`mt-4 p-5 rounded-2xl text-xs leading-relaxed font-medium ${darkMode ? 'bg-white/5 text-slate-300' : 'bg-slate-50 text-slate-600'}`}>
                             {applicant.cover_letter}
                          </div>
                       </details>
                    </div>

                    {/* Hover Glow Border */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#3DDC84]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobApplicant;