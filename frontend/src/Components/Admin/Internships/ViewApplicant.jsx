import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../../../superbaseClient';
import { toast } from 'react-hot-toast';
import { ExternalLink } from 'lucide-react';
import { Spin } from 'antd';

function ViewApplicant() {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApplicants = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('applyapplications')
      .select('*')
      .eq('internship_id', id);

    if (error) {
      setLoading(false);
      console.error('Error fetching applicants:', error.message);
      toast.error('Something went wrong while fetching applicants.');
    } else {
      setApplicants(data);
      setLoading(false);
    }
  };

  const formatUrl = (url) => {
    if (!url) return '#';
    return url.startsWith('http') ? url : `https://${url}`;
  };

  useEffect(() => {
    fetchApplicants();
  }, [id]);

  return (
    <>
      <div className="p-2 md:p-10 min-h-screen">
        <h1 className="text-3xl font-bold text-blue-400 mb-10 text-center">View All Applicants</h1>

        {loading ? (
          <div className="flex items-center justify-center gap-2 text-indigo-500">
            <Spin />
            <span>Loading applicants...</span>
          </div>
        ) : applicants.length === 0 ? (
          <p className="text-gray-300 text-center">No applicants found for this internship.</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applicants.map((applicant) => (
              <div
                key={applicant.id}
                className="backdrop-blur-md  border border-blue-500 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all text-white h-full flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-yellow-500 text-center mb-3">{applicant.name}</h2>
                  <p className="text-sm mb-1"><strong>Email:</strong> {applicant.email}</p>
                  <p className="text-sm mb-1"><strong>Phone:</strong> {applicant.phone}</p>

                  <p className="text-sm mb-1">
                    <strong>LinkedIn:</strong>{' '}
                    <a
                      href={formatUrl(applicant.linkedin)}
                      className="text-blue-400 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Profile <ExternalLink className="inline w-4 h-4" />
                    </a>
                  </p>

                  <p className="text-sm mb-1">
                    <strong>GitHub:</strong>{' '}
                    <a
                      href={formatUrl(applicant.github)}
                      className="text-blue-400 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Profile <ExternalLink className="inline w-4 h-4" />
                    </a>
                  </p>

                  <p className="text-sm mb-1">
                    <strong>Portfolio:</strong>{' '}
                    <a
                      href={formatUrl(applicant.portfolio)}
                      className="text-blue-400 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View <ExternalLink className="inline w-4 h-4" />
                    </a>
                  </p>

                  <div className="mt-4">
                    <p className="text-sm font-bold mb-1">Cover Letter:</p>
                    <div className="text-sm whitespace-pre-line break-words bg-white/20 dark:bg-white/10 p-3 rounded-lg border border-indigo-400/30 shadow-sm max-h-60 overflow-y-auto">
                      {applicant.cover_letter}
                    </div>
                  </div>
                </div>

                {applicant.resume_url && (
                  <a
                    href={formatUrl(applicant.resume_url)}
                    className="mt-4 inline-block text-center text-sm text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ViewApplicant;