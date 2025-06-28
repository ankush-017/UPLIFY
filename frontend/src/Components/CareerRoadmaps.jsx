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
import bgImage from "../assets/career-bg.jpg"; // your background image

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
      className={`relative overflow-hidden py-7 px-6 md:px-20 bg-cover bg-center`}
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Dim overlay + Glass blur */}
      {/* <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0" /> */}

      {/* Content Container with Glass Effect */}
      <div
        className={`relative z-10 backdrop-blur-md ${darkMode ? "bg-black/50" : "bg-white/5"} border flex justify-center items-center flex-col border-white/20 rounded-3xl p-8 md:p-8 shadow-2xl`}
      >
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center w-[300px] md:w-[380px] mb-10 px-6 py-3 rounded-xl shadow-lg backdrop-blur-md border-blue-700 border-2 
  bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white"
        >
          <span className="text-blue-400 drop-shadow-md">Career</span>{" "}
          <span className="text-white">Roadmaps</span>
        </motion.h2>


        <div className="flex flex-col lg:flex-row items-center gap-12">
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
              className="max-w-md w-full object-contain rounded-2xl shadow-xl border border-white/20"
            />
          </motion.div>

          {/* Right Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-wrap gap-5 justify-center items-center"
          >
            {roadmapData.map((roadmap, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`group relative px-5 py-3 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden
                  ${darkMode ? "bg-black/80 border-gray-200 text-gray-200" : "bg-white/80 border-gray-200 text-gray-900"}`}
              >
                {/* Glowing border effect */}
                <div className="absolute inset-0 z-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500 group-hover:blur-md transition-all duration-300" />
                <div className="relative z-10 flex w-[250px] items-center gap-3">
                  <div className="p-3 bg-gradient-to-tr from-blue-500 to-purple-600 text-white rounded-full shadow-lg">
                    {roadmap.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{roadmap.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}