import React from 'react'

function SummaryPreview({ resumeInfo, darkMode }) {
  // Logic for text color based on darkMode prop
  // In light mode we use a dark gray, in dark mode we use a light gray/white
  const summaryTextColor = darkMode ? 'text-gray-300' : 'text-gray-700';

  return (
    <div className='mt-0 transition-all duration-300'>
      {/* Section Title */}
      {/* <h2 
        className='text-sm font-bold mb-1'
        style={{ color: resumeInfo?.themeColor || '#16a34a' }}
      >
        Summary
      </h2> */}

      {/* Decorative Divider - Directly under title */}
      <div 
        className='h-[1.5px] w-full mb-3'
        style={{ 
          backgroundColor: resumeInfo?.themeColor || '#16a34a',
          opacity: darkMode ? 0.4 : 1 // Subtler line in dark mode to prevent glare
        }}
      ></div>

      {/* The Summary Text */}
      <p className={`text-xs sm:text-sm leading-relaxed text-justify ${summaryTextColor}`}>
        {resumeInfo?.summary || "Add a professional summary to highlight your key achievements and goals."}
      </p>
    </div>
  );
}

export default SummaryPreview;