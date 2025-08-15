import { Link } from 'react-router-dom';
import { Rocket, FileText, Compass } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import { MdOutlineAutoAwesome } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { CompanyHero } from '../assets/image.js';

function Hero() {
    const darkMode = useSelector((state) => state.theme.darkMode);

    return (
        <section
            className={`relative min-h-[90vh] flex items-center justify-center text-center px-4 pt-14 pb-16 md:pt-36 md:pb-28 overflow-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
                }`}
        >
            {/* Background */}
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
                className="relative z-10 max-w-4xl lg:max-w-6xl w-full mx-auto px-4"
            >
                {/* Tagline */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.1 }}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 rounded-full shadow mb-4"
                >
                    <MdOutlineAutoAwesome className="text-base sm:text-lg" />
                    Empowering Future Careers with Intelligence
                </motion.div>

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-200 drop-shadow-lg">
                    Discover Internships. Build Skills. <br />
                    Launch Your Career with <span className="text-blue-400">Uplify</span>
                </h1>

                {/* Subtext */}
                <p className="mt-5 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    Find internships from top companies, enhance your skills with curated content, and build your resume — all in one place. <span className="text-blue-300 font-semibold">Uplify</span> helps you become job-ready.
                </p>

                {/* CTAs */}
                <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
                    <Link to="/job-internships">
                        <button className="bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-800 hover:to-cyan-700 transition-all duration-300 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2">
                            <Rocket size={18} />
                            Browse Jobs & Internships
                        </button>
                    </Link>

                    <Link to="/user/career-roadmaps">
                        <button className="bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 transition-all duration-300 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2">
                            <Compass size={18} />
                            Career Roadmaps
                        </button>
                    </Link>

                    <Link to="/user/resume-builder">
                        <button className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2">
                            <FileText size={18} />
                            Build Resume
                        </button>
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}

export default Hero;