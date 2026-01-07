import React from 'react';

function PersonalDetail({ resumeInfo, darkMode }) {
  // Define dynamic text colors
  const mainTextColor = darkMode ? 'text-gray-100' : 'text-gray-900';
  const subTextColor = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className="pb-2 transition-all duration-300">
      {/* Name - Always uses the Theme Color (Green/Yellow) */}
      <h2 
        className="font-bold text-2xl text-center uppercase tracking-wider" 
        style={{ color: resumeInfo?.themeColor || '#16a34a' }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>

      {/* Job Title */}
      <h3 className={`text-center text-sm font-semibold mt-1 ${mainTextColor}`}>
        {resumeInfo?.jobTitle}
      </h3>
      
      {/* Address */}
      <p className={`text-center text-xs font-normal mt-1 ${subTextColor}`}>
        {resumeInfo?.address}
      </p>

      {/* Contact Details */}
      <div className="flex justify-between mt-3 px-2">
        <span className={`font-medium text-xs ${subTextColor}`}>
            {resumeInfo?.phone}
        </span>
        <span className={`font-medium text-xs ${subTextColor}`}>
            {resumeInfo?.email}
        </span>
      </div>
    </div>
  );
}

export default PersonalDetail;