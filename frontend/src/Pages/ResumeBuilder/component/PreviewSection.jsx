import React from 'react';
import { useSelector } from 'react-redux';
import PersonalDetail from './preview/PersonalDetail';
import SummaryPreview from './preview/summaryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationPreview from './preview/EducationPreview';
import ProjectPreview from './preview/ProjectPreview';
import SkillPreview from './preview/SkillPreview';
import AchievementPreview from './preview/AchievementPreview';

function PreviewSection({ resumeInfo, forceLightMode = false }) {
    const reduxDarkMode = useSelector((state) => state.theme.darkMode);
    
    // If we are in the Modal, forceLightMode is true
    const darkMode = forceLightMode ? false : reduxDarkMode;

    return (
        <div 
            className={`h-full p-8 transition-all duration-300
            ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}
            /* Border top exists on web, but we remove it for true top-0 print */
            border-t-[16px] print:border-t-0`}
            style={{ 
                borderColor: resumeInfo?.themeColor || '#16a34a',
                minHeight: '1122px' 
            }}
        >
            <div className="print:m-0 print:p-0">
                <PersonalDetail resumeInfo={resumeInfo} darkMode={darkMode} />
                <SummaryPreview resumeInfo={resumeInfo} darkMode={darkMode} />
                <EducationPreview resumeInfo={resumeInfo} darkMode={darkMode} />
                <ExperiencePreview resumeInfo={resumeInfo} darkMode={darkMode} />
                <ProjectPreview resumeInfo={resumeInfo} darkMode={darkMode} />
                <SkillPreview resumeInfo={resumeInfo} darkMode={darkMode} />
                <AchievementPreview resumeInfo={resumeInfo} darkMode={darkMode} />
            </div>
        </div>
    );
}

export default PreviewSection;