import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../superbaseClient.js';
import { toast } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [form, setForm] = useState(null);
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
                toast.error('Failed to load blog data');
            }
            else {
                setPost(data);
                setForm({
                    title: data.title,
                    excerpt: data.excerpt,
                    author: data.author,
                    category: data.category,
                    image: data.image,
                    fullContent: data.fullContent,
                    date: data.date,
                });
            }
            setLoading(false);
        };

        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await supabase
            .from('blogs')
            .update({
                ...form,
                fullContent: form.fullContent.trim(),
            })
            .eq('id', id);

        if (error) {
            toast.error('Failed to update blog');
            console.error(error);
        }
        else {
            toast.success('Blog updated successfully!');
            navigate('/admin/all-blogs');
        }
    };

    if (loading || !form) {
        return <div className="text-white text-center flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen px-4 py-7 md:px-10 text-white">
            <div className="max-w-4xl mx-auto p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl">
                <h1 className="text-3xl font-bold pb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    Update Blog
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {[
                        { name: 'title', placeholder: 'Blog title', required: true },
                        { name: 'excerpt', placeholder: 'Short excerpt', required: true },
                        { name: 'author', placeholder: 'Author name', required: true },
                        { name: 'category', placeholder: 'Category (e.g., AI, Coding)' },
                        { name: 'image', placeholder: 'Image URL', type: 'url' },
                    ].map(({ name, placeholder, required = false, type = 'text' }) => (
                        <div key={name} className="space-y-2">
                            <label
                                htmlFor={name}
                                className="block text-sm font-medium text-blue-400 capitalize"
                            >
                                {name}
                            </label>
                            <input
                                id={name}
                                name={name}
                                type={type}
                                required={required}
                                value={form[name]}
                                onChange={handleChange}
                                placeholder={placeholder}
                                className="w-full p-3 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                    ))}

                    <div className="space-y-2">
                        <label
                            htmlFor="fullContent"
                            className="block text-sm font-medium text-blue-400"
                        >
                            Full Content (Markdown)
                        </label>
                        <textarea
                            id="fullContent"
                            name="fullContent"
                            placeholder="Write full blog content in Markdown..."
                            value={form.fullContent}
                            onChange={handleChange}
                            rows={10}
                            required
                            className="w-full p-3 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="date"
                            className="block text-sm font-medium text-blue-400"
                        >
                            Blog Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 py-3 rounded-lg text-white font-semibold"
                    >
                        Update Blog
                    </button>
                </form>

            </div>
        </div>
    );
}

export default UpdateBlog;