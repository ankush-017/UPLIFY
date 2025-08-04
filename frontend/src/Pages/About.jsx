import React from 'react';
import { motion } from 'framer-motion';
import { AboutHero, AboutMission, Ankush } from '../assets/image';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function About() {

  const navigate = useNavigate()
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} font-sans`}>

      {/* HERO Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full py-10 px-6 md:px-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-900 text-white'}`}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Text Content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 leading-tight">
              Transforming Education with Real-World Tech Skills
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Uplify empowers students to bridge the gap between learning and doing through access to real-world projects, guided roadmaps, and internship opportunities crafted for long-term growth.
            </p>
            <button
              onClick={() => navigate('/resources')}
              className={`inline-block px-8 py-3 ${darkMode ? "bg-blue-800 text-white" : "bg-white text-blue-800"} font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              Start Learning
            </button>
          </div>

          {/* Right Image */}
          <div>
            <img
              src={AboutHero}
              alt="Learning Illustration"
              className="w-full h-auto rounded-2xl shadow-2xl object-cover"
            />
          </div>
        </div>
      </motion.section>


      {/* MISSION Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-50 text-gray-900 '} py-20 px-6 md:px-16`}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-[400px] mx-auto">
            <img
              src={AboutMission}
              alt="Mission"
              className="w-full rounded-lg shadow-md object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              At Uplify, our mission is to revolutionize tech education. We aim to turn every learner into a doer — someone who builds, explores, fails, and grows. Through curated resources and project-based learning, we help students become job-ready with clarity and confidence.
            </p>
            <p className="mt-4 text-lg">
              Our programs are designed to eliminate the disconnect between theoretical knowledge and practical application.
            </p>
          </div>
        </div>
      </motion.section>

      {/* GOALS Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`${darkMode ? 'bg-gray-900' : 'bg-white'} py-10 px-6 md:px-16`}
      >
        <div className="max-w-7xl mx-auto pb-3">
          <h2 className={`text-3xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"} text-center mb-10`}>Our Core Goals</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: '🛠️',
                title: 'Project-Driven Learning',
                desc: 'Hands-on projects that build job-ready skills and real portfolios.',
              },
              {
                icon: '🌐',
                title: 'Global Access',
                desc: 'Breaking the barrier so students from any background can access quality content.',
              },
              {
                icon: '🎯',
                title: 'Career Readiness',
                desc: 'From internships to interviews, we prepare learners for real success.',
              },
            ].map((goal, i) => (
              <div
                key={i}
                className={`transition p-10 rounded-xl text-center shadow-md ${darkMode
                  ? 'bg-gray-800 hover:bg-indigo-900'
                  : 'bg-gray-100 hover:bg-indigo-50'
                  }`}
              >
                <div className="w-16 h-16 mx-auto flex items-center justify-center bg-indigo-100 text-3xl rounded-full mb-4">
                  {goal.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>{goal.title}</h3>
                <p className={`${darkMode ? "text-gray-100" : "text-gray-900"} text-base`}>{goal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* STATS Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`py-10 px-6 md:px-16 ${darkMode ? 'bg-indigo-900' : 'bg-indigo-700'} text-white`}
      >
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
          {[
            { value: '1000+', label: 'Learners Empowered' },
            { value: '50+', label: 'Projects Available' },
            { value: '95%', label: 'Student Satisfaction' },
          ].map((stat, i) => (
            <div key={i}>
              <h3 className="text-4xl font-bold">{stat.value}</h3>
              <p className="text-sm mt-2 text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* VISION Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'} py-10 px-6 md:px-16`}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>Our Vision</h2>
          <p className={`text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            We envision a world where tech education is practical, accessible, and inspiring. Uplify is committed to building a future where students learn through action, innovate fearlessly, and enter the workforce with real confidence and skill.
          </p>
        </div>
      </motion.section>

      {/* FEATURES Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`${darkMode ? 'bg-gray-900' : 'bg-white'} py-10 px-6 md:px-16`}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className={`text-3xl font-bold mb-10 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>What You’ll Get at Uplify</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Internship Listings',
                icon: '💼',
                desc: 'Curated internships across tech domains to help you gain real industry experience.',
              },
              {
                title: 'Uplify Internship Program',
                icon: '🚀',
                desc: 'Our in-house internship that lets you work on real projects while learning from mentors.',
              },
              {
                title: 'Structured Roadmaps',
                icon: '🧭',
                desc: 'Personalized learning paths to become a front-end dev, backend engineer, or fullstack pro.',
              },
              {
                title: 'Premium Resources',
                icon: '📚',
                desc: 'Access handpicked materials, cheat sheets, and videos to strengthen your tech base.',
              },
              {
                title: 'Peer Group Community',
                icon: '🤝',
                desc: 'Collaborate, ask doubts, share knowledge and grow with like-minded learners.',
              },
              {
                title: 'Project-Based Learning',
                icon: '🛠️',
                desc: 'Build real-world projects that showcase your skills to employers.',
              },
              {
                title: 'Resume Builder',
                icon: '📝',
                desc: 'Create professional resumes with ease using our AI-assisted resume builder.',
              },
              {
                title: 'Blogs & Articles',
                icon: '📰',
                desc: 'Read and write tech blogs to deepen knowledge and showcase your voice in the community.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`transition p-8 rounded-xl text-center shadow-sm ${darkMode
                  ? 'bg-gray-800 hover:bg-indigo-900'
                  : 'bg-gray-50 hover:bg-indigo-50'
                  }`}
              >
                <div className="w-16 h-16 mx-auto flex items-center justify-center text-3xl bg-indigo-100 rounded-full mb-4">
                  {item.icon}
                </div>
                <h3 className={` ${darkMode ? "text-gray-100" : "text-gray-900"} text-xl font-semibold mb-2`}>{item.title}</h3>
                <p className={`${darkMode ? "text-gray-300" : "text-gray-800"} text-sm`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FOUNDER Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`${darkMode ? 'bg-gray-900' : 'bg-white'} py-6 px-6 md:px-16 mb-5`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl font-extrabold mb-4 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
            Meet the Founder
          </h2>
          <div className="flex flex-col items-center gap-1">
            <img
              src={Ankush}
              alt="Ankush Kumar"
              className="rounded-full w-32 h-32 md:w-36 md:h-36 object-cover shadow-xl border-4 border-indigo-500"
            />
            <h3 className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Ankush Kumar
            </h3>
            <p className={`${darkMode ? "text-indigo-400" : "text-indigo-700"} text-sm font-medium`}>
              Founder & Software Engineer
            </p>
            <p className={`text-lg md:text-xl leading-relaxed mt-4 max-w-2xl ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Ankush is a B.Tech CSE student at MMMUT and a passionate full-stack developer with a strong interest in AI/ML. He built <span className="font-semibold text-indigo-500">Uplify</span> with a clear mission — to help students like himself navigate the tech world with clarity, confidence, and a supportive community that fosters growth.
            </p>
          </div>
        </div>
      </motion.section>


      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`${darkMode ? 'bg-indigo-900' : 'bg-indigo-700'} text-white text-center rounded-t-3xl py-10 px-6 md:px-16`}
      >
        <h2 className="text-3xl font-bold mb-4">Be a Part of the Uplify Community</h2>
        <p className="mb-6 text-lg">Connect, share, and grow with fellow tech enthusiasts and students just like you.</p>
        <button onClick={() => navigate('/user/uplify-community')} className="px-8 py-3 bg-white text-indigo-700 font-bold rounded-lg shadow hover:shadow-lg transition">
          Participate Now
        </button>
      </motion.section>

    </div>
  );
}