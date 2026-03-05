import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { 
  BookOpen, User, Tag, Image as ImageIcon, 
  Link as LinkIcon, IndianRupee, Save, FileText 
} from 'lucide-react';
import Seo from '../../Seo.jsx';
import API from '../../../API.js';

function AddResources() {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: '',
        description: '',
        author: '',
        category: '',
        image: '',
        sellprice: '',
        originalprice: '',
        courseUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await API.post('/api/resources/add', form);
            if (!res.data.success) throw new Error();
            toast.success("Resource added successfully");
            setForm({ title: '', description: '', author: '', category: '', image: '', sellprice: '', originalprice: '', courseUrl: '' });
        } catch (err) {
            toast.error("Failed to add resource. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const theme = {
        bg: darkMode ? 'bg-[#050505]' : 'bg-[#F9FAFB]',
        card: darkMode ? 'bg-[#0D0D0D] border-white/5' : 'bg-white border-slate-200 shadow-sm',
        input: darkMode ? 'bg-white/[0.02] border-white/10 text-white focus:border-lime-500/50' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-yellow-500',
        textMain: darkMode ? 'text-white' : 'text-slate-900',
        textMuted: darkMode ? 'text-slate-500' : 'text-slate-400',
        accentGradient: 'from-yellow-400 to-lime-500',
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 ${theme.bg} ${theme.textMain} font-sans selection:bg-lime-500/30`}>
            <Seo 
                title="Add New Resource | Uplify Admin" 
                description="Create and publish new educational resources for the platform."
            />

            <main className="max-w-4xl mx-auto px-6 pb-28">
                {/* Standard Heading & Description */}
                <header className="mb-10 border-l-4 border-lime-500 pl-4">
                    <h1 className="text-3xl font-bold tracking-tight">Create New Resource</h1>
                    <p className={`text-sm mt-1 font-medium ${theme.textMuted}`}>
                        Fill out the details below to add a new educational asset to the database.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* General Information */}
                    <div className={`p-6 rounded-2xl border ${theme.card} space-y-4`}>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-lime-600 uppercase tracking-wide">Resource Title</label>
                            <div className="relative flex items-center">
                                <BookOpen className="absolute left-3 opacity-30" size={16} />
                                <input
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="Enter course or resource title"
                                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none text-sm transition-all ${theme.input}`}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Description</label>
                            <div className="relative flex items-start">
                                <FileText className="absolute left-3 top-3 opacity-30" size={16} />
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Briefly describe the contents of this resource"
                                    rows={4}
                                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none text-sm transition-all resize-none ${theme.input}`}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Author / Instructor</label>
                                <div className="relative flex items-center">
                                    <User className="absolute left-3 opacity-30" size={16} />
                                    <input name="author" value={form.author} onChange={handleChange} placeholder="Name" className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none text-sm ${theme.input}`} required />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Category</label>
                                <div className="relative flex items-center">
                                    <Tag className="absolute left-3 opacity-30" size={16} />
                                    <input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Coding, AI, Design" className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none text-sm ${theme.input}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Links and Pricing */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className={`p-6 rounded-2xl border ${theme.card} space-y-4`}>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Image URL</label>
                                <div className="relative flex items-center">
                                    <ImageIcon className="absolute left-3 opacity-30" size={16} />
                                    <input name="image" type="url" value={form.image} onChange={handleChange} placeholder="https://image-link.com" className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none text-xs font-mono ${theme.input}`} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Course URL</label>
                                <div className="relative flex items-center">
                                    <LinkIcon className="absolute left-3 opacity-30" size={16} />
                                    <input name="courseUrl" type="url" value={form.courseUrl} onChange={handleChange} placeholder="https://course-link.com" className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none text-xs font-mono ${theme.input}`} />
                                </div>
                            </div>
                        </div>

                        <div className={`p-6 rounded-2xl border ${theme.card} space-y-4`}>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Selling Price</label>
                                <div className="relative flex items-center">
                                    <IndianRupee className="absolute left-3 text-emerald-500" size={16} />
                                    <input name="sellprice" value={form.sellprice} onChange={handleChange} placeholder="0.00" className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none text-sm font-bold ${theme.input}`} required />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Original Price</label>
                                <div className="relative flex items-center">
                                    <IndianRupee className="absolute left-3 opacity-30" size={16} />
                                    <input name="originalprice" value={form.originalprice} onChange={handleChange} placeholder="0.00" className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none text-sm ${theme.input}`} required />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-xl bg-gradient-to-r ${theme.accentGradient} text-black font-bold uppercase tracking-widest text-xs transition-all hover:opacity-90 active:scale-[0.98] shadow-lg shadow-lime-500/10 flex items-center justify-center gap-2`}
                    >
                        {loading ? 'Processing...' : <><Save size={16} /> Save Resource</>}
                    </button>
                </form>
            </main>
        </div>
    );
}

export default AddResources;