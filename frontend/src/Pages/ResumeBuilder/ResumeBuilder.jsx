import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FormSection from './component/FormSection';
import PreviewSection from './component/PreviewSection';
import FullPreviewModal from './component/preview/FullPreview/FullPreviewModel';
import { Maximize2, Sparkles } from 'lucide-react';

function ResumeBuilder() {
    const resumeInfo = useSelector((state) => state.resume.info);
    const darkMode = useSelector((state) => state.theme.darkMode);
    const [viewFull, setViewFull] = useState(false);

    return (
        <div className={`${darkMode ? 'bg-black' : 'bg-gray-50'} min-h-screen transition-colors duration-300 relative`}>
            
            <header className={`p-4 px-6 md:px-12 border-b flex justify-between items-center shadow-sm sticky top-0 z-10
                ${darkMode ? 'bg-black border-gray-700' : 'bg-white border-gray-200'}`}>

                <div className="flex flex-col">
                    <h1 className={`font-black text-xl md:text-2xl tracking-tight flex items-center gap-2 
                        ${darkMode ? 'text-yellow-400' : 'text-green-700'}`}>
                         AI Resume Builder
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setViewFull(true)}
                        className={`group flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-xl active:scale-95
                        ${darkMode 
                            ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400 shadow-yellow-500/20' 
                            : 'bg-green-700 text-white hover:bg-green-800 shadow-green-700/20'}`}>
                        <Maximize2 size={16} className="group-hover:scale-110 transition-transform" />
                        Full Preview
                    </button>
                </div>
            </header>

            <main className='grid grid-cols-1 md:grid-cols-2 gap-10 p-5 md:p-10 lg:px-32'>
                {/* Left Side: Form */}
                <div className={`shadow-md rounded-2xl border-t-4 p-5 ${darkMode ? 'bg-gray-900 shadow-black/40' : 'bg-white shadow-gray-200'}`}>
                    <FormSection />
                </div>

                {/* Right Side: Sticky Preview */}
                <div className='sticky top-24 h-fit'>
                    <div className="shadow-2xl rounded-sm group relative overflow-hidden">
                        {/* Overlay to encourage "Full Preview" on hover */}
                        <div 
                            onClick={() => setViewFull(true)}
                            className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-zoom-in z-10"
                        >
                           <div className="bg-white/90 p-3 rounded-full shadow-lg">
                                <Maximize2 size={24} className="text-gray-900" />
                           </div>
                        </div>
                        <PreviewSection resumeInfo={resumeInfo} darkMode={darkMode} />
                    </div>
                </div>
            </main>

            {/* Modal Logic */}
            {viewFull && (
                <FullPreviewModal 
                    resumeInfo={resumeInfo} 
                    onClose={() => setViewFull(false)} 
                />
            )}
        </div>
    );
}

export default ResumeBuilder;