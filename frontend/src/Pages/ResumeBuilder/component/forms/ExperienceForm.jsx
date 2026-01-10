import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateExperience } from '../../../../Store/Slice/ResumeSlice';
import { Plus, Trash2, Save, Briefcase, MapPin, Calendar, LayoutList } from 'lucide-react';
import toast from 'react-hot-toast';
import RichTextEditor from '../TextEditor/RichTextEditor';

function ExperienceForm() {
    const resumeInfo = useSelector((state) => state.resume.info);
    const darkMode = useSelector((state) => state.theme.darkMode);
    const dispatch = useDispatch();

    const experienceList = resumeInfo?.experience || [];

    // Handler for standard text inputs and checkboxes
    const handleChange = (index, event) => {
        const { name, value, type, checked } = event.target;
        const newEntries = [...experienceList];
        newEntries[index] = { 
            ...newEntries[index], 
            [name]: type === 'checkbox' ? checked : value 
        };
        dispatch(updateExperience(newEntries));
    };

    // SPECIFIC HANDLER FOR RICH TEXT EDITOR
    const handleRichTextChange = (index, e) => {
        const newEntries = [...experienceList];
        newEntries[index] = { 
            ...newEntries[index], 
            workSummary: e.target.value 
        };
        dispatch(updateExperience(newEntries));
    };

    const addNewExperience = () => {
        const newEntries = [...experienceList, {
            title: '',
            companyName: '',
            city: '',
            state: '',
            startDate: '',
            endDate: '',
            currentlyWorking: false,
            workSummary: ''
        }];
        dispatch(updateExperience(newEntries));
    };

    const removeExperience = (index) => {
        const newEntries = experienceList.filter((_, i) => i !== index);
        dispatch(updateExperience(newEntries));
    };

    const onSave = (e) => {
        e.preventDefault();
        localStorage.setItem('resumeData', JSON.stringify(resumeInfo));
        toast.success(`Experience details saved!`, {
            icon: '💼',
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
                        <Briefcase className={darkMode ? 'text-yellow-400' : 'text-green-600'} size={24} />
                    </div>
                    <h2 className={`font-black text-2xl tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>Professional Experience</h2>
                </div>
            </header>

            <form onSubmit={onSave} className='space-y-10'>
                {experienceList.map((item, index) => (
                    <div key={index} className={`group p-6 rounded-2xl border relative transition-all duration-300
                        ${darkMode 
                            ? 'bg-gray-800/20 border-gray-800 hover:border-yellow-400/40' 
                            : 'bg-gray-50/50 border-gray-100 hover:border-green-200'}`}>
                        
                        {experienceList.length > 1 && (
                            <button type="button" onClick={() => removeExperience(index)}
                                className='absolute -top-3 -right-3 p-2 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 active:scale-90 transition-transform z-10'>
                                <Trash2 size={16} />
                            </button>
                        )}
                        
                        <div className='grid grid-cols-1 md:grid-cols-6 gap-6'>
                            <div className='md:col-span-3'>
                                <label className={labelStyle}>Job Title</label>
                                <input name="title" value={item.title} className={inputStyle} onChange={(e) => handleChange(index, e)} placeholder="e.g. Full Stack Developer" />
                            </div>

                            <div className='md:col-span-3'>
                                <label className={labelStyle}>Company Name</label>
                                <input name="companyName" value={item.companyName} className={inputStyle} onChange={(e) => handleChange(index, e)} placeholder="e.g. Amazon" />
                            </div>

                            <div className='md:col-span-2'>
                                <label className={labelStyle}><Calendar size={12}/> Start Date</label>
                                <input name="startDate" value={item.startDate} className={inputStyle} onChange={(e) => handleChange(index, e)} placeholder="Jan 2021" />
                            </div>

                            <div className='md:col-span-2'>
                                <label className={labelStyle}><Calendar size={12}/> End Date</label>
                                <input 
                                    name="endDate" 
                                    value={item.endDate} 
                                    disabled={item.currentlyWorking}
                                    className={`${inputStyle} ${item.currentlyWorking ? 'opacity-50 cursor-not-allowed' : ''}`} 
                                    onChange={(e) => handleChange(index, e)} 
                                    placeholder="Apr 2022" 
                                />
                            </div>

                            <div className='md:col-span-2 flex items-end pb-3'>
                                <label className="flex items-center gap-2 cursor-pointer group/check">
                                    <input 
                                        type="checkbox" 
                                        name="currentlyWorking"
                                        checked={item.currentlyWorking}
                                        onChange={(e) => handleChange(index, e)}
                                        className={`w-4 h-4 rounded border transition-all ${darkMode ? 'accent-yellow-500' : 'accent-green-600'}`}
                                    />
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Presently Working</span>
                                </label>
                            </div>

                            <div className='md:col-span-3'>
                                <label className={labelStyle}><MapPin size={12}/> City</label>
                                <input name="city" value={item.city} className={inputStyle} onChange={(e) => handleChange(index, e)} />
                            </div>

                            <div className='md:col-span-3'>
                                <label className={labelStyle}><MapPin size={12}/> State</label>
                                <input name="state" value={item.state} className={inputStyle} onChange={(e) => handleChange(index, e)} />
                            </div>

                            <div className='md:col-span-6'>
                                <label className={labelStyle}><LayoutList size={12}/> Work Summary</label>
                                <RichTextEditor 
                                    value={item.workSummary} 
                                    onRichTextEditorChange={(e) => handleRichTextChange(index, e)}
                                    itemTitle = {item.title}
                                    itemCompany={item.companyName}
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <div className='flex flex-col sm:flex-row justify-between items-center gap-3 pt-0'>
                    <button type="button" onClick={addNewExperience}
                        className={`group flex items-center gap-3 font-bold text-sm transition-all
                            ${darkMode ? 'text-yellow-400 hover:text-yellow-300' : 'text-green-600 hover:text-green-700'}`}>
                        <div className={`p-2 rounded-xl transition-all ${darkMode ? 'bg-yellow-400/10 group-hover:bg-yellow-400/20' : 'bg-green-100 group-hover:bg-green-200'}`}>
                            <Plus size={20} />
                        </div>
                        Add More Experience
                    </button>

                    <button type="submit"
                        className={`w-full sm:w-auto flex items-center justify-center gap-3 px-12 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-xl active:scale-95
                            ${darkMode 
                                ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900 shadow-yellow-500/40' 
                                : 'bg-green-700 hover:bg-green-800 text-white shadow-green-700/30'}`}>
                        <Save size={20} />
                        Save Experience
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ExperienceForm;