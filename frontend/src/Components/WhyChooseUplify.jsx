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
    desc: 'Let your abilities speak. Get selected based on real skills, not just resumes or keywords.',
    icon: Brain,
  },
  {
    title: 'Instant Certificate Verification',
    tag: 'Proof That Counts',
    desc: 'Receive verified certificates instantly from companies, boosting credibility and career growth.',
    icon: FileCheck,
  },
];

const container = {
  visible: { transition: { staggerChildren: 0.15} },
};

const card = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

function WhyChooseUplify() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <section
      className={`relative py-16 overflow-hidden ${
        darkMode
          ? 'bg-gray-950'
          : 'bg-gradient-to-br from-yellow-50 via-green-50 to-white'
      }`}
    >
      {/* Soft background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-green-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2
            className={`text-4xl md:text-5xl font-bold tracking-tight ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}
          >
            Why <span className="text-green-500">Students & Companies</span> Choose Uplify
          </h2>

          <p
            className={`mt-5 text-lg max-w-3xl mx-auto leading-relaxed ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Uplify connects talented students with the right opportunities while
            ensuring trust, transparency, and skill-based recognition.
          </p>

          {/* Divider */}
          <div className="mt-6 flex justify-center items-center gap-3">
            <span className="h-[2px] w-32 bg-gradient-to-r from-transparent via-green-400 to-transparent" />
            <span className="h-2 w-2 rounded-full bg-green-400" />
            <span className="h-[2px] w-32 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {benefits.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                variants={card}
                whileHover={{ y: -8 }}
                className="relative group rounded-3xl p-[1.5px]"
              >
                {/* Gradient border */}
                <div
                  className="absolute inset-0 rounded-3xl blur-md opacity-40
                             bg-gradient-to-br from-yellow-400 to-green-500
                             group-hover:opacity-70 transition"
                />

                {/* Card */}
                <div
                  className={`relative h-full rounded-3xl p-7 backdrop-blur-xl
                    ${
                      darkMode
                        ? 'bg-gray-900/80 border border-gray-700'
                        : 'bg-white/85 border border-gray-200 shadow-xl shadow-green-500/10'
                    }`}
                >
                  {/* Icon */}
                  <div
                    className="inline-flex p-4 rounded-2xl mb-5
                               bg-gradient-to-br from-yellow-400 to-green-500
                               text-gray-900 shadow-md"
                  >
                    <Icon size={26} />
                  </div>

                  <h3
                    className={`text-lg font-semibold ${
                      darkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs mt-1 mb-3 font-semibold uppercase tracking-wide text-green-500">
                    {item.tag}
                  </p>

                  <p
                    className={`text-sm leading-relaxed ${
                      darkMode ? 'text-gray-400' : 'text-gray-700'
                    }`}
                  >
                    {item.desc}
                  </p>
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