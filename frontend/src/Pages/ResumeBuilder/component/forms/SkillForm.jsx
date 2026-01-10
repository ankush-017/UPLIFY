import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSkills } from '../../../../Store/Slice/ResumeSlice'; // Ensure this action exists
import { Plus, Trash2, Save, Wrench, BadgeCheck, Terminal } from 'lucide-react';
import toast from 'react-hot-toast';

function SkillForm() {
    const resumeInfo = useSelector((state) => state.resume.info);
    const darkMode = useSelector((state) => state.theme.darkMode);
    const dispatch = useDispatch();

    // Default to the provided structure if skills is empty
    const skillsList = resumeInfo?.skills || [];

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newEntries = [...skillsList];
        newEntries[index] = { 
            ...newEntries[index], 
            [name]: value 
        };
        dispatch(updateSkills(newEntries));
    };

    const addNewSkillCategory = () => {
        const newEntries = [...skillsList, {
            category: '',
            skillsList: ''
        }];
        dispatch(updateSkills(newEntries));
    };

    const removeSkillCategory = (index) => {
        const newEntries = skillsList.filter((_, i) => i !== index);
        dispatch(updateSkills(newEntries));
    };

    const onSave = (e) => {
        e.preventDefault();
        localStorage.setItem('resumeData', JSON.stringify(resumeInfo));
        toast.success(`Skills updated successfully!`, {
            icon: '✔️',
            style: {
                borderRadius: '12px',
                background: darkMode ? '#111827' : '#ffffff',
                color: darkMode ? '#f3f4f6' : '#1f2937',
                border: darkMode ? '1px solid #374151' : '1px solid #e5e7eb'
            },
        });
    };

    const inputStyle = `w-full p-3 rounded-lg border outline-none transition-all duration-300 text-sm
        ${darkMode 
            ? 'bg-gray-800/40 border-gray-700 text-gray-100 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20' 
            : 'bg-white border-gray-200 text-gray-800 focus:border-green-600 focus:ring-2 focus:ring-green-600/10'}`;

    const labelStyle = `text-[11px] font-bold uppercase tracking-widest mb-1.5 flex items-center gap-2
        ${darkMode ? 'text-gray-500' : 'text-gray-400'}`;

    return (
        <div className={`p-4 shadow-2xl rounded-2xl border-t-4 transition-all duration-500
            ${darkMode ? 'bg-gray-900 border-t-yellow-500 shadow-black/60' : 'bg-white border-t-green-600 shadow-gray-200'}`}>
            
            <header className='mb-8'>
                <div className='flex items-center gap-3'>
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-yellow-400/10' : 'bg-green-100'}`}>
                        <Wrench className={darkMode ? 'text-yellow-400' : 'text-green-600'} size={24} />
                    </div>
                    <div>
                        <h2 className={`font-black text-2xl tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>Skills</h2>
                        <p className="text-[10px] text-gray-500 font-medium">Group your expertise by categories</p>
                    </div>
                </div>
            </header>

            <form onSubmit={onSave} className='space-y-6'>
                {skillsList.map((item, index) => (
                    <div key={index} className={`group p-5 rounded-2xl border relative transition-all duration-300
                        ${darkMode 
                            ? 'bg-gray-800/20 border-gray-800 hover:border-yellow-400/40' 
                            : 'bg-gray-50/50 border-gray-100 hover:border-green-200'}`}>
                        
                        <button type="button" onClick={() => removeSkillCategory(index)}
                            className='absolute -top-3 -right-3 p-2 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 active:scale-90 transition-transform z-10'>
                            <Trash2 size={14} />
                        </button>
                        
                        <div className='grid grid-cols-1 md:grid-cols-12 gap-5'>
                            <div className='md:col-span-4'>
                                <label className={labelStyle}><BadgeCheck size={12}/> Category</label>
                                <input 
                                    name="category" 
                                    value={item.category} 
                                    className={inputStyle} 
                                    onChange={(e) => handleChange(index, e)} 
                                    placeholder="e.g. Programming Languages" 
                                />
                            </div>

                            <div className='md:col-span-8'>
                                <label className={labelStyle}><Terminal size={12}/> Skills (Comma Separated)</label>
                                <textarea 
                                    name="skillsList" 
                                    value={item.skillsList} 
                                    rows="1"
                                    className={`${inputStyle} resize-none py-3`} 
                                    onChange={(e) => handleChange(index, e)} 
                                    placeholder="e.g. React, Node.js, Python, SQL" 
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <div className='flex flex-col sm:flex-row justify-between items-center gap-6 pt-4'>
                    <button type="button" onClick={addNewSkillCategory}
                        className={`group flex items-center gap-3 font-bold text-sm transition-all
                            ${darkMode ? 'text-yellow-400 hover:text-yellow-300' : 'text-green-600 hover:text-green-700'}`}>
                        <div className={`p-2 rounded-xl transition-all ${darkMode ? 'bg-yellow-400/10 group-hover:bg-yellow-400/20' : 'bg-green-100 group-hover:bg-green-200'}`}>
                            <Plus size={20} />
                        </div>
                        Add New Category
                    </button>

                    <button type="submit"
                        className={`w-full sm:w-auto flex items-center justify-center gap-3 px-12 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-xl active:scale-95
                            ${darkMode 
                                ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900 shadow-yellow-500/40' 
                                : 'bg-green-700 hover:bg-green-800 text-white shadow-green-700/30'}`}>
                        <Save size={20} />
                        Save Skills
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SkillForm;