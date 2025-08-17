import { useEffect, useState } from 'react';
import { supabase } from '../../superbaseClient.js';
import { ExternalLink, IndianRupee, Search, X } from 'lucide-react';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResourses, setSearchResources] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        setLoading(true);
        if (searchQuery.trim() === '') {
          setSearchResources([]);
          return;
        }

        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/resourses-search`,
          { query: searchQuery }
        );
        console.log('Search Response Done'); 
        if (res.data?.data?.searchResults) {
          setSearchResources(res.data?.data?.searchResults);
        }
        else {
          setSearchResources([]);
        }

      } catch (error) {
        console.error('Error searching resources:', error);
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [searchQuery]);

  useEffect(() => {
    const fetchResources = async () => {
      const { data, error } = await supabase.from('resources').select('*');
      if (error) {
        console.error('Error fetching resources:', error);
      } else {
        setResources(data);
      }
      setLoading(false);
    };
    fetchResources();
  }, []);

  return (
    <div className={`${darkMode ? "bg-black" : "bg-white"} grid grid-cols-1 lg:grid-cols-4 gap-6`}>
      {/* Sidebar */}
      <aside className="lg:col-span-1 pl-6 pr-6 sm:pl-10 sm:pr-0 py-10 space-y-6">
        {[
          {
            title: '📚 Resources',
            links: [{ to: '/resources', label: 'Learning Resources' }],
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
              { to: '/blogs/cc75a1f9-c63e-458d-8073-8591b958db39', label: 'The Ultimate 6-Month Guide to Mastering Data Structures and Algorithms (DSA)' },
            ],
            url: '/blog',
          },
          {
            title: '📂 Project Library',
            content: 'Find real-world project ideas to practice your skills.',
            links: [{ to: '/user/projects-libray', label: 'Explore Projects' }],
            url: '/user/projects-libray',
          },
          {
            title: '📝 Make Your Resume Better',
            content: 'Use our AI Resume Builder to create an impressive resume.',
            links: [{ to: '/user/resume-builder', label: 'Build Resume →' }],
            url: '/user/resume-builder',
          }
        ].map((item, index) => (
          <div
            key={index}
            className={`${darkMode ? "bg-white/5" : "bg-white"} p-4 rounded-xl shadow`}
          >
            <div className="flex flex-row justify-between">
              <h3
                className={`text-lg font-semibold mb-2 ${darkMode ? "text-gray-200" : "text-gray-900"}`}
              >
                {item.title}
              </h3>

              {/* Uncomment if you want the arrow button */}
              {/* <div
        className={`${darkMode ? "text-blue-600" : "text-blue-700"} cursor-pointer`}
        onClick={() => navigate(item.url)}
      >
        <ArrowBigRightDash />
      </div> */}
            </div>

            {item.content && (
              <p
                className={`text-sm mb-2 ${darkMode ? "text-gray-200" : "text-gray-900"}`}
              >
                {item.content}
              </p>
            )}

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

      {/* Main Content */}
      <div className={`lg:col-span-3 min-h-screen py-10 px-4 sm:pr-14 pb-14 text-white rounded-xl`}>
        {/* Search Bar */}
        <div className="flex justify-center items-center mb-6">
          <div
            className={`flex items-center w-full max-w-xl rounded-lg border px-4 py-2 shadow-sm focus-within:ring-1 focus-within:ring-blue-500 ${darkMode
              ? "bg-gray-800 text-gray-200 border-gray-600"
              : "bg-white text-gray-800 border-gray-300"
              }`}
          >
            <input
              type="text"
              placeholder="Search resources from AI..."
              value={inputValue}
              className={`flex-1 bg-transparent focus:outline-none ${darkMode ? "placeholder-gray-400" : "placeholder-gray-500"
                }`}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setSearchQuery(inputValue)}
            />
            <Search
              className="text-blue-500 cursor-pointer"
              onClick={() => setSearchQuery(inputValue)}
            />
          </div>
        </div>

        {/* Search Results */}
        {loading ? (
          <div className="text-center py-10">
            <Spin size="large" />
          </div>
        ) : searchResourses.length > 0 ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`text-2xl font-bold ${darkMode ? "text-cyan-400" : "text-cyan-700"
                  }`}
              >
                Search Results
              </h2>
              <button
                onClick={() => {
                  setSearchResources([]);
                  setInputValue('');
                  setSearchQuery('');
                }}
                className="flex items-center gap-1 px-3 py-1 rounded-md bg-red-500 text-white text-sm hover:bg-red-600 transition"
              >
                <X size={16} /> Clear
              </button>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {searchResourses.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-5 shadow-lg hover:shadow-cyan-500/20 transition-all"
                >
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h2
                    className={`text-lg font-semibold mb-1 ${darkMode ? "text-cyan-400" : "text-cyan-700"
                      }`}
                  >
                    {item.title}
                  </h2>
                  <p
                    className={`text-sm mb-2 ${darkMode ? "text-gray-300" : "text-gray-800"
                      }`}
                  >
                    {item.descriptionSnippet}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={item.creator?.profileImageUrl}
                      alt={item.creator?.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span
                      className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                      {item.creator?.name}
                    </span>
                  </div>
                  <p
                    className={`text-xs mb-3 ${darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    Duration: {item.duration}
                  </p>
                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-sm ${darkMode ? "text-cyan-300" : "text-cyan-600"
                      } hover:underline`}
                  >
                    Watch on YouTube <ExternalLink size={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Default curated resources
          <div>
            <h1
              className={`text-3xl font-bold text-center pb-3 sm:pb-6 text-transparent bg-clip-text ${darkMode
                ? "bg-gradient-to-r from-cyan-400 to-purple-500"
                : "bg-gradient-to-r from-cyan-600 to-purple-700"
                }`}
            >
              Explore Curated Resources
            </h1>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {resources.map((item) => {
                const original = Number(item.originalprice);
                const sale = Number(item.sellprice);
                const discount =
                  original && sale
                    ? Math.round(((original - sale) / original) * 100)
                    : 0;

                return (
                  <div
                    key={item.id}
                    className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-5 shadow-lg hover:shadow-cyan-500/20 transition-all"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h2
                      className={`text-xl font-semibold mb-1 ${darkMode ? "text-cyan-400" : "text-cyan-700"
                        }`}
                    >
                      {item.title}
                    </h2>
                    <p
                      className={`text-sm mb-2 ${darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                    >
                      {item.description}
                    </p>
                    <p
                      className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-700"
                        } mb-1 font-semibold`}
                    >
                      <span
                        className={`font-bold ${darkMode ? "text-blue-400" : "text-blue-700"
                          }`}
                      >
                        Instructor:
                      </span>{" "}
                      {item.author}
                    </p>
                    <p
                      className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-800"
                        } mb-3 flex items-center`}
                    >
                      <IndianRupee
                        size={14}
                        className={`${darkMode ? "text-gray-400" : "text-gray-700"
                          }`}
                      />
                      <span
                        className={`line-through ${darkMode ? "text-red-400" : "text-red-700"
                          }`}
                      >
                        {item.originalprice}
                      </span>
                      <span
                        className={`${darkMode ? "text-gray-100" : "text-gray-900"
                          }`}
                      >
                        →
                      </span>
                      <IndianRupee
                        size={14}
                        className={`${darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                      />
                      <span
                        className={`${darkMode ? "text-green-400" : "text-green-700"
                          } font-semibold text-base`}
                      >
                        {item.sellprice}
                      </span>
                      {discount > 0 && (
                        <span
                          className={`ml-auto px-2 py-0.5 rounded-md text-xs ${darkMode
                            ? "bg-green-700/30 text-green-300"
                            : "bg-green-600 text-white"
                            }`}
                        >
                          {discount}% OFF
                        </span>
                      )}
                    </p>
                    <a
                      href={item.courseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-sm ${darkMode ? "text-cyan-300" : "text-cyan-600"
                        } hover:underline`}
                    >
                      View Course <ExternalLink size={16} />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}