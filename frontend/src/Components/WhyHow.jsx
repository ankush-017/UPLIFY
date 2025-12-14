import React from 'react';
import WhyChooseUplify from './WhyChooseUplify';
import HowUplifyWorks from './HowUplifyWorks';
import { WhyHowImg, whyWhite } from '../assets/image';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

function WhyHow() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: `url(${darkMode ? WhyHowImg : whyWhite})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay (important for readability) */}
      <div
        className={`absolute inset-0 ${
          darkMode
            ? 'bg-black/40 backdrop-blur-sm'
            : 'bg-white/60 backdrop-blur-[10px]'
        }`}
      />

      {/* Content */}
      <div className="relative z-10 pt-16 px-4 sm:px-8 md:px-16 lg:px-24">
        <WhyChooseUplify />
        <HowUplifyWorks />

        {/* Optional fade spacer animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="h-8"
        />
      </div>
    </section>
  );
}
export default WhyHow;