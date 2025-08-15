import { useState } from 'react';
import { supabase } from '../../../../superbaseClient.js';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

export default function AddInternships() {

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

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from('internships')
      .insert([form]);

    setLoading(false);

    if (error) {
      toast.error('Failed to add internship!');
      console.error(error.message);
    }
    else {
      toast.success('Job added successfully!');
      setForm({
        title: '',
        company: '',
        location: '',
        stipend: '',
        type: '',
        link: '',
        source_type: '',
        skills: '',
        job_type: '',
      });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center px-4 pt-10 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/10"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Add Internship – Uplify
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Jobs & Internships (e.g., Software Engineer Developer)"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-gray-400 outline-none"
              required
            />

            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-gray-400 outline-none"
              required
            />
            <input
              type="text"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="Skills (e.g., React, Node.js) (optional)"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-gray-400 outline-none"
            />

            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location (e.g., Remote) (Optional)"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-gray-400 outline-none"
            />

            <input
              type="text"
              name="stipend"
              value={form.stipend}
              onChange={handleChange}
              placeholder="Stipend or Salary (e.g., ₹10,000/month) (Optional)"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-gray-400 outline-none"
            />
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg outline-none ${darkMode ? 'bg-white/10 text-red-400' : 'bg-white/10 text-blue-500'
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
              className={`w-full px-4 py-3 rounded-lg outline-none ${darkMode ? 'bg-white/10 text-red-400' : 'bg-white/10 text-blue-500'
                }`}
              required
            >
              <option value="" disabled>Select Job Type</option>
              <option value="Internships">Internship</option>
              <option value="Full-Time">Full-Time</option>
            </select>

            <input
              type="text"
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="Link (e.g., /internship/1) If Forwarded Source, Add Link"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-gray-400 outline-none"
            />
            <div className="flex gap-6 mt-4">
              <label className="flex items-center gap-2 cursor-pointer text-white">
                <input
                  type="radio"
                  name="source_type"
                  value="on-uplify"
                  checked={form.source_type === "on-uplify"}
                  onChange={handleChange}
                  className="appearance-none w-5 h-5 border border-white/40 rounded-full checked:border-purple-500 checked:bg-purple-600 transition-all duration-200"
                />
                <span className="text-sm">Posted on Uplify</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-white">
                <input
                  type="radio"
                  name="source_type"
                  value="forwarded"
                  checked={form.source_type === "forwarded"}
                  onChange={handleChange}
                  className="appearance-none w-5 h-5 border border-white/40 rounded-full checked:border-yellow-500 checked:bg-yellow-400 transition-all duration-200"
                />
                <span className="text-sm">Forwarded Source</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Jobs & Internships'}
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
}