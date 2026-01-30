import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, Moon, Sun, ChevronDown, ChevronUp,
  LogOut, UserPen, LayoutDashboard,
  ChevronRight
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
import ExploreDropdown from './ExploreDown.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const uid = user?.uid;

  const [menuOpen, setMenuOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isProfileModal, setIsProfileModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const [emailVerified, setEmailVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const USER = auth.currentUser;        // Firebase
  const EMAIL = USER?.email;            // Firebase
  const NAME = USER?.displayName;       // Firebase
  const PHOTO = USER?.photoURL;         // Firebase

  // console.log(USER);

  useEffect(() => {
    setMenuOpen(false);
    setIsExploreOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

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

  const handleDashboard = () => {
    setIsProfile(false);
    navigate('/admin');
  };

  const handleThemeToggle = () => dispatch(toggleTheme());

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
    ? role === 'company'
      ? companyLinks
      : studentLinks
    : guestLinks;

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-green-600 font-semibold border-b-2 border-green-600'
      : `${darkMode ? 'text-gray-200' : 'text-gray-700'} hover:text-yellow-600`;

  const handleSaveProfile = async () => {
    // 1️⃣ If not editing → switch to edit mode
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    // 2️⃣ Editing but email not verified
    if (!emailVerified) {
      toast.error("Please verify your email first");
      return;
    }

    try {
      // 3️⃣ Get Firebase ID token
      const idToken = await auth.currentUser.getIdToken();

      // 4️⃣ Call backend API
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/update-profile`,
        {
          uid,
          name,
          email,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      // 5️⃣ Handle response
      if (res.data.success) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
        setIsProfileModal(false);
      } else {
        toast.error("Profile update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error while updating profile");
    }
  };
  const handleSendOtp = async () => {
    // 1️⃣ Basic validation
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    // Optional: simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address");
      return;
    }

    // 2️⃣ Prevent multiple clicks
    if (isSendingOtp) return;

    try {
      setIsSendingOtp(true);

      // 3️⃣ Call backend OTP API
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/send-otp`,
        { email: email.toLowerCase() }
      );

      // 4️⃣ Handle response
      if (res.data.success) {
        toast.success("OTP sent successfully");
        setOtpSent(true);
      } else {
        toast.error(res.data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to send OTP. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };
  const handleVerifyOtp = async () => {
    // 1️⃣ Basic validation
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    if (otp.length < 4) {
      toast.error("Invalid OTP");
      return;
    }

    // 2️⃣ Prevent multiple clicks
    if (isVerifyingOtp) return;

    try {
      setIsVerifyingOtp(true);

      // 3️⃣ Call backend verify API
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/verify-otp`,
        {
          email: email.toLowerCase(),
          otp,
        }
      );

      // 4️⃣ Handle response
      if (res.data.success) {
        toast.success("Email verified successfully");
        setEmailVerified(true);
        setOtpSent(false);
        setOtp("");
      } else {
        toast.error(res.data.message || "Incorrect OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("OTP verification failed");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`sticky top-0 z-50 px-6 py-4 flex justify-between items-center
        backdrop-blur-xl border-b
        ${darkMode ? "bg-black border-white/10" : "bg-white/70 border-gray-200"}`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Uplify" className="h-10 scale-[1.8] ml-3" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 font-medium">
          {linksToRender.map(link => (
            <NavLink key={link.path} to={link.path} className={navLinkClass}>
              {link.name}
            </NavLink>
          ))}

          <ExploreDropdown
            role={role}
            isAuthenticated={isAuthenticated}
            darkMode={darkMode}
          />


        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-full border border-blue-400"
          >
            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
          </button>

          {!isAuthenticated ? (
            <button
              onClick={() => setIsModal(true)}
              className="group relative flex items-center gap-3 px-8 py-2.5 rounded-full font-bold text-sm tracking-wide
             bg-gradient-to-r from-[#10b981] via-[#3DDC84] to-[#C7EE3F] 
             text-[#002D15] shadow-md hover:shadow-[#3DDC84]/40 hover:shadow-xl
             transition-all duration-300 active:scale-95"
            >
              Login

              {/* Premium Animated Arrow */}
              <svg
                className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>

              {/* Top "Light" Edge for 3D depth */}
              <div className="absolute inset-x-4 top-0 h-px bg-white/30 rounded-full"></div>
            </button>
          ) : (
            <div className="relative">
              <div
                onClick={() => setIsProfile(!isProfile)}
                className="flex items-center gap-3 cursor-pointer group"
              >
                {PHOTO ? (
                  <img
                    src={PHOTO}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-full
    bg-gradient-to-br from-green-500 to-yellow-400
    text-black font-bold flex items-center justify-center"
                  >
                    {NAME?.charAt(0) || "U"}
                  </div>
                )}

              </div>

              {isProfile && (
                <div
                  className={`absolute right-0 mt-4 w-64 rounded-2xl z-50 overflow-hidden
    backdrop-blur-xl shadow-2xl border
    ${darkMode
                      ? "bg-[#020617]/85 border-white/10"
                      : "bg-white/90 border-gray-200"
                    }`}
                >

                  <div
                    className={`px-4 py-4 border-b
      ${darkMode ? "border-white/10" : "border-gray-200"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-yellow-400 flex items-center justify-center text-black font-bold text-lg shadow">
                        {name?.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <p className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {name}
                        </p>
                        <p className="text-xs text-pink-400 font-semibold">{role}</p>
                      </div>
                    </div>
                  </div>

                  {/* My Profile */}
                  <button
                    onClick={() => {
                      setIsProfile(false);
                      setIsProfileModal(true);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition
      ${darkMode
                        ? "text-gray-200 hover:bg-white/10"
                        : "text-gray-800 hover:bg-gray-100"
                      }`}
                  >
                    <div className={`p-2 rounded-lg bg-yellow-400/20 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}>
                      <UserPen size={18} />
                    </div>
                    <span>My Profile</span>
                  </button>

                  {/* Dashboard */}
                  {
                    role === 'admin' && (
                      <button
                        onClick={handleDashboard}
                        className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition
      ${darkMode
                            ? "text-green-300 hover:bg-green-400/10"
                            : "text-green-700 hover:bg-green-100"
                          }`}
                      >
                        <div className="p-2 rounded-lg bg-green-500/20 text-green-500">
                          <LayoutDashboard size={18} />
                        </div>
                        <span>Company Dashboard</span>
                      </button>
                    )
                  }

                  {/* Divider */}
                  <div className={`h-px mx-4 ${darkMode ? "bg-white/10" : "bg-gray-200"}`} />

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition
      ${darkMode
                        ? "text-red-400 hover:bg-red-500/10"
                        : "text-red-600 hover:bg-red-100"
                      }`}
                  >
                    <div className="p-2 rounded-lg bg-red-500/20 text-red-500">
                      <LogOut size={18} />
                    </div>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-4">
          {/* Theme Toggle: Glowing Neon Style */}
          <button
            onClick={handleThemeToggle}
            className={`p-2.5 rounded-xl border-2 transition-all duration-300 ${darkMode
              ? 'border-yellow-500/30 bg-yellow-500/5 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.1)]'
              : 'border-emerald-500/20 bg-emerald-50 text-emerald-600'
              }`}
          >
            {darkMode ? <Sun size={22} className="animate-pulse" /> : <Moon size={22} />}
          </button>

          {/* Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`transition-transform duration-300 ${menuOpen ? 'rotate-90' : 'rotate-0'}`}
          >
            {menuOpen ? (
              <X size={32} className={darkMode ? 'text-yellow-400' : 'text-emerald-600'} />
            ) : (
              <Menu size={36} className={darkMode ? 'text-emerald-400' : 'text-slate-900'} />
            )}
          </button>
        </div>

        {/* --- Premium Mobile Dropdown --- */}
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Dark Dim Backdrop (No blur on navbar because this is z-index 45) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 bg-black/60 z-[45] lg:hidden"
              />

              {/* Premium Menu Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className={`fixed top-24 left-4 right-4 rounded-[2.5rem] border-2 shadow-2xl flex flex-col z-[50] overflow-hidden ${darkMode ? 'bg-[#050a05] border-emerald-500/30' : 'bg-white border-emerald-100'
                  }`}
              >
                <div className="overflow-y-auto max-h-[80vh] px-6 py-8 space-y-5 custom-scrollbar">

                  {/* USER PROFILE SECTION */}
                  {isAuthenticated && (
                    <div className="space-y-3">
                      <div
                        onClick={() => { setIsProfileModal(true); setMenuOpen(false); }}
                        className={`flex items-center justify-between p-4 rounded-3xl border cursor-pointer transition-all active:scale-95 ${darkMode ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-emerald-50/50 border-emerald-100 hover:bg-emerald-100/50"
                          }`}
                      >
                        <div className='flex items-center gap-4'>
                          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-yellow-500 text-white font-black text-xl shadow-lg uppercase">
                            {name?.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <p className={`text-lg font-black tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}>{name}</p>
                            <p className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">Member Profile</p>
                          </div>
                        </div>
                        <UserPen size={20} className={darkMode ? "text-emerald-400" : "text-emerald-600"} />
                      </div>

                      {/* ADMIN DASHBOARD SPECIAL CARD */}
                      {role === 'admin' && (
                        <button
                          onClick={() => { handleDashboard(); setMenuOpen(false); }}
                          className="w-full flex items-center justify-between p-4 rounded-3xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-lg shadow-yellow-500/20 active:scale-95 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-black/10 rounded-xl">
                              <LayoutDashboard size={24} />
                            </div>
                            <span className="font-black uppercase tracking-widest text-xs">Admin Dashboard</span>
                          </div>
                          <ChevronRight size={20} />
                        </button>
                      )}
                    </div>
                  )}

                  {/* NAVIGATION LINKS */}
                  <div className="flex flex-col space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/60 px-4 mb-2">Navigation</p>
                    {linksToRender.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) => `px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${isActive
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                          : darkMode ? 'text-white/70 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:bg-emerald-50'
                          }`}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>

                  {/* EXPLORE SECTION */}
                  {(role === 'student' || role === 'admin' || !isAuthenticated) && (
                    <div className={`rounded-[2rem] overflow-hidden ${darkMode ? 'bg-white/5' : 'bg-slate-50'}`}>
                      <button
                        onClick={() => setIsExploreOpen((prev) => !prev)}
                        className={`w-full flex justify-between items-center px-6 py-5 font-black uppercase tracking-widest text-[10px] ${darkMode ? 'text-yellow-400' : 'text-emerald-700'
                          }`}
                      >
                        Explore Uplify
                        <motion.div animate={{ rotate: isExploreOpen ? 180 : 0 }}>
                          <ChevronDown size={18} />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isExploreOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="flex flex-col space-y-1 px-4 pb-4"
                          >
                            {['Projects Library', 'Uplify Community', 'Uplify Internship'].map((text) => (
                              <NavLink
                                key={text}
                                to={`/user/${text.toLowerCase().replace(/\s+/g, '-')}`}
                                onClick={() => { setMenuOpen(false); }}
                                className={`px-4 py-3 rounded-xl text-[11px] font-bold transition-all ${darkMode ? 'text-white/80 hover:text-emerald-400 hover:bg-white/5' : 'text-slate-500 hover:text-emerald-600 hover:bg-white'
                                  }`}
                              >
                                {text}
                              </NavLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* AUTH SECTION */}
                  <div className="pt-2">
                    {!isAuthenticated ? (
                      <button
                        onClick={() => { setIsModal(true); setMenuOpen(false); }}
                        className="group w-full py-4 rounded-2xl flex items-center justify-center gap-3
             bg-gradient-to-r from-[#22bd68] via-[#a5ca22] to-[#d4ad10] 
             text-[#002D15] font-black uppercase tracking-[0.2em] text-xs 
             shadow-lg shadow-emerald-500/20 
             hover:shadow-emerald-500/40 hover:-translate-y-0.5
             active:scale-95 transition-all duration-300"
                      >
                        <span>Login</span>

                        {/* Premium Animated Arrow */}
                        <svg
                          className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={() => { handleLogout(); setMenuOpen(false); }}
                        className={`w-full py-5 rounded-2xl border-2 font-black uppercase tracking-[0.2em] text-xs transition-all flex justify-center items-center gap-3 ${darkMode ? "border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white" : "border-red-100 text-red-600 hover:bg-red-600 hover:text-white"
                          }`}
                      >
                        <LogOut size={18} /> Secure Logout
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {isModal && <Login onClose={() => setIsModal(false)} />}

      {/* Profile Modal */}
      {isProfileModal && (
        <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div
            className={`relative w-full max-w-4xl rounded-[28px] p-6 sm:p-8 border
      shadow-[0_30px_90px_rgba(0,0,0,0.5)]
      ${darkMode
                ? "bg-gradient-to-br from-[#07140f] via-[#0b2a1a] to-[#020617] border-emerald-400/15 text-white"
                : "bg-gradient-to-br from-white via-[#fbfffb] to-[#f2fdf5] border-emerald-200 text-gray-900"
              }`}
          >
            {/* Close */}
            <button
              onClick={() => setIsProfileModal(false)}
              className={`absolute top-5 right-5 p-2 rounded-full transition
        ${darkMode
                  ? "hover:bg-white/10 text-gray-400 hover:text-yellow-400"
                  : "hover:bg-black/5 text-gray-500 hover:text-yellow-600"
                }`}
            >
              <X size={20} />
            </button>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
              {/* LEFT: Profile Summary */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="relative">
                  <div className="w-[88px] h-[88px] rounded-full
              bg-gradient-to-br from-emerald-400 to-yellow-400
              flex items-center justify-center
              text-[36px] font-extrabold text-black
              shadow-xl shadow-yellow-400/20">
                    {name?.charAt(0)}
                  </div>

                  {/* Glow */}
                  <div className="absolute inset-0 rounded-full blur-2xl
              bg-gradient-to-br from-emerald-400 to-yellow-400 opacity-25" />
                </div>

                <h2 className="mt-4 text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-yellow-400">
                  {name || "Your Profile"}
                </h2>

                <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {email}
                </p>

                <span className="mt-3 px-3 py-1 rounded-full text-xs font-semibold
            bg-emerald-400/10 text-emerald-400">
                  {role}
                </span>

                {/* Action */}
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className={`mt-6 w-full md:w-auto px-6 py-3 rounded-xl text-sm font-semibold transition-all
            ${isEditing
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25"
                      : "bg-gradient-to-r from-emerald-400 to-yellow-400 text-black hover:brightness-110 shadow-lg shadow-yellow-400/30"
                    }`}
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </button>
              </div>

              {/* RIGHT: Form */}
              <form className="space-y-5">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-gray-400 mb-1 block">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      readOnly={!isEditing}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition
                ${isEditing
                          ? "border border-emerald-400/70 focus:ring-2 focus:ring-emerald-400/30"
                          : "border border-gray-700/70 opacity-60 cursor-not-allowed"
                        }
                ${darkMode ? "bg-[#020617] text-white" : "bg-white text-black"}`}
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-gray-400 mb-1 block">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={phone}
                      readOnly={!isEditing}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition
                ${isEditing
                          ? "border border-emerald-400/70 focus:ring-2 focus:ring-emerald-400/30"
                          : "border border-gray-700/70 opacity-60 cursor-not-allowed"
                        }
                ${darkMode ? "bg-[#020617] text-white" : "bg-white text-black"}`}
                    />
                  </div>
                </div>

                {/* Email Row */}
                <div>
                  <label className="text-[11px] uppercase tracking-widest text-gray-400 mb-1 block">
                    Email
                  </label>

                  <div className="flex gap-3 flex-col sm:flex-row">
                    <input
                      type="email"
                      value={email}
                      readOnly={!isEditing || emailVerified}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailVerified(false);
                        setOtp("");
                        setOtpSent(false);
                      }}
                      className={`flex-1 px-4 py-3 rounded-xl text-sm outline-none transition
                ${isEditing && !emailVerified
                          ? "border border-emerald-400/70 focus:ring-2 focus:ring-emerald-400/30"
                          : "border border-gray-700/70 opacity-60 cursor-not-allowed"
                        }
                ${darkMode ? "bg-[#020617] text-white" : "bg-white text-black"}`}
                    />

                    {isEditing && !emailVerified && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isSendingOtp}
                        className="px-5 py-3 rounded-xl text-sm font-semibold
                  bg-gradient-to-r from-emerald-400 to-yellow-400
                  text-black hover:brightness-110 transition shadow"
                      >
                        {isSendingOtp ? "Sending..." : otpSent ? "Resend OTP" : "Send OTP"}
                      </button>
                    )}
                  </div>

                  {otpSent && !emailVerified && (
                    <div className="mt-3 p-4 rounded-xl border border-dashed border-emerald-400/40 bg-emerald-400/5">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className={`flex-1 px-4 py-3 rounded-xl text-sm border border-gray-700
                    ${darkMode ? "bg-[#020617] text-white" : "bg-white text-black"}`}
                        />
                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          disabled={isVerifyingOtp}
                          className="px-5 py-3 rounded-xl text-sm font-semibold
                    bg-emerald-600 hover:bg-emerald-700 text-white transition shadow"
                        >
                          {isVerifyingOtp ? "Verifying..." : "Verify"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}


    </>
  );
};
export default Navbar;