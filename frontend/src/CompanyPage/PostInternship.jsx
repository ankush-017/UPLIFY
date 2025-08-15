import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { supabase } from '../../superbaseClient.js';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { postCompany } from '../assets/image.js';

function PostInternship() {
    const vantaRef = useRef(null);
    const [vantaEffect, setVantaEffect] = useState(null);

    useEffect(() => {
        if (!window.VANTA || !window.VANTA.FOG) return;

        if (!vantaEffect) {
            setVantaEffect(
                window.VANTA.FOG({
                    el: vantaRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    highlightColor: 0x4f0e9a,
                    midtoneColor: 0x2f0684,
                    lowlightColor: 0x180990,
                    baseColor: 0x948fd4,
                })
            );
        }

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    const darkMode = useSelector((state) => state.theme.darkMode);
    const { uid } = JSON.parse(localStorage.getItem('uplify_user')) || {};
    const uidString = uid ? uid.toString() : '';

    const [form, setForm] = useState({
        title: '',
        company: '',
        location: '',
        stipend: '',
        type: '',
        job_type: '',
        link: '',
        source_type: '',
        uid: uidString,
        skills: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await supabase.from('internships').insert([form]);

        setLoading(false);

        if (error) {
            toast.error('Failed to add internship!');
            console.error(error.message);
        } else {
            toast.success('Job added successfully!');
            setForm({
                title: '',
                company: '',
                location: '',
                stipend: '',
                type: '',
                job_type: '',
                link: '',
                source_type: '',
                uid: uidString,
                skills: '',
            });
        }
    };

    return (
        <div
            ref={vantaRef}
            className={`${darkMode ? 'bg-black' : 'bg-blue-50'} min-h-screen flex flex-col justify-center md:pt-8 pt-10 items-center px-4 pb-20`}
        >
            <h2
                className={`text-2xl md:text-4xl font-extrabold text-center mb-8 px-6 py-4 rounded-xl shadow-md backdrop-blur-md bg-white/20 dark:bg-black/30 ${darkMode ? 'text-white' : 'text-blue-400'
                    }`}
            >
                🚀 Post an Exciting Internship / Job Opportunity
            </h2>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`w-full max-w-6xl flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-xl border-[2px] ${darkMode ? 'bg-black/60 border-red-700 text-white' : 'bg-white backdrop-blur-md border-blue-700 text-gray-900'
                    }`}
            >
                {/* Left Side Image */}
                <div className="hidden md:block md:w-1/2 p-8">
                    <img src={postCompany} alt="Internship" className="h-full w-full object-cover rounded-l-2xl" />
                </div>

                {/* Right Side Form */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>
                        Post Jobs & Internships – Uplify
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Title */}
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Title"
                            className={`w-full px-4 py-3 rounded-lg outline-none ${darkMode ? 'bg-white/10 text-white placeholder:text-gray-400' : 'bg-gray-100 text-gray-800 placeholder:text-gray-500'
                                }`}
                            required
                        />

                        {/* Company */}
                        <input
                            type="text"
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            placeholder="Company"
                            className={`w-full px-4 py-3 rounded-lg outline-none ${darkMode ? 'bg-white/10 text-white placeholder:text-gray-400' : 'bg-gray-100 text-gray-800 placeholder:text-gray-500'
                                }`}
                            required
                        />

                        {/* Location */}
                        <input
                            type="text"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="Location (Optional)"
                            className={`w-full px-4 py-3 rounded-lg outline-none ${darkMode ? 'bg-white/10 text-white placeholder:text-gray-400' : 'bg-gray-100 text-gray-800 placeholder:text-gray-500'
                                }`}
                        />

                        {/* Stipend */}
                        <input
                            type="text"
                            name="stipend"
                            value={form.stipend}
                            onChange={handleChange}
                            placeholder="Stipend (Optional)"
                            className={`w-full px-4 py-3 rounded-lg outline-none ${darkMode ? 'bg-white/10 text-white placeholder:text-gray-400' : 'bg-gray-100 text-gray-800 placeholder:text-gray-500'
                                }`}
                        />

                        {/* Link */}
                        <input
                            type="text"
                            name="link"
                            value={form.link}
                            onChange={handleChange}
                            placeholder="Link (Optional) If Forwarded Source"
                            className={`w-full px-4 py-3 rounded-lg outline-none ${darkMode ? 'bg-white/10 text-white placeholder:text-gray-400' : 'bg-gray-100 text-gray-800 placeholder:text-gray-500'
                                }`}
                        />

                        {/* Skills */}
                        <input
                            type="text"
                            name="skills"
                            value={form.skills}
                            onChange={handleChange}
                            placeholder="Skills (Optional)"
                            className={`w-full px-4 py-3 rounded-lg outline-none ${darkMode ? 'bg-white/10 text-white placeholder:text-gray-400' : 'bg-gray-100 text-gray-800 placeholder:text-gray-500'
                                }`}
                        />
                        {/* Internship Type */}
                        <select
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg outline-none ${darkMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'
                                }`}
                            required
                        >
                            <option value="" disabled>Select Internship Type</option>
                            <option value="Remote">Remote</option>
                            <option value="In-office">In-office</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>

                        {/* Job Type */}
                        <select
                            name="job_type"
                            value={form.job_type}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg outline-none ${darkMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'
                                }`}
                            required
                        >
                            <option value="" disabled>Select Job Type</option>
                            <option value="Internships">Internship</option>
                            <option value="Full-Time">Full-Time</option>
                        </select>

                        {/* Source Type Radio */}
                        <div className="flex gap-6 mt-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="source_type"
                                    value="on-uplify"
                                    checked={form.source_type === 'on-uplify'}
                                    onChange={handleChange}
                                    className={`appearance-none w-5 h-5 border rounded-full checked:border-purple-500 checked:bg-purple-600 ${darkMode ? 'border-white/40' : 'border-gray-500'
                                        }`}
                                />
                                <span className={`${darkMode ? 'text-white' : 'text-gray-800'} text-sm`}>Posted on Uplify</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="source_type"
                                    value="forwarded"
                                    checked={form.source_type === 'forwarded'}
                                    onChange={handleChange}
                                    className={`appearance-none w-5 h-5 border rounded-full checked:border-yellow-500 checked:bg-yellow-400 ${darkMode ? 'border-white/40' : 'border-gray-500'
                                        }`}
                                />
                                <span className={`${darkMode ? 'text-white' : 'text-gray-800'} text-sm`}>Forwarded Source</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
                        >
                            {loading ? 'Adding...' : 'Add Jobs & Internships'}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
export default PostInternship;