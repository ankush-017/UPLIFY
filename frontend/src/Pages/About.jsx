import React from 'react';
import { motion } from 'framer-motion';
import { AboutHero, Ankush } from '../assets/image';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase, Code2, BookOpen, MessageSquare,
  Calendar, Zap, ShieldCheck,
  Terminal, Fingerprint, Sparkles,
  Search, Lock, Verified, Database, Layers, ShieldAlert, GraduationCap, BarChart3, Target, Globe
} from 'lucide-react';

export default function About() {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const fadeIn = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.4 }
  };

  return (
    <div className={`${darkMode ? 'bg-[#020502] text-slate-300' : 'bg-[#FAFAFA] text-slate-900'} font-sans selection:bg-emerald-500 transition-colors duration-500 pb-10`}>

      {/* --- MINIMALIST COMPACT HERO --- */}
      <section className="relative pt-16 pb-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase italic">
            Architecting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400 not-italic">The Future Elite.</span>
          </h1>
          <p className="text-sm md:text-base max-w-2xl opacity-50 font-medium leading-relaxed">
            A high-performance technical ecosystem engineering production paths for developers and providing companies with pre-vetted technical talent.
          </p>
        </div>
      </section>

      {/* --- THE INTEGRITY STRIP (OWNER'S PLEDGE) --- */}
      <section className="px-6 mb-12">
        <div className={`max-w-6xl mx-auto rounded-3xl border p-6 flex flex-col md:flex-row items-center gap-6 ${darkMode ? 'bg-zinc-900/40 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
            <ShieldAlert className="text-emerald-500" size={24} />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-black uppercase tracking-widest text-emerald-500">Security & Integrity Protocol</h4>
            <p className="text-[11px] md:text-xs opacity-70 leading-relaxed italic">
              "Unlike massive job boards where scams thrive, **I personally verify every company and internship on Uplify.** We validate recruiter credentials and stipend legitimacy manually. If it’s on your dashboard, it’s a real seat at a real table." — Ankush
            </p>
          </div>
        </div>
      </section>

      {/* --- THE ALPHA GRID: STUDENTS --- */}
      <section className="px-6 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap size={18} className="text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 text-inherit">Student Alpha Interface</span>
            <div className="h-[1px] flex-1 bg-emerald-500/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { icon: <Target />, title: 'Vetted Placements', desc: 'Internships at fast-paced firms. High-impact engineering roles, zero data-entry.' },
              { icon: <Terminal />, title: 'Architect Flow', desc: 'Roadmaps for MERN, Next.js, and AI. Built by engineers to master system design.' },
              { icon: <Code2 />, title: 'Proof-of-Work Lab', desc: 'Build interactive, live-production portfolios that recruiters actually interact with.' },
              { icon: <MessageSquare />, title: 'Recruiter Nexus', desc: 'Direct chat lines with hiring managers once AI screening identifies your technical fit.' },
              { icon: <Zap />, title: 'Industry Intel', desc: 'Exclusive engineering post-mortems and developer blogs from high-growth startups.' },
              { icon: <Calendar />, title: 'Auto-Scheduling', desc: 'Sync your calendar for automated interview links and technical round feedback.' }
            ].map((item, i) => (
              <motion.div key={i} {...fadeIn} className={`p-6 rounded-2xl border transition-all duration-300 ${darkMode ? 'bg-[#111112] border-white/5 hover:border-emerald-500/30' : 'bg-white border-slate-100 shadow-sm hover:shadow-md'}`}>
                <div className="text-emerald-500 mb-4">{React.cloneElement(item.icon, { size: 20 })}</div>
                <h5 className="font-black uppercase text-xs mb-2 tracking-widest">{item.title}</h5>
                <p className="text-[11px] opacity-50 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- THE COMMAND GRID: ENTERPRISE --- */}
      <section className="px-6 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] flex-1 bg-emerald-500/10"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 text-inherit">Enterprise Command Interface</span>
            <Layers size={18} className="text-emerald-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { icon: <Sparkles />, title: 'AI Scoring Engine', desc: 'Rank talent based on technical complexity and code quality using Gemini-powered vetting.' },
              { icon: <Search />, title: 'Deep Discovery', desc: 'Granular filtering by specific tech-stack experience, Redis caching, or Cloud deployments.' },
              { icon: <BarChart3 />, title: 'Pipeline Analytics', desc: 'Full-cycle visibility of recruitment throughput from vetted pool to final onboarding.' },
              { icon: <Verified />, title: 'Verified Identity', desc: 'Every applicant is cross-verified via GitHub and LinkedIn history for 100% authenticity.' },
              { icon: <Lock />, title: 'Secure Selection', desc: 'End-to-end management of shortlists and recruiter permissions in a secure console.' },
              { icon: <Globe />, title: 'Market Benchmarking', desc: 'Benchmark talent against global standards to ensure your hires meet industry expectations.' }
            ].map((item, i) => (
              <motion.div key={i} {...fadeIn} className={`p-6 rounded-2xl border transition-all duration-300 ${darkMode ? 'bg-zinc-900/60 border-white/5 hover:border-emerald-500/30' : 'bg-white border-slate-100 hover:shadow-md shadow-sm'}`}>
                <div className="text-emerald-400 mb-4">{React.cloneElement(item.icon, { size: 20 })}</div>
                <h5 className="font-black uppercase text-xs mb-2 tracking-widest">{item.title}</h5>
                <p className="text-[11px] opacity-50 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOUNDER'S CONSOLE --- */}
      <section className="py-12 px-6 border-y border-emerald-500/10 bg-emerald-500/[0.02]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-2">
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 shadow-2xl">
              <img src={Ankush} alt="Founder" className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <p className="text-[8px] font-black text-emerald-400 tracking-widest uppercase">CEO & Founder</p>
                <p className="text-sm font-bold text-white uppercase italic tracking-tighter">Ankush Kumar</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 space-y-6">
            <div className="space-y-1">
              <h2 className="text-[10px] font-black tracking-[0.5em] uppercase text-emerald-500">Letter to Developers</h2>
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none"> Execution <br /> is Everything.</h3>
            </div>
            <p className="text-sm opacity-70 leading-relaxed font-medium border-l-2 border-emerald-500 pl-6 italic">
              "Uplify is the infrastructure for technical authority. We provide a unified ecosystem where students apply for vetted internships, master industry-standard resources, and build production-ready projects. Our platform utilizes advanced AI to score resume intelligence, ensuring recruiters connect with talent based on execution rather than academics. We don't just list jobs; we verify every node in the talent pipeline to ensure your effort translates into a high-impact career."
            </p>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA STRIP --- */}
      <section className="py-12 px-6">
        <div className={`max-w-5xl mx-auto rounded-full p-4 md:p-2 pl-8 md:pl-12 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden ${darkMode ? 'bg-black shadow-[0_0_50px_rgba(16,185,129,0.1)]' : 'bg-emerald-950 shadow-2xl'}`}>
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase italic flex items-center gap-3">
            Ready for <span className="text-emerald-500">The Elite 1%?</span>
          </h2>
          <button onClick={() => navigate('/user/uplify-community')} className="w-full md:w-auto px-10 py-4 bg-white text-black font-black rounded-full text-[10px] tracking-[0.4em] uppercase hover:bg-emerald-500 hover:text-white transition-all whitespace-nowrap">
            Join Comminity
          </button>
          <div className="absolute top-0 right-0 w-40 h-full bg-emerald-500/10 blur-[50px] pointer-events-none"></div>
        </div>
      </section>

    </div>
  );
}