import { motion } from 'framer-motion';
import { Target, ShieldCheck, Brain, FileCheck } from 'lucide-react';
import { useSelector } from 'react-redux';

const benefits = [
  {
    title: 'Personalized Internships',
    tag: 'Fit Your Goals',
    desc: 'Access internships curated to match your skills, passions, and career aspirations for maximum impact.',
    icon: Target,
  },
  {
    title: 'Trusted Companies',
    tag: 'Verified & Reliable',
    desc: 'All companies are carefully vetted to ensure you engage with reputable employers and meaningful opportunities.',
    icon: ShieldCheck,
  },
  {
    title: 'Skill-Based Shortlisting',
    tag: 'Showcase Your Talent',
    desc: 'Let your abilities speak! Get selected based on real skills, not just CVs or keywords.',
    icon: Brain,
  },
  {
    title: 'Instant Certificate Verification',
    tag: 'Proof That Counts',
    desc: 'Receive verified certificates from companies instantly, boosting credibility and career growth.',
    icon: FileCheck,
  },
];

const container = {
  visible: { transition: { staggerChildren: 0.2 } },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

function WhyChooseUplify() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <section className="relative py-2 pt-10 px-6 md:px-12 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2
            className={`text-4xl md:text-5xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'
              }`}
          >
            Why <span className="text-blue-500">Students & Companies</span> Love Uplify
          </h2>
          <p
            className={`mt-5 text-lg max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
          >
            Uplify connects talented students with the right opportunities while ensuring trust,
            transparency, and skill-based recognition at every step.
          </p>

          {/* Divider */}
          <div className="mt-10 flex justify-center items-center gap-3">
            <span className="h-[2px] w-32 bg-gradient-to-r from-transparent to-blue-500" />
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="h-[2px] w-32 bg-gradient-to-l from-transparent to-blue-500" />
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {benefits.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                variants={card}
                whileHover={{ y: -10, scale: 1.03 }}
                className="group relative rounded-3xl p-[2px]"
              >
                {/* Glowing border */}
                <div
                  className={`absolute inset-0 rounded-3xl blur-md transition-opacity duration-300
                  ${darkMode
                      ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80'
                      : 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-60'
                    } group-hover:opacity-100`}
                />

                {/* Card */}
                <div
                  className={`relative h-full rounded-md p-8 backdrop-blur-xl transition-all
                  ${darkMode
                      ? 'bg-black/65 border border-white/10'
                      : 'bg-white/90 border border-gray-200 shadow-xl shadow-blue-500/10'
                    }`}
                >
                  {/* Top accent line */}
                  <div className="absolute inset-x-0 top-0 h-1 overflow-hidden rounded-t-3xl">
                    <div
                      className="h-full w-0 group-hover:w-full transition-all duration-300
                      bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className={`inline-flex p-4 rounded-xl mb-5
                      ${darkMode
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-blue-100 text-blue-600'
                        }`}
                    >
                      <Icon size={28} />
                    </motion.div>

                    <h3
                      className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'
                        }`}
                    >
                      {item.title}
                    </h3>

                    <p className="text-xs mt-1 mb-3 text-blue-500 font-medium uppercase tracking-wide">
                      {item.tag}
                    </p>

                    <p
                      className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
export default WhyChooseUplify;