import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle, Terminal, User, Tag, Calendar, Edit3, Sparkles, Image as ImageIcon, Layout, Eye
} from 'lucide-react';
import Seo from '../../Seo.jsx';
import API from '../../../API.js';

function UpdateBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [previewMode, setPreviewMode] = useState(false);

    // ⚡ Redux state for dark mode
    const darkMode = useSelector((state) => state.theme.darkMode);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await API.get('/api/all-blogs');
                if (!res.data.success) throw new Error(res.data.message);
                const data = res.data.blogs.find(blog => blog.id === id);
                if (!data) { toast.error("Blog not found"); return; }
                setForm(data);
            } catch (err) {
                toast.error("Failed to load blog data");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const payload = { ...form, fullContent: form.fullContent?.trim() };
            const res = await API.put(`/api/update-blogs/${id}`, payload);
            if (!res.data?.success) throw new Error(res.data?.message || "Update failed");
            toast.success("Blog updated successfully! ✨");
            navigate("/admin/all-blogs");
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // 🎨 Theme Engine - Yellow & Green focus
    const theme = {
        bg: darkMode ? 'bg-[#050505]' : 'bg-[#FAFAFA]',
        card: darkMode ? 'bg-[#0D0D0D] border-white/5' : 'bg-white border-slate-200 shadow-sm',
        input: darkMode ? 'bg-white/[0.02] border-white/10 text-white focus:border-lime-500/50' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-yellow-500',
        label: darkMode ? 'text-lime-500' : 'text-yellow-600',
        textMain: darkMode ? 'text-white' : 'text-slate-900',
        textMuted: darkMode ? 'text-slate-500' : 'text-slate-400',
        accentGradient: 'from-yellow-400 to-lime-500'
    };

    if (loading || !form) return (
        <div className={`flex flex-col items-center justify-center h-screen ${theme.bg}`}>
            <Terminal className={`animate-pulse ${theme.label}`} size={40} />
        </div>
    );

    return (
        <div className={`min-h-screen transition-colors duration-500 ${theme.bg} ${theme.textMain} font-sans selection:bg-lime-500/30`}>
            <Seo title="Update Blog | Uplify Admin" />

            {/* Smart Navbar */}
            <nav className={`sticky top-0 z-50 backdrop-blur-md px-6 py-4 border-b ${darkMode ? 'bg-black/40 border-white/5' : 'bg-white/70 border-slate-200'}`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${theme.textMuted} hover:${theme.label}`}>
                        <ArrowLeft size={14} /> Return
                    </button>
                    
                    <button 
                        onClick={() => setPreviewMode(!previewMode)}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${
                            previewMode 
                            ? 'bg-lime-500 border-lime-500 text-black shadow-lg shadow-lime-500/20' 
                            : `${theme.card}`
                        }`}
                    >
                        {previewMode ? <Edit3 size={14} /> : <Eye size={14} />}
                        {previewMode ? 'Editor' : 'Preview'}
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <header className="mb-10 text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
                        {previewMode ? 'Live Render' : 'Update Blog'}
                    </h1>
                    <p className={`text-sm font-medium ${theme.textMuted}`}>
                        Update your article content and publish to the Uplify network.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left: Editor Section */}
                    <form onSubmit={handleSubmit} className={`space-y-6 transition-all duration-500 ${previewMode ? 'lg:col-span-6' : 'lg:col-span-10 lg:col-start-1'}`}>
                        
                        <div className={`p-8 rounded-[2.5rem] border ${theme.card}`}>
                            <label className={`text-[10px] font-black uppercase tracking-widest mb-4 block ${theme.label}`}>Manifest Headline</label>
                            <input name="title" value={form.title} onChange={handleChange} className="w-full bg-transparent text-3xl font-bold outline-none placeholder:opacity-20" placeholder="Title..." required />
                        </div>

                        {!previewMode && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { name: 'author', label: 'Curator', icon: <User size={12}/> },
                                        { name: 'category', label: 'Taxonomy', icon: <Tag size={12}/> },
                                        { name: 'date', label: 'Date', icon: <Calendar size={12}/>, type: 'date' },
                                    ].map((f) => (
                                        <div key={f.name} className={`p-6 rounded-3xl border transition-all ${theme.input}`}>
                                            <label className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-500 mb-2">{f.icon} {f.label}</label>
                                            <input type={f.type || 'text'} name={f.name} value={form[f.name]} onChange={handleChange} className="w-full bg-transparent outline-none font-bold text-sm [color-scheme:dark]" required />
                                        </div>
                                    ))}
                                </div>
                                <div className={`p-6 rounded-3xl border ${theme.input}`}>
                                    <label className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-500 mb-2"><ImageIcon size={12}/> Image URL</label>
                                    <input name="image" value={form.image} onChange={handleChange} className="w-full bg-transparent outline-none font-mono text-xs text-blue-500" placeholder="https://..." />
                                </div>
                            </>
                        )}

                        <div className={`rounded-[2.5rem] border overflow-hidden ${theme.card}`}>
                            <div className={`px-8 py-4 border-b flex justify-between items-center ${darkMode ? 'bg-white/[0.02]' : 'bg-slate-50'}`}>
                                <span className={`text-[9px] font-black uppercase tracking-widest ${theme.textMuted}`}>Markdown Kernel</span>
                                <div className="flex gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-lime-500/20" />
                                </div>
                            </div>
                            <textarea 
                                name="fullContent" 
                                rows={previewMode ? 24 : 15} 
                                value={form.fullContent} 
                                onChange={handleChange} 
                                className="w-full p-8 bg-transparent outline-none font-mono text-sm leading-relaxed resize-none transition-colors focus:bg-lime-500/[0.01]" 
                                required 
                            />
                        </div>
                        <button type="submit" disabled={loading} className={`w-full py-6 rounded-[2rem] bg-gradient-to-r ${theme.accentGradient} text-black font-black uppercase tracking-[0.3em] text-xs transition-all hover:scale-[1.01] active:scale-95 shadow-xl shadow-lime-500/10 flex items-center justify-center gap-3`}>
                            {loading ? 'SYNCHRONIZING...' : <>PUSH TO PRODUCTION <CheckCircle size={18} /></>}
                        </button>
                    </form>

                    {/* Right: Live Preview - Now darkMode Responsive */}
                    {previewMode && (
                        <div className={`lg:col-span-6 sticky top-32 h-[85vh] overflow-y-auto rounded-[3rem] border p-12 transition-all ${darkMode ? 'bg-white/[0.01] border-white/10' : 'bg-slate-50 border-slate-200 shadow-inner'}`}>
                            <div className={`prose prose-sm ${darkMode ? 'prose-invert' : ''} max-w-none`}>
                                <div className="flex items-center gap-2 text-lime-500 font-black text-[10px] uppercase tracking-[0.4em] mb-10">
                                    <Layout size={16}/> Virtual Environment Render
                                </div>
                                {form.image && <img src={form.image} className="w-full h-72 object-cover rounded-[2rem] mb-10 shadow-2xl" alt="Cover" />}
                                <h2 className={`text-5xl font-black mb-6 tracking-tighter leading-none ${theme.textMain}`}>{form.title || 'Untitled_Draft'}</h2>
                                <div className="flex flex-wrap gap-4 text-[10px] font-black mb-10 uppercase tracking-widest opacity-60">
                                    <span className="px-3 py-1 bg-lime-500/10 text-lime-500 rounded-lg">{form.category}</span>
                                    <span className="py-1">By {form.author}</span>
                                    <span className="py-1">{form.date}</span>
                                </div>
                                <div className={`text-xl leading-relaxed whitespace-pre-wrap ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                    {form.fullContent || 'Awaiting transmission...'}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default UpdateBlog;