import { motion } from 'framer-motion';
import { Target, ShieldCheck, Brain, FileCheck, CircleArrowRight} from 'lucide-react';
import { Link } from 'react-router-dom';
import {toggleTheme} from '../Store/Slice/ThemeSlice.js'
import { useDispatch, useSelector } from 'react-redux';

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

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <section className={`${darkMode?"bg-gray-950":"bg-gray-50" } py-10 px-6`}>
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`text-3xl md:text-4xl font-bold ${darkMode?"text-gray-100":"text-gray-900"} mb-4`}
        >
          Why Students & Companies <span className="text-blue-600">Love Uplify</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className={`${darkMode?"text-gray-400":"text-gray-600"} mb-12 max-w-2xl mx-auto`}
        >
          We’re more than just listings — we empower students to grow and help companies find talent that fits.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {benefits.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true }}
              className={`p-6 border ${darkMode?"border-gray-700":"border-gray-200"} rounded-lg shadow-sm hover:shadow-md transition`}
            >
              <div className={`bg-blue-100 w-fit p-3 rounded-full mb-4`}>
                {item.icon}
              </div>
              <h3 className={`text-lg font-semibold ${darkMode?"text-gray-100":"text-gray-800"} mb-1`}>{item.title}</h3>
              <p className={`${darkMode?"text-gray-300":"text-gray-600"} text-sm`}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <Link
            to="/about"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            <span className="font-semibold">View More Uplify</span>
            <CircleArrowRight/>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyChooseUplify;