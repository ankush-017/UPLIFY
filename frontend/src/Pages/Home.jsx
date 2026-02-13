import React from 'react'
import Hero from '../Components/Hero';
import CoursesSection from '../Components/CoursesSection';
import ResumeBuilderSection from '../Components/ResumeBuilderSection';
import FaqSection from '../Components/FaqSection';
import Seo from '../Components/Seo';
import FeaturedInternships from '../Components/featuredInternships';
import CareerRoadmaps from '../Components/CareerRoadmaps';
import WhyHow from '../Components/WhyHow';

function Home() {

  

  return (
    <>
      <Seo
        title="Uplify - Top Internships for Students in 2026"
        description="Discover top remote and in-office internships in tech, marketing, design & more. Uplify connects students with verified companies and offers resume building, courses, and more."
        url="https://uplify.in/"
        image="https://uplify.in/og-banner.jpg"
      />
      <Hero />
      <FeaturedInternships/>
      <WhyHow/>
      <CoursesSection />
      <CareerRoadmaps/>
      <ResumeBuilderSection />
      <FaqSection />
      
    </>
  )
}
export default Home;