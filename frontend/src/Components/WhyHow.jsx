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
      <div className="relative z-10">
        <WhyChooseUplify />
        <HowUplifyWorks />
      </div>
    </section>
  );
}
export default WhyHow;