import React from 'react';
import {
  Briefcase,
  Globe,
  Code,
  Smartphone,
  Users,
  Medal,
  Laptop,
  Sparkles,
  BookOpenCheck,
  Lightbulb,
  CalendarDays,
  Trophy,
  Clock
} from 'lucide-react';
import { useSelector } from 'react-redux'
import { UIDark, UILight } from '../assets/image';

export default function UplifyInternship() {

  const darkMode = useSelector((state) => state.theme.darkMode);

  const domains = [
    {
      title: 'Frontend Development',
      icon: <Laptop className="w-8 h-8 text-blue-600" />,
      description:
        'Build interactive UIs using HTML, CSS, JavaScript, and modern frameworks like React or Vue.',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSdOFNzrOpURqABZGmDXqYSRB7C6_Diaxg0NzR91RsY-hum6IQ/viewform',
    },
    {
      title: 'Backend Development',
      icon: <Code className="w-8 h-8 text-green-600" />,
      description:
        'Create robust server-side logic, APIs, and work with databases using Node.js, Express, and more.',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSdOFNzrOpURqABZGmDXqYSRB7C6_Diaxg0NzR91RsY-hum6IQ/viewform',
    },
    {
      title: 'Full Stack Development',
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      description:
        'Master both frontend and backend by working on complete, scalable applications.',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSdOFNzrOpURqABZGmDXqYSRB7C6_Diaxg0NzR91RsY-hum6IQ/viewform',
    },
    {
      title: 'Android Development',
      icon: <Smartphone className="w-8 h-8 text-yellow-600" />,
      description:
        'Develop mobile apps using Java, Kotlin, or Flutter and bring your ideas to Android devices.',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSdOFNzrOpURqABZGmDXqYSRB7C6_Diaxg0NzR91RsY-hum6IQ/viewform',
    },
  ];

  const perks = [
    {
      title: 'Remote & Flexible',
      desc: 'Work from the comfort of your home, choose your own hours.',
      icon: <Globe className="w-6 h-6 text-blue-500" />,
    },
    {
      title: 'Real-World Projects',
      desc: 'Apply your skills to solve genuine industry problems.',
      icon: <Briefcase className="w-6 h-6 text-green-500" />,
    },
    {
      title: 'Certified Internship',
      desc: 'Earn a certificate on successful completion to boost your resume.',
      icon: <Medal className="w-6 h-6 text-yellow-500" />,
    },
    {
      title: 'Expert Mentorship',
      desc: 'Get guided by industry professionals throughout your journey.',
      icon: <Users className="w-6 h-6 text-purple-500" />,
    },
  ];

  const highlights = [
    {
      title: 'No Prior Experience Needed',
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
      text: 'Perfect for students and beginners with strong learning intent.',
    },
    {
      title: 'Learning Resources',
      icon: <BookOpenCheck className="w-6 h-6 text-indigo-500" />,
      text: 'We provide curated material and project roadmaps for all domains.',
    },
    {
      title: 'Build Your Portfolio',
      icon: <Lightbulb className="w-6 h-6 text-amber-500" />,
      text: 'Gain practical skills and project experience to showcase on your resume and GitHub.',
    },
    {
      title: 'Flexible Duration',
      icon: <Clock className="w-6 h-6 text-teal-500" />,
      text: 'Programs ranging from 1 to 3 months to suit your schedule.',
    },
    {
      title: 'Weekly Progress Review',
      icon: <CalendarDays className="w-6 h-6 text-rose-500" />,
      text: 'Stay on track with weekly check-ins and reviews by mentors.',
    },
    {
      title: 'Top Performer Recognition',
      icon: <Trophy className="w-6 h-6 text-orange-500" />,
      text: 'Earn digital badges and get featured on our Hall of Fame.',
    },
  ];

  return (
    <>

      <div
        className={`min-h-screen ${darkMode ? "text-white" : "text-gray-900"} bg-center backdrop-blur-md bg-cover bg-no-repeat py-10 px-4`}
        style={{ backgroundImage: `url(${darkMode ? UIDark : UILight})` }}
      >
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
            Uplify Internships
          </h1>
          <p className="text-lg">
            Launch your career with hands-on experience in development. Choose your domain and build real-world projects under expert guidance.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Open to students, freshers, and self-learners – all you need is passion to learn.
          </p>
        </section>

        {/* Domain Cards */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {domains.map((domain, idx) => (
            <div
              key={idx}
              className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50"} rounded-lg p-6 shadow hover:shadow-xl transition duration-300 border`}
            >
              <div className="flex items-center gap-4 mb-4">
                {domain.icon}
                <h3 className="text-xl font-semibold">
                  {domain.title}
                </h3>
              </div>
              <p className="mb-4">
                {domain.description}
              </p>
              <a
                href={domain.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Apply Now
              </a>
            </div>
          ))}
        </section>

        {/* Perks Section */}
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">
            🎁 Why Join Uplify Intern?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {perks.map((perk, i) => (
              <div
                key={i}
                className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-blue-50"} p-6 rounded-lg shadow border text-center`}
              >
                <div className="flex justify-center mb-3">{perk.icon}</div>
                <h4 className="font-semibold mb-1">
                  {perk.title}
                </h4>
                <p className="text-sm">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Highlights Section */}
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-6">
            ✨ Highlights of the Program
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {highlights.map((item, i) => (
              <div key={i} className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} p-6 rounded-lg shadow border text-center`}>
                <div className="flex justify-center mb-3">{item.icon}</div>
                <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                <p className="text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}