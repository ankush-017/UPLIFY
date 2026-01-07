import React from 'react';

function EducationPreview({ resumeInfo, darkMode }) {
  // Logic for text color based on darkMode prop
  const textColor = darkMode ? 'text-gray-300' : 'text-gray-800';
  const subTextColor = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className='my-'>
      {/* Section Heading with Underline - Matching the serif style of your image */}
      <h2 
        className='text-base font-serif font-bold mb-0'
        style={{ color: resumeInfo?.themeColor || '#16a34a' }}
      >
        Education
      </h2>
      <hr 
        className='mb-2' 
        style={{ 
          borderColor: resumeInfo?.themeColor || '#16a34a',
          opacity: darkMode ? 0.3 : 0.8,
          borderWidth: '0.5px'
        }} 
      />

      {resumeInfo?.education?.map((education, index) => (
        <div key={index} className='mb-4'>
          {/* Row 1: University and Graduation Date */}
          <div className='flex justify-between items-baseline'>
            <h2 className={`text-[13px] font-bold ${textColor}`}>
              {education?.universityName}{education?.city && `, ${education?.city}`}
            </h2>
            <h2 className={`text-[12px] font-medium ${textColor}`}>
              {education?.endDate}
            </h2>
          </div>
          
          {/* Row 2: Degree/Major, CGPA, and Location */}
          <div className='flex justify-between items-baseline mt-[2px]'>
            <div className='flex items-baseline'>
              <h3 className={`text-[11px] italic ${subTextColor}`}>
                {education?.degree} in {education?.major}
              </h3>
              {education?.gpa && (
                <span className={`text-[11px] ml-2 ${textColor}`}>
                  CGPA: {education?.gpa}
                </span>
              )}
            </div>
            <h3 className={`text-[11px] italic font-medium ${subTextColor}`}>
              {education?.city}{education?.state && `, ${education?.state}`}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
export default EducationPreview;