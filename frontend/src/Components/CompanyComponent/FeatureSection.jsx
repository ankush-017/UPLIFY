import React from "react";
import { motion } from "framer-motion";
import {
    Briefcase,
    MessageSquare,
    Zap,
    CalendarDays,
    Target,
    ShieldCheck,
    ArrowUpRight
} from "lucide-react";
import { useSelector } from "react-redux";

const features = [
    {
        icon: <Target className="w-8 h-8 text-[#002D15]" />,
        title: "AI Skill Matching",
        tag: "Automated",
        description:
            "Our proprietary engine instantly maps candidate skills against your job requirements, providing a percentage match score for every resume.",
        bgColor: "from-[#3DDC84] to-[#c7ee3f]",
    },
    {
        icon: <MessageSquare className="w-8 h-8 text-white" />,
        title: "Direct Talent Chat",
        tag: "Real-time",
        description:
            "Skip the email back-and-forth. Open a secure, instant chat line with top candidates as soon as they match your criteria.",
        bgColor: "from-slate-800 to-slate-900",
    },
    {
        icon: <CalendarDays className="w-8 h-8 text-white" />,
        title: "Smart Scheduling",
        tag: "Seamless",
        description:
            "Integrated calendar sync lets you propose interview times directly in-app. Auto-reminders ensure zero no-shows for your hiring team.",
        bgColor: "from-blue-600 to-indigo-600",
    },
    {
        icon: <Zap className="w-8 h-8 text-white" />,
        title: "Verified Pipeline",
        tag: "Security",
        description:
            "Every student profile undergoes 3-point verification (Identity, Education, and Skills) before they appear in your dashboard.",
        bgColor: "from-orange-500 to-amber-500",
    },
    {
        icon: <Briefcase className="w-8 h-8 text-white" />,
        title: "Multi-Role Posting",
        tag: "Growth",
        description:
            "Launch internship programs across multiple departments. Track separate pipelines for Tech, Design, and Management from one view.",
        bgColor: "from-purple-600 to-pink-500",
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-white" />,
        title: "Hiring Analytics",
        tag: "Insights",
        description:
            "Deep dive into your recruitment funnel. Understand time-to-hire, source quality, and diversity metrics with one click.",
        bgColor: "from-emerald-600 to-teal-500",
    },
];

const FeaturesSection = () => {
    const darkMode = useSelector((state) => state.theme.darkMode);

    return (
        <section className={`py-16 relative overflow-hidden ${darkMode ? "bg-[#020617]" : "bg-slate-50"}`}>
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className={`${darkMode?"text-[#3DDC84]":"text-[#15a757]"} font-black text-xs uppercase tracking-[0.3em] mb-4 block`}
                    >
                        The Uplify Advantage
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className={`text-4xl md:text-6xl font-black mb-6 tracking-tighter ${darkMode ? "text-white" : "text-slate-900"}`}
                    >
                        Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3DDC84] to-[#c7ee3f]">scale your team.</span>
                    </motion.h2>
                    <motion.p
                        className={`text-lg ${darkMode ? "text-slate-400" : "text-slate-600"} leading-relaxed`}
                    >
                        Stop digging through piles of resumes. Uplify combines AI-powered skill verification with direct communication tools to make hiring students 10x faster.
                    </motion.p>
                </div>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-5">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 
                                ${darkMode 
                                    ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.3)]" 
                                    : "bg-white border-slate-200 hover:shadow-2xl hover:border-transparent shadow-xl"
                                }`}
                        >
                            {/* Hover Arrow */}
                            <div className="absolute top-8 right-8 text-slate-500 group-hover:text-[#3DDC84] transition-colors">
                                <ArrowUpRight size={24} />
                            </div>

                            <div
                                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.bgColor} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}
                            >
                                {feature.icon}
                            </div>

                            <div className="flex items-center gap-3 mb-3">
                                <h3 className={`text-xl font-black tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}>
                                    {feature.title}
                                </h3>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${darkMode ? "bg-white/10 text-slate-300" : "bg-slate-100 text-slate-500"}`}>
                                    {feature.tag}
                                </span>
                            </div>

                            <p className={`text-sm leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                                {feature.description}
                            </p>

                            {/* Decorative line */}
                            <div className="mt-8 w-12 h-1 bg-gradient-to-r from-[#3DDC84] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default FeaturesSection;