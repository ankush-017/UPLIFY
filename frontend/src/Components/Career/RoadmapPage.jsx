import { Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BookOpen, RefreshCw, ChevronRight, GraduationCap } from 'lucide-react';
import { useSelector } from 'react-redux';

function RoadmapPage({ role = "Frontend Developer" }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState([]);

  const prompt = `
    Give me a step-by-step tech stack name roadmap to become a ${role}. 
    Return it strictly as a pure JSON array of objects. 
    Each object should contain: 
    - "step" (number), 
    - "title" (string), 
    - "description" (string), 
    - "link" (string)
    No explanation or extra text.
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
      console.error(err);
      setError(err);
      setResponse([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGemini();
  }, [role]);

  return (
    <div className={`min-h-screen px-6 py-16 transition-colors duration-500 ${
      darkMode ? "bg-[#050505]" : "bg-[#fafafa]"
    }`}>
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <header className="text-center mb-20">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6 border ${
            darkMode ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-emerald-50 border-emerald-200 text-emerald-700"
          }`}>
            <GraduationCap size={14} /> Path to Mastery
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-black tracking-tight mb-6 ${
            darkMode ? "text-white" : "text-slate-900"
          }`}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-yellow-400">
              {role}
            </span>
            <span className="block mt-2">Learning Path</span>
          </h1>
          
          <p className={`text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}>
            The ultimate professional curriculum designed to take you from fundamentals to industry-standard expertise.
          </p>
        </header>

        {/* --- CONTENT SECTION --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className={`mt-8 font-bold tracking-widest uppercase text-xs ${darkMode ? "text-emerald-500" : "text-emerald-600"}`}>
              Generating Intelligence...
            </p>
          </div>
        ) : error ? (
          <div className={`p-8 rounded-3xl border text-center ${
            darkMode ? "bg-red-500/5 border-red-500/20" : "bg-red-50 border-red-200"
          }`}>
            <p className="text-red-500 font-bold mb-4">Mastery path generation failed.</p>
            <button
              onClick={fetchGemini}
              className="px-6 py-2 bg-slate-900 text-white rounded-full font-bold hover:bg-emerald-500 transition-all flex items-center gap-2 mx-auto"
            >
              <RefreshCw size={16} /> Try Again
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {response.map((item, index) => (
              <div
                key={item.step}
                className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-2 ${
                  darkMode 
                    ? "bg-[#0A0A0A] border-white/5 hover:border-emerald-500/30" 
                    : "bg-white border-slate-200 hover:shadow-2xl hover:shadow-emerald-100 hover:border-emerald-300"
                }`}
              >
                {/* Step Indicator */}
                <div className={`absolute top-6 right-8 text-4xl font-black opacity-10 transition-opacity group-hover:opacity-30 ${
                  darkMode ? "text-yellow-500" : "text-emerald-900"
                }`}>
                  0{item.step}
                </div>

                <div className={`flex items-center gap-2 mb-6 font-bold text-[10px] tracking-[0.2em] uppercase ${
                  darkMode ? "text-emerald-500" : "text-emerald-600"
                }`}>
                  <BookOpen size={14} strokeWidth={3} /> Milestone
                </div>

                <h2 className={`text-2xl font-bold mb-4 leading-tight ${
                  darkMode ? "text-white group-hover:text-yellow-400" : "text-slate-900 group-hover:text-emerald-700"
                }`}>
                  {item.title}
                </h2>

                <p className={`text-sm leading-relaxed mb-8 h-20 line-clamp-3 ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}>
                  {item.description}
                </p>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 font-bold text-xs uppercase tracking-widest transition-all ${
                    darkMode 
                      ? "text-yellow-500 hover:text-yellow-400" 
                      : "text-emerald-600 hover:text-emerald-800"
                  }`}
                >
                  Explore Module <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
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