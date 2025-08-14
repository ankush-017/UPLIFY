import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../superbaseClient';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Briefcase, FileUser, IndianRupee, MapPin, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { trackBG } from '../assets/image';

function TrackApplication() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { uid } = JSON.parse(localStorage.getItem('uplify_user')) || {};
  const uidString = uid ? uid.toString() : '';
  const darkMode = useSelector((state) => state.theme.darkMode);

  const fetchApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('internships')
      .select('*')
      .eq('uid', uidString);
    if (error) {
      setLoading(false);
      toast.error('Error fetching applications');
      return;
    }
    if (data && data.length > 0) {
      setApplications(data);
    } else {
      // toast.error('No applications found');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('internships').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete');
    } else {
      toast.success('Deleted successfully');
      fetchApplications();
    }
  };

  useEffect(() => {
    fetchApplications();
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
    <div
      className={`min-h-screen px-4 py-10 bg-cover bg-center bg-no-repeat relative transition-all duration-300 ${darkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'
        }`}
      style={{ backgroundImage: `url(${trackBG})` }}
    >
      <div
        className={`absolute inset-0 backdrop-blur-sm ${darkMode ? 'bg-black/60' : 'bg-white/5'
          }`}
      >
      </div>

      <div className="relative z-10">
        <h1 className={`text-2xl md:text-4xl font-bold text-center mb-10 ${darkMode ? "text-purple-600 border-purple-700 " : "text-white border-gray-200 "} border-b-2 pb-4`}>Track Your Applications</h1>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Spin size="large" />
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center text-lg text-gray-500">No applications found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {applications.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 
              ${darkMode ? 'bg-white/5 backdrop-blur-md border-gray-600' : 'bg-black/10 backdrop-blur-md border-gray-300'}`}
              >
                <div className="flex justify-between text-sm font-medium mb-2">
                  <h2 className={`flex items-center gap-2 ${darkMode ? 'text-purple-300' : 'text-purple-400'}`}>
                    <Briefcase size={16} /> {job.company}
                  </h2>
                  <span className="text-blue-400">{job.source_type}</span>
                </div>

                <h3 className={`text-xl font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-200"}`}>{job.title}</h3>
                <div className={`flex items-center text-sm ${darkMode ? "text-blue-400" : "text-blue-400"} gap-2 mb-4`}>
                  <span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-300"}`}>Skills:</span> {job.skills}
                </div>
                <div className={`flex items-center gap-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-300"} mb-1`}>
                  <MapPin size={14} /> {job.location}
                </div>
                <div className={`flex items-center gap-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-300"} mb-3`}>
                  <IndianRupee size={14} /> {job.stipend || 'N/A'}
                </div>

                <div className='flex flex-row justify-between'>
                  <span className={`text-xs px-3 py-1 rounded-full mb-4 inline-block font-medium 
                    ${job.type === 'Remote' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {job.type}
                  </span>
                  <div>
                    <p className={`text-xs mb-3 ${darkMode ? "text-gray-200" : "text-gray-300"}`}>
                      Posted {timeAgo(job.created_at)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-4 flex-wrap">
                  {job.source_type === 'on-uplify' && (
                    <Link
                      to={`/company/job-applicants/${job.id}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white transition"
                    >
                      <FileUser size={16} />
                      View
                    </Link>
                  )}

                  <Link
                    to={`/company/update-internship/${job.id}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white transition"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(job.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default TrackApplication;