import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const GearIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    {...props}
  >
    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61-.25-1.17-.59-1.69-.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24-.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2 3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
  </svg>
);

function ProjectLibrary() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`relative flex items-center justify-center min-h-[95vh] overflow-hidden p-8 ${
        darkMode ? 'bg-[#0a0f0a] text-emerald-50' : 'bg-stone-50 text-emerald-950'
      }`}
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className={`absolute -top-24 -left-24 w-96 h-96 rounded-full mix-blend-screen filter blur-[80px] opacity-30 ${darkMode ? 'bg-emerald-600' : 'bg-emerald-300'}`} 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], x: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full mix-blend-screen filter blur-[80px] opacity-30 ${darkMode ? 'bg-yellow-500' : 'bg-yellow-200'}`} 
        />
        
        {/* Subtle Mesh Grid */}
        <div className={`absolute inset-0 opacity-[0.03] ${darkMode ? 'invert' : ''}`} 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
        />
      </div>
      
      <div className="z-10 flex flex-col items-center text-center max-w-3xl">
        {/* Floating Icon Container */}
        <motion.div
          variants={itemVariants}
          className="relative mb-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
            className={`relative z-10 p-6 rounded-[2rem] backdrop-blur-xl border ${
              darkMode 
                ? 'bg-emerald-950/30 border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.2)]' 
                : 'bg-white/80 border-emerald-100 shadow-xl'
            }`}
          >
            <GearIcon className={`w-20 h-20 ${darkMode ? 'text-yellow-400' : 'text-emerald-600'}`} />
          </motion.div>
          {/* Decorative Ring */}
          <div className="absolute inset-0 border-2 border-dashed border-yellow-500/40 rounded-[2rem] animate-[spin_30s_linear_infinite]" />
        </motion.div>

        {/* Headline with Modern Typography */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-none"
        >
          <span className={`bg-clip-text text-transparent bg-gradient-to-br ${
            darkMode 
              ? 'from-emerald-300 via-yellow-200 to-emerald-400' 
              : 'from-emerald-700 via-yellow-600 to-emerald-900'
          }`}>
            Coming to Life
          </span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className={`text-lg md:text-xl mb-10 max-w-xl leading-relaxed font-medium ${
            darkMode ? 'text-emerald-100/70' : 'text-stone-600'
          }`}
        >
          We are currently curating a digital garden of our finest work. 
          The project library is evolving into something <span className="text-emerald-500 font-bold">remarkable</span>.
        </motion.p>
        
        {/* Premium Button Component */}
        {/* <motion.div variants={itemVariants} className="flex gap-4">
          <a
            href="#notify"
            className={`group relative px-10 py-4 rounded-full font-bold transition-all duration-300 overflow-hidden ${
              darkMode 
                ? 'bg-yellow-400 text-black hover:bg-yellow-300 shadow-[0_10px_30px_rgba(250,204,21,0.3)]' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-[0_10px_30px_rgba(5,150,105,0.3)]'
            }`}
          >
            <span className="relative z-10">Get Notified</span>
            <div className={`absolute inset-0 w-full h-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ${
              darkMode ? 'bg-white/20' : 'bg-emerald-500'
            }`} />
          </a>
        </motion.div> */}

        {/* Progress Indicator */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-bold opacity-50"
        >
          <span className="w-8 h-[2px] bg-yellow-500"></span>
          Development Phase 04
          <span className="w-8 h-[2px] bg-yellow-500"></span>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default ProjectLibrary;