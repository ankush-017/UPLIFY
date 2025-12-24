import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, Moon, Sun, ChevronDown, ChevronUp,
  LogOut, UserPen, LayoutDashboard
} from 'lucide-react';
import logo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../Store/Slice/ThemeSlice.js';
import Login from '../Components/Login';
import { logout } from '../Store/Slice/authSlice.js';
import toast from 'react-hot-toast';
import axios from 'axios';
import { getAuth } from "firebase/auth";
import { app } from '../../firebase.js';

const Navbar = () => {

  const auth = getAuth(app);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isProfileModal, setIsProfileModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const uid = user?.uid;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  /* -------------------- Effects -------------------- */
  useEffect(() => {
    setMenuOpen(false);
    setIsExploreOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  /* -------------------- Helpers -------------------- */
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/getuser/${uid}`
      );
      if (res.data.success) {
        const u = res.data.user;
        setName(u.name);
        setEmail(u.email);
        setPhone(u.phone);
        setRole(u.role);
      }
    } catch {
      toast.error("Failed to load profile");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out");
    navigate("/guest");
  };

  const handleThemeToggle = () => dispatch(toggleTheme());

  /* -------------------- Nav Logic -------------------- */
  const guestLinks = [
    { name: 'Home', path: '/guest' },
    { name: 'Jobs & Internships', path: '/job-internships' },
    { name: 'Resources', path: '/resources' },
    { name: 'Blogs', path: '/blog' },
  ];

  const studentLinks = [
    { name: 'Home', path: '/user' },
    { name: 'Jobs & Internships', path: '/user/job-internships' },
    { name: 'My Applications', path: '/user/applications' },
    { name: 'Resources', path: '/user/resources' },
    { name: 'Blogs', path: '/user/blog' },
  ];

  const companyLinks = [
    { name: 'Jobs & Internships', path: '/company/job-internship' },
    { name: 'Post Internship', path: '/company/post-internship' },
    { name: 'Track Applications', path: '/company/track-application' },
    { name: 'About Us', path: '/about' },
  ];

  const linksToRender = isAuthenticated
    ? role === 'company' ? companyLinks : studentLinks
    : guestLinks;

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-green-500 border-b-2 border-green-500 font-semibold'
      : `${darkMode ? 'text-gray-200' : 'text-gray-700'} hover:text-green-500`;

  /* -------------------- Render -------------------- */
  return (
    <>
      <nav className={`sticky top-0 z-50 px-6 py-4 flex justify-between items-center
        ${darkMode ? 'bg-black/80 backdrop-blur border-b border-gray-800' : 'bg-white/80 backdrop-blur border-b'}
      `}>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Uplify" className="h-8" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 font-medium">
          {linksToRender.map(link => (
            <NavLink key={link.path} to={link.path} className={navLinkClass}>
              {link.name}
            </NavLink>
          ))}

          {/* Explore */}
          <div
            className="relative"
            onMouseEnter={() => setIsExploreOpen(true)}
            onMouseLeave={() => setIsExploreOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-green-500">
              Explore {isExploreOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {isExploreOpen && (
              <div className={`absolute right-0 mt-4 w-48 rounded-xl shadow-xl overflow-hidden
                ${darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border'}
              `}>
                {['Projects Library', 'Uplify Community', 'Uplify Internship'].map((item, i) => (
                  <NavLink
                    key={i}
                    to={`/user/${item.toLowerCase().replace(/\s/g, '-')}`}
                    className="block px-4 py-2 hover:bg-green-100 dark:hover:bg-green-900"
                  >
                    {item}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-full border border-green-400"
          >
            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
          </button>

          {!isAuthenticated ? (
            <button
              onClick={() => setIsModal(true)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-green-500 text-black font-semibold"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <div
                onClick={() => setIsProfile(!isProfile)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <span className="font-medium text-green-400">Hi, {name}</span>
                <div className="w-9 h-9 rounded-full bg-green-500 text-black flex items-center justify-center font-bold">
                  {name?.[0]}
                </div>
              </div>

              {isProfile && (
                <div className="absolute right-0 mt-4 w-48 rounded-xl shadow-xl overflow-hidden bg-black border border-gray-800">
                  <button className="flex gap-2 px-4 py-2 hover:bg-green-900 w-full">
                    <UserPen size={18} /> Profile
                  </button>
                  {role === 'admin' && (
                    <button className="flex gap-2 px-4 py-2 hover:bg-green-900 w-full">
                      <LayoutDashboard size={18} /> Dashboard
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex gap-2 px-4 py-2 hover:bg-red-900 text-red-400 w-full"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex gap-3">
          <button onClick={handleThemeToggle}>
            {darkMode ? <Sun size={26} /> : <Moon size={26} />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {isModal && <Login onClose={() => setIsModal(false)} />}
    </>
  );
};

export default Navbar;
