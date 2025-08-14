import React, { useEffect, useState } from 'react';
import { supabase } from '../../superbaseClient';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Loader2, Briefcase, MapPin, IndianRupee } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function InternshipCompany() {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loginShow, setLoginShow] = useState(false); // add this if not coming from props

  const fetchInterns = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('internships').select('*');
    if (error) {
      setLoading(false);
      toast.error("Error fetching internships");
      return;
    }

    if (data && data.length > 0) {
      setInterns(data);
    } else {
      toast.error("No internships found");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInterns();
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
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
      {/* Bell-shaped Header */}
      <div className="relative bg-blue-500 text-white rounded-b-[80px] pb-10 pt-10 px-6 shadow-lg overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-center leading-tight"
        >
          Discover Exciting Internships
        </motion.h1>
      </div>

      {/* Internship Cards */}
      <div className="max-w-6xl mx-auto pt-12 px-6 pb-16">
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          </div>
        ) : interns.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">No internships available.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {interns.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-6 border hover:shadow-xl hover:scale-[1.02] transition-all duration-300 
                ${darkMode
                    ? "bg-black/20 border-blue-500 text-white"
                    : "bg-white border-blue-500 shadow-md text-gray-900"
                  }`}
              >
                <div className="flex justify-between text-md font-medium mb-2">
                  <h1 className={`flex items-center gap-2 ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
                    <Briefcase size={16} /> {job.company}
                  </h1>
                  <span className="text-blue-500 text-sm">{job.source_type}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                <div className={`flex items-center text-sm ${darkMode ? "text-blue-400" : "text-blue-700"} gap-2 mb-4`}>
                  <span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Skills:</span> {job.skills}
                </div>
                <div className="flex items-center text-sm gap-2 mb-1">
                  <MapPin size={14} /> {job.location}
                </div>
                <div className="flex items-center text-sm gap-2 mb-4">
                  <IndianRupee size={14} /> {job.stipend}
                </div>
                <div className='flex flex-row justify-between'>
                  <span className={`text-xs px-3 py-1 rounded-full mb-4 inline-block font-medium 
                    ${job.type === 'Remote' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {job.type}
                  </span>
                  <div>
                    <p className={`text-xs mb-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Posted {timeAgo(job.created_at)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default InternshipCompany;