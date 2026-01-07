import { configureStore } from '@reduxjs/toolkit';
import ThemeReducer from './Slice/ThemeSlice';
import authReducer from './Slice/authSlice';
import resumeReducer from './Slice/ResumeSlice'

const store = configureStore({
    reducer: {
        theme: ThemeReducer, 
        auth: authReducer, 
        resume: resumeReducer
    }
})
export default store;