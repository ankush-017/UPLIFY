import { withTheme } from "@emotion/react";
import { motion } from "framer-motion";
import {
    Briefcase,
    ClipboardList,
    FileCheck,
    CalendarCheck,
    BarChart4,
    Users,
} from "lucide-react";
import { useSelector } from "react-redux";

const features = [
    {
        icon: <Briefcase className="w-10 h-10 text-white" />,
        title: "Post Internships",
        description:
            "Easily post openings and reach a wide network of students actively looking for opportunities.",
        bgColor: "from-blue-500 to-purple-500",
    },
    {
        icon: <ClipboardList className="w-10 h-10 text-white" />,
        title: "Track Applications",
        description:
            "View and manage all candidate applications with smart filters and real-time updates.",
        bgColor: "from-pink-500 to-red-500",
    },
    {
        icon: <FileCheck className="w-10 h-10 text-white" />,
        title: "Resume Verification",
        description:
            "Automatically detect resume quality and inconsistencies, saving your time in screening.",
        bgColor: "from-green-500 to-teal-500",
    },
    {
        icon: <CalendarCheck className="w-10 h-10 text-white" />,
        title: "Interview Scheduling",
        description:
            "Coordinate and conduct interviews directly from the dashboard—no external tools needed.",
        bgColor: "from-yellow-500 to-orange-500",
    },
    {
        icon: <ClipboardList className="w-10 h-10 text-white" />,
        title: "Internship Management",
        description:
            "Easily post internships, manage listings, and review applicants from a centralized dashboard.",
        bgColor: "from-purple-600 to-fuchsia-500",

    },
    {
        icon: <Users className="w-10 h-10 text-white" />,
        title: "Curated Student Pool",
        description:
            "Access a verified pool of top students with skills matched to your company needs.",
        bgColor: "from-cyan-500 to-sky-500",
    },
];

const FeaturesSection = () => {

    const darkMode = useSelector((state) => state.theme.darkMode);

    return (
        <section className={`py-16 pb-24 ${darkMode?"bg-gray-900":"bg-white"}`}>
            <div className="max-w-7xl mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`text-4xl font-bold mb-4 ${darkMode?"text-gray-100":"text-gray-900"}`}
                >
                    Why Companies Choose <span className="text-blue-600">Uplify</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className={`${darkMode?"text-gray-400":"text-gray-600"} text-lg mb-12 `}
                >
                    Transform how you connect with student talent using smart, intuitive, and powerful hiring tools.
                </motion.p>

                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className={`rounded-3xl p-6 backdrop-blur-md border-[2px] ${darkMode? "border-gray-100 bg-white/10" :"border-gray-600 bg-white/70" } shadow-xl  hover:-translate-y-1 hover:shadow-2xl transition duration-300 ease-in-out`}
                        >
                            <div
                                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.bgColor} flex items-center justify-center mb-5 mx-auto`}
                            >
                                {feature.icon}
                            </div>
                            <h3 className={`text-xl font-semibold ${darkMode?"text-gray-200":"text-gray-800"} mb-2`}>{feature.title}</h3>
                            <p className={`${darkMode?"text-gray-400":"text-gray-600"} text-sm`}>{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;