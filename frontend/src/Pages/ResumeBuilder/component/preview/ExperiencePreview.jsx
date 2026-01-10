import React from 'react';

function ExperiencePreview({ resumeInfo, darkMode }) {
    const textColor = darkMode ? 'text-gray-300' : 'text-gray-800';
    const subTextColor = darkMode ? 'text-gray-400' : 'text-gray-600';

    return (
        <div className='my-6 transition-all duration-300'>
            <h2
                className='text-base font-serif font-bold mb-0 uppercase tracking-wide'
                style={{ color: resumeInfo?.themeColor || '#16a34a' }}
            >
                Experience
            </h2>
            <hr
                className='mb-2'
                style={{
                    borderColor: resumeInfo?.themeColor || '#16a34a',
                    opacity: darkMode ? 0.3 : 0.8,
                    borderWidth: '0.5px'
                }}
            />

            {resumeInfo?.experience?.map((experience, index) => (
                <div key={index} className='mb-4'>
                    <div className='flex justify-between items-baseline'>
                        <h2 className={`text-[13px] font-bold ${textColor}`}>
                            {experience?.title}
                        </h2>
                        <h2 className={`text-[12px] font-medium ${textColor}`}>
                            {experience?.startDate} - {experience?.currentlyWorking ? 'Present' : experience?.endDate}
                        </h2>
                    </div>

                    <div className='flex justify-between items-baseline mt-[1px]'>
                        <h3 className={`text-[11px] italic font-semibold ${subTextColor}`}>
                            {experience?.companyName}
                        </h3>
                        <h3 className={`text-[11px] italic font-medium ${subTextColor}`}>
                            {experience?.city}{experience?.state && `, ${experience?.state}`}
                        </h3>
                    </div>

                    {/* Rendering the text bullets with pre-line to support \n */}
                    {/* Replace where you display workSummary */}
                    <div 
                    className={`prose prose-sm max-w-none text-[11px] ${textColor} preview-list`}
                    dangerouslySetInnerHTML={{ __html: experience.workSummary }} 
                    />

                </div>
            ))}
        </div>
    );
}

export default ExperiencePreview;