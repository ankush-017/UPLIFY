import { motion } from "framer-motion";
import { Search, BookOpen, FileText, CheckCircle, CircleArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const steps = [
  {
    title: "Discover Verified Opportunities",
    desc: "Browse internships & jobs handpicked for your skills and career goals.",
    icon: Search,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Upskill Smartly",
    desc: "Access curated courses, projects and resources to boost your employability.",
    icon: BookOpen,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Build a Standout Resume",
    desc: "Craft an ATS-friendly resume that highlights your true potential.",
    icon: FileText,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Apply & Get Certified",
    desc: "Apply with confidence and earn verified certificates for achievements.",
    icon: CheckCircle,
    color: "from-orange-400 to-yellow-500",
  },
];

export default function HowUplifyWorks() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <section
      className={`relative py-14 pb-10 overflow-hidden ${darkMode
          ? "bg-[#0b0f16]"
          : "bg-gradient-to-br from-white via-green-50 to-yellow-50"
        }`}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-1/3 w-[420px] h-[420px] bg-emerald-500/30 blur-[160px]" />
        <div className="absolute right-1/4 bottom-0 w-[420px] h-[420px] bg-yellow-400/30 blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-4xl md:text-5xl font-bold ${darkMode ? "text-white" : "text-gray-900"
            }`}
        >
          How <span className="text-emerald-500">Uplify</span> Helps You Grow
        </motion.h2>

        <p
          className={`mt-4 max-w-3xl mx-auto text-lg ${darkMode ? "text-gray-300" : "text-gray-600"
            }`}
        >
          A simple, guided journey to build skills, apply confidently,
          and grow your career with trusted companies.
        </p>

        {/* Divider */}
        <div className="mt-10 flex justify-center items-center gap-3">
          <span className="w-28 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="w-28 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
        </div>

        {/* Steps */}
        <div className="relative mt-20 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-emerald-400 via-yellow-400" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Icon bubble */}
                <div
                  className={`relative mx-auto w-20 h-20 rounded-2xl flex items-center justify-center
                  bg-gradient-to-br ${step.color} shadow-xl`}
                >
                  <Icon className="text-white" size={34} />

                  {/* Step number */}
                  <span
                    className={`absolute -top-2 -right-2 w-8 h-8 rounded-full
                    ${darkMode ? "bg-black text-white" : "bg-white text-gray-900"}
                    text-sm font-bold flex items-center justify-center shadow`}
                  >
                    {index + 1}
                  </span>
                </div>

                <h3
                  className={`mt-6 text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"
                    }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                >
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <Link
            to="/about"
            className="group relative flex items-center gap-3 px-10 py-4 rounded-full
                       bg-gradient-to-r from-yellow-400 to-green-500
                       text-gray-900 font-semibold shadow-2xl"
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