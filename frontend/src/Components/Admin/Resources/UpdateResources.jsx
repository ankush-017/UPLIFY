import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../superbaseClient.js';
import { toast } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

function UpdateResources() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
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

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('resources')
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
                    author: data.author,
                    category: data.category,
                    image: data.image,
                    courseUrl: data.courseUrl,
                    description: data.description,
                    sellprice: data.sellprice,
                    originalprice: data.originalprice
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
            .from('resources')
            .update({
                ...form,
            })
            .eq('id', id);

        if (error) {
            toast.error('Failed to update blog');
            console.error(error);
        }
        else {
            toast.success('Resources updated successfully!');
            navigate('/admin/all-resources');
        }
    };

    return (
        <div className="min-h-screen px-4 py-7 md:px-10 text-white">
            <div className="max-w-4xl mx-auto p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl">
                <h1 className="text-3xl font-bold pb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    Update Resources
                </h1>
                {
                    loading && <div className="text-white text-center flex justify-center items-center h-screen"><Spin /></div>
                }

                <form onSubmit={handleSubmit} className="space-y-6">
                    {[
                        { name: 'title', placeholder: 'Course title', required: true },
                        { name: 'description', placeholder: 'Description', required: true },
                        { name: 'author', placeholder: 'Instructor name', required: true },
                        { name: 'category', placeholder: 'Category (e.g., AI, Coding)' },
                        { name: 'image', placeholder: 'Image URL', type: 'url' },
                        { name: 'courseUrl', placeholder: 'Course URL', type: 'url' },
                        { name: 'sellprice', placeholder: 'Sell Price', required: true },
                        { name: 'originalprice', placeholder: 'Original Price', required: true },
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

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 py-3 rounded-lg text-white font-semibold"
                    >
                        Update Course
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateResources;