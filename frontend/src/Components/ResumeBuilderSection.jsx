import { motion } from 'framer-motion';
import { FileText, Download, LayoutTemplate, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Resumebuilder } from '../assets/image';
import { useSelector } from 'react-redux';

const features = [
  {
    title: 'Modern Templates',
    icon: LayoutTemplate,
    desc: 'Clean, professional designs recruiters trust.',
  },
  {
    title: 'ATS-Friendly',
    icon: FileText,
    desc: 'Structured resumes that pass screening systems.',
  },
  {
    title: 'Privacy First',
    icon: ShieldCheck,
    desc: 'Your data stays private and fully under your control.',
  },
  {
    title: 'Instant Export',
    icon: Download,
    desc: 'Download a polished PDF in one click.',
  },
];

function ResumeBuilderSection() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <section
      className={`py-20 px-6 ${darkMode
          ? 'bg-gray-950'
          : 'bg-gradient-to-br from-yellow-50 via-green-50 to-white'
        }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-14">

        {/* LEFT CONTENT */}
        <div className="flex-1">

          {/* 🚀 CRAZY ANIMATED TAG */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative inline-block mb-4"
          >
            {/* Glow */}
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-2 rounded-full bg-gradient-to-r from-yellow-400 to-green-500 blur-lg opacity-70"
            />

            {/* Tag */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative px-4 py-1.5 rounded-full text-xs font-semibold
                         bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400
                         bg-[length:200%_200%] animate-gradient
                         text-gray-900 shadow-md"
            >
              🔥 Trending • Student Favorite
            </motion.div>
          </motion.div>

          {/* HEADING */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-4xl font-bold tracking-tight mb-1 ${darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}
          >
            Create Your Resume in Minutes
          </motion.h2>

          {/* SUBTEXT */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            className={`max-w-xl mb-10 text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
          >
            Build a job-ready resume with Uplify’s smart builder —
            no design skills required.
          </motion.p>

          {/* FEATURES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 mb-8">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + idx * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  {/* Icon */}
                  <div
                    className="flex items-center justify-center h-11 w-11 rounded-xl
                     bg-gradient-to-br from-yellow-400 to-green-500
                     text-gray-900 shadow-sm flex-shrink-0"
                  >
                    <Icon size={20} />
                  </div>

                  {/* Text */}
                  <div>
                    <h4
                      className={`font-medium mb-1 ${darkMode ? 'text-gray-100' : 'text-gray-900'
                        }`}
                    >
                      {item.title}
                    </h4>
                    <p
                      className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>


          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              to="/user/resume-builder"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl
                         bg-yellow-400 hover:bg-yellow-300
                         text-gray-900 font-semibold
                         shadow-md hover:shadow-lg
                         hover:scale-[1.03] transition"
            >
              Build Resume Now
            </Link>
          </motion.div>
        </div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex-1 w-full max-w-lg mx-auto relative"
        >
          <div className="absolute -inset-5 bg-gradient-to-br from-yellow-400/20 to-green-500/20 blur-3xl rounded-3xl" />

          <img
            src={Resumebuilder}
            alt="Resume Builder Preview"
            className="relative rounded-3xl shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default ResumeBuilderSection;