import React from 'react';

function SkillsPreview({ resumeInfo, darkMode }) {
  const textColor = darkMode ? 'text-gray-300' : 'text-gray-800';
  const themeColor = resumeInfo?.themeColor || '#16a34a';

  return (
    <div className='my-6 transition-all duration-300'>
      {/* Section Heading matching your Education/Experience style */}
      <h2 
        className='text-base font-serif font-bold mb-0 uppercase tracking-wide'
        style={{ color: themeColor }}
      >
        Technical Skills
      </h2>
      <hr 
        className='mb-2' 
        style={{ 
          borderColor: themeColor,
          opacity: darkMode ? 0.3 : 0.8,
          borderWidth: '0.5px'
        }} 
      />

      {/* Skills List in Plain Text Bullet Form */}
      <div className='flex flex-col gap-y-1 mt-2'>
        {resumeInfo?.skills?.map((skill, index) => (
          <div key={index} className='flex items-start gap-2'>
            {/* Standard Bullet Point */}
            <span className={`text-[11px] ${textColor}`}>•</span>
            
            <p className={`text-[11px] leading-relaxed ${textColor}`}>
              <span className='font-bold'>{skill?.category}:</span> {skill?.skillsList}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SkillsPreview;