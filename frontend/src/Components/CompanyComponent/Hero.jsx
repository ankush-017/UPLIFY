import React from 'react';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import { MdOutlineAutoAwesome } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { CompanyHero } from '../../assets/image.js';
import { useNavigate } from 'react-router-dom';

function Hero() {

  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <section
      className={`relative h-[90vh] flex items-center justify-center text-center px-4 pt-5 md:pt-0 overflow-hidden ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={CompanyHero}
          alt="Company Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-4xl mx-auto px-6"
      >
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="inline-flex items-center gap-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 rounded-full shadow-lg mb-5"
        >
          <MdOutlineAutoAwesome className="text-xl" /> Empowering Smarter Hiring
        </motion.div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
          Discover Talent Faster with <span className="text-yellow-400">Uplify</span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Join leading companies in finding top-tier student talent. Post internships and job openings,
          browse verified candidates, and streamline your entire hiring process — all in one AI-assisted platform.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#facc15',
              color: '#000',
              fontSize: '1rem',
              padding: '0.75rem 1.75rem',
              borderRadius: '0.75rem',
              boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#fde047',
              },
            }}
            onClick={() => navigate('/company/post-internship')}
          >
            Post Internship
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: '#fff',
              borderColor: '#fff',
              fontSize: '1rem',
              padding: '0.75rem 1.75rem',
              borderRadius: '0.75rem',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
            onClick={() => navigate('/company/track-application')}
          >
           Track Application
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;