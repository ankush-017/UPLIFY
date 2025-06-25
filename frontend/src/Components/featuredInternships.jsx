import React from 'react';
import { Briefcase, MapPin, IndianRupee, SquareArrowRight} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const featuredInternships = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    company: 'TechNova',
    location: 'Remote',
    stipend: '₹10,000/month',
    type: 'Remote',
    link: '/internship/1',
  },
  {
    id: 2,
    title: 'Social Media Intern',
    company: 'DigiSpark',
    location: 'Bangalore',
    stipend: '₹5,000/month',
    type: 'In-office',
    link: '/internship/2',
  },
  {
    id: 3,
    title: 'Data Analyst Intern',
    company: 'Insightly AI',
    location: 'Remote',
    stipend: '₹12,000/month',
    type: 'Remote',
    link: '/internship/3',
  },
];

export default function FeaturedInternships() {

    const darkMode = useSelector((state)=>state.theme.darkMode);

  return (
    <section className={`py-10 px-6 md:px-20 ${darkMode? "bg-gradient-to-br from-[#2e4781] via-[#0c1b2c] to-[#220909]": "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"}`}>
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h2 className={`text-3xl md:text-4xl font-extrabold ${darkMode?"bg-gradient-to-r from-blue-500 to-purple-500":"bg-gradient-to-r from-blue-600 to-purple-600"} text-transparent bg-clip-text`}>
          Featured Internships
        </h2>
        <p className={`${darkMode?"text-gray-300":"text-gray-600"} mt-2 text-sm md:text-base`}>
          Curated internships from top startups & companies in India
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {featuredInternships.map((job, idx) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={`${darkMode?"bg-gray-900 border-gray-500":"bg-white border-gray-100"} rounded-2xl shadow-md p-6 border hover:shadow-xl hover:scale-[1.02] transition-all duration-300`}
          >
            <div className={`mb-2 flex items-center gap-2 text-sm ${darkMode? "text-purple-400": "text-purple-600"} font-medium`}>
              <Briefcase size={16} /> {job.company}
            </div>
            <h3 className={`text-lg font-semibold ${darkMode? "text-gray-200": "text-gray-800"} mb-2`}>{job.title}</h3>

            <div className={`flex items-center text-sm ${darkMode? "text-gray-300": "text-gray-500"} gap-2 mb-1`}>
              <MapPin size={14} /> {job.location}
            </div>
            <div className={`flex items-center text-sm ${darkMode? "text-gray-300": "text-gray-500"} gap-2 mb-4`}>
              <IndianRupee size={14} /> {job.stipend}
            </div>

            <span className={`text-xs px-3 py-1 rounded-full font-medium mb-4 inline-block 
              ${job.type === 'Remote' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
              {job.type}
            </span>

            <Link
              to={job.link}
              className="inline-block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Apply Now →
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center">
        <Link
            to="/internships"
            className="gap-2 flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            <span className="font-semibold">View all internships </span>
            <SquareArrowRight />
          </Link>
      </div>
    </section>
  );
}