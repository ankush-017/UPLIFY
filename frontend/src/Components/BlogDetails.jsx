import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { Helmet } from 'react-helmet-async';
import { supabase } from '../../superbaseClient.js';
import { Spin } from 'antd';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github.css';
import { useSelector } from 'react-redux';
import { BlogbgDark, BlogbgLight } from '../assets/image.js';
import { ArrowBigRightDash } from 'lucide-react';

const BlogDetails = () => {

    const { id } = useParams();
    const darkMode = useSelector((state) => state.theme.darkMode);
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching blog:', error.message);
            }
            else {
                setPost(data);
            }
            setLoading(false);
        };

        fetchPost();
    }, [id]);


    if (loading) {
        return <div className="text-white text-center flex justify-center items-center h-screen"><Spin size={30} /></div>;
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl text-white mb-4">Blog post not found</h2>
                    <Link to="/blogs" className="text-cyan-400 hover:text-cyan-300">
                        Return to Blogs
                    </Link>
                </div>
            </div>
        );
    }

    //   const pageTitle = `${post.title} — arcAI.engineer Blog`;
    return (
        <>
            <div className="min-h-screen py-5 pb-20 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${BlogbgDark})` }}>
                <motion.div
                    className=" mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/blog" className="text-cyan-400 hover:text-cyan-300 mb-8 pl-10 inline-block">
                        ← Back to Blogs
                    </Link>

                    <article className="bg-white/5 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm border border-white/10 p-8">

                        <div className='mx-auto max-w-4xl'>
                            <img src={post.image} alt={post.title} className="w-full h-64 object-contain rounded-lg mb-8" />
                        </div>

                        <div className="text-cyan-400 text-center text-lg font-semibold">{post.category}</div>
                        <h1 className="text-4xl font-bold text-center text-blue-400">{post.title}</h1>

                        <div className="flex items-center justify-center mt-2 mb-8">
                            <div className="text-gray-400">By {post.author}</div>
                            <div className="mx-2 text-gray-600">•</div>
                            <div className="text-gray-400">
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>

                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-14 lg:gap-6">
                                {/* ---------- Sidebar ---------- */}
                                <aside className="space-y-6">
                                    {[ // Your sidebar blocks simplified with loop
                                        {
                                            title: '📚 Resources',
                                            links: [
                                                { to: '/resources', label: 'Learning Resources' },
                                                { to: '/resume-builder', label: 'Resume Builder' }
                                            ],
                                            url: '',
                                        },
                                        {
                                            title: '👥 Peer Groups',
                                            content: 'Join communities to grow and network.',
                                            links: [{ to: '/peergroups', label: 'Explore Peer Groups' }],
                                            url: '',
                                        },
                                        {
                                            title: '🚀 Uplify Program',
                                            content: 'A mentorship-driven path to real-world experience.',
                                            links: [{ to: '/uplify-program', label: 'View Details' }],
                                            url: '',
                                        },
                                        {
                                            title: '📝 Blogs',
                                            links: [
                                                { to: '/blog/77cfc88c-6597-42fb-bc6a-812a720bdadc', label: 'Internship Guide' },
                                                { to: '/blogs/career-tips', label: 'Career Tips' }
                                            ],
                                            url: '/blog',
                                        },
                                        {
                                            title: '📂 Project Library',
                                            content: 'Find real-world project ideas to practice your skills.',
                                            links: [{ to: '/projects', label: 'Explore Projects' }]
                                        },
                                        {
                                            title: '📝 Make Your Resume Better',
                                            content: 'Use our AI Resume Builder to create an impressive resume.',
                                            links: [{ to: '/resume-builder', label: 'Build Resume →' }]
                                        }
                                    ].map((item, index) => (
                                        <div key={index} className={`${darkMode ? "bg-white/5" : "bg-white"} p-4 rounded-xl shadow`}>
                                            <div className='flex flex-row justify-between'>
                                                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>{item.title}</h3>
                                                <div className={`${darkMode ? "text-blue-600" : "text-blue-700"} cursor-pointer`} onClick={() => navigate(item.url)}>
                                                    <ArrowBigRightDash />
                                                </div>
                                            </div>
                                            {item.content && <p className={`text-sm mb-2 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>{item.content}</p>}
                                            <ul className="text-sm space-y-1">
                                                {item.links.map((link, i) => (
                                                    <li key={i}><Link to={link.to} className="text-blue-500 hover:underline">{link.label}</Link></li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </aside>

                                {/* ---------- Main Content ---------- */}
                                <main className="lg:col-span-3 lg:px-10">
                                    <div className=''>
                                        <article className={`prose prose-md dark:prose-invert  max-w-none text-gray-200`}>
                                            <ReactMarkdown
                                                children={post.fullContent}
                                                remarkPlugins={[remarkGfm]}
                                                rehypePlugins={[rehypeRaw]}
                                            />
                                        </article>
                                    </div>
                                </main>
                            </div>
                        </div>
                    </article>
                </motion.div>
            </div>
        </>
    );
};

export default BlogDetails;