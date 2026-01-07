import React, { useState } from 'react'
import PersonalDetailForm from './forms/PersonalDetailForm'
import { ArrowRight, LayoutGrid } from 'lucide-react' // Use lucide-react for professional icons
import SummaryForm from './forms/SummaryForm';
import { useSelector } from 'react-redux';
import EducationForm from './forms/EducationForm';

function FormSection() {

    const [activeFormIndex, setActiveFormIndex] = useState(1);
    const darkMode = useSelector((state) => state.theme.darkMode);

    // This helps navigate between forms
    const handleNext = () => {
        if (activeFormIndex < 6) setActiveFormIndex(activeFormIndex + 1);
    }

    const handleBack = () => {
        if (activeFormIndex > 1) setActiveFormIndex(activeFormIndex - 1);
    }

    return (
        <div>
            {/* Header with Theme and Navigation */}
            <div className='flex justify-between items-center mb-6'>
                <div className='flex gap-2'>
                    {/* Theme Button - You can later open a color picker modal here */}
                    <button className='flex gap-2 items-center bg-yellow-500 text-gray-900 px-3 py-1.5 rounded-md text-sm hover:bg-green-500 transition-all'>
                        <LayoutGrid size={16} /> 
                        Theme
                    </button>
                </div>

                <div className='flex gap-2'>
                    {activeFormIndex > 1 && (
                        <button 
                            onClick={handleBack}
                            className={`border border-gray-300 px-3 py-1.5 rounded-md text-sm  transition-all ${darkMode?"text-white hover:bg-gray-700":" hover:bg-gray-100"}`}
                        >
                            Back
                        </button>
                    )}
                    <button 
                        onClick={handleNext}
                        className='flex gap-2 items-center bg-green-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-green-700 transition-all'
                    >
                        Next
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            {/* Conditional Rendering of Forms */}
            <div className='transition-all duration-300'>
                {activeFormIndex === 1 && <PersonalDetailForm />}
                
                {/* Placeholder divs for your next steps */}
                {activeFormIndex === 2 && <SummaryForm />}
                {activeFormIndex === 3 && <EducationForm />}
                {activeFormIndex === 4 && <div>{/* <ExperienceForm /> */}</div>}
                {activeFormIndex === 5 && <div>{/* <SkillsForm /> */}</div>}
                {activeFormIndex === 6 && <div>{/* <AchievementForm /> */}</div>}
            </div>
        </div>
    )
}
export default FormSection;