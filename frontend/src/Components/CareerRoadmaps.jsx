import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, Terminal, Layers, Zap, Map, 
  Compass, BarChart3, ShieldCheck, Cpu, Sparkles 
} from "lucide-react";

export default function CareerRoadmaps() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    domain: "",
    experience: "beginner",
    currentSkills: "",
  });

  const handleGenerate = (e) => {
    e.preventDefault();
    navigate(`/user/career-roadmaps/${formData.domain.toLowerCase().replace(/\s+/g, '-')}`, { 
      state: { config: formData } 
    });
  };

  const inputClasses = `w-full px-4 py-3 rounded-xl border outline-none transition-all duration-500 text-[13px] font-medium ${
    darkMode 
    ? "bg-[#0A0A0A] border-white/10 focus:border-yellow-400 focus:bg-[#111] text-white placeholder:text-neutral-700" 
    : "bg-neutral-50 border-neutral-200 focus:border-yellow-500 focus:bg-white text-neutral-900 placeholder:text-neutral-400"
  }`;

  return (
    <section className={`relative min-h-screen flex items-center justify-center py-12 px-6 overflow-hidden transition-colors duration-700 ${darkMode ? "bg-[#050505]" : "bg-[#fafafa]"}`}>
      
      {/* --- REFINED PREMIUM BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* 1. Animated Grid Layer */}
        <div 
          className={`absolute inset-0 opacity-[0.15] ${darkMode ? "invert" : ""}`} 
          style={{ 
            backgroundImage: `linear-gradient(to right, ${darkMode ? '#22c55e' : '#e2e8f0'} 1px, transparent 1px), linear-gradient(to bottom, ${darkMode ? '#22c55e' : '#e2e8f0'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px' 
          }} 
        />
        
        {/* 2. Radial Blueprint Mask (Darkens edges) */}
        <div className={`absolute inset-0 ${darkMode ? "bg-[radial-gradient(circle_at_center,transparent_0%,#050505_80%)]" : "bg-[radial-gradient(circle_at_center,transparent_0%,#fafafa_80%)]"}`} />

        {/* 3. Floating Plasma Orbs */}
        <motion.div 
          animate={{ 
            x: [0, 30, 0], 
            y: [0, 50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 0], 
            y: [0, -30, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px]" 
        />

        {/* 4. Film Grain Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
      </div>

      <div className="relative z-10 max-w-5xl w-full">
        {/* --- COMPACT HEADER --- */}
        <div className="mb-12 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 border ${darkMode ? "bg-yellow-400/10 border-yellow-400/20 text-yellow-400" : "bg-yellow-50 border-yellow-200 text-yellow-700"} text-[10px] font-black uppercase tracking-[0.2em]`}
          >
            <Cpu size={12} className="animate-pulse" /> Trajectory Logic: Active
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-5xl md:text-6xl font-black tracking-tight leading-none`}
          >
            <span className={`text-transparent bg-clip-text ${darkMode ? "bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-400" : "bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-600"}`}>Career</span> <span className={`text-transparent bg-clip-text ${darkMode ? "bg-gradient-to-r from-lime-500 via-lime-500 to-lime-400" : "bg-gradient-to-r from-lime-500 via-lime-500 to-lime-400"}`}>Roadmap</span>
          </motion.h1>
          <p className={`mt-4 text-sm font-medium max-w-xl opacity-60 ${darkMode ? "text-neutral-200" : "text-neutral-500"}`}>
            Architecting next-generation learning paths with real-time industry telemetry.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* --- LEFT SIDE: COMPACT HUD --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className={`w-full lg:w-[40%] rounded-[2rem] p-8 flex flex-col justify-between border backdrop-blur-xl ${
              darkMode ? "bg-white/[0.02] border-white/5 shadow-2xl" : "bg-white border-neutral-200 shadow-xl shadow-neutral-100"
            }`}
          >
            <div className="space-y-10">
              <div className="space-y-6">
                <h3 className={`text-xs font-black uppercase tracking-[0.3em] ${darkMode ? "text-yellow-500/70" : "text-neutral-400"}`}>
                  System Capabilities
                </h3>
                
                <div className="space-y-6">
                  {[
                    { icon: <Map size={16} />, title: "Precision Vectors", desc: "Niche tracks for 2026 roles." },
                    { icon: <BarChart3 size={16} />, title: "Gap Analysis", desc: "Identifying skill deficiencies." },
                    { icon: <Zap size={16} />, title: "Velocity Sync", desc: "FAANG & YC stack alignment." },
                    { icon: <ShieldCheck size={16} />, title: "Verified Assets", desc: "Curated learning modules." }
                  ].map((item, i) => (
                    <motion.div key={i} whileHover={{ x: 5 }} className="flex gap-4 items-start group cursor-default">
                      <div className={`mt-1 p-2 rounded-lg transition-all ${darkMode ? "bg-neutral-900 text-green-500 group-hover:bg-green-500 group-hover:text-black" : "bg-neutral-100 text-neutral-600 group-hover:bg-green-500 group-hover:text-white"}`}>
                        {item.icon}
                      </div>
                      <div>
                        <p className={`text-[12px] font-bold tracking-wide ${darkMode ? "text-neutral-200" : "text-neutral-800"}`}>{item.title}</p>
                        <p className={`text-[11px] leading-tight opacity-50 mt-1 font-medium ${darkMode ? "text-neutral-300" : "text-neutral-500"}`}>{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`mt-10 pt-6 border-t flex items-center justify-between ${darkMode ? "border-white/5" : "border-neutral-100"}`}>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-ping" />
                <p className={`text-[9px] font-black uppercase tracking-[0.3em] ${darkMode ? "text-yellow-500/80" : "text-neutral-400"}`}>
                  Live Processing
                </p>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT SIDE: COMPACT FORM --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-[60%] relative group"
          >
            <div className="absolute -inset-[1px] bg-gradient-to-b from-yellow-400/20 to-transparent rounded-[2.5rem] blur-[2px]" />
            
            <div className={`relative h-full p-8 md:p-12 rounded-[2.5rem] border backdrop-blur-2xl ${
              darkMode ? "bg-[#080808]/90 border-white/5" : "bg-white border-neutral-200 shadow-2xl"
            }`}>
              
              <form onSubmit={handleGenerate} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <label className={`text-[10px] font-black uppercase tracking-[0.2em] px-1 ${darkMode ? "text-yellow-500" : "text-neutral-500"}`}>
                      01. Career Goal
                    </label>
                    <div className="relative">
                      <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={14} />
                      <input
                        type="text"
                        placeholder="e.g. AI Architect"
                        required
                        className={`${inputClasses} pl-11`}
                        onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <label className={`text-[10px] font-black uppercase tracking-[0.2em] px-1 ${darkMode ? "text-yellow-500" : "text-neutral-500"}`}>
                      02. Seniority
                    </label>
                    <div className="relative">
                      <Layers className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={14} />
                      <select 
                        className={`${inputClasses} pl-11 appearance-none cursor-pointer pr-10`}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      >
                        <option value="beginner">Entry Level</option>
                        <option value="intermediate">Mid-Professional</option>
                        <option value="advanced">Senior / Lead</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className={`text-[10px] font-black uppercase tracking-[0.2em] px-1 ${darkMode ? "text-yellow-500" : "text-neutral-500"}`}>
                    03. Current Toolkit
                  </label>
                  <textarea
                    placeholder="List primary skills (e.g. React, Python, AWS)"
                    rows="4"
                    className={`${inputClasses} resize-none py-4`}
                    onChange={(e) => setFormData({ ...formData, currentSkills: e.target.value })}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#EAB308" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full relative group py-5 bg-green-400 text-black rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] overflow-hidden transition-all shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Generate Path <ArrowRight size={16} />
                  </span>
                  
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_0.8s_infinite]" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { left: 100%; }
        }
      `}</style>
    </section>
  );
}