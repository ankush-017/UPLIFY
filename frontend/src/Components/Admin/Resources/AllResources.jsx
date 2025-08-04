import { useEffect, useState } from 'react';
import { supabase } from '../../../../superbaseClient';
import { ExternalLink, IndianRupee } from 'lucide-react';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import Seo from '../../Seo';

export default function AllResources() {

    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResources = async () => {
            const { data, error } = await supabase.from('resources').select('*');
            if (error) {
                console.error('Error fetching resources:', error);
            } else {
                setResources(data);
            }
            setLoading(false);
        };
        fetchResources();
    }, []);

    return (
        <>
            <Seo
                title="All Resources | Uplify"
                description="Access all free resources available on Uplify."
                url="https://uplify.in/resources"
                image="https://uplify.in/og-image-all-resources.jpg"
            />
            <div className="min-h-screen px-4 py-10 md:px-10 text-white">
                <h1 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                    All Resources
                </h1>
                {loading &&
                    <div className="text-center text-white py-10"><Spin size={30} /></div>
                }
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resources.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-5 shadow-lg hover:shadow-cyan-500/20 transition-all"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-xl font-semibold mb-1 text-cyan-400">{item.title}</h2>
                            <p className="text-sm mb-2 text-gray-300">{item.description}</p>
                            <p className="text-sm text-gray-400 mb-1 font-semibold"><span className='font-bold text-blue-400'>Instructor:  </span>{item.author}</p>
                            <p className="text-sm text-gray-400 mb-3 flex items-center gap-1">
                                <IndianRupee size={14} className="text-gray-300" />
                                <span className="line-through text-red-400">{item.originalprice}</span>
                                <span className="text-white">→</span>
                                <IndianRupee size={14} className="text-gray-300" />
                                <span className="text-green-400 font-semibold text-base">{item.sellprice}</span>
                                <span className="ml-auto px-2 py-0.5 rounded-md text-xs bg-green-700/30 text-green-300">
                                    {Math.round(((item.originalprice - item.sellprice) / item.originalprice) * 100)}% OFF
                                </span>
                            </p>
                            <div className='flex flex-row justify-between'>
                                <a
                                    href={item.courseUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:underline"
                                >
                                    View Course <ExternalLink size={16} />
                                </a>
                                <Link
                                    to={`/admin/update-resource/${item.id}`}
                                    className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-2 rounded-full"
                                >
                                    Update
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}