import React, { useState } from 'react';
import CommunityPost from '../Components/CommunityPost';
import { communityDark, communityLight } from '../assets/image';
import { useSelector } from 'react-redux';
import {
  Trophy, Flame, MessageSquare,
  Briefcase, Clock, Search,
  TrendingUp, Calendar, FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';

const UplifyCommunity = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [activeFilter, setActiveFilter] = useState('All Time');

  const timeFilters = [
    { label: 'Today', value: '1 day' },
    { label: 'Last 48h', value: '2 days' },
    { label: 'This Week', value: '1 week' },
    { label: 'This Month', value: '1 month' },
    { label: 'All Time', value: 'all' },
  ];

  return (
    <div
      className="bg-fixed bg-cover min-h-screen p-4 md:p-8 transition-all duration-700 ease-in-out"
      style={{
        backgroundImage: `url(${darkMode ? communityDark : communityLight})`,
        backgroundColor: darkMode ? '#020617' : '#f8fafc'
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* --- PREMIUM SIDEBAR (Left) --- */}
        <aside className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-28 space-y-6 h-fit">

            {/* TIME FILTERS */}
            <div className={`p-5 rounded-[2rem] backdrop-blur-xl border transition-all ${darkMode ? 'bg-emerald-950/20 border-emerald-500/10' : 'bg-white/80 border-slate-200 shadow-xl shadow-slate-200/40'
              }`}>
              <div className="flex items-center gap-2 mb-4 px-1 text-emerald-500 font-black text-[10px] uppercase tracking-[0.2em]">
                <Clock size={14} /> Feed Chronology
              </div>
              <div className="grid grid-cols-1 gap-2">
                {timeFilters.map((filter) => (
                  <button
                    key={filter.label}
                    onClick={() => setActiveFilter(filter.label)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${activeFilter === filter.label
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                        : (darkMode ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-emerald-50 text-slate-600')
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      <Calendar size={14} opacity={0.6} /> {filter.label}
                    </span>
                    {activeFilter === filter.label && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                  </button>
                ))}
              </div>
            </div>

            {/* NAVIGATION */}
            <nav className="space-y-2">
              {[
                { icon: <MessageSquare size={18} />, label: 'Feed', to: '/user/uplify-community', active: true },
                { icon: <Briefcase size={18} />, label: 'Internships', to: '/user/uplify-internship' },
                { icon: <Trophy size={18} />, label: 'Challenges', to: '/user/projects-libray' },
                { icon: <FileText size={18} />, label: "AI Resume Builder", to: "/user/resume-builder" }
              ].map((item) => (
                <Link key={item.label} to={item.to}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 group ${item.active
                      ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-emerald-950 shadow-xl'
                      : (darkMode ? 'text-slate-400 hover:text-emerald-400 hover:bg-white/5' : 'text-slate-500 hover:text-emerald-600 hover:bg-white')
                    }`}>
                  <span className="group-hover:rotate-6 transition-transform">{item.icon}</span>
                  <span className="font-black text-xs uppercase tracking-widest">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* --- MAIN FEED (Center) --- */}
        <main className="lg:col-span-9">
          <div className={`backdrop-blur-3xl rounded-[3rem] border transition-all duration-700 ${darkMode
              ? 'bg-[#081508]/40 border-emerald-500/10 shadow-[0_20px_80px_rgba(0,0,0,0.4)]'
              : 'bg-white/80 border-white shadow-[0_20px_80px_rgba(0,0,0,0.05)]'
            }`}>
            <div className="p-1 md:p-2">
              <CommunityPost filter={activeFilter} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UplifyCommunity;