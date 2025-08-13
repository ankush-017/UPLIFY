import React from 'react'
import CommunityPost from '../Components/CommunityPost';
import { communityDark, communityLight } from '../assets/image';
import { useSelector } from 'react-redux';
import { ArrowBigRightDash } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../Components/Seo';

const UplifyCommunity = () => {

  const darkMode = useSelector((state) => state.theme.darkMode);

  return (

    <>
      <div
        className="bg-center bg-cover min-h-screen p-4 md:p-10 backdrop-blur-md"
        style={{ backgroundImage: `url(${darkMode ? communityDark : communityLight})` }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Sidebar */}
          <aside className="space-y-6 col-span-1 backdrop-blur-md bg-transparent px-2 mt-3 md:px-0">
            {[
              {
                title: '📚 Resources',
                links: [
                  { to: '/resources', label: 'Learning Resources' },
                ],
                url: '/user/resources',
              },
              {
                title: '👥 Community Post',
                content: 'Join communities to grow and network.',
                links: [{ to: '/user/uplify-community', label: 'Explore Community' }],
                url: '/user/uplify-community',
              },
              {
                title: '🚀 Uplify Program',
                content: 'A mentorship-driven path to real-world experience.',
                links: [{ to: '/user/uplify-internship', label: 'View Real-World Internships' }],
                url: '/user/uplify-internship',
              },
              {
                title: '📝 Blogs',
                links: [
                  { to: '/blog/d5d074b3-2b2b-416d-8d24-84b30a0d8445', label: 'How to Make a Professional Resume' },
                  { to: '/blogs/cc75a1f9-c63e-458d-8073-8591b958db39', label: 'The Ultimate 6-Month Guide to Mastering Data Structures and Algorithms (DSA)' }
                ],
                url: '/blog',
              },
              {
                title: '📂 Project Library',
                content: 'Find real-world project ideas to practice your skills.',
                links: [{ to: '/user/projects-libray', label: 'Explore Projects' }],
                url: '/user/projects-libray'
              },
              {
                title: '📝 Make Your Resume Better',
                content: 'Use our AI Resume Builder to create an impressive resume.',
                links: [{ to: '/user/resume-builder', label: 'Build Resume →' }],
                url: '/user/resume-builder'
              }
            ].map((item, index) => (
              <div key={index} className={`${darkMode ? "bg-white/5" : "bg-white"} p-4 rounded-xl shadow`}>
                <div className='flex flex-row justify-between'>
                  <h3 className={`text-lg font-semibold mb-2 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>{item.title}</h3>
                  {/* <div className={`${darkMode ? "text-blue-600" : "text-blue-700"} cursor-pointer`} onClick={() => navigate(item.url)}>
                                  <ArrowBigRightDash />
                                </div> */}
                </div>
                {item.content && <p className={`text-sm mb-2 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>{item.content}</p>}
                <ul className="text-sm space-y-1">
                  {item.links.map((link, i) => (
                    <li key={i}><Link to={link.to} className="text-blue-500 hover:underline">{link.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>

          {/* Community Post */}
          <div className="col-span-1 md:col-span-2 flex items-center justify-center">
            <div className="backdrop-blur-lg bg-white/50 dark:bg-white/10 p-3 md:p-3 rounded-2xl w-full shadow-xl">
              <CommunityPost />
            </div>
          </div>

        </div>
      </div>
    </>

  )
}

export default UplifyCommunity;