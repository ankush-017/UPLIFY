import { Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BookOpen, RefreshCw } from 'lucide-react';
import { useSelector } from 'react-redux';

function Frontend() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prompt, setPrompt] = useState(`
Give me a step-by-step tech stack name roadmap to become a Frontend Developer. Return it strictly as a pure JSON array of objects. 
Each object should contain: 
- "step" (number), 
- "title" (string), 
- "description" (string), 
- "link" (string)
No explanation or extra text.
  `);
  const [response, setResponse] = useState([]);

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
  }, []);

  return (
    <div className={`min-h-screen px-4 py-12 transition-all duration-300 ${darkMode ? "bg-black" : "bg-gradient-to-br from-white via-blue-50 to-blue-100"}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-4xl md:text-5xl font-extrabold text-center mb-4 ${darkMode ? "text-blue-500" : "text-blue-700"}`}>
          <span className={`${darkMode ? "text-yellow-500" : "text-yellow-600"}`}>Frontend Developer</span> Roadmap
        </h1>
        <p className={`text-center mb-12 text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          A carefully crafted step-by-step journey to becoming a proficient Frontend Developer. Explore topics, master skills, and access the best resources.
        </p>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <p className="text-lg text-gray-500 text-center mb-4">Preparing Roadmap for Frontend Developer...</p>
            <Spin size="large" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center text-center space-y-4 min-h-[200px]">
            <p className={`text-xl font-semibold ${darkMode ? "text-red-400" : "text-red-600"}`}>
              ⚠️ Something went wrong!
            </p>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              The server encountered an error while generating the roadmap. Please wait a few seconds or try again.
            </p>
            <button
              onClick={fetchGemini}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {response.map((item) => (
              <div
                key={item.step}
                className={`rounded-2xl p-6 border shadow-md transition duration-300 hover:shadow-xl 
                  ${darkMode ? "bg-gray-900 border-blue-900" : "bg-white border-blue-200"}`}
              >
                <div className={`flex items-center gap-2 mb-2 ${darkMode ? "text-blue-300" : "text-blue-600"} text-sm font-medium`}>
                  <BookOpen className="w-4 h-4" /> Step {item.step}
                </div>
                <h2 className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
                  {item.title}
                </h2>
                <p className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {item.description}
                </p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full transition"
                >
                  Read Resource
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Frontend;
