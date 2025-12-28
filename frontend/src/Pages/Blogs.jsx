import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../../superbaseClient.js';
import { useSelector } from 'react-redux';
import { 
  Calendar, ArrowRight, Sparkles, BookOpen, 
  Timer, Zap, Rocket
} from 'lucide-react';

const BlogCard = ({ id, title, excerpt, date, author, category, image, darkMode }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.98 }}
    whileInView={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -6 }}
    className={`group relative h-full flex flex-col rounded-[24px] md:rounded-[32px] border transition-all duration-300 
      ${darkMode 
        ? "bg-zinc-900/40 border-white/5 hover:border-emerald-500/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]" 
        : "bg-white border-emerald-100 hover:border-amber-400/50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)]"}`}
  >
    {/* Compact Media Section */}
    <div className="relative h-44 md:h-48 overflow-hidden m-2 md:m-3 rounded-[18px] md:rounded-[24px]">
      <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={image} alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
      <div className="absolute top-3 left-3">
        <span className="px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-wider bg-yellow-400 text-black shadow-lg">
          {category}
        </span>
      </div>
    </div>

    {/* Compact Content Section */}
    <div className="px-4 md:px-6 pb-6 pt-1 flex flex-col flex-grow">
      <div className="flex items-center gap-1.5 mb-2 text-emerald-500">
        <Zap size={10} className={`${darkMode? "text-yellow-500":"text-yellow-600"}`} />
        <span className="text-[9px] font-black uppercase tracking-widest opacity-70"><span className={`${darkMode? "text-yellow-500":"text-yellow-600"}`}>Author: </span>{author}</span>
      </div>

      <h2 className={`text-base md:text-lg font-black leading-tight mb-2 transition-colors 
        ${darkMode ? "text-white group-hover:text-emerald-400" : "text-zinc-900 group-hover:text-emerald-600"}`}>
        {title}
      </h2>

      <p className={`text-xs line-clamp-2 mb-4 font-medium leading-relaxed opacity-60 
        ${darkMode ? "text-zinc-300" : "text-zinc-500"}`}>
        {excerpt}
      </p>

      {/* Modern Action Row */}
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/5">
        <div className="flex items-center gap-1.5 text-zinc-500 text-[9px] font-bold uppercase">
          <Calendar size={12} className="text-emerald-500" />
          {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>

        <Link to={`/blog/${id}`} className={`p-2 rounded-full transition-all active:scale-90 ${darkMode ? 'bg-white/5 text-emerald-400 hover:bg-emerald-500 hover:text-black' : 'bg-zinc-100 text-zinc-900 hover:bg-emerald-500 hover:text-white'}`}>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </motion.div>
);

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase.from('blogs').select('*');
      if (error) {
        console.error('Error fetching blogs:', error.message);
      } else {
        setBlogs(data);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${darkMode ? "bg-[#050607]" : "bg-[#f8fafc]"}`}>
      
      {/* Refined Background Mesh */}
      <div className="absolute top-0 inset-x-0 h-screen w-full pointer-events-none">
        <div className={`absolute top-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full blur-[100px] opacity-10 bg-emerald-500`} />
        <div className={`absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] rounded-full blur-[100px] opacity-10 bg-yellow-400`} />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-10 relative z-10">
        
        {/* Header Section - Compact */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-[0.3em] mb-6">
            <Rocket size={10} /> The Uplify Feed
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-6xl font-black tracking-tight leading-none mb-6 
              ${darkMode ? "text-white" : "text-zinc-900"}`}
          >
            Insights to reach <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-yellow-400 to-emerald-500 italic">the Sky.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-xs md:text-sm font-bold max-w-2xl leading-relaxed opacity-60 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
          >
            Deep-dive articles on <span className="text-emerald-500">Contests</span>, modern <span className="text-yellow-500">Web Development</span>, and <span className="text-emerald-500">Data Science</span>. Read, follow the path, and elevate your career to new heights.
          </motion.p>
        </div>

        {/* Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence>
            {blogs.map((post) => (
              <BlogCard key={post.id} {...post} darkMode={darkMode} />
            ))}
          </AnimatePresence>
        </div>

        {/* Refined Footer Area */}
        <div className="mt-24 max-w-3xl mx-auto space-y-4">
          
          {/* UPCOMING FEATURE - Subtle Look */}
          {/* <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-[24px] border flex flex-col md:flex-row items-center gap-6 ${darkMode ? "bg-zinc-900/20 border-white/5" : "bg-white border-emerald-100 shadow-sm"}`}
          >
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Timer size={16} className="text-yellow-500" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Coming Soon</span>
              </div>
              <h2 className="text-xl font-black tracking-tight">Uplify Exclusive Membership</h2>
            </div>
            
            <button disabled className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border border-dashed transition-all
              ${darkMode ? "border-zinc-700 text-zinc-500 bg-zinc-800/30" : "border-emerald-200 text-emerald-300 bg-emerald-50"}`}>
              LOCKED
            </button>
          </motion.div> */}

          {/* MAIN CTA - High Impact but Compact */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`p-8 rounded-[32px] text-center overflow-hidden relative group
              ${darkMode ? "bg-emerald-950/20 border border-emerald-500/20 shadow-2xl" : "bg-emerald-900 text-white shadow-xl shadow-emerald-900/10"}`}
          >
            <div className="relative z-10">
              <Sparkles className="mx-auto mb-4 text-yellow-400" size={32} />
              <h2 className={`text-2xl md:text-3xl font-black mb-4 ${darkMode?"text-white":"text-white"} tracking-tight leading-tight`}>Master your Craft with <span className='text-yellow-500'> Uplify Masterclasses.</span></h2>
              <p className={`mb-8 text-xs md:text-sm opacity-70 ${darkMode?"text-white":"text-white"} max-w-lg mx-auto font-medium leading-relaxed italic`}>
                Step away from tutorials and build real industry systems under expert guidance.
              </p>
              
              <button className="px-8 py-4 bg-yellow-400 text-black font-black rounded-xl hover:bg-emerald-400 transition-all shadow-xl shadow-yellow-400/20 uppercase tracking-widest text-[10px]">
                Unlock Membership (Coming Soon)
              </button>
            </div>
            
            <div className="absolute -top-10 -right-10 opacity-5">
              <BookOpen size={200} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;