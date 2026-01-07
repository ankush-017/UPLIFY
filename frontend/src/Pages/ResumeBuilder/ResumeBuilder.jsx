import React from 'react';
import { useSelector } from 'react-redux';
import FormSection from './component/FormSection';
import PreviewSection from './component/PreviewSection';

function ResumeBuilder() {
    
    const resumeInfo = useSelector((state) => state.resume.info);
    const darkMode = useSelector((state) => state.theme.darkMode);

    return (
        <div className={`${darkMode ? 'bg-black' : 'bg-gray-50'} min-h-screen transition-colors duration-300`}>
            {/* Header with improved branding and ATS messaging */}
            <header className={`p-4 px-6 md:px-12 border-b flex justify-between items-center shadow-sm sticky top-0 z-10
                ${darkMode ? 'bg-black border-gray-700' : 'bg-white border-gray-200'}`}>

                <div className="flex flex-col">
                    <h1 className={`font-extrabold text-xl md:text-2xl tracking-tight flex items-center gap-2 
                        ${darkMode ? 'text-yellow-400' : 'text-green-700'}`}>
                         AI Resume Builder
                    </h1>
                    <p className={`text-[10px] uppercase tracking-[0.2em] font-bold mt-1 
                        ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Ultimate <span className={darkMode ? 'text-yellow-500' : 'text-green-600'}>ATS-Optimized</span> Experience
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button className='bg-green-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-green-700 transition-all shadow-lg active:scale-95 flex items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download PDF
                    </button>
                </div>
            </header>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 p-5 md:p-10 px-5 md:px-10 lg:px-32'>
                {/* Form Section */}
                <div className={`shadow-md rounded-lg border-t-4 p-5 transition-all
                    ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
                    <FormSection />
                </div>

                {/* Preview Section */}
                <div className='sticky top-24'>
                    <div className={`shadow-2xl rounded-sm transition-all
                        ${darkMode ? 'ring-1 ring-gray-700' : 'bg-white'}`}>
                        <PreviewSection resumeInfo={resumeInfo} darkMode={darkMode} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ResumeBuilder;