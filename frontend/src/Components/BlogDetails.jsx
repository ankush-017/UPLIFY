import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { supabase } from '../../superbaseClient.js';
import { Spin, message } from 'antd';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useSelector } from 'react-redux';
import {
    Calendar, User, ChevronLeft, Share2,
    Clock, Bookmark, Sparkles, Zap, ArrowRight, Rocket
} from 'lucide-react';

const BlogDetails = () => {
    const { id } = useParams();
    const darkMode = useSelector((state) => state.theme.darkMode);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('id', id)
                .single();

            if (!error) setPost(data);
            setLoading(false);
        };
        fetchPost();
        window.scrollTo(0, 0);
    }, [id]);

    const handleShare = async () => {
        const shareData = {
            title: post?.title,
            text: post?.excerpt,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } 
            catch (err) {
                console.log("Error sharing", err);
            }
        } 
        else {
            navigator.clipboard.writeText(window.location.href);
            message.success('Link copied to clipboard!');
        }
    };

    if (loading) return (
        <div className={`h-screen flex items-center justify-center ${darkMode ? 'bg-[#050505]' : 'bg-gray-50'}`}>
            <Spin size="large" />
        </div>
    );

    if (!post) return <div className="text-center py-20 font-black">Post not found</div>;

    const sidebarItems = [
        { title: 'Learning Hub', to: '/resources', icon: Zap, color: 'text-emerald-500' },
        { title: 'Community', to: '/user/uplify-community', icon: User, color: 'text-amber-500' },
        { title: 'Internships', to: '/user/uplify-internship', icon: Rocket, color: 'text-emerald-500' },
        { title: 'Resume Builder', to: '/user/resume-builder', icon: Sparkles, color: 'text-amber-500' },
    ];

    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-500 ${darkMode ? "bg-[#08090a] text-slate-200" : "bg-[#f8fafc] text-slate-900"}`}>

            {/* Scroll Progress */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-yellow-400 to-emerald-600 z-[100] origin-left"
                style={{ scaleX }}
            />

            {/* Background Blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className={`absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[100px] opacity-10 ${darkMode ? 'bg-emerald-900' : 'bg-emerald-200'}`} />
                <div className={`absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] rounded-full blur-[100px] opacity-10 ${darkMode ? 'bg-amber-900' : 'bg-amber-100'}`} />
            </div>

            <main className="relative z-10 flex-grow">
                <header className="pt-6 md:pt-10 pb-8 md:pb-12 px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <Link to="/blog" className="group inline-flex items-center gap-2 text-emerald-500 font-black text-[10px] md:text-xs mb-6 md:mb-8 hover:gap-3 transition-all tracking-widest uppercase">
                            <ChevronLeft size={14} /> BACK TO INSIGHTS
                        </Link>

                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                            <span className="px-2.5 py-1 rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] bg-yellow-400 text-black shadow-lg shadow-yellow-500/20">
                                {post.category}
                            </span>
                            <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-black text-slate-500 uppercase">
                                <Clock size={12} className="text-emerald-500" /> 6 Min Read
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-[1.2] md:leading-[1.1] mb-8">
                            {post.title}
                        </h1>

                        <div className={`flex flex-row items-center justify-between gap-4 p-4 md:p-5 rounded-[24px] md:rounded-[28px] border transition-all ${darkMode ? 'bg-white/5 border-white/5 shadow-2xl' : 'bg-white border-slate-100 shadow-sm'}`}>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-gradient-to-tr from-emerald-500 to-yellow-400 flex items-center justify-center text-black text-sm md:text-lg font-black shadow-md">
                                    {post.author?.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-[8px] md:text-[9px] text-emerald-500 font-black uppercase tracking-widest leading-none mb-1">Author</p>
                                    <p className={`text-xs md:text-sm font-black ${darkMode ? "text-white" : "text-black"}`}>{post.author}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 md:gap-6">
                                <div className="text-right hidden sm:block">
                                    <p className="text-[8px] md:text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none mb-1">Published</p>
                                    <p className="font-black text-[10px] md:text-xs">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                </div>
                                <button
                                    onClick={handleShare}
                                    className={`p-2.5 md:p-3 rounded-xl transition-all ${darkMode ? 'bg-white/5 text-white hover:bg-emerald-500' : 'bg-slate-50 text-slate-900 hover:bg-emerald-500 hover:text-white'}`}
                                >
                                    <Share2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Image */}
                <div className="max-w-4xl mx-auto px-4 md:px-6 mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`relative h-[200px] md:h-[450px] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl border ${darkMode ? 'border-white/5' : 'border-white'}`}
                    >
                        <img src={post.image} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0">

                        {/* LEFT SIDEBAR - Becomes bottom section on mobile */}
                        <aside className="lg:col-span-3 lg:sticky lg:top-24 h-fit space-y-3 order-2 lg:order-1 lg:pr-8 border-r border-transparent">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-500 px-4 mb-4">Discovery</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                                {sidebarItems.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        to={item.to}
                                        className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${darkMode ? 'bg-white/[0.03] hover:bg-white/[0.08]' : 'bg-white shadow-sm hover:shadow-lg border border-slate-100'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon size={16} className={item.color} />
                                            <span className="text-[11px] font-black uppercase tracking-tight">{item.title}</span>
                                        </div>
                                        <ArrowRight size={14} className="opacity-0 lg:group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-emerald-500" />
                                    </Link>
                                ))}
                            </div>

                            <div className={`mt-6 md:mt-8 p-6 rounded-[28px] border relative overflow-hidden transition-all ${darkMode ? 'bg-yellow-400/5 border-yellow-400/10' : 'bg-yellow-50 border-yellow-100 shadow-sm'}`}>
                                <Zap className="text-yellow-500 mb-4" size={20} />
                                <h4 className="font-black text-xs uppercase mb-1">Masterclass <span className='text-green-600 lowercase'>(Upcoming)</span></h4>
                                <p className="text-[10px] text-slate-500 leading-relaxed font-bold mb-4 opacity-80">Build real industry systems.</p>
                                <button className="w-full py-2.5 bg-yellow-400 text-black text-[9px] font-black uppercase rounded-xl tracking-widest shadow-lg active:scale-95 transition-all">Enroll</button>
                            </div>
                        </aside>

                        {/* ARTICLE CONTENT */}
                        <div className="lg:col-span-9 xl:col-span-8 lg:pl-12 order-1 lg:order-2">
                            <article
                                className={`
                        prose prose-sm md:prose-lg max-w-none
                        prose-headings:font-black prose-headings:tracking-tight
                        prose-headings:mb-4 md:prose-headings:mb-6

                        prose-p:leading-[1.75] md:prose-p:leading-[1.85]
                        prose-p:text-sm md:prose-p:text-base

                        prose-ul:pl-5
                        prose-li:marker:text-emerald-400
                        prose-li:leading-relaxed

                        prose-strong:font-black
                        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
                        prose-img:rounded-[20px] md:prose-img:rounded-[24px]
                        prose-img:shadow-xl
                        prose-blockquote:border-l-4 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl

                        transition-colors duration-300

                        ${darkMode
                                                            ? `
                            prose-p:text-slate-400
                            prose-li:text-slate-300
                            prose-headings:text-white
                            prose-strong:text-emerald-400
                            prose-code:bg-emerald-500/10
                            prose-code:text-emerald-400
                            prose-blockquote:border-emerald-400
                            prose-blockquote:bg-emerald-500/10
                            `
                                                            : `
                            prose-p:text-slate-600
                            prose-li:text-slate-700
                            prose-headings:text-slate-900
                            prose-strong:text-emerald-600
                            prose-code:bg-emerald-100
                            prose-code:text-emerald-600
                            prose-blockquote:border-emerald-500
                            prose-blockquote:bg-emerald-50
                            `
                                                        }
                            `}
                            >

                                <ReactMarkdown
                                    children={post.fullContent}
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                />
                            </article>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BlogDetails;