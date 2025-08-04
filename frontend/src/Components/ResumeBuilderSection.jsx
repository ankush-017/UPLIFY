import { motion } from 'framer-motion';
import { FileText, Download, LayoutTemplate, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import {Resumebuilder} from '../assets/image';
import { useDispatch, useSelector } from 'react-redux';

const features = [
  {
    title: 'Modern Templates',
    icon: <LayoutTemplate className="text-blue-600" size={24} />,
    desc: 'Clean, professional designs optimized for hiring managers.',
  },
  {
    title: 'ATS-Friendly',
    icon: <FileText className="text-blue-600" size={24} />,
    desc: 'Easily pass resume screeners with our structured format.',
  },
  {
    title: 'Privacy First',
    icon: <ShieldCheck className="text-blue-600" size={24} />,
    desc: 'Your data is never shared. You control what gets saved.',
  },
  {
    title: 'Instant Export',
    icon: <Download className="text-blue-600" size={24} />,
    desc: 'Download your resume as a high-quality PDF in one click.',
  },
];

function ResumeBuilderSection() {

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <section className={`${darkMode?"bg-gray-900":"bg-gray-0"} py-16 px-6`}>
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Left - Content */}
        <div className="flex-1">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-4xl font-bold ${darkMode?"text-gray-200":"text-gray-900"} mb-4`}
          >
            Create Your Resume in Minutes
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className={`${darkMode?"text-gray-300":"text-gray-600"} mb-6`}
          >
            Build a job-ready resume with Uplify’s smart builder — no design skills required.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {features.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <div className="bg-blue-100 p-2 rounded-md">{item.icon}</div>
                <div>
                  <h4 className={`text-md font-semibold ${darkMode?"text-gray-200":"text-gray-800"}`}>{item.title}</h4>
                  <p className={`text-sm ${darkMode?"text-gray-400":"text-gray-600"}`}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link
              to="/user/resume-builder"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Build Resume Now
            </Link>
          </motion.div>
        </div>

        {/* Right - Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 w-full max-w-md mx-auto"
        >
          <img
            src={Resumebuilder}
            alt="Resume Preview"
            className="rounded-lg shadow-md"
          />
        </motion.div>
      </div>
    </section>
  );
}
export default ResumeBuilderSection;