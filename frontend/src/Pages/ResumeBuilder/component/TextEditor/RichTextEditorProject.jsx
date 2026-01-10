import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Sparkles, Loader2 } from 'lucide-react';
import Editor, { 
  BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, 
  BtnStrikeThrough, BtnUnderline, Separator, Toolbar 
} from 'react-simple-wysiwyg';
import axios from 'axios';
import toast from 'react-hot-toast';

function RichTextEditorProject ({ value, onRichTextEditorChange, itemProjectName, itemTechnology, itemGithubLink}) {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const [loading, setLoading] = useState(false);

    const HandleWorkSummaryByAI = async () => {

        if (!itemProjectName || !itemTechnology || !itemGithubLink) { // first validation
            toast.error("Please enter Project, Tech, or Github link");
            return;
        }
        setLoading(true);
        const prompt = `Act as an expert technical resume writer. Write 4-5 premium, ATS-optimized sentences for a project named "${itemProjectName}" built using ${itemTechnologies}. 
                        The project repository is located at ${itemGithub}.

                        Requirements:
                        1. Focus on engineering impact, scalability, and technical challenges solved.
                        2. Use strong action verbs (e.g., Engineered, Optimized, Integrated, Orchestrated).
                        3. Use the Google XYZ formula: Accomplished [X] as measured by [Y], by doing [Z].
                        4. Format: Each sentence MUST be followed by an HTML <br /> tag.
                        5. NO bullet points (•), NO dashes (-), NO asterisks (*).
                        6. NO bold text (**).
                        7. Return ONLY the content sentences. No intro or outro.`;

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/ai-resume-experience`, { prompt });
            
            // extract the generated text from your specific API response structure
            const aiGeneratedText = res.data.summary || res.data;

            // update the editor by mimicking a change event
            onRichTextEditorChange({
                target: { value: aiGeneratedText }
            });

            toast.success("AI WorkSummary Generated!", {
                icon: '✨',
                style: { 
                    borderRadius: '10px', 
                    background: darkMode ? '#1f2937' : '#fff', 
                    color: darkMode ? '#fff' : '#1f2937' 
                }
            });

        } 
        catch (error) {
            console.error("AI Error:", error);
            toast.error("AI Service unavailable. Please try again.");
        } 
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="mt-2">
            <div className="flex justify-end items-end mb-2">                
                <button 
                    type="button"
                    disabled={loading}
                    onClick={HandleWorkSummaryByAI}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold transition-all duration-300 shadow-sm active:scale-95 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed
                        ${darkMode 
                            ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20 hover:bg-yellow-400/20 hover:border-yellow-400/40' 
                            : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:border-green-300'
                        }`}
                >
                    {loading ? (
                        <Loader2 size={14} className="animate-spin" />
                    ) : (
                        <Sparkles size={14} className={darkMode ? 'text-yellow-400' : 'text-green-600'} />
                    )}
                    {loading ? "Generating..." : "Generate By AI"}
                </button>
            </div>

            <div className={`rounded-xl overflow-hidden border transition-all duration-300
                ${darkMode 
                    ? 'bg-gray-800/40 border-gray-700 focus-within:border-yellow-400 focus-within:ring-2 focus-within:ring-yellow-400/20' 
                    : 'bg-white border-gray-200 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-600/10'
                }`}
            >
                <Editor 
                    value={value} 
                    onChange={onRichTextEditorChange}
                    className="custom-editor" 
                >
                    <Toolbar>
                        <BtnBold /> <BtnItalic /> <BtnUnderline /> <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList /> <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </div>
            
            <p className={`mt-1 text-[10px] font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Use bullet points to highlight your key achievements.
            </p>
        </div>
    );
}

export default RichTextEditorProject;