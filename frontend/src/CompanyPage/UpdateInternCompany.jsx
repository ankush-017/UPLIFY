import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { supabase } from '../../superbaseClient.js';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { postCompany } from '../assets/image.js';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin } from 'antd';

function UpdateInternCompany() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

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
        setForm(data || {});
      }

      setInitializing(false);
    };

    fetchInternship();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('internships').update(form).eq('id', id);
    setLoading(false);

    if (error) {
      toast.error('Failed to update internship!');
      console.error(error.message);
    } else {
      toast.success('Internship updated successfully!');
      navigate('/company/track-application');
    }
  };

  if (initializing) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      className={`${darkMode ? 'bg-[#0f172a]' : 'bg-blue-50'} min-h-screen flex flex-col justify-center pt-10 items-center px-4 pb-20 transition-colors duration-300`}
    >
      <h2 className={`text-2xl md:text-4xl font-bold text-center mb-8 px-6 py-4 rounded-xl shadow-md backdrop-blur-md
        ${darkMode ? 'text-white bg-white/10' : 'text-blue-600 bg-blue-100/60'}`}>
        ✏️ Update Internship Details
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-6xl flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-xl border-[2px]
        ${darkMode ? 'bg-[#1e293b] border-blue-700 text-white' : 'bg-white border-blue-700 text-gray-900'}`}
      >
        <div className="hidden md:block md:w-1/2 p-8">
          <img
            src={postCompany}
            alt="Internship"
            className="h-full w-full object-cover rounded-l-2xl"
          />
        </div>

        <div className="w-full md:w-1/2 ">
          <div className="flex justify-center items-center md:px-4 md:pt-6 md:pb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`w-full max-w-2xl rounded-2xl p-6 shadow-xl border
                ${darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}
            >
              <h2 className={`text-2xl font-bold text-center mb-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                Update Internship - Uplify
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { name: 'title', placeholder: 'Internship Title' },
                  { name: 'company', placeholder: 'Company Name' },
                  { name: 'location', placeholder: 'Location (e.g., Remote)' },
                  { name: 'stipend', placeholder: 'Stipend (e.g., ₹10,000/month)' },
                  { name: 'link', placeholder: 'Link (e.g., /internship/1)' },
                  { name: 'skills', placeholder: '(e.g., Reactjs, Nodejs)' },
                ].map(({ name, placeholder }) => (
                  <div key={name} className="space-y-2">
                    <label htmlFor={name} className={`block text-sm font-medium ${darkMode ? 'text-blue-300' : 'text-blue-500'}`}>
                      {name}
                    </label>
                    <input
                      type="text"
                      name={name}
                      value={form[name] || ''}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className={`w-full px-4 py-3 rounded-lg outline-none transition
                        ${darkMode
                          ? 'bg-white/10 text-white placeholder:text-gray-400'
                          : 'bg-gray-100 text-black placeholder:text-gray-500'}`}
                       {...(name !== 'link' && { required: true })}
                    />
                  </div>
                ))}

                <div className="space-y-2">
                  <label htmlFor="Type" className={`block text-sm font-medium ${darkMode ? 'text-blue-300' : 'text-blue-500'}`}>
                    Type
                  </label>
                  <select
                    name="type"
                    value={form.type || ''}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg outline-none
                      ${darkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-black'}`}
                    required
                  >
                    <option value="Remote">Remote</option>
                    <option value="In-office">In-office</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="flex gap-6 mt-4">
                  {['on-uplify', 'forwarded'].map((option) => (
                    <label key={option} className={`flex items-center gap-2 cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}>
                      <input
                        type="radio"
                        name="source_type"
                        value={option}
                        checked={form.source_type === option}
                        onChange={handleChange}
                        className={`appearance-none w-5 h-5 border rounded-full 
                          ${option === 'on-uplify'
                            ? 'checked:border-purple-500 checked:bg-purple-600'
                            : 'checked:border-yellow-500 checked:bg-yellow-400'} transition-all duration-200`}
                      />
                      <span className="text-sm capitalize">{option.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Internship'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default UpdateInternCompany;