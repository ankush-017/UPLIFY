import { configureStore } from '@reduxjs/toolkit';
import ThemeReducer from './Slice/ThemeSlice';
import authReducer from './Slice/authSlice';

const store = configureStore({
    reducer: {
        theme: ThemeReducer, 
        auth: authReducer, 
    }
})
export default store;