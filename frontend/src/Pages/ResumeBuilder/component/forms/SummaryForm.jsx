import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateResumeInfo } from '../../../../Store/Slice/ResumeSlice';
import { Sparkles, Save, Loader2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

function SummaryForm() {
    const resumeInfo = useSelector((state) => state.resume.info);
    const darkMode = useSelector((state) => state.theme.darkMode);
    const dispatch = useDispatch();
    
    const [loading, setLoading] = useState(false);

    // AI Generation  summary-Function 
    const generateSummary = async () => {

        if (!resumeInfo?.jobTitle) {
            toast.error("Please enter a Job Title in Personal Details first!", {
                style: { 
                    borderRadius: '10px', 
                    background: darkMode ? '#1f2937' : '#fff', 
                    color: darkMode ? '#fff' : '#1f2937',
                    border: darkMode ? '1px solid #374151' : '1px solid #e5e7eb'
                }
            });
            return;
        }

        setLoading(true);

        // promt designed for ATS optimization (removes first-person pronouns)
        const prompt = `Act as a professional resume writer. 
        Write a high-impact, ATS-friendly professional summary for a "${resumeInfo.jobTitle}".
        Requirements:
        - Length: 1 to 2 sentences.
        - Style: Professional third-person (strictly NO "I" or "me").
        - Focus: Technical expertise and key value proposition.
        - Formatting: Plain text only. No introductory remarks.`;

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/ai-resume-summary`, { prompt });

            const aiGeneratedText = res.data.summary || res.data;
            dispatch(updateResumeInfo({ summary: aiGeneratedText }));
            
            toast.success("AI Summary Generated!", {
                icon: '✨',
                style: { 
                    borderRadius: '10px', 
                    background: darkMode ? '#1f2937' : '#fff', 
                    color: darkMode ? '#fff' : '#1f2937' 
                }
            });

        } catch (error) {
            console.error("AI Error:", error);
            toast.error(error.response?.data?.message || "AI Service unavailable. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateResumeInfo({ [name]: value }));
    };

    const onSave = (e) => {
        e.preventDefault();
        localStorage.setItem('resumeData', JSON.stringify(resumeInfo));
        toast.success('Professional summary saved!', {
            icon: '✍️',
            style: {
                borderRadius: '10px',
                background: darkMode ? '#1f2937' : '#fff',
                color: darkMode ? '#fff' : '#1f2937',
            },
        });
    };

    // Styling logic
    const textAreaStyle = `w-full p-4 rounded-lg border outline-none transition-all duration-300 text-sm min-h-[160px] leading-relaxed
        ${darkMode 
            ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30' 
            : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-green-600 focus:ring-1 focus:ring-green-600/20'}`;

    return (
        <div className={`p-6 shadow-xl rounded-xl border-t-4 transition-all duration-500
            ${darkMode ? 'bg-gray-800 border-t-yellow-500 shadow-black/40' : 'bg-white border-t-green-600 shadow-gray-100'}`}>
            
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6'>
                <div>
                    <h2 className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Professional Summary
                    </h2>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Add a summary to highlight your expertise
                    </p>
                </div>

                {/* AI Generate Button */}
                <button 
                    disabled={loading}
                    onClick={generateSummary}
                    type="button"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 transform active:scale-95 shadow-sm
                        ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                        ${darkMode
                            ? 'bg-gray-900 border border-yellow-400/50 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 hover:shadow-[0_0_15px_rgba(250,204,21,0.4)]'
                            : 'bg-white border border-green-600 text-green-600 hover:bg-green-600 hover:text-white hover:shadow-green-100'
                        }`}
                >
                    {loading ? (
                        <Loader2 size={14} className="animate-spin" />
                    ) : (
                        <Sparkles size={14} className={darkMode ? 'animate-pulse' : ''} />
                    )}
                    {loading ? 'Generating...' : 'Generate with AI'}
                </button>
            </div>

            <form onSubmit={onSave}>
                <div className='mt-2'>
                    <textarea
                        name="summary"
                        required
                        placeholder="Describe your professional journey and key skills..."
                        value={resumeInfo?.summary || ''}
                        className={textAreaStyle}
                        onChange={handleChange}
                    />
                </div>

                <div className='mt-8 flex justify-end'>
                    <button
                        type="submit"
                        className={`flex items-center gap-2 px-8 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 shadow-lg active:scale-95
                               ${darkMode 
                                ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900 shadow-yellow-500/40' 
                                : 'bg-green-700 hover:bg-green-800 text-white shadow-green-700/30'} text-gray-700 shadow-yellow-500/20`}
                    >
                        <Save size={18} />
                        Save Summary
                    </button>
                </div>
            </form>
        </div>
    );
}
export default SummaryForm;