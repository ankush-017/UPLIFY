import React from 'react';
import { Filter, RotateCcw, Layers } from 'lucide-react';

/**
 * FilterInternship Component
 * @param {Object} filters - Current filter state from parent
 * @param {Function} setFilters - State setter from parent
 * @param {Function} resetFilters - Reset function from parent
 * @param {Boolean} darkMode - Theme state from parent/Redux
 */
function FilterInternship({ filters, setFilters, resetFilters, darkMode }) {
    return (
        <aside className="lg:w-80 shrink-0">
            <div className={`sticky top-24 p-8 rounded-[3rem] border-2 backdrop-blur-3xl transition-all duration-500
              ${darkMode ? "bg-black/40 border-white/5 shadow-2xl" : "bg-white/80 border-emerald-50 shadow-2xl shadow-emerald-900/5"}`}>

                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-r from-emerald-900 to-yellow-900 rounded-2xl">
                            <Filter size={18} className="text-white" />
                        </div>
                        <span className={`font-black text-xs uppercase tracking-widest ${darkMode ? "text-white" : "text-slate-900"}`}>
                            Filters
                        </span>
                    </div>
                    <button 
                        onClick={resetFilters} 
                        className="p-2 hover:bg-emerald-500/10 rounded-full transition-colors group"
                        title="Reset Filters"
                    >
                        <RotateCcw size={16} className="text-emerald-500 group-hover:rotate-[-45deg] transition-transform" />
                    </button>
                </div>

                {/* Stipend Range */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
                            Monthly Stipend
                        </h4>

                        <span
                            className={`px-3 py-1 rounded-full text-xs font-bold 
                                ${darkMode
                                    ? "bg-white/10 text-white"
                                    : "bg-emerald-100 text-emerald-700"
                                }`}
                        >
                            ₹{filters?.minStipend?.toLocaleString() || 0}+
                        </span>
                    </div>

                    {/* SLIDER */}
                    <div className="relative h-6 flex items-center">
                        {/* Track */}
                        <div className="absolute w-full h-2 rounded-full bg-gradient-to-r from-emerald-200 to-yellow-200 opacity-40" />

                        {/* Active Fill */}
                        <div
                            className="absolute h-2 rounded-full bg-gradient-to-r from-emerald-500 to-yellow-400 transition-all"
                            style={{
                                width: `${((filters?.minStipend || 0) / 100000) * 100}%`
                            }}
                        />

                        {/* Thumb */}
                        <input
                            type="range"
                            min={0}
                            max={100000}
                            step={1000}
                            value={filters?.minStipend || 0}
                            onChange={(e) =>
                                setFilters({ ...filters, minStipend: Number(e.target.value) })
                            }
                            className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer z-10
                                [&::-webkit-slider-thumb]:appearance-none
                                [&::-webkit-slider-thumb]:h-5
                                [&::-webkit-slider-thumb]:w-5
                                [&::-webkit-slider-thumb]:rounded-full
                                [&::-webkit-slider-thumb]:bg-gradient-to-r
                                [&::-webkit-slider-thumb]:from-emerald-500
                                [&::-webkit-slider-thumb]:to-yellow-400
                                [&::-webkit-slider-thumb]:shadow-lg
                                [&::-webkit-slider-thumb]:border-0
                                [&::-webkit-slider-thumb]:transition
                                [&::-webkit-slider-thumb]:hover:scale-110
                            "
                        />
                    </div>

                    {/* Labels */}
                    <div className="flex justify-between text-[10px] mt-3 opacity-60 font-semibold">
                        <span>₹0</span>
                        <span>₹25k</span>
                        <span>₹50k</span>
                        <span>₹75k</span>
                        <span>₹1L+</span>
                    </div>
                </div>

                {/* Domain scroll-area */}
                <div className="mb-12">
                    <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-5">Job Domain</h4>
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
                        {['Development', 'Design', 'Data Science', 'Marketing', 'Product', 'DevOps'].map(cat => (
                            <div key={cat}
                                onClick={() => {
                                    const updated = filters.categories.includes(cat) 
                                        ? filters.categories.filter(c => c !== cat) 
                                        : [...filters.categories, cat];
                                    setFilters({ ...filters, categories: updated });
                                }}
                                className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all border-2
                                    ${filters.categories.includes(cat)
                                        ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                                        : darkMode 
                                            ? "bg-white/5 border-white/5 text-white/70 hover:border-emerald-500/50" 
                                            : "bg-emerald-50/50 border-transparent text-slate-700 hover:border-emerald-200"
                                    }`}
                            >
                                <Layers size={14} />
                                <span className="text-xs font-black">{cat}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stack Cloud */}
                <div className="mb-10">
                    <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-5">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                        {['React', 'Python', 'Node', 'Figma', 'AWS'].map(skill => (
                            <button
                                key={skill}
                                onClick={() => {
                                    const updated = filters.skills.includes(skill) 
                                        ? filters.skills.filter(s => s !== skill) 
                                        : [...filters.skills, skill];
                                    setFilters({ ...filters, skills: updated });
                                }}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all
                                    ${filters.skills.includes(skill)
                                        ? "bg-yellow-400 text-black shadow-lg shadow-yellow-500/20 scale-105"
                                        : darkMode 
                                            ? "bg-white/5 text-white/60 hover:text-white hover:bg-white/10" 
                                            : "bg-emerald-100/50 text-emerald-700 hover:bg-emerald-100"
                                    }`}
                            >
                                {skill}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default FilterInternship;