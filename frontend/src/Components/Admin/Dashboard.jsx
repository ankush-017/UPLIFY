import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Users, ShieldCheck, Search, Mail, Phone, Calendar, ArrowRight, X } from 'lucide-react';
import { Spin } from 'antd';

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState(""); // Format: YYYY-MM-DD
    
    const darkMode = useSelector((state) => state.theme.darkMode);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const usersRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user`);
                setUsers(usersRes.data?.alluser || []);
            } catch (error) {
                console.error('Data sync error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Primary Logic: Filters list based on selected date and search string
    const filteredUsers = users.filter(user => {
        // 1. Match Date (MongoDB createdAt starts with YYYY-MM-DD)
        const dateMatch = selectedDate 
            ? user.createdAt?.split('T')[0] === selectedDate 
            : true;

        // 2. Match Search Query
        const searchMatch = user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.email?.toLowerCase().includes(searchQuery.toLowerCase());

        return dateMatch && searchMatch;
    });

    const theme = {
        bg: darkMode ? 'bg-[#050505]' : 'bg-[#F8FAFC]',
        card: darkMode ? 'bg-[#0D0D0D] border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-sm',
        input: darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900',
        textMain: darkMode ? 'text-white' : 'text-slate-900',
        textMuted: darkMode ? 'text-slate-500' : 'text-slate-400',
        accent: 'from-yellow-400 to-lime-500'
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 pb-20 ${theme.bg} ${theme.textMain} pb-11 font-sans selection:bg-lime-500/30`}>
            
            {/* Header with Precision Controls */}
            <header className="max-w-7xl mx-auto mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black uppercase tracking-tight italic">
                        User <span className={`bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>Inventory.</span>
                    </h1>
                    <p className={`text-[10px] font-mono uppercase tracking-[0.2em] mt-1 ${theme.textMuted}`}>
                        {selectedDate ? `Filtering Date: ${selectedDate}` : "Viewing All Records"}
                    </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                    {/* Date Selector */}
                    <div className={`relative flex items-center rounded-xl border transition-all ${theme.input} ${selectedDate ? 'border-lime-500/50' : 'focus-within:border-lime-500/50'}`}>
                        <Calendar size={14} className="absolute left-4 opacity-40 text-lime-500" />
                        <input 
                            type="date" 
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="bg-transparent pl-11 pr-3 py-2.5 outline-none text-[10px] font-black uppercase cursor-pointer [color-scheme:dark]" 
                        />
                        {selectedDate && (
                            <button onClick={() => setSelectedDate("")} className="pr-3 text-red-500 hover:scale-110 transition-transform">
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    {/* Search Field */}
                    <div className={`relative flex items-center rounded-xl border transition-all ${theme.input} focus-within:border-yellow-500/50`}>
                        <Search size={14} className="absolute left-4 opacity-30" />
                        <input 
                            type="text" 
                            placeholder="Filter by name..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent pl-11 pr-4 py-2.5 outline-none text-[11px] font-bold w-full md:w-48" 
                        />
                    </div>
                </div>
            </header>

            {/* Metrics Dashboard */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <MetricCard label="Global Users" value={users.length} icon={<Users size={18} />} theme={theme} color="text-blue-500" />
                <MetricCard 
                    label={selectedDate ? "Joined on Date" : "Today's Batch"} 
                    value={filteredUsers.length} 
                    icon={<ArrowRight size={18} />} 
                    theme={theme} 
                    color="text-lime-500" 
                    isFocus={!!selectedDate}
                />
                <MetricCard label="Admins" value={users.filter(u => u.role === 'admin').length} icon={<ShieldCheck size={18} />} theme={theme} color="text-yellow-400" />
            </div>

            {/* Structured User Table */}
            <div className={`max-w-7xl mx-auto rounded-[2rem] border overflow-hidden transition-all ${theme.card}`}>
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="py-32 text-center"><Spin size="large" /></div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="py-32 text-center opacity-20 italic">
                           <Calendar size={40} className="mx-auto mb-4" />
                           <p className="text-[10px] font-black uppercase tracking-widest">No users found for this selection</p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className={`text-[9px] font-black uppercase tracking-[0.3em] ${theme.textMuted} border-b border-inherit`}>
                                    <th className="px-8 py-5">Profile Entity</th>
                                    <th className="px-8 py-5">Communication</th>
                                    <th className="px-8 py-5">Registration</th>
                                    <th className="px-8 py-5">Role</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-inherit">
                                {filteredUsers.map((user, i) => (
                                    <tr key={i} className="hover:bg-lime-500/[0.02] transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${darkMode ? 'bg-white/5 text-lime-400' : 'bg-slate-100 text-slate-900'}`}>
                                                    {user.name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold tracking-tight">{user.name}</p>
                                                    <p className={`text-[9px] font-mono opacity-30 uppercase group-hover:opacity-100 transition-opacity`}>ID: {user._id?.slice(-8)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="space-y-1">
                                                <p className="text-xs flex items-center gap-2 font-medium"><Mail size={12} className="text-lime-500" /> {user.email}</p>
                                                <p className="text-[10px] flex items-center gap-2 font-bold opacity-50 uppercase tracking-tighter"><Phone size={12} className="text-yellow-500" /> {user.phone || 'N/A'}</p>
                                            </div>
                                        </td>

                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <p className="text-[11px] font-bold opacity-80 uppercase">
                                                    {new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </p>
                                                <p className="text-[9px] font-mono opacity-40">
                                                    {new Date(user.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                                                user.role === 'admin' 
                                                ? 'bg-lime-500/10 border-lime-500/20 text-lime-500' 
                                                : 'bg-white/5 border-white/10 text-slate-400'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

const MetricCard = ({ label, value, icon, color, theme, isFocus }) => (
    <div className={`p-6 rounded-[2rem] border transition-all ${theme.card} flex items-center justify-between ${isFocus ? 'border-lime-500/40 bg-lime-500/[0.03]' : ''}`}>
        <div>
            <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${theme.textMuted}`}>{label}</p>
            <p className="text-3xl font-black tracking-tighter leading-none">{value}</p>
        </div>
        <div className={`p-3 rounded-2xl bg-white/5 border border-inherit ${color}`}>
            {icon}
        </div>
    </div>
);

export default Dashboard;