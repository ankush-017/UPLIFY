import { useEffect, useState } from 'react';
import { supabase } from '../../../../superbaseClient.js';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';

export default function UpdateInternship() {
  const { id } = useParams();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    stipend: '',
    type: '',
    job_type: '',
    link: '',
    source_type: '',
    skills: '',
  });

  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // Fetch internship data
  useEffect(() => {
    const fetchInternship = async () => {
      const { data, error } = await supabase
        .from('internships')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        toast.error('Failed to fetch internship');
        console.error(error.message);
      } else {
        setForm(data);
      }
      setInitializing(false);
    };
    fetchInternship();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('internships')
      .update(form)
      .eq('id', id);

    setLoading(false);

    if (error) {
      toast.error('Failed to update internship!');
      console.error(error.message);
    } else {
      toast.success('Internship updated successfully!');
      navigate('/admin/all-internships');
    }
  };

  if (initializing) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size={30} />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center px-4 pt-6 pb-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-2xl ${
          darkMode ? 'bg-gray-900' : 'bg-white/5'
        } backdrop-blur-md rounded-2xl p-8 shadow-xl border ${
          darkMode ? 'border-red-500/30' : 'border-white/10'
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-6 text-center ${
            darkMode ? 'text-red-400' : 'text-blue-400'
          }`}
        >
          Update Jobs & Internships – Uplify
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { name: 'title', placeholder: 'Jobs & Internships (e.g., Software Engineer Developer)', required: true },
            { name: 'company', placeholder: 'Company Name', required: true },
            { name: 'skills', placeholder: 'Skills (e.g., React, Node.js) (Optional)' },
            { name: 'location', placeholder: 'Location (e.g., Remote) (Optional)' },
            { name: 'stipend', placeholder: 'Stipend or Salary (e.g., ₹10,000/month) (Optional)' },
            { name: 'link', placeholder: 'Link (Optional)' },
          ].map(({ name, placeholder, required }) => (
            <input
              key={name}
              type="text"
              name={name}
              value={form[name] || ''}
              onChange={handleChange}
              placeholder={placeholder}
              className={`w-full px-4 py-3 rounded-lg ${
                darkMode ? 'bg-gray-800 text-white' : 'bg-white/10 text-white'
              } placeholder:text-gray-400 outline-none`}
              {...(required && { required: true })}
            />
          ))}

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg outline-none ${
              darkMode ? 'bg-gray-800 text-red-400' : 'bg-white/10 text-blue-500'
            }`}
            required
          >
            <option value="" disabled>Select Internship Type</option>
            <option value="Remote">Remote</option>
            <option value="On-Site">On-Site</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          <select
            name="job_type"
            value={form.job_type}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg outline-none ${
              darkMode ? 'bg-gray-800 text-red-400' : 'bg-white/10 text-blue-500'
            }`}
            required
          >
            <option value="" disabled>Select Job Type</option>
            <option value="Internships">Internship</option>
            <option value="Full-Time">Full-Time</option>
          </select>

          <div className="flex gap-6 mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="source_type"
                value="on-uplify"
                checked={form.source_type === 'on-uplify'}
                onChange={handleChange}
                className="appearance-none w-5 h-5 border rounded-full checked:border-purple-500 checked:bg-purple-600 transition-all duration-200"
              />
              <span className={darkMode ? 'text-red-300' : 'text-blue-300'}>Posted on Uplify</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="source_type"
                value="forwarded"
                checked={form.source_type === 'forwarded'}
                onChange={handleChange}
                className="appearance-none w-5 h-5 border rounded-full checked:border-yellow-500 checked:bg-yellow-400 transition-all duration-200"
              />
              <span className={darkMode ? 'text-red-300' : 'text-blue-300'}>Forwarded Source</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'
            } text-white font-bold py-3 rounded-lg transition disabled:opacity-50`}
          >
            {loading ? 'Updating...' : 'Update Jobs & Internships'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}