import React, { useEffect, useState } from 'react';
import { supabase } from '../../../superbaseClient.js';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Seo from '../Seo.jsx';
import { Helmet } from 'react-helmet-async';

function MyApplication() {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const uid = user?.uid;

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      if (!uid) {
        console.error('No UID found');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('applyapplications')
        .select(`*, internships(id, title, company, location, stipend, type)`)
        .eq('uid', uid);

      if (error) {
        console.error('Error fetching applications:', error.message);
      }
      else {
        setApplications(data);
      }
      setLoading(false);
    };

    fetchApplications();
  }, [uid]);

  return (

    <>
      <Helmet>
        <title>Test Title</title>
      </Helmet>
      <section
        className={`min-h-screen px-6 py-12 ${darkMode ? 'bg-[#0b0e11] text-white' : 'bg-gray-50 text-gray-800'
          }`}
      >

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Side: Recommendations */}
          <div className="lg:col-span-1 space-y-6">
            <div className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-white/10' : 'bg-white'}`}>
              <h3 className="text-lg font-semibold mb-2">📚 Recommended Blogs</h3>
              <ul className="text-sm space-y-2">
                <li><Link to="/blogs/how-to-get-internship" className="text-blue-500 hover:underline">How to Get Your First Internship</Link></li>
                <li><Link to="/blogs/resume-tips" className="text-blue-500 hover:underline">Top Resume Tips for Students</Link></li>
              </ul>
            </div>

            <div className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-white/10' : 'bg-white'}`}>
              <h3 className="text-lg font-semibold mb-2">📝 Blogs</h3>
              <ul className="text-sm space-y-2">
                <li><Link to="/blog/77cfc88c-6597-42fb-bc6a-812a720bdadc" className="text-blue-500 hover:underline">Internship Guide</Link></li>
                <li><Link to="/resources/linkedin-setup-guide" className="text-blue-500 hover:underline">LinkedIn Setup Guide</Link></li>
              </ul>
            </div>
            <div className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-white/10' : 'bg-white'}`}>
              <h3 className="text-lg font-semibold mb-2">🧰 Resources</h3>
              <ul className="text-sm space-y-2">
                <li><Link to="/resources/free-resume-templates" className="text-blue-500 hover:underline">Free Resume Templates</Link></li>
                <li><Link to="/resources/linkedin-setup-guide" className="text-blue-500 hover:underline">LinkedIn Setup Guide</Link></li>
              </ul>
            </div>

            <div className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-white/10' : 'bg-white'}`}>
              <h3 className="text-lg font-semibold mb-2">📝 Make Your Resume Better</h3>
              <p className="text-sm mb-3">Use our AI Resume Builder to create an impressive resume.</p>
              <Link
                to="/resume-builder"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Build Resume →
              </Link>
            </div>
          </div>

          {/* Right Side: Applications */}
          <div className="lg:col-span-3">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center lg:text-left">
              Your Internship Applications
            </h2>

            {loading ? (
              <div className="text-center text-lg font-medium">Loading...</div>
            ) : applications.length === 0 ? (
              <div className="text-center text-xl text-gray-500">No applications found.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {applications.map((app) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`relative rounded-2xl p-6 border shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 ${darkMode
                      ? 'bg-gradient-to-br from-[#111827] to-[#1f2937] border-gray-700 text-gray-100'
                      : 'bg-white border-gray-200 text-gray-800'
                      }`}
                  >
                    {/* Applied Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-green-100 ${darkMode ? "bg-green-900 text-green-300" : "text-green-700"}`}>
                        ✅ Applied
                      </span>
                    </div>

                    {/* Internship Title */}
                    <h3 className="text-xl font-bold mb-2 leading-snug line-clamp-2">
                      {app.internships?.title || 'Untitled Internship'}
                    </h3>

                    {/* Details List */}
                    <div className=" text-sm font-medium leading-relaxed">
                      <p>
                        <span className={`${darkMode ? "text-gray-400" : "text-gray-600"} inline-block min-w-[90px]`}>
                          🏢 Company:
                        </span>
                        <span className="ml-3">{app.internships?.company || 'Unknown'}</span>
                      </p>
                      <p>
                        <span className={`${darkMode ? "text-gray-400" : "text-gray-600"} inline-block min-w-[90px]`}>
                          📍 Location:
                        </span>
                        <span className="ml-1">{app.internships?.location || 'Unknown'}</span>
                      </p>
                      <p>
                        <span className={`${darkMode ? "text-gray-400" : "text-gray-600"} inline-block min-w-[90px]`}>
                          💰 Stipend:
                        </span>
                        <span className="ml-1">{app.internships?.stipend || 'Unknown'}</span>
                      </p>
                      <p>
                        <span className={`${darkMode ? "text-gray-400" : "text-gray-600"} inline-block min-w-[90px]`}>
                          🕒 Type:
                        </span>
                        <span className="ml-1">{app.internships?.type || 'Unknown'}</span>
                      </p>
                    </div>

                  </motion.div>
                ))}
              </div>

            )}
          </div>
        </div>
      </section>
    </>
  );
}
export default MyApplication;