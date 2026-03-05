import React, { useEffect, useState } from 'react';
import { Briefcase, FileUser, IndianRupee, MapPin, Pencil, Trash2, Plus, Search, Zap, Clock, Code, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Spin } from 'antd';
import API from '../../../API.js';

export default function AllInternships() {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const darkMode = useSelector((state) => state.theme.darkMode);

    const fetchInternships = async () => {
        try {
            setLoading(true);
            const res = await API.get('/api/internships-jobs-all');
            if (!res.data?.success) throw new Error(res.data?.message || "Failed to fetch");
            setInternships(res.data.job || []);
        } 
        catch (error) {
            toast.error("Unable to load listings");
        } 
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInternships();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Permanent delete? This cannot be undone.")) {
            try {
                const res = await API.delete(`/api/internship-jobs-delete/job/${id}`);
                if (res.data.success) {
                    toast.success("Listing removed");
                    fetchInternships();
                }
            } 
            catch (err) {
                toast.error("Delete failed");
            }
        }
    };

    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        if (seconds < 60) return "Just now";
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days < 30) return `${days}d ago`;
        const months = Math.floor(days / 30);
        if (months < 12) return `${months}mo ago`;
        return Math.floor(months / 12) + "y ago";
    };

    const filteredInternships = internships.filter(i => 
        i.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        i.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.skills?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const theme = {
        bg: darkMode ? 'bg-[#050505]' : 'bg-[#FAFAFA]',
        row: darkMode ? 'bg-[#0D0D0D] border-white/5 hover:border-lime-500/30' : 'bg-white border-slate-200 hover:border-yellow-500/50',
        text: darkMode ? 'text-white' : 'text-slate-900',
        muted: darkMode ? 'text-slate-400' : 'text-slate-500',
        accent: 'from-yellow-600 to-lime-600',
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 ${theme.bg} ${theme.text} p-4 pb-14 font-sans`}>
            
            {/* SaaS Header */}
            <div className="max-w-[1600px] mx-auto mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-black tracking-tighter uppercase italic">
                            All <span className={`bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>Jobs & Internships</span> Listing
                        </h2>
                        <p className={`text-[10px] mt-1 font-mono uppercase tracking-[0.3em] ${theme.muted}`}>Accessing all historical & active records</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3">
                        <div className={`relative flex items-center rounded-xl border transition-all ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                            <Search size={14} className="absolute left-4 opacity-40" />
                            <input 
                                type="text"
                                placeholder="Search by role, company, or skills..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent pl-10 pr-4 py-2.5 outline-none text-xs w-full md:w-80"
                            />
                        </div>
                        <Link to="/admin/add-internships" className={`flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${theme.accent} text-black font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-lime-500/10`}>
                            <Plus size={16}/> Create New
                        </Link>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center h-64">
                    <Spin size="large" />
                </div>
            ) : (
                <div className="max-w-[1600px] mx-auto space-y-2">
                    {/* Header Row */}
                    <div className="hidden xl:grid grid-cols-12 px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] opacity-30">
                        <div className="col-span-3">Position & Organization</div>
                        <div className="col-span-3">Technical Skills</div>
                        <div className="col-span-2">Logistics (Loc/Type)</div>
                        <div className="col-span-1">Financials</div>
                        <div className="col-span-1">Timeline</div>
                        <div className="col-span-2 text-right">Administrative</div>
                    </div>

                    <AnimatePresence>
                        {filteredInternships.map((job, idx) => (
                            <motion.div
                                key={job.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.2, delay: idx * 0.02 }}
                                className={`group relative rounded-xl border p-5 xl:p-0 xl:px-6 xl:h-24 flex flex-col xl:grid xl:grid-cols-12 items-center transition-all duration-300 ${theme.row} shadow-sm hover:shadow-md`}
                            >
                                {/* 1. Company & Role */}
                                <div className="col-span-3 w-full flex items-center gap-4 mb-4 xl:mb-0">
                                    <div className={`hidden sm:flex p-3 rounded-xl ${darkMode ? 'bg-white/5 text-lime-400' : 'bg-slate-100 text-lime-600'}`}>
                                        <Briefcase size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black leading-tight tracking-tight uppercase">{job.title}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{job.company}</span>
                                            <span className="h-1 w-1 rounded-full bg-slate-700"></span>
                                            <span className="text-[9px] opacity-50 font-bold uppercase">{job.source_type}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Skills Detail */}
                                <div className="col-span-3 w-full mb-4 xl:mb-0 xl:px-4">
                                    <div className="flex flex-wrap gap-1">
                                        {job.skills ? job.skills.split(',').map((skill, i) => (
                                            <span key={i} className={`text-[8px] font-black px-2 py-0.5 rounded border ${darkMode ? 'bg-lime-500/5 border-lime-500/20 text-lime-400' : 'bg-yellow-500/5 border-yellow-500/20 text-yellow-700'}`}>
                                                {skill.trim()}
                                            </span>
                                        )) : <span className="text-[9px] italic opacity-30">No tags defined</span>}
                                    </div>
                                </div>

                                {/* 3. Location & Type */}
                                <div className="col-span-2 w-full space-y-1 mb-4 xl:mb-0">
                                    <div className="flex items-center gap-2 text-[10px] font-bold">
                                        <MapPin size={12} className="text-lime-500" /> 
                                        <span className="opacity-80">{job.location || 'Remote'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-bold">
                                        <Layers size={12} className="text-yellow-500" /> 
                                        <span className="opacity-80">{job.job_type || 'Internship'}</span>
                                    </div>
                                </div>

                                {/* 4. Stipend */}
                                <div className="col-span-1 w-full mb-4 xl:mb-0">
                                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-500">
                                        <IndianRupee size={12} /> {job.stipend || '0.00'}
                                    </div>
                                    <span className={`text-[8px] font-black uppercase tracking-tighter ${job.type === 'Remote' ? 'text-blue-400' : 'text-orange-400'}`}>
                                        {job.type} Mode
                                    </span>
                                </div>

                                {/* 5. Date Timeline */}
                                <div className="col-span-1 w-full flex xl:flex-col gap-2 xl:gap-0 mb-6 xl:mb-0">
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold opacity-60">
                                        <Clock size={12} /> {timeAgo(job.created_at)}
                                    </div>
                                </div>

                                {/* 6. Admin Actions */}
                                <div className="col-span-2 w-full flex items-center justify-end gap-2">
                                    {job.source_type === 'on-uplify' && (
                                        <Link 
                                            to={`/admin/job-applicants/${job.id}`} 
                                            className={`flex-1 xl:flex-none px-3 py-2 rounded-lg flex items-center justify-center gap-2 text-[10px] font-bold uppercase transition-all ${darkMode ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'}`}
                                        >
                                            <FileUser size={14} /> <span className="xl:hidden">Applicants</span>
                                        </Link>
                                    )}
                                    <Link 
                                        to={`/admin/update-internship/${job.id}`} 
                                        className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-white/5 text-yellow-400 hover:bg-yellow-500 hover:text-black' : 'bg-slate-100 text-yellow-600 hover:bg-yellow-500 hover:text-white'}`}
                                    >
                                        <Pencil size={16} />
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(job.id)} 
                                        className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-red-50 text-red-600 hover:bg-red-500 hover:text-white'}`}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
            {!loading && filteredInternships.length === 0 && (
                <div className="text-center py-32 opacity-20">
                    <Zap size={48} className="mx-auto mb-4 animate-pulse" />
                    <p className="uppercase font-black tracking-[0.5em] text-xs">No records identified</p>
                </div>
            )}
        </div>
    );
}