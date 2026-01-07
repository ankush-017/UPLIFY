import React from 'react';

function AchievementPreview({ resumeInfo, darkMode }) {
  // Logic for text color based on darkMode prop
  const textColor = darkMode ? 'text-gray-300' : 'text-gray-800';
  const themeColor = resumeInfo?.themeColor || '#16a34a';

  return (
    <div className='my-6 transition-all duration-300'>
      {/* Section Heading matching the serif style of your Education image */}
      <h2 
        className='text-base font-serif font-bold mb-0 uppercase tracking-wide'
        style={{ color: themeColor }}
      >
        Achievements
      </h2>
      <hr 
        className='mb-2' 
        style={{ 
          borderColor: themeColor,
          opacity: darkMode ? 0.3 : 0.8,
          borderWidth: '0.5px'
        }} 
      />

      {/* Mapping through Achievements - rendering as a single continuous list */}
      <div className='flex flex-col gap-y-1 mt-2'>
        {resumeInfo?.achievements?.map((achievement, index) => (
          <div key={index} className='flex items-start gap-2'>
            {/* Standard Bullet Point */}
            <span className={`text-[11px] ${textColor}`}>•</span>
            
            {/* Description using pre-line to respect the \n from your dummy data */}
            <p 
              className={`text-[11px] leading-relaxed text-justify ${textColor}`}
              style={{ whiteSpace: 'pre-line' }}
            >
              {achievement?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AchievementPreview;