import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../superbaseClient.js';
import { Briefcase, FileUser, IndianRupee, MapPin, Pencil, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Spin } from 'antd';

export default function AllInternships() {

    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(false);
    const darkMode = useSelector((state) => state.theme.darkMode);
    // const {user} = useSelector((state) => state.auth);
    // const uid = user?.uid;

    // Fetch internships from Supabase
    const fetchInternships = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('internships').select('*');
        if (error) {
            setLoading(false);
            console.error('Error fetching:', error.message);
            toast.error("Not fetched Internships");
        }
        else {
            setInternships(data);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInternships();
    }, []);

    // Handle delete
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure to delete this internship?")) {
            const { error } = await supabase.from('internships').delete().eq('id', id);
            if (error) {
                console.error(error.message);
                toast.error("Error on delete Internships")
            }
            else fetchInternships();
        }
    };

    return (
        <>
            <section
                className={`min-h-screen px-6 py-10 `}
            >
                <div className="max-w-7xl mx-auto text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white text-transparent bg-clip-text">
                        All Internships
                    </h2>
                </div>
                {
                    loading && (<div className='flex justify-center items-center'><Spin /></div>)
                }
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {internships.map((job, idx) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className={`bg-black/5 backdrop-blur-sm rounded-2xl shadow-md p-6 border hover:shadow-xl hover:scale-[1.02] transition-all duration-300`}
                        >
                            <div className={`mb-2 flex justify-between gap-2 text-md ${darkMode ? "text-purple-400" : "text-purple-500"} font-medium`}>
                                <h1 className='flex justify-between items-center gap-3'><Briefcase size={16} /> {job.company}</h1>
                                <p className='text-blue-500 text-sm'>{job.source_type}</p>
                            </div>
                            <h3 className={`text-lg font-semibold text-white mb-2`}>{job.title}</h3>
                            <div className={`flex items-center text-sm ${darkMode ? "text-blue-400" : "text-blue-700"} gap-2 mb-4`}>
                                <span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Skills:</span> {job.skills}
                            </div>
                            <div className={`flex items-center text-sm text-gray-300 gap-2 mb-1`}>
                                <MapPin size={14} /> {job.location}
                            </div>
                            <div className={`flex items-center text-sm text-gray-300 gap-2 mb-4`}>
                                <IndianRupee size={14} /> {job.stipend}
                            </div>

                            <span className={`text-xs px-3 py-1 rounded-full font-medium mb-4 inline-block 
                                ${job.type === 'Remote' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                {job.type}
                            </span>

                            <div className="flex gap-3">
                                {
                                    job.source_type === 'on-uplify' && (
                                        <Link
                                            to={`/admin/job-applicants/${job.id}`}
                                            className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                                        >
                                            <FileUser size={16} />
                                            View
                                        </Link>
                                    )
                                }
                                <Link
                                    to={`/admin/update-internship/${job.id}`}
                                    className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                                >
                                    <Pencil size={16} />
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(job.id)}
                                    className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </>
    );
}