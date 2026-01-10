import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Sparkles, Loader2 } from 'lucide-react'; // Added Loader2
import Editor, { 
  BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, 
  BtnStrikeThrough, BtnUnderline, Separator, Toolbar 
} from 'react-simple-wysiwyg';
import axios from 'axios';
import toast from 'react-hot-toast';

function RichTextEditor({ value, onRichTextEditorChange, itemTitle, itemCompany }) {
    
    const darkMode = useSelector((state) => state.theme.darkMode);
    const [loading, setLoading] = useState(false);

    const HandleWorkSummaryByAI = async () => {

        if (!itemTitle || !itemCompany) { // first validation
            toast.error("Please enter Job Title and Company first");
            return;
        }
        setLoading(true);
        const prompt = `Write 4-5 high-impact sentences for a ${itemTitle} at ${itemCompany}. 
                        - Each sentence MUST be on a new line.
                        - DO NOT use bullets, dashes, or stars.
                        - DO NOT use bold text (**).
                        - Use HTML <br /> tags at the end of every sentence to separate them.
                        - Return ONLY the content.`;

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

export default RichTextEditor;