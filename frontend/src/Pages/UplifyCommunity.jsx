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
      <Seo
        title="Uplify Community | Connect, Share & Grow Together"
        description="Join the Uplify Community to access resources, peer groups, projects, blogs, and more. Collaborate, learn, and grow with fellow developers and learners."
        url="https://uplify.in/community"
        image="https://uplify.in/og-image-community.jpg"
      />

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
                  { to: '/resume-builder', label: 'Resume Builder' }
                ],
                url: '',
              },
              {
                title: '👥 Peer Groups',
                content: 'Join communities to grow and network.',
                links: [{ to: '/peergroups', label: 'Explore Peer Groups' }],
                url: '',
              },
              {
                title: '🚀 Uplify Program',
                content: 'A mentorship-driven path to real-world experience.',
                links: [{ to: '/uplify-program', label: 'View Details' }],
                url: '',
              },
              {
                title: '📝 Blogs',
                links: [
                  { to: '/blog/77cfc88c-6597-42fb-bc6a-812a720bdadc', label: 'Internship Guide' },
                  { to: '/blogs/career-tips', label: 'Career Tips' }
                ],
                url: '/blog',
              },
              {
                title: '📂 Project Library',
                content: 'Find real-world project ideas to practice your skills.',
                links: [{ to: '/projects', label: 'Explore Projects' }]
              },
              {
                title: '📝 Make Your Resume Better',
                content: 'Use our AI Resume Builder to create an impressive resume.',
                links: [{ to: '/resume-builder', label: 'Build Resume →' }]
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl p-5 shadow-md transition hover:scale-[1.02] duration-300 ${darkMode ? "bg-white/5 backdrop-blur-sm" : "bg-white"
                  }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>{item.title}</h3>
                  <div
                    className={`${darkMode ? "text-blue-500" : "text-blue-600"} cursor-pointer`}
                    onClick={() => navigate(item.url)}
                  >
                    <ArrowBigRightDash />
                  </div>
                </div>
                {item.content && <p className={`text-sm mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{item.content}</p>}
                <ul className="text-sm space-y-1">
                  {item.links.map((link, i) => (
                    <li key={i}>
                      <Link to={link.to} className="text-blue-500 hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>

          {/* Community Post */}
          <div className="col-span-1 md:col-span-2 flex items-center justify-center">
            <div className="backdrop-blur-lg bg-white/50 dark:bg-white/10 p-3 md:p-10 rounded-2xl w-full shadow-xl">
              <CommunityPost />
            </div>
          </div>

        </div>
      </div>
    </>

  )
}

export default UplifyCommunity;