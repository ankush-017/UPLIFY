import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Code2,
  BrainCircuit,
  Smartphone,
  Palette,
  ShieldCheck,
  DatabaseZap,
  Cpu,
} from "lucide-react";
import { CR } from "../assets/image.js";

const roadmapData = [
  { title: "Frontend Developer", icon: <Code2 size={26} /> },
  { title: "Backend Developer", icon: <DatabaseZap size={26} /> },
  { title: "Full Stack Developer", icon: <Cpu size={26} /> },
  { title: "Android Developer", icon: <Smartphone size={26} /> },
  { title: "AI/ML Engineer", icon: <BrainCircuit size={26} /> },
  { title: "Data Scientist", icon: <DatabaseZap size={26} /> },
  { title: "UI/UX Designer", icon: <Palette size={26} /> },
  { title: "Cybersecurity Analyst", icon: <ShieldCheck size={26} /> },
];

export default function CareerRoadmaps() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <section
      className={`relative overflow-hidden py-10 px-6 md:px-20 ${darkMode
          ? "bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900"
        }`}
    >
      {/* Lighting Effects */}
      <div className="absolute top-10 left-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 blur-3xl rounded-full z-0"></div>

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-14 relative z-10"
      >
        <span className="text-blue-600">Career</span> Roadmaps
      </motion.h2>

      <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <img
            src={CR}
            alt="Career Roadmap"
            className="max-w-md w-full object-contain rounded-2xl shadow-2xl border border-white/20"
          />
        </motion.div>

        {/* Right Cards */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-1/2 grid sm:grid-cols-2 gap-6"
        >
          {roadmapData.map((roadmap, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`group relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden
                ${darkMode
                  ? "bg-white/5 border-white/10 text-white"
                  : "bg-white border-gray-200 text-gray-900"
                }`}
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 z-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500 group-hover:blur-md transition-all duration-300" />
              <div className="relative z-10 flex items-center gap-3">
                <div className="p-3 bg-gradient-to-tr from-blue-500 to-purple-600 text-white rounded-full shadow-lg">
                  {roadmap.icon}
                </div>
                <h3 className="text-lg font-semibold">{roadmap.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}