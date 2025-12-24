import React, { useEffect, useState } from 'react';
import {
  Briefcase,
  MapPin,
  IndianRupee,
  SquareArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../superbaseClient.js';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';

export default function FeaturedInternships() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const isAuthenticated = useSelector((state) => state.auth);

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInternships = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('internships')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (!error) setInternships(data);
      setLoading(false);
    };

    fetchInternships();
  }, []);

  const timeAgo = (date) => {
    const diff = new Date() - new Date(date);
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hr ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days} day ago`;
    return `${Math.floor(days / 30)} month ago`;
  };

  return (
    <section
      className={`py-14 px-6 lg:px-20 ${
        darkMode
          ? 'bg-black text-white'
          : 'bg-gradient-to-br from-yellow-50 via-green-50 to-white text-gray-900'
      }`}
    >
      {/* Heading */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-yellow-500 to-green-500 text-transparent bg-clip-text">
          Featured Internships
        </h2>
        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
          Hand-picked opportunities from fast-growing startups & companies
        </p>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {internships.map((job, idx) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={`rounded-2xl p-6 border backdrop-blur-lg
              ${
                darkMode
                  ? 'bg-gray-900/70 border-gray-700'
                  : 'bg-white/70 border-gray-200'
              }
              shadow-md hover:shadow-xl hover:-translate-y-1 transition-all`}
          >
            {/* Company */}
            <div className="flex justify-between items-center mb-2">
              <h4 className="flex items-center gap-2 font-medium text-sm text-green-600">
                <Briefcase size={16} /> {job.company}
              </h4>
              <span className="text-xs text-yellow-600 font-semibold uppercase">
                {job.source_type}
              </span>
            </div>

            {/* Role */}
            <h3 className="text-lg font-semibold mb-3">
              {job.title}
            </h3>

            {/* Skills */}
            {job.skills && (
              <p className="text-sm text-gray-600 mb-3">
                <span className="font-medium">Skills:</span> {job.skills}
              </p>
            )}

            {/* Meta */}
            <div className="space-y-2 text-sm text-gray-600">
              {job.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} /> {job.location}
                </div>
              )}
              {job.stipend && (
                <div className="flex items-center gap-2">
                  <IndianRupee size={14} /> {job.stipend}
                </div>
              )}
              {job.job_type && (
                <div>
                  <span className="font-medium">Type:</span> {job.job_type}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-5">
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium
                ${
                  job.type === 'Remote'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {job.type}
              </span>

              <span className="text-xs text-gray-500">
                {timeAgo(job.created_at)}
              </span>
            </div>

            {/* CTA */}
            <button
              onClick={() =>
                isAuthenticated
                  ? navigate(`/user/internships/u/apply-internships/${job.id}`)
                  : navigate('/login')
              }
              className="mt-5 w-full py-2 rounded-lg font-semibold
                         bg-gradient-to-r from-yellow-500 to-green-500
                         text-gray-900 hover:opacity-90 transition"
            >
              Apply Now →
            </button>
          </motion.div>
        ))}
      </div>

      {/* View All */}
      <div className="mt-14 flex justify-center">
        <Link
          to="/job-internships"
          className="flex items-center gap-2 px-7 py-3 rounded-xl
                     bg-gradient-to-r from-yellow-500 to-green-500
                     text-gray-900 font-semibold shadow-lg
                     hover:scale-105 transition"
        >
          View all internships
          <SquareArrowRight />
        </Link>
      </div>
    </section>
  );
}