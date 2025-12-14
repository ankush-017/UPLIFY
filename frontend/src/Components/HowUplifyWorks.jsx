import { motion } from 'framer-motion';
import {
  Rocket,
  GraduationCap,
  FileText,
  BadgeCheck,
  CircleArrowRight,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const steps = [
  {
    title: 'Discover Verified Opportunities',
    icon: Rocket,
    desc: 'Browse internships & jobs handpicked for your skills and career goals, from trusted companies.',
  },
  {
    title: 'Upskill Smartly',
    icon: GraduationCap,
    desc: 'Access curated courses, practical projects, and resources to boost your employability.',
  },
  {
    title: 'Build a Standout Resume',
    icon: FileText,
    desc: 'Craft an ATS-friendly resume with our tools and showcase your true potential.',
  },
  {
    title: 'Apply Confidently & Get Certified',
    icon: BadgeCheck,
    desc: 'Submit applications knowing the company is verified and earn instant certificates for your achievements.',
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const card = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

function HowUplifyWorks() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <section className="relative pt-20 pb-14 px-6 md:px-12 overflow-hidden">
      {/* Glassy Aurora background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2
            className={`text-4xl md:text-5xl font-extrabold tracking-tight ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            How <span className="text-blue-500">Uplify</span> Helps You Grow
          </h2>
          <p
            className={`mt-4 text-lg ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Step-by-step guidance to find opportunities, upskill, and get recognized by top companies.
          </p>

          {/* Divider */}
          <div className="mt-10 flex justify-center items-center gap-3">
            <span className="h-[2px] w-32 bg-gradient-to-r from-transparent to-blue-500" />
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="h-[2px] w-32 bg-gradient-to-l from-transparent to-blue-500" />
          </div>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-20"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                variants={card}
                whileHover={{ y: -10, scale: 1.03 }}
                className="group relative rounded-3xl p-[2px]"
              >
                {/* Gradient glow */}
                <div
                  className={`absolute inset-0 rounded-3xl blur-md transition-opacity duration-300
                  ${darkMode
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80'
                    : 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-60'
                  } group-hover:opacity-100`}
                />

                {/* Card */}
                <div
                  className={`relative h-full rounded-2xl p-8 backdrop-blur-xl transition-all
                  ${darkMode
                    ? 'bg-black/65 border border-white/10 text-white'
                    : 'bg-white/90 border border-gray-200 shadow-xl shadow-blue-500/10'
                  }`}
                >
                  {/* Step number */}
                  <span className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-bold shadow-lg">
                    {idx + 1}
                  </span>

                  {/* Icon with rotation when card is hovered */}
                  <motion.div
                    className="inline-flex p-4 rounded-2xl bg-blue-500/20 text-blue-400 mb-6"
                    animate={{ rotate: 0 }}
                    whileHover={{ rotate: 360, scale: 1.25 }}
                    transition={{ type: 'spring', stiffness: 250, damping: 12 }}
                  >
                    <Icon size={28} />
                  </motion.div>

                  {/* Text */}
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-14 flex justify-center"
        >
          <Link
            to="/about"
            className="group relative flex items-center gap-3 px-10 py-4 rounded-full 
            bg-gradient-to-r from-blue-600 to-cyan-500 text-white 
            font-semibold shadow-2xl overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/30 blur-xl opacity-0 group-hover:opacity-100 transition" />
            <span className="relative z-10">Explore Uplify</span>
            <CircleArrowRight className="relative z-10 group-hover:translate-x-1 transition" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default HowUplifyWorks;