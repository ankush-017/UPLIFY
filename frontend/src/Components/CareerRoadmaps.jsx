import { useSelector } from "react-redux";
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
  {
    title: "Frontend Developer",
    icon: <Code2 size={28} />,
    steps: ["HTML", "CSS", "JavaScript", "React", "TailwindCSS"],
  },
  {
    title: "Backend Developer",
    icon: <DatabaseZap size={28} />,
    steps: ["Node.js", "Express", "MongoDB", "REST APIs", "Authentication"],
  },
  {
    title: "Full Stack Developer",
    icon: <Cpu size={28} />,
    steps: ["Frontend + Backend", "Deployment", "CI/CD", "Testing"],
  },
  {
    title: "Android Developer",
    icon: <Smartphone size={28} />,
    steps: ["Kotlin", "Jetpack Compose", "Firebase", "Material Design"],
  },
  {
    title: "AI/ML Engineer",
    icon: <BrainCircuit size={28} />,
    steps: ["Python", "NumPy", "Pandas", "Scikit-learn", "Deep Learning"],
  },
  {
    title: "Data Scientist",
    icon: <DatabaseZap size={28} />,
    steps: ["Statistics", "Python", "EDA", "Machine Learning", "Visualization"],
  },
  {
    title: "UI/UX Designer",
    icon: <Palette size={28} />,
    steps: ["Figma", "User Research", "Wireframing", "Prototyping"],
  },
  {
    title: "Cybersecurity Analyst",
    icon: <ShieldCheck size={28} />,
    steps: ["Networking", "Linux", "OWASP", "Pen Testing", "SOC Tools"],
  },
];

export default function CareerRoadmaps() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <section className={`${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900"} py-10 px-6 md:px-20`}>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12"><span className="text-blue-600">Career</span> Roadmaps</h2>

      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Left Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={CR}
            alt="Career Roadmap Illustration"
            className="max-w-md w-full object-contain rounded-xl shadow-lg"
          />
        </div>

        {/* Right Roadmap Cards */}
        <div className="w-full md:w-1/2 grid gap-6 sm:grid-cols-2">
          {roadmapData.map((roadmap, idx) => (
            <div
              key={idx}
              className={`rounded-2xl px-6 py-2 border shadow-sm transition-all duration-300 hover:shadow-xl
              ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
            >
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-full">{roadmap.icon}</div>
                <h3 className="text-lg font-semibold">{roadmap.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}