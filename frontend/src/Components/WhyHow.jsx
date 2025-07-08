import React from 'react';
import WhyChooseUplify from './WhyChooseUplify';
import HowUplifyWorks from './HowUplifyWorks';
import { WhyHowImg } from '../assets/image';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CircleArrowRight } from 'lucide-react';

function WhyHow() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat bg-fixed md:bg-scroll py-10"
      style={{
        backgroundImage: `url(${WhyHowImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Blur overlay */}
      <div className={`absolute inset-0 ${darkMode ? "bg-black/60" : "bg-black/30"} backdrop-blur-sm`}></div>

      {/* Content on top of blur */}
      <div className="relative z-10 px-4 sm:px-8 md:px-16 lg:px-24">
        <WhyChooseUplify />
        <HowUplifyWorks />
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-10 flex justify-center z-10"
      >
        <Link
          to="/about"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          <span className="font-semibold">View More Uplify</span>
          <CircleArrowRight />
        </Link>
      </motion.div>
      </div>
    </div>
  );
}

export default WhyHow;