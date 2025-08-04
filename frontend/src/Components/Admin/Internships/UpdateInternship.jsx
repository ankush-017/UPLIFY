import { useEffect, useState } from 'react';
import { supabase } from '../../../../superbaseClient.js';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

export default function UpdateInternship() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState(null);

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
            }
            else {
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
            navigate('/admin/all-internships'); // Navigate to list page
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

        <>
            <div className="flex justify-center items-center px-4 pt-6 pb-14">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-2xl bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/10"
                >
                    <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">
                        Update Internship - Uplify
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {[
                            { name: 'title', placeholder: 'Internship Title' },
                            { name: 'company', placeholder: 'Company Name' },
                            { name: 'location', placeholder: 'Location (e.g., Remote)' },
                            { name: 'stipend', placeholder: 'Stipend (e.g., ₹10,000/month)' },
                            { name: 'link', placeholder: 'Link (e.g., /internship/1)' },
                            { name: 'skills', placeholder: 'Skills (e.g., Reactjs, Nodejs)' },
                        ].map(({ name, placeholder }) => (
                            <div key={name} className="space-y-2">
                                <label
                                    htmlFor={name}
                                    className="block text-sm font-medium text-blue-400 capitalize"
                                >
                                    {name}
                                </label>
                                <input
                                    key={name}
                                    type="text"
                                    name={name}
                                    value={form[name]}
                                    onChange={handleChange}
                                    placeholder={placeholder}
                                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-gray-400 outline-none"
                                    {...name !== 'link' && { required: true }}
                                />
                            </div>
                        ))}
                        <div className="space-y-2">
                            <label
                                htmlFor="Type"
                                className="block text-sm font-medium text-blue-400 capitalize"
                            >
                                Type
                            </label>
                            <select
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white outline-none"
                                required
                            >
                                <option value="Remote">Remote</option>
                                <option value="In-office">In-office</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>

                        <div className="flex gap-6 mt-4">
                            <label className="flex items-center gap-2 cursor-pointer text-white">
                                <input
                                    type="radio"
                                    name="source_type"
                                    value="on-uplify"
                                    checked={form.source_type === 'on-uplify'}
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
                                    checked={form.source_type === 'forwarded'}
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
                            {loading ? 'Updating...' : 'Update Internship'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </>
    );
}