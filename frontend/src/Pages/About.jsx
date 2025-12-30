import React from 'react';
import { motion } from 'framer-motion';
import { AboutHero, Ankush } from '../assets/image';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className={`${darkMode ? 'bg-[#020a02] text-gray-100' : 'bg-slate-50 text-emerald-950'} font-sans selection:bg-yellow-400 selection:text-black`}>
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-6">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px]"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-emerald-400">The Developer's Ecosystem</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
              Engineered for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-yellow-300">
                The Top 1%.
              </span>
            </h1>
            
            <p className={`text-sm md:text-base max-w-lg leading-relaxed font-medium ${darkMode ? 'text-gray-400' : 'text-emerald-900/70'}`}>
              Uplify isn't just a platform; it's a launchpad for the next generation of software architects. We replace generic tutorials with high-stakes, production-grade project experience.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button onClick={() => navigate('/resources')} className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black tracking-widest uppercase rounded-xl transition-all shadow-[0_20px_40px_rgba(16,185,129,0.2)]">
                Access Resources
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-yellow-500/20 rounded-[2rem] blur-2xl"></div>
            <img src={AboutHero} alt="Hero" className="relative w-full h-[500px] object-cover rounded-[2rem] border border-white/10 shadow-2xl saturate-[1.2]" />
          </motion.div>
        </div>
      </section>

      {/* --- TRUST BAR --- */}
      <div className={`border-y ${darkMode ? 'border-white/5 bg-white/5' : 'border-emerald-100 bg-emerald-50/50'} py-10`}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center">
          {[
            { label: 'Success Stories', val: '500+' },
            { label: 'Industry Projects', val: '40+' },
            { label: 'Partner Networks', val: '25+' },
            { label: 'Global Community', val: '1.2k' },
          ].map((s, i) => (
            <div key={i}>
              <h3 className="text-2xl font-black text-yellow-500">{s.val}</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- REFINED FEATURES: Why Trust Us? --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 space-y-2">
            <h2 className="text-xs font-black tracking-[0.4em] uppercase text-emerald-500">The Infrastructure</h2>
            <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter">Built for Modern Engineering.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                title: 'Live Lab Experience', 
                icon: '🛠️', 
                desc: 'Bypass the "Tutorial Hell". Build on production-ready stacks used by high-growth startups.' 
              },
              { 
                title: 'Strategic Internships', 
                icon: '💼', 
                desc: 'Access a curated pipeline of roles that prioritize skill over certificates.' 
              },
              { 
                title: 'Architectural Roadmaps', 
                icon: '🧭', 
                desc: 'Learn System Design, Clean Code, and Scalability—not just basic syntax.' 
              },
              { 
                title: 'ATS-Optimized Identity', 
                icon: '📝', 
                desc: 'We transform your projects into quantifiable impact statements that recruiters notice.' 
              },
              { 
                title: 'Premium Peer Group', 
                icon: '🤝', 
                desc: 'Collaborate with driven developers. Iron sharpens iron in our exclusive community circles.' 
              },
              { 
                title: 'Career Sovereignty', 
                icon: '📚', 
                desc: 'Gain the technical confidence to negotiate better offers and lead high-impact teams.' 
              },
            ].map((feature, i) => (
              <motion.div
                key={i} {...fadeIn}
                className={`p-8 rounded-[2rem] border transition-all duration-500 hover:border-emerald-500/50 group ${
                  darkMode ? 'bg-zinc-900/40 border-white/5' : 'bg-white border-emerald-100 shadow-xl shadow-emerald-900/5'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                <p className="text-[12px] leading-relaxed opacity-60 font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOUNDER: Message to Aspiring Developers --- */}
      <section className="py-24 px-6 bg-emerald-500/5 backdrop-blur-3xl relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-16 items-center">
          <div className="md:col-span-2 relative">
            <div className="absolute -inset-2 bg-yellow-400/30 rounded-[2.5rem] blur-xl"></div>
            <div className="relative rounded-[2rem] overflow-hidden border-2 border-emerald-500 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
              <img src={Ankush} alt="Ankush" className="w-full aspect-square object-cover" />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-6 py-2 font-black rounded-full text-[10px] tracking-widest uppercase shadow-xl">
              Ankush Kumar
            </div>
          </div>
          
          <div className="md:col-span-3 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xs font-black tracking-[0.5em] uppercase text-emerald-500">From the Founder</h2>
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-none italic">
                To the next great <br/> Software Engineer.
              </h3>
            </div>
            
            <div className="space-y-6 text-sm md:text-base opacity-80 leading-relaxed font-medium border-l-2 border-yellow-400 pl-6 italic">
              <p>
                "I started Uplify because I realized that the university curriculum is often three years behind the industry. As a B.Tech student at MMMUT, I felt the gap between writing code and building products."
              </p>
              <p>
                "My goal is to give you the clarity I wish I had. Whether you're mastering the MERN stack or diving into AI, Uplify is here to ensure your effort translates into a high-impact career. You don't need another certificate; you need proof of work."
              </p>
            </div>
            
            <div className="flex gap-6 pt-4">
               <div>
                 <p className="text-[10px] font-black uppercase text-gray-500 mb-1">Expertise</p>
                 <p className="text-xs font-bold">Fullstack Architecture / AI / ML</p>
               </div>
               <div>
                 <p className="text-[10px] font-black uppercase text-gray-500 mb-1">Education</p>
                 <p className="text-xs font-bold">B.Tech CSE, MMMUT</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#040f04] rounded-[3.5rem] p-10 md:p-10 text-center relative overflow-hidden border border-emerald-500/20 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]"></div>
          <div className="relative z-10 space-y-10">
            <h2 className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tighter">
              Stop Learning. <br />
              <span className="text-yellow-400">Start Building.</span>
            </h2>
            <p className="text-[11px] font-black tracking-[0.3em] uppercase text-emerald-100/40 max-w-sm mx-auto">
              Limited slots for the next mentorship cohort.
            </p>
            <button 
              onClick={() => navigate('/user/uplify-community')}
              className="px-14 py-5 bg-white text-black font-black rounded-2xl text-[12px] tracking-[0.2em] uppercase hover:bg-yellow-400 transition-all shadow-2xl"
            >
              Join the Elite Community
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}