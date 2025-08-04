import React, { useState } from 'react';
import { supabase } from '../../../../superbaseClient.js';
import { toast } from 'react-hot-toast';
import Seo from '../../Seo'

function AddBlog() {
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    author: '',
    category: '',
    image: '',
    fullContent: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from('blogs').insert([
      {
        ...form,
        fullContent: form.fullContent.trim(), // Save as Markdown or plain text
      }
    ]);

    if (error) {
      toast.error('Failed to add blog');
      console.error(error);
    } else {
      toast.success('Blog added successfully!');
      setForm({
        title: '',
        excerpt: '',
        author: '',
        category: '',
        image: '',
        fullContent: '',
        date: ''
      });
    }
  };

  return (

    <>
      <Seo
        title="Add New Blog | Uplify Admin"
        description="Create and publish a new blog post to the Uplify platform."
        url="https://uplify.in/admin/blogs/add"
        image="https://uplify.in/og-image-add-blog.jpg"
      />


      <div className="min-h-screen px-4 py-10 md:px-10 text-white">
        <div className="max-w-4xl mx-auto p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl">
          <h1 className="text-3xl font-bold pb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Add New Blog
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { name: 'title', placeholder: 'Blog title', required: true },
              { name: 'excerpt', placeholder: 'Short excerpt', required: true },
              { name: 'author', placeholder: 'Author name', required: true },
              { name: 'category', placeholder: 'Category (e.g., AI, Coding)' },
              { name: 'image', placeholder: 'Image URL', type: 'url' },
            ].map(({ name, placeholder, required = false, type = 'text' }) => (
              <input
                key={name}
                name={name}
                type={type}
                required={required}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full p-3 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            ))}

            <textarea
              name="fullContent"
              placeholder="Write full blog content in Markdown..."
              value={form.fullContent}
              onChange={handleChange}
              rows={10}
              required
              className="w-full p-3 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 py-3 rounded-lg text-white font-semibold"
            >
              Submit Blog
            </button>
          </form>
        </div>
      </div>
    </>

  );
}
export default AddBlog;