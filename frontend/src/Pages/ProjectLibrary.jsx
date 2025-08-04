import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const GearIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    aria-hidden="true" 
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
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`relative flex items-center justify-center min-h-[90vh] overflow-hidden p-6 ${
        darkMode ? 'bg-slate-900 text-slate-200' : 'bg-gray-100 text-slate-700'
      }`}
    >
      {/* Decorative background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className={`absolute top-0 left-0 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 ${darkMode ? 'bg-indigo-500' : 'bg-indigo-200'}`} />
        <div className={`absolute bottom-0 right-0 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 ${darkMode ? 'bg-purple-500' : 'bg-purple-200'}`} />
      </div>
      
      <div className="z-10 flex flex-col items-center text-center max-w-2xl">
        {/* Animated Icon */}
        <motion.div
          variants={itemVariants}
          // Add a continuous, subtle rotation animation
          animate={{
            ...itemVariants.visible.animate,
            rotate: 360,
          }}
          transition={{
            duration: 10,
            ease: 'linear',
            repeat: Infinity,
          }}
          className={`mb-6 p-4 rounded-full shadow-lg ${darkMode ? 'bg-slate-800/50' : 'bg-white/60'}`}
        >
          <GearIcon className={`w-16 h-16 ${darkMode ? 'text-indigo-400' : 'text-indigo-500'}`} />
        </motion.div>

        {/* Gradient Heading */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${darkMode ? 'from-purple-400 to-indigo-400' : 'from-purple-600 to-indigo-600'}`}>
            Creations in Progress 🚧
          </span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl mb-8 opacity-80"
        >
          Our project library is currently being built. We're crafting something amazing and can't wait to share it with you!
        </motion.p>
        
        {/* Call-to-action Button */}
        <motion.div variants={itemVariants}>
          <a
            href="#contact" // You can change this link to a contact section or mailing list signup
            className={`inline-block px-8 py-3 rounded-md font-semibold tracking-wide transition-transform transform hover:scale-105 duration-300 ${
              darkMode 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500' 
                : 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-600'
            }`}
          >
            Stay Tuned
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default ProjectLibrary;