import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  ArrowLeft, BookOpen, User, Tag, Image as ImageIcon, 
  Link as LinkIcon, IndianRupee, Save, FileText, Sparkles 
} from 'lucide-react';
import { Spin } from 'antd';
import Seo from '../../Seo.jsx';
import API from '../../../API.js'; // Ensure this path is correct

function UpdateResources() {
    const { id } = useParams();
    const navigate = useNavigate();
    const darkMode = useSelector((state) => state.theme.darkMode);

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [form, setForm] = useState({
        title: '',
        author: '',
        category: '',
        image: '',
        courseUrl: '',
        description: '',
        sellprice: '',
        originalprice: '',
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await API.get(`/api/resources/${id}`);
                if (!res.data.success) throw new Error("Failed to load resource");

                const data = res.data.resource;
                setForm({
                    title: data.title || '',
                    author: data.author || '',
                    category: data.category || '',
                    image: data.image || '',
                    courseUrl: data.courseUrl || '',
                    description: data.description || '',
                    sellprice: data.sellprice || '',
                    originalprice: data.originalprice || '',
                });
            } catch (error) {
                console.error(error);
                toast.error("Resource not found or server error");
                navigate("/admin/all-resources");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const res = await API.put(`/api/resources/${id}`, form);
            if (!res.data.success) throw new Error();

            toast.success("Resource synchronized successfully! ✨");
            navigate("/admin/all-resources");
        } catch (error) {
            console.error(error);
            toast.error("Failed to push updates to cloud");
        } finally {
            setUpdating(false);
        }
    };

    // 🎨 SaaS Theme Engine
    const theme = {
        bg: darkMode ? 'bg-[#050505]' : 'bg-[#F8FAFC]',
        card: darkMode ? 'bg-[#0D0D0D] border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-sm',
        input: darkMode ? 'bg-white/[0.02] border-white/10 text-white focus:border-lime-500/50' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-yellow-500',
        textMain: darkMode ? 'text-white' : 'text-slate-900',
        textMuted: darkMode ? 'text-slate-500' : 'text-slate-400',
        accentGradient: 'from-yellow-400 to-lime-500',
    };

    if (loading) return (
        <div className={`h-screen flex flex-col items-center justify-center ${theme.bg}`}>
            <Spin size="large" />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-lime-500 animate-pulse">Initializing_Editor...</p>
        </div>
    );

    return (
        <div className={`min-h-screen transition-colors duration-500 ${theme.bg} ${theme.textMain} font-sans selection:bg-lime-500/30`}>
            <Seo title={`Update ${form.title} | Uplify Admin`} />

            <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
                {/* 🏷️ Top Navigation Bar */}
                <div className="flex items-center justify-between mb-12">
                    <button 
                        onClick={() => navigate(-1)} 
                        className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${theme.textMuted} hover:text-lime-500 transition-colors`}
                    >
                        <ArrowLeft size={16} /> Back to Hub
                    </button>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${darkMode ? 'bg-lime-500/10 border-lime-500/20 text-lime-400' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-700'} text-[9px] font-black uppercase tracking-widest`}>
                        <Sparkles size={12} /> Resource Node: Active
                    </div>
                </div>

                {/* 📝 Heading Section */}
                <header className="mb-12 border-l-4 border-lime-500 pl-6">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase">
                        Update <span className={`bg-gradient-to-r ${theme.accentGradient} bg-clip-text text-transparent italic`}>Resource.</span>
                    </h1>
                    <p className={`text-sm mt-1 font-medium ${theme.textMuted}`}>Modify existing educational assets and synchronize changes.</p>
                </header>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Primary Content (Left) */}
                    <div className={`lg:col-span-8 p-8 rounded-[2.5rem] border ${theme.card} space-y-6`}>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500"><BookOpen size={14}/> Title</label>
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Enter resource title"
                                className={`w-full px-5 py-3 rounded-xl border outline-none font-bold text-base transition-all ${theme.input}`}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500"><FileText size={14}/> Full Description</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Details about the resource..."
                                rows={6}
                                className={`w-full px-5 py-4 rounded-xl border outline-none font-medium text-sm transition-all resize-none ${theme.input}`}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500"><User size={14}/> Instructor</label>
                                <input name="author" value={form.author} onChange={handleChange} className={`w-full px-5 py-3 rounded-xl border outline-none font-bold text-sm ${theme.input}`} required />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500"><Tag size={14}/> Category</label>
                                <input name="category" value={form.category} onChange={handleChange} placeholder="AI, Coding, etc." className={`w-full px-5 py-3 rounded-xl border outline-none font-bold text-sm ${theme.input}`} />
                            </div>
                        </div>
                    </div>

                    {/* Logistics & Pricing (Right) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* URL Section */}
                        <div className={`p-6 rounded-[2rem] border ${theme.card} space-y-5`}>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500"><ImageIcon size={14}/> Cover Image</label>
                                <input name="image" type="url" value={form.image} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border outline-none font-mono text-xs ${theme.input}`} />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500"><LinkIcon size={14}/> Course URL</label>
                                <input name="courseUrl" type="url" value={form.courseUrl} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border outline-none font-mono text-xs ${theme.input}`} />
                            </div>
                        </div>

                        {/* Pricing Section */}
                        <div className={`p-6 rounded-[2rem] border ${theme.card} space-y-5`}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-500">Sell Price</label>
                                    <div className="relative flex items-center">
                                        <IndianRupee className="absolute left-3 text-emerald-500" size={14} />
                                        <input name="sellprice" value={form.sellprice} onChange={handleChange} className={`w-full pl-8 pr-3 py-3 rounded-xl border outline-none font-black text-sm ${theme.input}`} required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-500">Original</label>
                                    <div className="relative flex items-center">
                                        <IndianRupee className="absolute left-3 opacity-30" size={14} />
                                        <input name="originalprice" value={form.originalprice} onChange={handleChange} className={`w-full pl-8 pr-3 py-3 rounded-xl border outline-none font-bold text-sm opacity-60 ${theme.input}`} required />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Trigger */}
                        <button
                            type="submit"
                            disabled={updating}
                            className={`group relative w-full py-5 rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-lime-500/10 flex items-center justify-center gap-3`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-r ${theme.accentGradient} group-hover:opacity-90 transition-opacity`} />
                            <span className="relative flex items-center justify-center gap-3 text-black font-black uppercase tracking-[0.2em] text-xs">
                                {updating ? 'SYNCHRONIZING...' : <><Save size={18} /> Update Resource</>}
                            </span>
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default UpdateResources;