import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, ChevronDown, ChevronUp } from 'lucide-react';
import logo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../Store/Slice/ThemeSlice.js';
import Login from '../Components/Login'; // make sure this path is correct
import { logout } from '../Store/Slice/authSlice.js';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const userRole = user?.role || "student";
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfully");
    navigate("/");
  };

  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    setMenuOpen(false);
    setIsExploreOpen(false);
  }, [location.pathname]);


  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
      : `${darkMode ? 'text-gray-200' : 'text-gray-700'} hover:text-blue-600`;

  const guestLinks = [
    { name: 'Home', path: '/' },
    { name: 'Internships', path: '/internships' },
    { name: 'Resources', path: '/resources' },
    { name: 'Blogs', path: '/blog' },
  ];

  const studentLinks = [
    { name: 'Home', path: '/' },
    { name: 'Internships', path: '/internships' },
    { name: 'My Applications', path: '/applications' },
    { name: 'Saved', path: '/saved' },
    { name: 'Profile', path: '/profile' },
  ];

  const companyLinks = [
    { name: 'Dashboard', path: '/company/dashboard' },
    { name: 'Post Internship', path: '/company/post' },
    { name: 'Applications', path: '/company/applications' },
    { name: 'Company Profile', path: '/company/profile' },
  ];

  const linksToRender = isAuthenticated
    ? userRole === 'student'
      ? studentLinks
      : companyLinks
    : guestLinks;

  return (
    <>
      <nav className={`${darkMode ? 'bg-gray-900' : 'bg-gray-100'} shadow-sm sticky top-0 z-50 px-6 py-4 flex items-center justify-between`}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Uplify" className="h-8" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex text-b items-center gap-6 text-[16px]">
          {linksToRender.map((item) => (
            <NavLink key={item.path} to={item.path} className={navLinkClass}>
              {item.name}
            </NavLink>
          ))}

          {/* Explore Dropdown - Desktop */}
          <div className="relative">
            <button
              onClick={() => setIsExploreOpen(prev => !prev)}
              className={`hover:text-blue-600 flex justify-center items-center ${darkMode ? "text-gray-200" : "text-gray-700"} transition-colors`}
            >
              Explore
              {isExploreOpen ? <ChevronUp className='' /> : <ChevronDown className='mt-1' />}
            </button>

            {isExploreOpen && (
              <div
                className={`absolute right-0 mt-5 rounded-lg shadow-xl min-w-[180px] z-50 py-2 
        ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
              >
                <NavLink
                  to="/projects-libray"
                  onClick={() => setIsExploreOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-200 transition"
                >
                  Projects Library
                </NavLink>
                <NavLink
                  to="/peer-group"
                  onClick={() => setIsExploreOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Peer Group
                </NavLink>
                <NavLink
                  to="/uplify-internship"
                  onClick={() => setIsExploreOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Uplify Internship
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Dark mode toggle */}
          <button
            onClick={handleThemeToggle}
            className={`p-2 rounded-full border ${darkMode ? 'border-gray-300' : 'border-gray-900'} transition`}
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-gray-800" size={20} />}
          </button>

          {!isAuthenticated ? (
            <button
              onClick={() => setIsModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          ) : (
            <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex gap-3">
          <button
            onClick={handleThemeToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-md border ${darkMode ? 'border-gray-300' : 'border-gray-900'} transition`}
          >
            {darkMode ? <Sun className="text-yellow-400" size={25} /> : <Moon className="text-gray-800" size={25} />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X size={30} className={darkMode ? 'text-white' : 'text-gray-900'} />
            ) : (
              <Menu size={40} className={darkMode ? 'text-white' : 'text-gray-900'} />
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div
            className={`absolute top-16 left-0 w-full ${darkMode ? 'bg-gray-900' : 'bg-gray-100'
              } shadow-md flex flex-col px-6 py-4 space-y-4 md:hidden z-50`}
          >
            {linksToRender.map((item) => (
              <NavLink key={item.path} to={item.path} className={navLinkClass}>
                {item.name}
              </NavLink>
            ))}

            {/* Mobile Explore Dropdown */}
            <div className="">
              <button
                onClick={() => setIsExploreOpen((prev) => !prev)}
                className="w-full flex justify-between items-center text-left font-medium hover:text-blue-600"
              >
                Explore
                {isExploreOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {isExploreOpen && (
                <div className="flex flex-col space-y-2 pl-4 mt-2">
                  <NavLink
                    to="/projects-libray"
                    onClick={() => {
                      setIsExploreOpen(false);
                      setMenuOpen(false);
                    }}
                    className="hover:text-blue-600"
                  >
                    Projects Library
                  </NavLink>
                  <NavLink
                    to="/peer-group"
                    onClick={() => {
                      setIsExploreOpen(false);
                      setMenuOpen(false);
                    }}
                    className="hover:text-blue-600"
                  >
                    Peer Group
                  </NavLink>
                  <NavLink
                    to="/uplify-internship"
                    onClick={() => {
                      setIsExploreOpen(false);
                      setMenuOpen(false);
                    }}
                    className="hover:text-blue-600"
                  >
                    Uplify Internship
                  </NavLink>
                </div>
              )}
            </div>

            {!isAuthenticated ? (
              <button
                onClick={() => {
                  setIsModal(true);
                  setMenuOpen(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Login
              </button>
            ) : (
              <button onClick={handleLogout} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Logout
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {isModal && <Login onClose={() => setIsModal(false)} />}
    </>
  );
};

export default Navbar;