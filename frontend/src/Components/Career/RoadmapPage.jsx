import { Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BookOpen, RefreshCw, ChevronRight, GraduationCap, Code2, Briefcase, Zap } from 'lucide-react';
import { useSelector } from 'react-redux';

function RoadmapPage({ role, experience, skills }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState([]);

  // Refined Prompt for better logic
  const prompt = `
  Act as a Senior Career Architect. Create a personalized tech roadmap.
  Target: ${role}
  Current Level: ${experience}
  Existing Skills: ${skills}

  Rules:
  1. Skip basic skills the user already has.
  2. Focus on the Delta (the gap) between current skills and ${role} requirements.
  3. Include architectural patterns and soft skills relevant to ${experience} level.
  
  Return ONLY a JSON array. No text before or after.
  Structure: [{"step": 1, "title": "...", "description": "...", "link": "..."}]
  `;

  const fetchGemini = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/gemini`, { prompt });
      let cleaned = res.data.response;
      if (cleaned.startsWith("```json")) {
        cleaned = cleaned.replace(/```json\s*|\s*```/g, '');
      }
      const parsed = JSON.parse(cleaned);
      setResponse(parsed);
    } catch (err) {
      setError(err);
      setResponse([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role) fetchGemini();
  }, [role]);

  return (
    <div className={`min-h-screen px-6 py-12 transition-colors duration-500 ${
      darkMode ? "bg-[#050505] text-white" : "bg-[#fafafa] text-slate-900"
    }`}>
      <div className="max-w-6xl mx-auto">
        
        {/* --- HERO SECTION --- */}
        <header className="text-center mb-7">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-2 border ${
            darkMode ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-emerald-50 border-emerald-200 text-emerald-700"
          }`}>
            <Zap size={14} className="fill-current" /> Personalized Mastery
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2">
            <span className="text-transparent uppercase bg-clip-text bg-gradient-to-r from-emerald-400 via-yellow-400 to-emerald-500">
              {role}
            </span>
          </h1>
          <p className={`text-lg font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Bridge the gap from your current profile to industry excellence.
          </p>
        </header>

        {/* --- USER PROFILE SUMMARY (NEW) --- */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 p-1 rounded-[2.5rem] border ${
          darkMode ? "bg-white/5 border-white/10" : "bg-slate-100 border-slate-200"
        }`}>
          <div className={`flex items-center gap-5 px-6 py-3 rounded-[2.2rem] ${darkMode ? "bg-[#0A0A0A]" : "bg-white"}`}>
            <div className="p-4 bg-yellow-400/10 rounded-2xl">
              <Briefcase className="text-yellow-500" size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Current Experience</p>
              <h3 className="text-xl font-bold">{experience}</h3>
            </div>
          </div>

          <div className={`flex items-center gap-5 px-6 py-3 rounded-[2.2rem] ${darkMode ? "bg-[#0A0A0A]" : "bg-white"}`}>
            <div className="p-4 bg-emerald-400/10 rounded-2xl">
              <Code2 className="text-emerald-500" size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Skill Baseline</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {skills.split(',').map((skill, i) => (
                  <span key={i} className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                    darkMode ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" : "bg-emerald-50 border-emerald-200 text-emerald-600"
                  }`}>
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- CONTENT SECTION --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-yellow-400 rounded-full animate-pulse blur-sm"></div>
              </div>
            </div>
            <p className="mt-8 font-black tracking-[0.3em] uppercase text-xs animate-pulse text-emerald-500">
              Calculating Growth Trajectory...
            </p>
          </div>
        ) : error ? (
          <div className={`p-12 rounded-[3rem] border-2 border-dashed text-center ${
            darkMode ? "bg-red-500/5 border-red-500/20" : "bg-red-50 border-red-200"
          }`}>
            <p className="text-red-500 font-bold mb-6 text-lg">We hit a roadblock in the generation.</p>
            <button
              onClick={fetchGemini}
              className="px-8 py-3 bg-emerald-500 text-white rounded-full font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 mx-auto"
            >
              <RefreshCw size={18} /> Rebuild Roadmap
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {response.map((item) => (
              <div
                key={item.step}
                className={`group relative p-8 rounded-[2.8rem] border transition-all duration-500 hover:-translate-y-3 ${
                  darkMode
                    ? "bg-[#0D0D0D] border-white/5 hover:border-yellow-500/40 shadow-2xl shadow-black"
                    : "bg-white border-slate-200 hover:shadow-2xl hover:shadow-emerald-200/50 hover:border-emerald-300"
                }`}
              >
                {/* Step Chip */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-6 text-xl font-black transition-all group-hover:scale-110 ${
                  darkMode ? "bg-yellow-500 text-black" : "bg-emerald-600 text-white"
                }`}>
                  {item.step}
                </div>

                <div className={`flex items-center gap-2 mb-4 font-bold text-[10px] tracking-[0.2em] uppercase ${
                  darkMode ? "text-emerald-400" : "text-emerald-600"
                }`}>
                  <BookOpen size={14} strokeWidth={3} /> Learning Module
                </div>

                <h2 className={`text-2xl font-bold mb-4 leading-tight ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}>
                  {item.title}
                </h2>

                <p className={`text-sm leading-relaxed mb-10 h-24 line-clamp-4 ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}>
                  {item.description}
                </p>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${
                    darkMode
                      ? "bg-white/5 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                      : "bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white"
                  }`}
                >
                  Start Learning <ChevronRight size={16} />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RoadmapPage;