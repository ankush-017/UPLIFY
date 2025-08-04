import { Spin } from 'antd';
import { ExternalLink } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { supabase } from '../../superbaseClient';
import axios from 'axios';

function JobApplicant() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiScores, setAiScores] = useState({}); // { applicantId: { score, explanation, loading } }
  const [skillsRequired, setSkillsRequired] = useState([]);
  const [scoreVisibility, setScoreVisibility] = useState({}); // NEW STATE

  // Fetch internship skills
  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase
        .from('internships')
        .select('skills')
        .eq('id', id)
        .single();

      if (error) {
        toast.error('Failed to fetch internship skills');
        console.error(error.message);
      } else {
        setSkillsRequired(data.skills ? data.skills.split(',').map(skill => skill.trim()) : []);
      }
    };

    fetchSkills();
  }, [id]);

  // Fetch applicants
  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('applyapplications')
        .select('*')
        .eq('internship_id', id);

      if (error) {
        toast.error('Error fetching applicants');
      } else {
        setApplicants(data);
      }
      setLoading(false);
    };

    fetchApplicants();
  }, [id]);

  const formatUrl = (url) => (!url ? '#' : url.startsWith('http') ? url : `https://${url}`);

  const evaluateResume = async (resumeUrl, skillsArray, applicantId) => {
    setAiScores((prev) => ({
      ...prev,
      [applicantId]: { ...prev[applicantId], loading: true },
    }));

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/gemini/evaluate-resume`, {
        resumeUrl,
        skills: skillsArray.join(', '),
      });

      const result = res.data.result;

      setAiScores((prev) => ({
        ...prev,
        [applicantId]: { ...result, loading: false },
      }));

      // Show the score section after evaluation
      setScoreVisibility((prev) => ({
        ...prev,
        [applicantId]: true,
      }));
    } catch (err) {
      toast.error('Failed to evaluate resume');
      setAiScores((prev) => ({
        ...prev,
        [applicantId]: { loading: false },
      }));
    }
  };

  // Highlight matching skill keywords in explanation
  const highlightKeywords = (text, keywords) => {
    const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
    return text.replace(regex, (match) => `<strong class="text-indigo-500">${match}</strong>`);
  };

  return (
    <div className={`p-4 md:p-8 min-h-screen transition-all duration-300 ${darkMode ? 'bg-[#0a0a0a] text-white' : 'bg-gray-100 text-gray-900'}`}>

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-10">
        <div className={`backdrop-blur-md border-[2px] rounded-xl px-4 sm:px-6 py-4 shadow-md 
          ${darkMode ? "bg-white/5 border-blue-400" : "bg-white/10 border-blue-200"}`}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700">
            Applicants Overview
          </h1>
          <p className={`text-sm sm:text-base pt-3 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Explore the candidates who have applied. Evaluate their match instantly with AI-powered scoring based on resume and skills.
          </p>
        </div>
      </div>

      {/* Loading Applicants */}
      {loading ? (
        <div className="flex items-center justify-center gap-2 text-indigo-500">
          <Spin />
          <span>Loading applicants...</span>
        </div>
      ) : applicants.length === 0 ? (
        <p className="text-center text-lg text-gray-400">No applicants found for this internship.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {applicants.map((applicant) => {
            const ai = aiScores[applicant.id] || {};
            const visible = scoreVisibility[applicant.id];

            return (
              <div
                key={applicant.id}
                className={`backdrop-blur-md border rounded-2xl shadow-md hover:shadow-xl transition-all p-5 flex flex-col justify-between 
              ${darkMode ? 'bg-white/10 border-indigo-500/30' : 'bg-white border border-gray-200'}`}
              >
                <div>
                  <h2 className="text-lg sm:text-xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600 mb-4">
                    {applicant.name}
                  </h2>

                  <p className="text-sm mb-1"><strong>Email:</strong> {applicant.email}</p>
                  <p className="text-sm mb-1"><strong>Phone:</strong> {applicant.phone}</p>

                  {['linkedin', 'github', 'portfolio'].map((key) => (
                    applicant[key] && (
                      <p key={key} className="text-sm mb-1">
                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{' '}
                        <a
                          href={formatUrl(applicant[key])}
                          className="text-blue-500 underline hover:text-blue-400"
                          target="_blank"
                          rel="noreferrer"
                        >
                          View <ExternalLink className="inline w-4 h-4 ml-1" />
                        </a>
                      </p>
                    )
                  ))}

                  {/* Cover Letter */}
                  <div className="mt-4">
                    <p className="text-sm font-bold mb-1">Cover Letter:</p>
                    <div className="text-sm whitespace-pre-line break-words p-3 rounded-lg border border-indigo-400/30 shadow-sm max-h-60 overflow-y-auto 
                      bg-white/20 dark:bg-white/10">
                      {applicant.cover_letter}
                    </div>
                  </div>

                  {/* AI Score Section */}
                  <div className="mt-4">
                    {ai.loading ? (
                      <div className="flex items-center gap-2 text-indigo-500 text-sm">
                        <Spin size="small" />
                        <span>Evaluating resume...</span>
                      </div>
                    ) : ai.score ? (
                      <>
                        <button
                          onClick={() => setScoreVisibility((prev) => ({
                            ...prev,
                            [applicant.id]: !prev[applicant.id],
                          }))}
                          className="text-xs mt-2 px-3 py-1 rounded-md border border-indigo-400 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-white/10 transition-all"
                        >
                          {visible ? '🙈 Hide Score' : '👀 Show Score'}
                        </button>

                        {visible && (
                          <div className={`rounded-xl p-4 shadow-inner mt-2
                            ${darkMode ? 'bg-white/10 border border-indigo-400/20' : 'bg-gray-100 border border-indigo-200'}`}>
                            <p className="text-base font-semibold text-green-500">
                              🔍 AI Score: <span className="text-indigo-500 font-bold">{ai.score} / 100</span>
                            </p>
                            <p
                              className={`text-sm mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                              dangerouslySetInnerHTML={{
                                __html: `💡 <span class='italic'>${highlightKeywords(ai.explanation, skillsRequired)}</span>`,
                              }}
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <button
                        onClick={() => evaluateResume(applicant.resume_url, skillsRequired, applicant.id)}
                        className="text-xs mt-2 px-3 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-all disabled:opacity-50"
                        disabled={ai.loading}
                      >
                        🔍 Evaluate Resume with AI
                      </button>
                    )}
                  </div>
                </div>

                {/* Resume Link */}
                {applicant.resume_url && (
                  <a
                    href={formatUrl(applicant.resume_url)}
                    className="mt-4 inline-block text-center text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default JobApplicant;