import React from 'react';

function ProjectPreview({ resumeInfo, darkMode }) {
  // Define dynamic colors based on darkMode prop
  const textColor = darkMode ? 'text-gray-300' : 'text-gray-800';
  const subTextColor = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className='my-6 transition-all duration-300'>
      {/* Section Heading with Underline */}
      <h2 
        className='text-base font-serif font-bold mb-0 uppercase tracking-wide'
        style={{ color: resumeInfo?.themeColor || '#16a34a' }}
      >
        Projects
      </h2>
      <hr 
        className='mb-2' 
        style={{ 
          borderColor: resumeInfo?.themeColor || '#16a34a',
          opacity: darkMode ? 0.3 : 0.8,
          borderWidth: '0.5px'
        }} 
      />

      {/* Mapping through Projects List */}
      {resumeInfo?.projects?.map((project, index) => (
        <div key={index} className='mb-4'>
          {/* Row 1: Project Name, Technologies, and GitHub Link */}
          <div className='flex justify-between items-baseline'>
            <div className='flex items-baseline gap-2'>
              <h2 className={`text-[13px] font-bold ${textColor}`}>
                {project?.projectName}
              </h2>
              {/* Technology shifted right after project name */}
              <span className={`text-[11px] italic font-medium ${subTextColor}`}>
                ({project?.technologies})
              </span>
            </div>
            
            {/* GitHub Link on the far right */}
            {project?.github && (
              <h2 className={`text-[11px] font-medium ${textColor}`}>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  Github
                </a>
              </h2>
            )}
          </div>

          {/* Project Description using whiteSpace: pre-line for your • bullets */}
          <p 
            className={`text-[11px] leading-relaxed text-justify mt-1 ml-1 ${textColor}`}
            style={{ whiteSpace: 'pre-line' }}
          >
            {project?.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ProjectPreview;