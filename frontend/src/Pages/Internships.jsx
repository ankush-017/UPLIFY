import React, { useEffect, useState } from 'react';
import { supabase } from '../../superbaseClient';
import { ArrowBigRightDash, Briefcase, IndianRupee, MapPin, Pencil, SquareArrowRight, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IBD, InternBgLight } from '../assets/image';
import { Spin } from 'antd';
import Login from '../Components/Login';

export default function Internships() {

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [loginShow, setLoginShow] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [internships, setInternships] = useState([]);
  const darkMode = useSelector((state) => state.theme.darkMode);

  // Fetch internships from Supabase
  const fetchInternships = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('internships').select('*');
    if (error) {
      setLoading(false);
      console.error('Error fetching:', error.message);
      toast.error("Not fetched Internships");
    }
    else {
      setInternships(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);
  return (
    <section
      className={`min-h-screen bg-cover bg-center`}
      style={{
        backgroundImage: `url(${darkMode ? IBD : InternBgLight})`,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* ---------- Sidebar ---------- */}
          <aside className="space-y-6">
            {[ // Your sidebar blocks simplified with loop
              {
                title: '📚 Resources',
                links: [
                  { to: '/resources', label: 'Learning Resources' },
                  { to: '/resume-builder', label: 'Resume Builder' }
                ],
                url: '',
              },
              {
                title: '👥 Peer Groups',
                content: 'Join communities to grow and network.',
                links: [{ to: '/peergroups', label: 'Explore Peer Groups' }],
                url: '',
              },
              {
                title: '🚀 Uplify Program',
                content: 'A mentorship-driven path to real-world experience.',
                links: [{ to: '/uplify-program', label: 'View Details' }],
                url: '',
              },
              {
                title: '📝 Blogs',
                links: [
                  { to: '/blog/77cfc88c-6597-42fb-bc6a-812a720bdadc', label: 'Internship Guide' },
                  { to: '/blogs/career-tips', label: 'Career Tips' }
                ],
                url: '/blog',
              },
              {
                title: '📂 Project Library',
                content: 'Find real-world project ideas to practice your skills.',
                links: [{ to: '/projects', label: 'Explore Projects' }]
              },
              {
                title: '📝 Make Your Resume Better',
                content: 'Use our AI Resume Builder to create an impressive resume.',
                links: [{to: '/resume-builder' , label: 'Build Resume →'}]
              }
            ].map((item, index) => (
              <div key={index} className={`${darkMode ? "bg-white/5" : "bg-white"} p-4 rounded-xl shadow`}>
                <div className='flex flex-row justify-between'>
                  <h3 className={`text-lg font-semibold mb-2 ${darkMode?"text-gray-200":"text-gray-900"}`}>{item.title}</h3>
                  <div className={`${darkMode?"text-blue-600":"text-blue-700"} cursor-pointer`} onClick={()=> navigate(item.url)}>
                    <ArrowBigRightDash />
                  </div>
                </div>
                {item.content && <p className={`text-sm mb-2 ${darkMode?"text-gray-200":"text-gray-900"}`}>{item.content}</p>}
                <ul className="text-sm space-y-1">
                  {item.links.map((link, i) => (
                    <li key={i}><Link to={link.to} className="text-blue-500 hover:underline">{link.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>

          {/* ---------- Main Content ---------- */}
          <main className="lg:col-span-3">
            <div className="text-center pb-10">
              <h2 className={`text-3xl md:text-4xl font-bold bg-clip-text ${darkMode?"text-purple-600":"text-blue-700"}
              `}>
                Explore Exciting Internships
              </h2>
              <p className={`pt-2 text-base md:text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-purple-700'}`}>
                Discover real-world opportunities tailored for students and fresh talent—boost your skills, build your career.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Spin size="large" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {internships.map((job, idx) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className={`rounded-2xl p-6 border hover:shadow-xl hover:scale-[1.02] transition-all duration-300 
                  ${darkMode ? "bg-black/20 border-cyan-600" : "bg-white border-cyan-600 shadow-md backdrop-blur-sm"}`}
                  >
                    <div className="flex justify-between text-md font-medium mb-2">
                      <h1 className={`flex items-center gap-2 ${darkMode?"text-purple-500":"text-purple-700"}`}>
                        <Briefcase size={16} /> {job.company}
                      </h1>
                      <span className="text-blue-500 text-sm">{job.source_type}</span>
                    </div>
                    <h3 className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-black"}`}>{job.title}</h3>
                    <div className={`flex items-center text-sm gap-2 mb-1 ${darkMode ? "text-white" : "text-black"}`}>
                      <MapPin size={14} /> {job.location}
                    </div>
                    <div className={`flex items-center text-sm gap-2 mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      <IndianRupee size={14} /> {job.stipend}
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full mb-4 inline-block font-medium 
                    ${job.type === 'Remote' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {job.type}
                    </span>
                    {job.source_type === "on-uplify" ? (
                      <button
                        onClick={() => {
                          if (!isAuthenticated) setLoginShow(true);
                          else navigate(`/internships/u/apply-internships/${job.id}`);
                        }}
                        className="w-full py-2 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90"
                      >
                        Apply Now →
                      </button>
                    ) : isAuthenticated ? (
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block text-center py-2 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90"
                      >
                        Apply Now →
                      </a>
                    ) : (
                      <button
                        onClick={() => setLoginShow(true)}
                        className="w-full py-2 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90"
                      >
                        Apply Now →
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </main>
        </div>

        {loginShow && (
          <Login
            onClose={() => {
              setLoginShow(false);
              navigate('/internships');
            }}
          />
        )}
      </div>
    </section>
  );

}