import { motion } from 'framer-motion';
import { Rocket, GraduationCap, FileText, BadgeCheck } from 'lucide-react';
import {toggleTheme} from '../Store/Slice/ThemeSlice.js'
import { useDispatch, useSelector } from 'react-redux';

const steps = [
  {
    title: 'Browse Internships',
    icon: <Rocket className="text-blue-600" size={26} />,
    desc: 'Explore internships posted by verified companies across different industries.',
  },
  {
    title: 'Upskill with Courses',
    icon: <GraduationCap className="text-blue-600" size={26} />,
    desc: 'Learn with hand-picked affiliate courses to improve your knowledge.',
  },
  {
    title: 'Build Your Resume',
    icon: <FileText className="text-blue-600" size={26} />,
    desc: 'Use Uplify’s built-in resume builder to create a job-ready profile.',
  },
  {
    title: 'Apply & Earn Certificate',
    icon: <BadgeCheck className="text-blue-600" size={26} />,
    desc: 'Apply to internships and receive certificates from the companies after completion.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
  }),
};

function HowUplifyWorks() {

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <section className={`${darkMode?"bg-gray-900":"bg-gray-30"} py-10 px-6`}>
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`text-3xl md:text-4xl font-bold ${darkMode?"text-gray-200":"text-gray-900"} mb-4`}
        >
          How <span className='text-blue-700'>Uplify</span> Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className={`${darkMode?"text-gray-400":"text-gray-600"} mb-8`}
        >
          Everything you need to grow your career — in one place.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center text-center px-4"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={idx}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="bg-blue-100 p-3 rounded-full mb-4">{step.icon}</div>
              <h3 className={`text-lg font-semibold mb-2 ${darkMode?"text-gray-200":"text-gray-800"}`}>{step.title}</h3>
              <p className={`${darkMode?"text-gray-400":"text-gray-600"} text-sm`}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowUplifyWorks;