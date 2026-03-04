import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Briefcase, MapPin, DollarSign, Link as LinkIcon, Code } from 'lucide-react';
import API from '../../../API.js';

export default function AddInternships() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '', company: '', location: '', stipend: '',
    type: '', job_type: '', link: '', source_type: 'on-uplify', skills: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await API.post("/api/add-internships", form);
      if (res.data.success) {
        toast.success("Opportunity listed successfully!");
        setForm({ title: '', company: '', location: '', stipend: '', type: '', job_type: '', link: '', source_type: 'on-uplify', skills: '' });
      }
    } catch (err) {
      toast.error("Error adding internship");
    } finally {
      setLoading(false);
    }
  };

  // Dynamic Theme Classes
  const inputClass = `w-full pl-10 pr-4 py-3 rounded-xl border transition-all outline-none focus:ring-2 focus:ring-[#108B3E] ${
    darkMode 
      ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' 
      : 'bg-white border-gray-200 text-gray-800 placeholder:text-gray-400 shadow-sm'
  }`;

  const labelClass = `text-sm font-semibold mb-1.5 flex items-center gap-2 ${
    darkMode ? 'text-slate-300' : 'text-gray-600'
  }`;

  return (
    <div className="flex justify-center items-center pb-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`w-full max-w-4xl p-8 rounded-3xl border backdrop-blur-xl shadow-2xl ${
          darkMode ? 'bg-[#000000] border-slate-800' : 'bg-white/90 border-gray-100'
        }`}
      >
        <div className="text-center mb-10">
          <h2 className={`text-3xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Post <span className="text-[#108B3E]">New</span> Opportunity
          </h2>
          <p className={`mt-2 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Fill in the details to reach thousands of students on Uplify.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Job Title */}
            <div className="md:col-span-2">
              <label className={labelClass}><Briefcase size={16}/> Job/Internship Title</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#108B3E]"><Briefcase size={18}/></div>
                <input type="text" name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Software Engineer Intern" className={inputClass} />
              </div>
            </div>

            {/* Company & Location */}
            <div>
              <label className={labelClass}>Company Name</label>
              <input type="text" name="company" value={form.company} onChange={handleChange} required placeholder="Google, Uplify, etc." className={inputClass.replace('pl-10', 'pl-4')} />
            </div>

            <div>
              <label className={labelClass}><MapPin size={16}/> Location</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><MapPin size={18}/></div>
                <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="Remote / City" className={inputClass} />
              </div>
            </div>

            {/* Stipend & Skills */}
            <div>
              <label className={labelClass}><DollarSign size={16}/> Stipend/Salary</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><DollarSign size={18}/></div>
                <input type="text" name="stipend" value={form.stipend} onChange={handleChange} placeholder="₹20,000/month" className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}><Code size={16}/> Skills Required</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Code size={18}/></div>
                <input type="text" name="skills" value={form.skills} onChange={handleChange} placeholder="React, Python, Figma" className={inputClass} />
              </div>
            </div>

            {/* Select Menus */}
            <div>
              <label className={labelClass}>Work Mode</label>
              <select name="type" value={form.type} onChange={handleChange} required className={inputClass.replace('pl-10', 'pl-4')}>
                <option value="" disabled>Select Type</option>
                <option value="Remote">Remote</option>
                <option value="On-Site">On-Site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Job Category</label>
              <select name="job_type" value={form.job_type} onChange={handleChange} required className={inputClass.replace('pl-10', 'pl-4')}>
                <option value="" disabled>Select Category</option>
                <option value="Internships">Internship</option>
                <option value="Full-Time">Full-Time</option>
              </select>
            </div>

            {/* Link */}
            <div className="md:col-span-2">
              <label className={labelClass}><LinkIcon size={16}/> Application Link</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><LinkIcon size={18}/></div>
                <input type="text" name="link" value={form.link} onChange={handleChange} placeholder="https://company.com/careers/apply" className={inputClass} />
              </div>
            </div>
          </div>

          {/* Source Type Radios */}
          <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row gap-6 ${darkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
            <span className={labelClass}>Listing Source:</span>
            <div className="flex gap-6">
              {['on-uplify', 'forwarded'].map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="source_type" value={type} checked={form.source_type === type} onChange={handleChange} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                    form.source_type === type ? (type === 'on-uplify' ? 'border-[#108B3E]' : 'border-[#FFD700]') : 'border-gray-400'
                  }`}>
                    {form.source_type === type && <div className={`w-2.5 h-2.5 rounded-full ${type === 'on-uplify' ? 'bg-[#108B3E]' : 'bg-[#FFD700]'}`} />}
                  </div>
                  <span className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                    {type === 'on-uplify' ? 'Uplify Verified' : 'Forwarded Source'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all transform active:scale-[0.98] shadow-lg flex items-center justify-center gap-2
              ${loading ? 'opacity-70 cursor-not-allowed' : 'bg-[#108B3E] hover:bg-[#0D7232] text-white shadow-green-900/20'}
            `}
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            ) : 'Publish Opportunity'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}