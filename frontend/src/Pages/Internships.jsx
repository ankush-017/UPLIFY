import React, { useEffect, useState } from 'react';
import { supabase } from '../../superbaseClient';
import { ArrowBigRightDash, Briefcase, IndianRupee, MapPin, Pencil, SquareArrowRight, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IBD, InternBgLight, UILight } from '../assets/image';
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
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const fetchInternships = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('internships').select('*')
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: false });
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

  const timeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffMs = now - posted;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };


  return (
    <>
      <section
        className={`min-h-screen bg-cover bg-center`}
        style={{
          backgroundImage: `url(${darkMode ? IBD : UILight})`,
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* ---------- Sidebar ---------- */}
            <aside className="space-y-6">
              {[
                {
                  title: '📚 Resources',
                  links: [
                    { to: '/resources', label: 'Learning Resources' },
                  ],
                  url: '/user/resources',
                },
                {
                  title: '👥 Community Post',
                  content: 'Join communities to grow and network.',
                  links: [{ to: '/user/uplify-community', label: 'Explore Community' }],
                  url: '/user/uplify-community',
                },
                {
                  title: '🚀 Uplify Program',
                  content: 'A mentorship-driven path to real-world experience.',
                  links: [{ to: '/user/uplify-internship', label: 'View Real-World Internships' }],
                  url: '/user/uplify-internship',
                },
                {
                  title: '📝 Blogs',
                  links: [
                    { to: '/blog/d5d074b3-2b2b-416d-8d24-84b30a0d8445', label: 'How to Make a Professional Resume' },
                    { to: '/blogs/cc75a1f9-c63e-458d-8073-8591b958db39', label: 'The Ultimate 6-Month Guide to Mastering Data Structures and Algorithms (DSA)' }
                  ],
                  url: '/blog',
                },
                {
                  title: '📂 Project Library',
                  content: 'Find real-world project ideas to practice your skills.',
                  links: [{ to: '/user/projects-libray', label: 'Explore Projects' }],
                  url: '/user/projects-libray'
                },
                {
                  title: '📝 Make Your Resume Better',
                  content: 'Use our AI Resume Builder to create an impressive resume.',
                  links: [{ to: '/user/resume-builder', label: 'Build Resume →' }],
                  url: '/user/resume-builder'
                }
              ].map((item, index) => (
                <div key={index} className={`${darkMode ? "bg-white/5" : "bg-white"} p-4 rounded-xl shadow`}>
                  <div className='flex flex-row justify-between'>
                    <h3 className={`text-lg font-semibold mb-2 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>{item.title}</h3>
                    {/* <div className={`${darkMode ? "text-blue-600" : "text-blue-700"} cursor-pointer`} onClick={() => navigate(item.url)}>
                      <ArrowBigRightDash />
                    </div> */}
                  </div>
                  {item.content && <p className={`text-sm mb-2 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>{item.content}</p>}
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
                <h2 className={`text-3xl md:text-4xl font-bold bg-clip-text ${darkMode ? "text-purple-600" : "text-blue-700"}
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
                  {internships.length === 0 ? (
                    <div className="text-center flex items-center justify-center text-gray-600 text-lg">
                      No internships available.
                    </div>
                  ) : (
                    internships.map((job, idx) => (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className={`rounded-2xl p-6 border hover:shadow-xl hover:scale-[1.02] transition-all duration-300 
            ${darkMode ? "bg-black/20 border-cyan-600" : "bg-gray-100 border-cyan-600 shadow-md backdrop-blur-sm"}`}
                      >
                        {/* Company + Source */}
                        <div className="flex justify-between text-md font-medium mb-2">
                          <h1 className={`flex items-center gap-2 ${darkMode ? "text-purple-500" : "text-purple-700"}`}>
                            <Briefcase size={16} /> {job.company}
                          </h1>
                          <span className="text-blue-500 text-sm">{job.source_type}</span>
                        </div>

                        {/* Title */}
                        <h3 className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                          {job.title}
                        </h3>

                        {/* Skills */}
                        <div className={`flex items-center text-sm ${darkMode ? "text-blue-400" : "text-blue-700"} gap-2 mb-4`}>
                          <span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            Skills:
                          </span>
                          {job.skills}
                        </div>

                        {/* Location */}
                        <div className={`flex items-center text-sm gap-2 mb-1 ${darkMode ? "text-white" : "text-black"}`}>
                          <MapPin size={14} /> {job.location}
                        </div>

                        {/* Stipend */}
                        <div className={`flex items-center text-sm gap-2 mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <IndianRupee size={14} /> {job.stipend}
                        </div>

                        {/* Type + Posted Date */}
                        <div>
                          <div className="flex flex-row justify-between">
                            <span
                              className={`text-xs px-3 py-1 rounded-full mb-4 inline-block font-medium 
                  ${job.type === "Remote" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                            >
                              {job.type}
                            </span>
                            <div>
                              <p className={`text-xs mb-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                Posted {timeAgo(job.created_at)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Apply Button */}
                        {job.source_type === "on-uplify" ? (
                          <button
                            onClick={() => {
                              if (!isAuthenticated) setLoginShow(true);
                              else navigate(`/user/internships/u/apply-internships/${job.id}`);
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
                    ))
                  )}
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
    </>
  );

}