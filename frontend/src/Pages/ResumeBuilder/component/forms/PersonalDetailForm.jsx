import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateResumeInfo } from '../../../../Store/Slice/ResumeSlice';
import { Save } from 'lucide-react'; // Optional: for a professional icon
import toast from 'react-hot-toast';

function PersonalDetailForm() {

    const resumeInfo = useSelector((state) => state.resume.info);
    const darkMode = useSelector((state) => state.theme.darkMode);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateResumeInfo({ [name]: value }));
    };

    const onSave = (e) => {

        e.preventDefault();
        // Save to LocalStorage
        localStorage.setItem('resumeData', JSON.stringify(resumeInfo));

        // Trigger Success Toast
        toast.success('Personal details saved successfully!', {
            style: {
                borderRadius: '10px',
                background: darkMode ? '#333' : '#fff',
                color: darkMode ? '#fff' : '#333',
            },
        });
    };

    // Style logic for inputs
    const inputStyle = `w-full p-2.5 rounded-md border outline-none transition-all text-sm
        ${darkMode 
            ? 'bg-gray-700 border-gray-600 text-white focus:border-yellow-400' 
            : 'bg-white border-gray-300 text-gray-800 focus:border-green-600'}`;

    const labelStyle = `text-xs font-bold uppercase tracking-wider mb-1 block
        ${darkMode ? 'text-gray-400' : 'text-gray-600'}`;

    return (
        <div className='p-5 shadow-sm rounded-lg border-t-4 border-t-yellow-500 bg-transparent'>
            <h2 className='font-bold text-lg'>Personal Details</h2>
            <p className='text-sm text-gray-500 mb-5'>Fill in your basic information</p>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 gap-5'>
                    <div>
                        <label className={labelStyle}>First Name</label>
                        <input 
                            name="firstName" 
                            defaultValue={resumeInfo?.firstName}
                            className={inputStyle}
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div>
                        <label className={labelStyle}>Last Name</label>
                        <input 
                            name="lastName" 
                            defaultValue={resumeInfo?.lastName}
                            className={inputStyle}
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div className='col-span-2'>
                        <label className={labelStyle}>Job Title</label>
                        <input 
                            name="jobTitle" 
                            defaultValue={resumeInfo?.jobTitle}
                            className={inputStyle}
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div className='col-span-2'>
                        <label className={labelStyle}>Address</label>
                        <input 
                            name="address" 
                            defaultValue={resumeInfo?.address}
                            className={inputStyle}
                            onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label className={labelStyle}>Phone</label>
                        <input 
                            name="phone" 
                            defaultValue={resumeInfo?.phone}
                            className={inputStyle}
                            onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label className={labelStyle}>Email</label>
                        <input 
                            name="email" 
                            type="email"
                            defaultValue={resumeInfo?.email}
                            className={inputStyle}
                            onChange={handleChange} 
                        />
                    </div>
                </div>

                <div className='mt-6 flex justify-end'>
                    <button 
                        type="submit"
                        className='flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-700 px-6 py-2 rounded-md transition-all shadow-md font-semibold active:scale-95'
                    >
                        <Save size={18} />
                        Save Details
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PersonalDetailForm;