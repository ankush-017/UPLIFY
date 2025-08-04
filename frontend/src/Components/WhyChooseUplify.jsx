import { motion } from 'framer-motion';
import { Target, ShieldCheck, Brain, FileCheck } from 'lucide-react';
import { useSelector } from 'react-redux';
import { WhySide } from '../assets/image.js';

const benefits = [
  {
    title: 'Tailored Internships',
    desc: 'Find roles suited to your skills, interests, and goals — not just random listings.',
    icon: <Target className="text-blue-600" size={28} />,
  },
  {
    title: 'Verified Companies',
    desc: 'Every company on Uplify is manually reviewed to ensure safety and authenticity.',
    icon: <ShieldCheck className="text-blue-600" size={28} />,
  },
  {
    title: 'Skill-Driven Applications',
    desc: 'Stand out based on what you know, not just what’s written on your resume.',
    icon: <Brain className="text-blue-600" size={28} />,
  },
  {
    title: 'Certificate Transparency',
    desc: 'Companies issue certificates directly. Uplify helps with easy verification.',
    icon: <FileCheck className="text-blue-600" size={28} />,
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

function WhyChooseUplify() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <section className="relative py-16 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent backdrop-blur-sm z-0"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl md:text-5xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-200'}`}>
            Why Students & Companies <span className="text-blue-500">Love Uplify</span>?
          </h2>
          <p className="mt-4 text-lg md:text-xl font-medium text-gray-300 max-w-3xl mx-auto">
            We're more than just listings — we empower students to grow and help companies find talent that fits.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 z-10">
          {benefits.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true }}
              className={`relative p-6 rounded-2xl  shadow-xl transition duration-300
                ${darkMode ? 'bg-black/30 border-blue-500 border-2' : 'bg-white border-blue-700 border-[3px] '}`}
            >
              {/* Glowing background pulse */}
              <div
                className="absolute inset-0 rounded-2xl blur-2xl opacity-30 group-hover:opacity-60 transition"
                style={{
                  background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
                }}
              ></div>

              <div className="relative z-10">
                <div className={`${darkMode ? 'bg-blue-200' : 'bg-blue-100'} p-3 rounded-full inline-flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUplify;