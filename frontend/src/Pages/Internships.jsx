import React, { useEffect, useState } from 'react';
import { supabase } from '../../superbaseClient';
import { Briefcase, IndianRupee, MapPin, Pencil, SquareArrowRight, Trash2 } from 'lucide-react';
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
      className={`min-h-screen px-6 md:px-16 py-10 bg-cover bg-center relative`}
      style={{
        backgroundImage: `url(${darkMode ? IBD : InternBgLight})`,
      }}
    >
      <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ---------- Sidebar (Left) ---------- */}
        <div className="lg:col-span-1 space-y-6">
          <div className={`${darkMode ? "bg-white/10" : "bg-white"} p-4 rounded-xl shadow`}>
            <h3 className="text-lg font-semibold mb-2">📚 Resources</h3>
            <ul className="text-sm space-y-1">
              <li><Link to="/resources" className="text-blue-500 hover:underline">Learning Resources</Link></li>
              <li><Link to="/resume-builder" className="text-blue-500 hover:underline">Resume Builder</Link></li>
            </ul>
          </div>

          <div className={`${darkMode ? "bg-white/10" : "bg-white"} p-4 rounded-xl shadow`}>
            <h3 className="text-lg font-semibold mb-2">👥 Peer Groups</h3>
            <p className="text-sm mb-2">Join communities to grow and network.</p>
            <Link to="/peergroups" className="text-blue-500 hover:underline text-sm">Explore Peer Groups</Link>
          </div>

          <div className={`${darkMode ? "bg-white/10" : "bg-white"} p-4 rounded-xl shadow`}>
            <h3 className="text-lg font-semibold mb-2">🚀 Uplify Program</h3>
            <p className="text-sm mb-2">A mentorship-driven path to real-world experience.</p>
            <Link to="/uplify-program" className="text-blue-500 hover:underline text-sm">View Details</Link>
          </div>

          <div className={`${darkMode ? "bg-white/10" : "bg-white"} p-4 rounded-xl shadow`}>
            <h3 className="text-lg font-semibold mb-2">📝 Blogs</h3>
            <ul className="text-sm space-y-1">
              <li><Link to="/blogs/internship-guide" className="text-blue-500 hover:underline">Internship Guide</Link></li>
              <li><Link to="/blogs/career-tips" className="text-blue-500 hover:underline">Career Tips</Link></li>
            </ul>
          </div>

          <div className={`${darkMode ? "bg-white/10" : "bg-white"} p-4 rounded-xl shadow`}>
            <h3 className="text-lg font-semibold mb-2">📂 Project Library</h3>
            <p className="text-sm mb-2">Find real-world project ideas to practice your skills.</p>
            <Link to="/projects" className="text-blue-500 hover:underline text-sm">Explore Projects</Link>
          </div>
        </div>

        {/* ---------- Main Content (Right) ---------- */}
        <div className="lg:col-span-3 md:pl-14">
          <div className="text-center mb-10">
            <h2
              className={`text-3xl md:text-4xl font-bold pb-2 bg-clip-text text-transparent 
              ${darkMode ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gradient-to-r from-blue-700 to-purple-700"}`}
            >
              Explore Exciting Internships
            </h2>
            <p className={`text-sm md:text-base font-semibold ${darkMode ? 'text-gray-300' : 'text-purple-700'}`}>
              Discover real-world opportunities tailored for students and fresh talent—boost your skills, build your career.
            </p>
          </div>

          {loading && (
            <div className="flex justify-center items-center">
              <Spin size={50} />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {internships.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`${darkMode ? "bg-black/20" : "bg-white/20"} backdrop-blur-sm rounded-2xl shadow-md p-6 border border-cyan-600 hover:shadow-xl hover:scale-[1.02] transition-all duration-300`}
              >
                <div className={`mb-2 flex justify-between gap-2 text-md ${darkMode ? "text-purple-400" : "text-purple-800"} font-medium`}>
                  <h1 className='flex justify-between items-center gap-3'><Briefcase size={16} /> {job.company}</h1>
                  <p className='text-blue-500 text-sm'>{job.source_type}</p>
                </div>
                <h3 className={`text-lg font-semibold ${darkMode ? "text-gray-300" : "text-black"} mb-2`}>{job.title}</h3>

                <div className={`flex items-center text-sm ${darkMode ? "text-gray-200" : "text-gray-900"} gap-2 mb-1`}>
                  <MapPin size={14} /> {job.location}
                </div>
                <div className={`flex items-center text-sm ${darkMode ? "text-gray-200" : "text-gray-900"} gap-2 mb-4`}>
                  <IndianRupee size={14} /> {job.stipend}
                </div>

                <span className={`text-xs px-3 py-1 rounded-full font-medium mb-4 inline-block 
                                ${job.type === 'Remote' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                  {job.type}
                </span>

                {job.source_type === "on-uplify" ? (
                  <button
                    onClick={() => {
                      if (!isAuthenticated) {
                        setLoginShow(true);
                      } else {
                        navigate(`/internships/u/apply-internships/${job.id}`);
                      }
                    }}
                    className="inline-block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
                  >
                    Apply Now →
                  </button>
                ) : isAuthenticated ? (
                  <Link
                    to={job.link}
                    className="inline-block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
                  >
                    Apply Now →
                  </Link>
                ) : (
                  <button
                    onClick={() => setLoginShow(true)}
                    className="inline-block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
                  >
                    Apply Now →
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {loginShow && (
        <Login
          onClose={() => {
            setLoginShow(false);
            navigate('/internships');
          }}
        />
      )}
    </section>
  );
}