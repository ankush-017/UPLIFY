import React from 'react';
import {
  Briefcase, Globe, Code, Smartphone, Users, Medal, Laptop,
  Sparkles, BookOpenCheck, Lightbulb, CalendarDays, Trophy,
  Clock, ArrowUpRight, CheckCircle2, Zap
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { UIDark, UILight } from '../assets/image';

export default function UplifyInternship() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const domains = [
    {
      title: 'Frontend Development',
      icon: <Laptop className="w-6 h-6 text-lime-500" />,
      description: 'Craft high-performance user interfaces with modern React patterns.',
      tags: ['React', 'Next.js', 'Tailwind'],
      link: '#',
    },
    {
      title: 'Backend Development',
      icon: <Code className="w-6 h-6 text-emerald-500" />,
      description: 'Architect scalable server logic and high-concurrency database systems.',
      tags: ['Node.js', 'Go', 'MongoDB'],
      link: '#',
    },
    {
      title: 'Full Stack Development',
      icon: <Globe className="w-6 h-6 text-yellow-500" />,
      description: 'Bridge the gap between client and server with end-to-end expertise.',
      tags: ['MERN', 'Auth0', 'Cloud'],
      link: '#',
    },
    {
      title: 'Android Development',
      icon: <Smartphone className="w-6 h-6 text-green-600" />,
      description: 'Build native experiences using Kotlin and modern mobile frameworks.',
      tags: ['Kotlin', 'Compose', 'API'],
      link: '#',
    },
  ];

  const stats = [
    { label: "Active Interns", value: "500+" },
    { label: "Success Rate", value: "98%" },
    { label: "Partner Companies", value: "50+" },
    { label: "Projects", value: "1.2k" },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-zinc-950 text-zinc-300" : "bg-white text-zinc-900"}`}>
      
      {/* Dynamic Glow Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] left-[-5%] w-[35%] h-[35%] rounded-full blur-[100px] opacity-15 ${darkMode ? "bg-lime-600" : "bg-lime-200"}`} />
        <div className={`absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] rounded-full blur-[100px] opacity-10 ${darkMode ? "bg-yellow-500" : "bg-yellow-100"}`} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        
        {/* --- COMPACT HERO --- */}
        <section className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-2 py-0.5 rounded-full border border-lime-500/20 bg-lime-500/5 ${darkMode? "text-lime-400" : "text-lime-600"} text-[11px] font-bold uppercase tracking-wider mb-4`}>
            <Zap size={12} fill="currentColor" />
            <span>Registration Open {new Date().getFullYear()}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Uplify <span className="text-lime-500 italic">Internships</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-500 max-w-xl mx-auto mb-8 leading-relaxed">
            Gain industry-grade experience. No fluff, just production-ready code and mentorship.
          </p>
          <div className="flex justify-center gap-3">
            <button className="px-5 py-2.5 bg-lime-500 hover:bg-lime-600 text-black rounded-lg text-xs font-bold transition-all shadow-md shadow-lime-500/20">
              Apply Now
            </button>
            {/* <button className={`px-5 py-2.5 rounded-lg text-xs font-bold border transition-all ${darkMode ? "border-zinc-800 hover:bg-zinc-900" : "border-zinc-200 hover:bg-zinc-50"}`}>
              Curriculum
            </button> */}
          </div>
        </section>

        {/* --- MINIMAL STATS --- */}
        <section className={`grid grid-cols-4 gap-4 p-4 mb-20 rounded-2xl border ${darkMode ? "bg-zinc-900/40 border-zinc-800" : "bg-zinc-50 border-zinc-100"}`}>
          {stats.map((stat, i) => (
            <div key={i} className="text-center border-r last:border-0 border-zinc-500/10">
              <div className="text-lg font-bold text-yellow-500">{stat.value}</div>
              <div className="text-[10px] text-zinc-500 uppercase font-semibold tracking-tighter">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* --- TRACKS SECTION --- */}
        <section className="mb-24">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-8 text-center italic">Selected Learning Tracks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {domains.map((domain, idx) => (
              <div
                key={idx}
                className={`group p-6 rounded-2xl border transition-all duration-300 ${
                  darkMode ? "bg-zinc-900/30 border-zinc-800 hover:border-lime-500/30" : "bg-white border-zinc-200 hover:shadow-lg"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg ${darkMode ? "bg-zinc-800" : "bg-zinc-50"}`}>
                    {domain.icon}
                  </div>
                  <div className="flex gap-1">
                    {domain.tags.map(tag => (
                      <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded border border-zinc-500/20 text-zinc-500 font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
                <h3 className="text-base font-bold mb-2 flex items-center gap-2">
                  {domain.title}
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-lime-500" />
                </h3>
                <p className="text-xs text-zinc-500 mb-6 leading-relaxed">{domain.description}</p>
                <a href={domain.link} className={`text-[11px] font-bold ${darkMode? "text-lime-400" : "dark:text-lime-600"} uppercase tracking-widest hover:underline`}>
                  Join Domain
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* --- BENTO HIGHLIGHTS --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-24">
          <div className={`md:col-span-2 p-6 rounded-3xl border flex flex-col justify-between ${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-zinc-100 border-zinc-200"}`}>
             <Trophy className="text-yellow-500 mb-4" size={24} />
             <div>
               <h4 className="text-sm font-bold mb-1">Top 5% Placement Support</h4>
               <p className="text-xs text-zinc-500 italic">Direct referrals to our network of 50+ partner tech companies.</p>
             </div>
          </div>
          <div className={`p-6 rounded-3xl border text-center ${darkMode ? "bg-lime-500/10 border-lime-500/20" : "bg-lime-50 border-lime-200"}`}>
             <Medal className="mx-auto text-lime-600 mb-3" size={24} />
             <h4 className="text-xs font-bold">Certified</h4>
             <p className="text-[10px] text-zinc-500 mt-1">ISO & Industry Recognized</p>
          </div>
          <div className={`p-6 rounded-3xl border text-center ${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"}`}>
             <Users className="mx-auto text-yellow-500 mb-3" size={24} />
             <h4 className="text-xs font-bold">1:1 Mentoring</h4>
             <p className="text-[10px] text-zinc-500 mt-1">Expert guidance daily</p>
          </div>
        </div>

        {/* --- DARK MINIMAL CTA --- */}
        <section className={`p-8 rounded-3xl border text-center relative overflow-hidden ${darkMode ? "bg-zinc-900 border-zinc-800 shadow-2xl" : "bg-zinc-950 text-white"}`}>
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Build. Deploy. Scale.</h3>
            <p className="text-xs text-zinc-400 mb-6 max-w-xs mx-auto">Limited seats per cohort to ensure quality mentorship. Apply before Sunday.</p>
            <button className="px-6 py-3 bg-lime-500 text-black text-xs font-black rounded-full hover:scale-105 transition-transform">
              Begin Application
            </button>
          </div>
          {/* Subtle noise/gradient effect */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(132,204,22,0.3),transparent)]" />
        </section>

      </div>
    </div>
  );
}