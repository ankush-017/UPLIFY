import { useLocation, Routes, Route } from 'react-router-dom';
import RoadmapPage from '../Career/RoadmapPage';

export const RoadmapWrapper = () => {

  const location = useLocation();
  
  // Extract the data from the navigate state
  const config = location.state?.config || {};

  // Pass the extracted data as PROPS to the component
  return (
    <RoadmapPage 
      role={config.domain} 
      experience={config.experience} 
      skills={config.currentSkills} 
    />
  );
};