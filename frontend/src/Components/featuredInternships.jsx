import React, { use, useEffect, useState } from 'react';
import { Briefcase, MapPin, IndianRupee, SquareArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../superbaseClient.js';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';

export default function FeaturedInternships() {

  const darkMode = useSelector((state) => state.theme.darkMode);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchInternships = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("internships")
        .select("*")
        .order('created_at', { ascending: false })
        .limit(3); // fetch only 3

      if (error) {
        setLoading(false);
        console.error("Error fetching internships:", error);
      }
      else {
        setInternships(data);
        setLoading(false);
      }
    };

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
    <section className={`py-10 px-6 lg:px-20 ${darkMode
      ? "bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white"
      : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900"
      }`}>

      <div className="max-w-7xl mx-auto text-center mb-8">
        <h2 className={`text-3xl md:text-4xl font-extrabold ${darkMode ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gradient-to-r from-blue-600 to-purple-600"} text-transparent bg-clip-text`}>
          Featured Internships
        </h2>
        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mt-2 text-sm md:text-base`}>
          Curated internships from top startups & companies in India
        </p>
      </div>
      {
        loading && (<div className='flex justify-center items-center'><Spin size={50} /></div>)
      }
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {internships.map((job, idx) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={`${darkMode ? "bg-gray-900 border-gray-500" : "bg-white border-gray-100"} rounded-2xl shadow-md p-6 border hover:shadow-xl hover:scale-[1.02] transition-all duration-300`}
          >
            <div className={`mb-2 flex justify-between gap-2 text-md ${darkMode ? "text-purple-400" : "text-purple-800"} font-medium`}>
              <h1 className='flex justify-between items-center gap-3'><Briefcase size={16} /> {job.company}</h1>
              <p className='text-blue-500 text-sm'>{job.source_type}</p>
            </div>
            <h3 className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"} mb-2`}>{job.title}</h3>
            {/* Skills */}
            {job.skills && (
              <div className={`flex items-center text-sm ${darkMode ? "text-blue-400" : "text-blue-700"} gap-2 mb-4`}>
                <span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Skills:
                </span>
                {job.skills}
              </div>
            )}

            {/* Location */}
            {job.location && (
              <div className={`flex items-center text-sm gap-2 mb-1 ${darkMode ? "text-white" : "text-black"}`}>
                <MapPin size={14} /> {job.location}
              </div>
            )}

            {/* Stipend */}
            {job.stipend && (
              <div className={`flex items-center text-sm gap-2 mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <IndianRupee size={14} /> {job.stipend}
              </div>
            )}

            {/* Job-Type */}
            {job.job_type && (
              <div className={`flex items-center text-sm gap-2 mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Type:
                </span>  {job.job_type}
              </div>
            )}
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
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center">
        <Link
          to="/job-internships"
          className="gap-2 flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          <span className="font-semibold">View all internships </span>
          <SquareArrowRight />
        </Link>
      </div>
    </section>
  );
}