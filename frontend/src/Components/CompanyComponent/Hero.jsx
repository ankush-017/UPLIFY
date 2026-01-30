import React from 'react';
import { motion } from 'framer-motion';
import { MdOutlineAutoAwesome } from 'react-icons/md';
import { HiArrowRight } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { CompanyHero } from '../../assets/image.js';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617]">
      
      {/* --- PREMIUM BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        <img
          src={CompanyHero}
          alt="Network Background"
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        {/* Animated Mesh Gradients for "Intelligence" Feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-900" />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-500/10 blur-[120px] rounded-full" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-6xl mx-auto px-6 md:pt-0 pt-14 text-center"
      >
        {/* Floating AI Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
        >
          <MdOutlineAutoAwesome className="text-[#c7ee3f] animate-spin-slow" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-300">
            Powered by Uplify Intelligence
          </span>
        </motion.div>

        {/* Cinematic Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9] mb-6">
          Hire the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3DDC84] to-[#c7ee3f]">Future.</span><br />
          Faster than <span className="italic font-serif">ever.</span>
        </h1>

        {/* Refined Subtext */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
          Join 500+ industry leaders using AI-verified student talent. 
          Streamline your pipeline from posting to placement in <span className="text-white font-semibold">one unified dashboard.</span>
        </p>

        {/* --- PREMIUM CTAs --- */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          
          {/* Primary: Post Internship */}
          <button
            onClick={() => navigate('/company/post-internship')}
            className="group relative px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest overflow-hidden transition-all duration-300 hover:-translate-y-1 active:scale-95 shadow-[0_20px_50px_rgba(61,220,132,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#3DDC84] to-[#c7ee3f] transition-transform duration-500 group-hover:scale-110" />
            <span className="relative z-10 text-[#002D15] flex items-center gap-3">
              Post Internship <HiArrowRight className="text-xl group-hover:translate-x-2 transition-transform" />
            </span>
          </button>

          {/* Secondary: Track Application */}
          <button
            onClick={() => navigate('/company/track-application')}
            className="group px-10 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest text-white border border-white/20 backdrop-blur-md hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            Track Application
          </button>
        </div>

        {/* --- TRUST BADGES --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1 }}
          className="md:mt-20 mt-12 pt-10 border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16 grayscale opacity-60"
        >
          {/* Add Small Partner Logos Here */}
          <span className="text-xs font-bold tracking-widest text-white">TRUSTED BY ELITE TECH FIRMS</span>
        </motion.div>

      </motion.div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <div className="w-px h-12 bg-gradient-to-b from-[#3DDC84] to-transparent" />
      </div>

    </section>
  );
}

export default Hero;