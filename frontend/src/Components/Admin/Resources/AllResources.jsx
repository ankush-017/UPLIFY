import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ExternalLink, IndianRupee, Edit3, BookOpen, User, Search, LayoutGrid, List } from 'lucide-react';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Seo from '../../Seo';
import API from '../../../API';

export default function AllResources() {
    // ⚡ DarkMode Integration from Redux
    const darkMode = useSelector((state) => state.theme.darkMode);
    
    // Initialize as empty array to prevent "cannot read map of undefined" error
    const [resources, setResources] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchResources = async () => {
            try {
                setLoading(true);
                const res = await API.get('/api/resources');
                // Ensure we are setting an array even if the API returns something else
                if (res.data.success) {
                    setResources(res.data.courses || []);
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to sync resources");
                setResources([]); // Fallback to empty array on error
            } finally {
                setLoading(false);
            }
        };
        fetchResources();
    }, []);

    // Filter logic
    const filteredResources = resources?.filter(item => 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    // Dynamic Theme Config
    const theme = {
        bg: darkMode ? 'bg-[#050505]' : 'bg-[#F8FAFC]',
        card: darkMode ? 'bg-[#0D0D0D] border-white/5' : 'bg-white border-slate-200 shadow-sm',
        input: darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900',
        textMain: darkMode ? 'text-white' : 'text-slate-900',
        textMuted: darkMode ? 'text-slate-500' : 'text-slate-400',
        accentGradient: 'from-yellow-400 to-lime-500'
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 ${theme.bg} ${theme.textMain} font-sans selection:bg-lime-500/30`}>
            <Seo title="All Resources | Uplify Admin" />

            {/* Top SaaS Toolbar */}
            <div className={`sticky top-0 z-40 backdrop-blur-md border-b ${darkMode ? 'bg-black/40 border-white/5' : 'bg-white/70 border-slate-200'} px-6 py-4`}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-black uppercase tracking-tighter italic">
                            Resource <span className={`bg-gradient-to-r ${theme.accentGradient} bg-clip-text text-transparent`}>Inventory.</span>
                        </h1>
                        <p className={`text-[10px] font-bold uppercase tracking-widest ${theme.textMuted}`}>Total Assets: {filteredResources.length}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className={`relative flex items-center rounded-xl border transition-all ${theme.input} focus-within:border-lime-500/50`}>
                            <Search size={14} className="absolute left-3 opacity-30" />
                            <input 
                                type="text" 
                                placeholder="Search inventory..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent pl-10 pr-4 py-2 outline-none text-xs w-full md:w-64 font-medium" 
                            />
                        </div>
                        <Link to="/admin/add-resources" className={`p-2.5 rounded-xl bg-gradient-to-r ${theme.accentGradient} text-black hover:scale-105 transition-transform shadow-lg shadow-lime-500/10`}>
                            <LayoutGrid size={18} />
                        </Link>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-10">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <Spin size="large" />
                        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-lime-500">Retrieving_Data...</p>
                    </div>
                ) : filteredResources.length === 0 ? (
                    <div className="text-center py-40 opacity-20 italic">
                        <BookOpen size={48} className="mx-auto mb-4" />
                        <p className="text-sm font-black uppercase tracking-widest">No matching resources found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredResources.map((item) => (
                            <div key={item.id} className={`group rounded-[2rem] border transition-all duration-500 hover:border-lime-500/30 ${theme.card}`}>
                                <div className="p-2">
                                    <div className="relative h-48 overflow-hidden rounded-[1.6rem]">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-lime-400">
                                            {item.category || 'Asset'}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 pt-2">
                                    <h2 className="text-lg font-bold mb-2 line-clamp-1 group-hover:text-lime-500 transition-colors uppercase tracking-tight">
                                        {item.title}
                                    </h2>
                                    <p className={`text-xs ${theme.textMuted} mb-4 line-clamp-2 leading-relaxed`}>
                                        {item.description}
                                    </p>

                                    <div className="flex items-center gap-2 mb-6">
                                        <User size={12} className="text-yellow-500" />
                                        <p className="text-[10px] font-black uppercase tracking-wider opacity-60 truncate">
                                            Instructor: {item.author}
                                        </p>
                                    </div>

                                    {/* Price Architecture */}
                                    <div className={`flex items-center justify-between mb-6 p-3 rounded-2xl ${darkMode ? 'bg-white/[0.03]' : 'bg-slate-50'}`}>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center text-emerald-500 font-black text-base">
                                                <IndianRupee size={14} />{item.sellprice}
                                            </div>
                                            <div className="text-[10px] text-slate-500 line-through font-bold">
                                                ₹{item.originalprice}
                                            </div>
                                        </div>
                                        <span className="text-[9px] font-black bg-lime-500 text-black px-2 py-0.5 rounded uppercase">
                                            {Math.round(((item.originalprice - item.sellprice) / item.originalprice) * 100)}% OFF
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <a href={item.courseUrl} target="_blank" rel="noopener noreferrer" className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${darkMode ? 'bg-white text-black hover:bg-lime-500' : 'bg-slate-900 text-white hover:bg-black'}`}>
                                            View Course <ExternalLink size={14} />
                                        </a>
                                        <Link to={`/admin/update-resource/${item.id}`} className={`p-3 rounded-xl border border-inherit transition-all hover:bg-yellow-400 hover:text-black ${theme.card}`}>
                                            <Edit3 size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}