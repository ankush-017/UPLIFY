import React, { useRef, useState } from 'react';
import ResumeForm from '../Components/ResumeForm';
import { generateResume } from '../utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import html2pdf from 'html2pdf.js';

function BuildResume() {
  const [resumeText, setResumeText] = useState(null);
  const resumeRef = useRef();

  const handleFormSubmit = async (data) => {
    const generated = await generateResume(data);
    setResumeText(generated);
  };

  const handleDownloadPDF = () => {
    const element = resumeRef.current;
    const opt = {
      margin: 0,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: 'pt',
        format: [595.28, 841.89], // A4 size in points
        orientation: 'portrait',
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <ResumeForm onSubmit={handleFormSubmit} />
      {resumeText && (
        <div className="mt-10 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded shadow">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300">Generated Resume</h2>
            <button
              onClick={handleDownloadPDF}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Download PDF
            </button>
          </div>

          <article
            ref={resumeRef}
            className="prose prose-sm dark:prose-invert max-w-none p-8"
            style={{
              width: '8.27in',
              minHeight: '11.69in',
              fontFamily: 'Arial, sans-serif',
              lineHeight: '1.5',
              fontSize: '11pt',
            }}
          >
            <ReactMarkdown
              children={resumeText}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            />
          </article>
        </div>
      )}
    </div>
  );
}

export default BuildResume;
