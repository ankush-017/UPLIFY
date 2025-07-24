import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
import { supabase } from '../../superbaseClient.js';
import { BlogbgDark, BlogbgLight } from '../assets/image.js';
import { useSelector } from 'react-redux';

const BlogCard = ({ id, title, excerpt, date, author, category, image }) => (
  <motion.div
    className={` bg-gray-800 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm border border-white/10 `}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <Link to={`/blog/${id}`}>
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-6">
        <div className="text-cyan-400 text-sm font-semibold mb-2">{category}</div>
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        <p className="text-gray-400 mb-4">{excerpt}</p>
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center">
            <div className="text-sm text-blue-300">
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
          <div className="text-sm text-blue-400">By {author}</div>
        </div>
      </div>
    </Link>
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
      } 
      else {
        setBlogs(data);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <div className="min-h-screen py-10 px-4 md:px-8 lg:px-16 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${darkMode?BlogbgDark:BlogbgLight})`}}>
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8 pb-2 z-10 relative">
            <h1 className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text ${darkMode?"bg-gradient-to-r from-cyan-400 to-blue-600":"bg-gradient-to-r from-cyan-600 to-blue-800 "} pb-4`}>
              Uplify Blog — Learn. Build. Succeed.
            </h1>
            <p className={`text-lg max-w-2xl p-2 rounded-lg mx-auto ${darkMode?"text-gray-200":"text-purple-800 backdrop-blur-lg"} `}>
              Discover expert-backed guides, coding tips, and real internship journeys to help you grow faster in tech and career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Blogs;