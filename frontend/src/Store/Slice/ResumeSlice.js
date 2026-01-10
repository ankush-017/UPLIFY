import { createSlice } from '@reduxjs/toolkit';
import dummyInfo from '../../Pages/ResumeBuilder/component/dummy';

export const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    info: dummyInfo,
  },
  reducers: {
    // update top-level strings: firstName, lastName, jobTitle, summary, themeColor.
    updateResumeInfo: (state, action) => {
      state.info = { ...state.info, ...action.payload};
    },

    // Generic reducer: Best for dynamic sections
    // Usage: dispatch(updateSection({ section: 'skills', data: [...] }))
    updateSection: (state, action) => {
      const { section, data } = action.payload;
      if (state.info.hasOwnProperty(section)) {
        state.info[section] = data;
      } 
      else {
        // Creates the section if it doesn't exist (e.g., first time adding achievements)
        state.info = { ...state.info, [section]: data };
      }
    },

    // Specific helpers for core sections
    updateEducation: (state, action) => {
      state.info.education = action.payload;
    },
    updateSkills: (state, action) => {
      state.info.skills = action.payload;
    },
    updateProjects: (state, action) => {
      state.info.projects = action.payload;
    },
    updateExperience: (state, action) => {
      state.info.experience = action.payload;
    },
    // Added specific reducer for your Achievements & Coding Profiles
    updateAchievements: (state, action) => {
      state.info.achievements = action.payload;
    }
  },
});

export const { 
  updateResumeInfo, 
  updateSection, 
  updateEducation, 
  updateSkills, 
  updateProjects,
  updateExperience,
  updateAchievements 
} = resumeSlice.actions;

export default resumeSlice.reducer;