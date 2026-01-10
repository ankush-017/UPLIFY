import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAchievements } from '../../../../Store/Slice/ResumeSlice';
import { Trophy, Plus, Trash2, Save, Medal } from 'lucide-react';
import toast from 'react-hot-toast';

function AchievementForm() {

    const resumeInfo = useSelector((state) => state.resume.info);
    const darkMode = useSelector((state) => state.theme.darkMode);
    const dispatch = useDispatch();

    const achievementList = Array.isArray(resumeInfo?.achievements) 
        ? resumeInfo.achievements 
        : [];

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newEntries = [...achievementList];
        newEntries[index] = { 
            ...newEntries[index], 
            [name]: value 
        };
        dispatch(updateAchievements(newEntries));
    };

    const addNewAchievement = () => {
        const newEntries = [...achievementList, { description: '' }];
        dispatch(updateAchievements(newEntries));
    };

    const removeAchievement = (index) => {
        const newEntries = achievementList.filter((_, i) => i !== index);
        dispatch(updateAchievements(newEntries));
    };

    const onSave = (e) => {
        e.preventDefault();
        localStorage.setItem('resumeData', JSON.stringify(resumeInfo));
        toast.success(`Achievements saved!`, {
            style: {
                borderRadius: '12px',
                background: darkMode ? '#1f2937' : '#fff',
                color: darkMode ? '#fff' : '#1f2937',
            }
        });
    };

    const inputStyle = `w-full p-4 rounded-xl border outline-none transition-all duration-300 text-sm resize-none
        ${darkMode 
            ? 'bg-gray-800/50 border-gray-700 text-gray-100 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 placeholder:text-gray-600' 
            : 'bg-white border-gray-200 text-gray-800 focus:border-green-600 focus:ring-2 focus:ring-green-600/10 placeholder:text-gray-400'}`;

    return (
        <div className={`p-6 shadow-2xl rounded-2xl border-t-4 transition-all duration-500
            ${darkMode ? 'bg-gray-900 border-t-yellow-500 shadow-black/60' : 'bg-white border-t-green-600 shadow-gray-200'}`}>
            
            <header className='mb-8'>
                <div className='flex items-center gap-3'>
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-yellow-400/10' : 'bg-green-100'}`}>
                        <Trophy className={darkMode ? 'text-yellow-400' : 'text-green-600'} size={24} />
                    </div>
                    <div>
                        <h2 className={`font-black text-2xl tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Achievements
                        </h2>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                            Simple Entry Mode
                        </p>
                    </div>
                </div>
            </header>

            <form onSubmit={onSave} className='space-y-6'>
                {achievementList.map((item, index) => (
                    <div key={index} className="relative group animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center gap-2 mb-2">
                            <Medal size={14} className={darkMode ? 'text-yellow-500' : 'text-green-600'} />
                            <span className={`text-[11px] font-bold uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                Achievement {index + 1}
                            </span>
                        </div>

                        <textarea
                            name="description"
                            rows="2"
                            value={item.description}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="e.g. Solved 500+ problems on LeetCode with a max rating of 1850..."
                            className={inputStyle}
                        />

                        <button 
                            type="button" 
                            onClick={() => removeAchievement(index)}
                            className='absolute top-0 right-0 p-1.5 text-gray-400 hover:text-red-500 transition-colors'
                            title="Remove"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}

                <div className='flex flex-col sm:flex-row justify-between items-center gap-6 pt-6 border-t border-gray-100 dark:border-gray-800'>
                    <button 
                        type="button" 
                        onClick={addNewAchievement}
                        className={`group flex items-center gap-3 font-bold text-sm transition-all
                            ${darkMode ? 'text-yellow-400 hover:text-yellow-300' : 'text-green-600 hover:text-green-700'}`}
                    >
                        <div className={`p-2 rounded-xl transition-all ${darkMode ? 'bg-yellow-400/10 group-hover:bg-yellow-400/20' : 'bg-green-100 group-hover:bg-green-200'}`}>
                            <Plus size={20} />
                        </div>
                        Add Achievement
                    </button>

                    <button 
                        type="submit"
                        className={`w-full sm:w-auto flex items-center justify-center gap-3 px-12 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-xl active:scale-95
                            ${darkMode 
                                ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900 shadow-yellow-500/40' 
                                : 'bg-green-700 hover:bg-green-800 text-white shadow-green-700/30'}`}
                    >
                        <Save size={20} />
                        Save Data
                    </button>
                </div>
            </form>
        </div>
    );
}
export default AchievementForm;