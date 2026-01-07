import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateEducation } from '../../../../Store/Slice/ResumeSlice';
import { Plus, Trash2, Save, GraduationCap, MapPin, Award, ArrowRightLeft } from 'lucide-react';
import toast from 'react-hot-toast';

function EducationForm() {
    const resumeInfo = useSelector((state) => state.resume.info);
    const darkMode = useSelector((state) => state.theme.darkMode);
    const dispatch = useDispatch();

    // Toggle: 'CGPA' or 'Percentage'
    const [scoreType, setScoreType] = useState('CGPA');

    const educationList = resumeInfo?.education || [];

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newEntries = [...educationList];
        newEntries[index] = { ...newEntries[index], [name]: value };
        dispatch(updateEducation(newEntries));
    };

    const addNewEducation = () => {
        const newEntries = [...educationList, {
            universityName: '', degree: '', major: '', startDate: '', endDate: '', city: '', state: '', gpa: ''
        }];
        dispatch(updateEducation(newEntries));
    };

    const removeEducation = (index) => {
        const newEntries = educationList.filter((_, i) => i !== index);
        dispatch(updateEducation(newEntries));
    };

    const onSave = (e) => {
        e.preventDefault();
        localStorage.setItem('resumeData', JSON.stringify(resumeInfo));
        toast.success(`${scoreType} and Education details saved!`, {
            icon: '🎓',
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

    const labelStyle = `text-[11px] font-bold uppercase tracking-widest mb-1.5 flex items-center justify-between
        ${darkMode ? 'text-gray-500' : 'text-gray-400'}`;

    return (
        <div className={`p-4 shadow-2xl rounded-2xl border-t-4 transition-all duration-500
            ${darkMode ? 'bg-gray-900 border-t-yellow-500 shadow-black/60' : 'bg-white border-t-green-600 shadow-gray-200'}`}>
            
            <header className='mb-8'>
                <div className='flex items-center gap-3'>
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-yellow-400/10' : 'bg-green-100'}`}>
                        <GraduationCap className={darkMode ? 'text-yellow-400' : 'text-green-600'} size={24} />
                    </div>
                    <h2 className={`font-black text-2xl tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>Education</h2>
                </div>
            </header>

            <form onSubmit={onSave} className='space-y-10'>
                {educationList.map((item, index) => (
                    <div key={index} className={`group p-6 rounded-2xl border relative transition-all duration-300
                        ${darkMode 
                            ? 'bg-gray-800/20 border-gray-800 hover:border-yellow-400/40' 
                            : 'bg-gray-50/50 border-gray-100 hover:border-green-200'}`}>
                        
                        {educationList.length > 1 && (
                            <button type="button" onClick={() => removeEducation(index)}
                                className='absolute -top-3 -right-3 p-2 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 active:scale-90 transition-transform z-10'>
                                <Trash2 size={16} />
                            </button>
                        )}
                        
                        <div className='grid grid-cols-1 md:grid-cols-6 gap-6'>
                            <div className='md:col-span-6'>
                                <label className={labelStyle}><span>University Name</span></label>
                                <input name="universityName" value={item.universityName} className={inputStyle} onChange={(e) => handleChange(index, e)} />
                            </div>

                            <div className='md:col-span-3'>
                                <label className={labelStyle}><span>Degree</span></label>
                                <input name="degree" value={item.degree} className={inputStyle} onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div className='md:col-span-3'>
                                <label className={labelStyle}><span>Major</span></label>
                                <input name="major" value={item.major} className={inputStyle} onChange={(e) => handleChange(index, e)} />
                            </div>

                            <div className='md:col-span-2'>
                                <label className={labelStyle}><span>Start Date</span></label>
                                <input name="startDate" value={item.startDate} className={inputStyle} onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div className='md:col-span-2'>
                                <label className={labelStyle}><span>End Date</span></label>
                                <input name="endDate" value={item.endDate} className={inputStyle} onChange={(e) => handleChange(index, e)} />
                            </div>

                            {/* Score Field (CGPA / Percentage Toggle) */}
                            <div className='md:col-span-2'>
                                <div className={labelStyle}>
                                    <span className='flex items-center gap-1.5'><Award size={12}/> {scoreType}</span>
                                    <button 
                                        type="button"
                                        onClick={() => setScoreType(scoreType === 'CGPA' ? 'Percentage' : 'CGPA')}
                                        className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[9px] transition-all
                                            ${darkMode 
                                                ? 'border-yellow-400/30 text-yellow-500 hover:bg-yellow-400/10' 
                                                : 'border-green-200 text-green-700 hover:bg-green-50'}`}
                                    >
                                        <ArrowRightLeft size={10} />
                                        {scoreType === 'CGPA' ? '%age' : 'CGPA'}
                                    </button>
                                </div>
                                <input 
                                    name="gpa" 
                                    value={item.gpa} 
                                    placeholder={scoreType === 'CGPA' ? "e.g. 9.5/10.0" : "e.g. 85%"} 
                                    className={inputStyle} 
                                    onChange={(e) => handleChange(index, e)} 
                                />
                            </div>

                            <div className='md:col-span-3'>
                                <label className={labelStyle}><span><MapPin size={12}/> City</span></label>
                                <input name="city" value={item.city} className={inputStyle} onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div className='md:col-span-3'>
                                <label className={labelStyle}><span><MapPin size={12}/> State</span></label>
                                <input name="state" value={item.state} className={inputStyle} onChange={(e) => handleChange(index, e)} />
                            </div>
                        </div>
                    </div>
                ))}

                {/* Footer Buttons */}
                <div className='flex flex-col sm:flex-row justify-between items-center gap-6 pt-0'>
                    <button type="button" onClick={addNewEducation}
                        className={`group flex items-center gap-3 font-bold text-sm transition-all
                            ${darkMode ? 'text-yellow-400 hover:text-yellow-300' : 'text-green-600 hover:text-green-700'}`}>
                        <div className={`p-2 rounded-xl transition-all ${darkMode ? 'bg-yellow-400/10 group-hover:bg-yellow-400/20' : 'bg-green-100 group-hover:bg-green-200'}`}>
                            <Plus size={20} />
                        </div>
                        Add Education
                    </button>

                    <button type="submit"
                        className={`w-full sm:w-auto flex items-center justify-center gap-3 px-12 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-xl active:scale-95
                            ${darkMode 
                                ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900 shadow-yellow-500/40' 
                                : 'bg-green-700 hover:bg-green-800 text-white shadow-green-700/30'}`}>
                        <Save size={20} />
                        Save Education
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EducationForm;