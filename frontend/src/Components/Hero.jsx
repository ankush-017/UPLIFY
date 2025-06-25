import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, FileText, Compass } from 'lucide-react';
import { herointern } from '../assets/image'; // Replace with your updated image path

function Hero() {
    return (
        <section className="relative z-10 bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center gap-10">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 space-y-6"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                        Internships, Skills & Career Tools<br />
                        Built for You
                    </h1>

                    <p className="text-gray-300 text-lg">
                        Discover internships from top companies, enhance your skills with curated courses, and build your resume — all in one place. <span className="text-blue-400 font-semibold">Uplify</span> helps you become job-ready.
                    </p>

                    <div className="flex flex-col md:flex-row flex-wrap gap-3 md:gap-4 w-full sm:w-auto">
                        <Link to="/internships" className="w-full md:w-auto">
                            <button className="w-full md:w-auto bg-blue-600 transition-all duration-500 hover:bg-gradient-to-r from-blue-800 to-cyan-700 text-white px-4 py-3 rounded-lg font-semibold shadow-md flex items-center justify-center gap-2">
                                <Rocket size={18} />
                                Browse Internships
                            </button>
                        </Link>

                        <Link to="/career-roadmaps" className="w-full md:w-auto">
                            <button className="w-full md:w-auto bg-blue-600 transition-all duration-500 hover:bg-gradient-to-r from-blue-800 to-cyan-700 text-white px-4 py-3 rounded-lg font-semibold shadow-md flex items-center justify-center gap-2">
                                <Compass size={18} />
                                Career Roadmaps
                            </button>
                        </Link>
                        <Link to="/resume-builder" className="w-full md:w-auto">
                            <button className="w-full md:w-auto bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                                <FileText size={18} />
                                Build Resume
                            </button>
                        </Link>
                    </div>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 flex justify-center"
                >
                    <img
                        src={herointern}
                        alt="Uplify Hero"
                        className="w-full max-w-xl object-contain"
                    />
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;