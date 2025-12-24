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
    desc: 'Apply with confidence and earn verified certificates for your achievements.',
  },
];

const container = {
  visible: { transition: { staggerChildren: 0.18 } },
};

const card = {
  hidden: { opacity: 0, y: 45 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

function HowUplifyWorks() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <section
      className={`relative py-16 px-6 overflow-hidden ${
        darkMode
          ? 'bg-gradient-to-br from-[#020617] via-[#020617] to-[#064e3b]'
          : 'bg-gradient-to-br from-white via-green-50 to-yellow-50'
      }`}
    >
      {/* FULL BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        {/* <div className="absolute -top-40 left-1/4 w-[520px] h-[520px] bg-yellow-400/40 rounded-full blur-[140px]" /> */}
        <div className="absolute top-1/3 right-1/4 w-[520px] h-[520px] bg-green-500/40 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 w-[520px] h-[520px] bg-emerald-400/30 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2
            className={`text-4xl md:text-5xl font-bold tracking-tight ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            How <span className="text-emerald-600">Uplify</span> Helps You Grow
          </h2>

          <p
            className={`mt-4 text-lg ${
              darkMode ? 'text-gray-200' : 'text-gray-800'
            }`}
          >
            A simple, guided journey to build skills, apply confidently,
            and grow your career with trusted companies.
          </p>

          {/* Divider */}
          <div className="mt-10 flex justify-center items-center gap-3">
            <span className="h-[2px] w-32 bg-gradient-to-r from-transparent via-emerald-600 to-transparent" />
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            <span className="h-[2px] w-32 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
          </div>
        </motion.div>

        {/* STEPS */}
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
                whileHover={{ y: -10 }}
                className="relative group rounded-3xl p-[2px]"
              >
                {/* Gradient border */}
                <div
                  className="absolute inset-0 rounded-3xl blur-md opacity-60
                             bg-gradient-to-br from-yellow-400 to-green-500
                             group-hover:opacity-100 transition"
                />

                {/* Card */}
                <div
                  className={`relative h-full rounded-3xl p-8 backdrop-blur-xl
                    ${
                      darkMode
                        ? 'bg-black/70 border border-white/10 text-white'
                        : 'bg-white/90 border border-gray-200 shadow-2xl'
                    }`}
                >
                  {/* Step number */}
                  <span className="absolute -top-4 -right-4 w-10 h-10 rounded-full
                                   bg-gradient-to-br from-yellow-400 to-green-500
                                   text-gray-900 text-sm flex items-center justify-center
                                   font-bold shadow-lg">
                    {idx + 1}
                  </span>

                  {/* Icon */}
                  <div
                    className="inline-flex p-4 rounded-2xl mb-6
                               bg-gradient-to-br from-yellow-400 to-green-500
                               text-gray-900 shadow-lg"
                  >
                    <Icon size={28} />
                  </div>

                  <h3 className="text-xl font-semibold">
                    {step.title}
                  </h3>

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
          className="mt-16 flex justify-center"
        >
          <Link
            to="/about"
            className="group relative flex items-center gap-3 px-10 py-4 rounded-full
                       bg-gradient-to-r from-yellow-400 to-green-500
                       text-gray-900 font-semibold shadow-2xl overflow-hidden"
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

export default HowUplifyWorks