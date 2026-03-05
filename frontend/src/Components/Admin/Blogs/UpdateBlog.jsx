import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle, Terminal, User, Tag, Calendar, 
  Edit3, Layout, Eye, Globe, ImageIcon, Save 
} from 'lucide-react';
import ReactMarkdown from 'react-markdown'; 
import Seo from '../../Seo.jsx';
import API from '../../../API.js';

function UpdateBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [previewMode, setPreviewMode] = useState(false);

    const darkMode = useSelector((state) => state.theme.darkMode);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await API.get('/api/all-blogs');
                const data = res.data.blogs.find(blog => blog.id === id);
                if (!data) { toast.error("Entry not found"); return; }
                setForm(data);
            } 
            catch (err) {
                toast.error("Cloud synchronization failed");
            } 
            finally {
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
            const res = await API.put(`/api/update-blogs/${id}`, form);
            if (res.data?.success) {
                toast.success("Changes deployed to production!");
                navigate("/admin/all-blogs");
            }
        } 
        catch (error) { 
            toast.error("Deployment failed"); 
        } 
        finally { 
            setLoading(false); 
        }
    };

    const theme = {
        bg: darkMode ? 'bg-[#050505]' : 'bg-[#F9FAFB]',
        card: darkMode ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm',
        input: darkMode ? 'bg-white/[0.02] border-white/10 text-white focus:border-lime-500/50' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-yellow-500',
        text: darkMode ? 'text-white' : 'text-slate-900',
        muted: darkMode ? 'text-slate-500' : 'text-slate-400',
        accent: 'from-yellow-400 to-lime-500'
    };

    if (loading || !form) return (
        <div className={`flex h-screen items-center justify-center font-mono ${theme.bg} ${darkMode ? 'text-lime-500' : 'text-slate-900'}`}>
            <Terminal className="animate-pulse mr-2" size={20} />  Please wait..., updating Blogs took time
        </div>
    );

    return (
        <div className={`min-h-screen transition-all duration-500 ${theme.bg} ${theme.text} font-sans selection:bg-lime-500/30`}>
            <Seo title="Enterprise Editor | Uplify" />

            {/* SaaS Header - Sticky & Blurred */}
            <nav className={`sticky top-0 z-50 backdrop-blur-md border-b ${darkMode ? 'bg-black/40 border-white/5' : 'bg-white/70 border-slate-200'} px-6 py-3`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] ${theme.muted} hover:text-lime-500 transition-colors`}>
                        <ArrowLeft size={14} /> Back
                    </button>
                    
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setPreviewMode(!previewMode)} 
                            className={`px-4 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-widest transition-all ${
                                previewMode 
                                ? 'bg-lime-500 border-lime-500 text-black shadow-lg shadow-lime-500/20' 
                                : `${theme.card} hover:bg-white/5`
                            }`}
                        >
                            {previewMode ? <Edit3 size={14} className="inline mr-1"/> : <Eye size={14} className="inline mr-1"/>}
                            {previewMode ? 'Edit' : 'Preview'}
                        </button>
                        <button 
                            onClick={handleSubmit} 
                            disabled={loading} 
                            className={`px-5 py-1.5 rounded-lg bg-gradient-to-r ${theme.accent} text-black text-[10px] font-extrabold uppercase tracking-widest active:scale-95 transition-transform flex items-center gap-2`}
                        >
                            <Save size={14}/> {loading ? 'Saving...' : 'Deploy'}
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-6 pb-24">
                {/* Status Bar */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-inherit pb-8">
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter italic uppercase">
                            Update <span className={`bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>Blogs.</span>
                        </h1>
                        <p className={`text-xs mt-1 font-mono uppercase tracking-widest ${theme.muted}`}>Status: Development Mode / ID: {id}</p>
                    </div>
                    <div className="flex gap-6">
                        <div className="text-center">
                            <p className="text-[10px] font-bold uppercase opacity-40">Words</p>
                            <p className="text-sm font-mono">{form.fullContent?.split(/\s+/).length || 0}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-bold uppercase opacity-40">Format</p>
                            <p className="text-sm font-mono text-yellow-500">MDX</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Editor Side */}
                    <div className={`space-y-6 transition-all duration-500 ${previewMode ? 'lg:col-span-6' : 'lg:col-span-10 lg:col-start-1'}`}>
                        
                        {/* Title & Image Group */}
                        <div className={`p-6 rounded-2xl border ${theme.card} grid grid-cols-1 md:grid-cols-2 gap-6`}>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-lime-500 uppercase tracking-widest">Headline</label>
                                <input name="title" value={form.title} onChange={handleChange} className="w-full bg-transparent text-xl font-bold outline-none border-b border-transparent focus:border-lime-500/20 py-1 transition-all" placeholder="Enter title..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-lime-500 uppercase tracking-widest">Asset URL (Cover)</label>
                                <div className="flex items-center gap-2">
                                    <ImageIcon size={14} className="opacity-40" />
                                    <input name="image" value={form.image} onChange={handleChange} className="w-full bg-transparent text-xs font-mono outline-none opacity-60 focus:opacity-100" placeholder="https://source.unsplash.com/..." />
                                </div>
                            </div>
                        </div>

                        {/* Metadata Bento */}
                        {!previewMode && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { label: 'Curator', name: 'author', icon: <User size={14}/> },
                                    { label: 'Taxonomy', name: 'category', icon: <Tag size={14}/> },
                                    { label: 'Publication', name: 'date', type: 'date', icon: <Calendar size={14}/> }
                                ].map((f) => (
                                    <div key={f.name} className={`p-5 rounded-2xl border ${theme.input}`}>
                                        <label className="flex items-center gap-2 text-[9px] font-bold text-slate-500 uppercase mb-2 tracking-tighter">{f.icon} {f.label}</label>
                                        <input type={f.type || 'text'} name={f.name} value={form[f.name]} onChange={handleChange} className="w-full bg-transparent outline-none font-bold text-xs [color-scheme:dark]" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Markdown Canvas */}
                        <div className={`rounded-3xl border overflow-hidden ${theme.card}`}>
                            <div className={`px-6 py-3 border-b flex justify-between items-center ${darkMode ? 'bg-white/[0.02]' : 'bg-slate-50'}`}>
                                <div className="flex items-center gap-2">
                                    <Globe size={14} className="text-lime-500" />
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${theme.muted}`}>Markdown_Kernel_v2</span>
                                </div>
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-lime-500/20" />
                                </div>
                            </div>
                            <textarea 
                                name="fullContent" 
                                rows={previewMode ? 28 : 20} 
                                value={form.fullContent} 
                                onChange={handleChange} 
                                className="w-full p-10 bg-transparent outline-none font-mono text-sm leading-relaxed resize-none transition-colors focus:bg-lime-500/[0.01]" 
                                placeholder="Engine start: Begin writing in markdown..."
                            />
                        </div>
                    </div>

                    {/* Pro Preview Side */}
                    {previewMode && (
                        <div className={`lg:col-span-6 sticky top-28 h-[82vh] overflow-y-auto rounded-[2.5rem] border transition-all ${darkMode ? 'bg-[#080808] border-white/10' : 'bg-white border-slate-200 shadow-2xl'}`}>
                            {form.image && <img src={form.image} alt="Hero" className="w-full h-56 object-cover border-b border-inherit opacity-90" />}
                            
                            <div className="px-12 py-12">
                                <div className="mb-10">
                                    <span className="text-[10px] font-black text-lime-500 uppercase tracking-[0.4em] bg-lime-500/10 px-3 py-1 rounded-full">{form.category || 'Curated'}</span>
                                    <h1 className="text-5xl font-black mt-6 leading-[1.1] tracking-tighter">{form.title || 'Draft_Entry'}</h1>
                                    <div className="flex items-center gap-6 mt-8 opacity-40 text-[10px] uppercase font-black tracking-widest border-y border-white/5 py-4">
                                        <span className="flex items-center gap-1.5"><User size={12}/> {form.author}</span>
                                        <span className="flex items-center gap-1.5"><Calendar size={12}/> {form.date}</span>
                                    </div>
                                </div>

                                <article className={`prose prose-sm lg:prose-base ${darkMode ? 'prose-invert' : ''} max-w-none 
                                    prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase
                                    prose-p:leading-relaxed prose-p:text-inherit/80
                                    prose-strong:text-lime-500 prose-a:text-yellow-400 prose-img:rounded-3xl prose-img:shadow-2xl`}>
                                    <ReactMarkdown>
                                        {form.fullContent || 'Initialize stream... Waiting for content input.'}
                                    </ReactMarkdown>
                                </article>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default UpdateBlog;