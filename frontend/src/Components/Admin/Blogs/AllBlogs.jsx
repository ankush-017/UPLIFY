import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../superbaseClient.js';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import toast from 'react-hot-toast';

export default function AllBlogs() {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const fetchBlogs = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('blogs').select('*').order('date', { ascending: false });

    if (error) {
      console.error('Error fetching blogs:', error);
      toast.error("Failed to fetch blogs");
    } 
    else {
      setBlogs(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen px-4 py-10 md:px-10 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold pb-3 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          All Blogs
        </h1>
        <hr/>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spin size="large" />
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-400">No blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 pt-8 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className={`rounded-xl p-6 shadow-lg border transition-all duration-300 hover:scale-[1.02] 'bg-white/5 border-white/10 `}
              >
                <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h2 className="text-xl font-bold mb-1">{blog.title}</h2>
                <p className="text-sm mb-2 text-gray-400">{blog.excerpt}</p>
                <p className="text-sm text-gray-500 mb-2">By {blog.author} • {blog.date}</p>
                <div className="flex justify-between pt-2 items-center">
                  <Link
                    to={`/blog/${blog.id}`}
                    className="text-blue-500 hover:underline text-sm font-medium"
                  >
                    Read More →
                  </Link>
                  <Link
                    to={`/admin/update-blog/${blog.id}`}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-2 rounded-full"
                  >
                    Update
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}