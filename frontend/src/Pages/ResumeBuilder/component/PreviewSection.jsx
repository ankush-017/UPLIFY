import React from 'react';
import { useSelector } from 'react-redux';
import PersonalDetail from './preview/PersonalDetail.jsx';
import SummaryPreview from './preview/summaryPreview.jsx';
import ExperiencePreview from './preview/ExperiencePreview.jsx';
import EducationPreview from './preview/EducationPreview.jsx';
import ProjectPreview from './preview/ProjectPreview.jsx';
import SkillPreview from './preview/SkillPreview.jsx';
import AchievementPreview from './preview/AchievementPreview.jsx';

function PreviewSection({ resumeInfo }) {
    // Access dark mode state from Redux
    const darkMode = useSelector((state) => state.theme.darkMode);

    return (
        <div 
            className={`shadow-2xl h-full p-5 border-t-[20px] transition-all duration-300
            ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}
            style={{ 
                borderColor: resumeInfo?.themeColor || '#16a34a', // Default to Green
                minHeight: '1000px' 
            }}
        >
            {/* Pass darkMode prop to EVERY child so they can 
               adjust their internal text colors manually 
            */}
            <PersonalDetail resumeInfo={resumeInfo} darkMode={darkMode} />

            <SummaryPreview resumeInfo={resumeInfo} darkMode={darkMode} />

            <EducationPreview resumeInfo={resumeInfo} darkMode={darkMode} />

            <ExperiencePreview resumeInfo={resumeInfo} darkMode={darkMode} />

            <ProjectPreview resumeInfo={resumeInfo} darkMode={darkMode} />

            <SkillPreview resumeInfo={resumeInfo} darkMode={darkMode} />

            <AchievementPreview resumeInfo={resumeInfo} darkMode={darkMode} />

        </div>
    );
}
export default PreviewSection;