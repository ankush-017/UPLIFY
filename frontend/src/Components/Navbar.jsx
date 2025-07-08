import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, ChevronDown, ChevronUp, LogOut, UserPen, LayoutDashboard } from 'lucide-react';
import logo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../Store/Slice/ThemeSlice.js';
import Login from '../Components/Login'; // make sure this path is correct
import { logout } from '../Store/Slice/authSlice.js';
import toast from 'react-hot-toast';
import axios from 'axios';
import { getAuth } from "firebase/auth";
import { app } from '../../firebase.js';

const Navbar = () => {

  const auth = getAuth(app);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { uid } = JSON.parse(localStorage.getItem('uplify_user') || '{}');
  const userRole = user?.role || "student";
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfully");
    setMenuOpen(false);
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

  const handleDashboard = () => {
    setIsProfile(false);
    navigate('/admin');
    setMenuOpen(false);
  }

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
    { name: 'Resources', path: '/resources' },
    { name: 'Blogs', path: '/blog' },
  ];

  const companyLinks = [
    { name: 'Dashboard', path: '/company/dashboard' },
    { name: 'Post Internship', path: '/company/post' },
    { name: 'Applications', path: '/company/applications' },
    { name: 'Company Profile', path: '/company/profile' },
  ];

  const linksToRender = isAuthenticated
    ? userRole === 'student' || userRole === 'admin'
      ? studentLinks
      : companyLinks
    : guestLinks;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [isProfile, setIsProfile] = useState(false);
  const [isProfileModal, setIsProfileModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const UserInfo = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/getuser/${uid}`);
      if (res?.data?.success) {
        setName(res?.data?.user.name);
        setEmail(res?.data?.user.email);
        setPhone(res?.data?.user.phone);
        setRole(res?.data?.user.role);
      }
    }
    catch (err) {
      console.log(err);
      toast.error("Failed on fetch user details");
    }
  }

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Enter email first");
      return;
    }
    setIsSendingOtp(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/send-otp`, { email });
      toast.success("OTP sent to email");
      setOtpSent(true);
    } catch {
      toast.error("Failed to send OTP");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsVerifyingOtp(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/verify-otp`, {
        email: email.toLowerCase(),
        otp,
      });

      if (res.data.success) {
        toast.success("Email verified");
        setEmailVerified(true);
      } else {
        toast.error("Invalid OTP");
      }
    }
    catch (err) {
      toast.error("OTP verification failed");
    }
    finally {
      setIsVerifyingOtp(false);
    }
  };


  useEffect(() => {
    if (uid) {
      UserInfo();
    }
  }, [uid]);

  return (
    <>
      <nav className={`${darkMode ? 'bg-gray-900' : 'bg-gray-100'} shadow-sm sticky top-0 z-50 px-6 py-4 flex items-center justify-between`}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Uplify" className="h-8" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex text-b items-center gap-6 text-[16px]">
          {linksToRender.map((item) => (
            <NavLink key={item.path} to={item.path} className={navLinkClass}>
              {item.name}
            </NavLink>
          ))}

          {/* Explore Dropdown - Desktop */}
          <div
            className="relative"
            onMouseEnter={() => setIsExploreOpen(true)}
          // onMouseLeave={() => setIsExploreOpen(false)}
          >
            <button className={`hover:text-blue-600 hover:border-b-2 hover:border-blue-600 flex items-center gap-1 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
              Explore {isExploreOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {isExploreOpen && (
              <div
                className={`absolute right-0 mt-2 rounded-lg shadow-xl min-w-[180px] z-50 py-2 
        ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
                onMouseLeave={() => setIsExploreOpen(false)}
              >
                <NavLink
                  to="/projects-libray"
                  onClick={() => setIsExploreOpen(false)}
                  className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 transition"
                >
                  Projects Library
                </NavLink>
                <NavLink
                  to="/peer-group"
                  onClick={() => setIsExploreOpen(false)}
                  className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 transition"
                >
                  Peer Group
                </NavLink>
                <NavLink
                  to="/uplify-internship"
                  onClick={() => setIsExploreOpen(false)}
                  className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 transition"
                >
                  Uplify Internship
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Dark mode toggle */}
          <button
            onClick={handleThemeToggle}
            className={`p-2 rounded-full border ${darkMode ? 'border-gray-300' : 'border-gray-900'} transition`}
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-gray-800" size={20} />}
          </button>

          {
            isAuthenticated && (
              <div className="relative">
                <div
                  className="flex items-center gap-4 px-4 pb-2 border-b-2 border-purple-700 cursor-pointer"
                  onClick={() => setIsProfile((prev) => !prev)}
                >
                  <p className="text-purple-500 text-[16px] font-semibold ">Hi, {name}</p>
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white font-bold text-[18px] uppercase">
                    {name?.charAt(0)}
                  </div>
                </div>

                {isProfile && (
                  <div className="absolute right-0 mt-5 w-48 rounded-md shadow-lg z-50 overflow-hidden">
                    <button
                      className="gap-2 w-full items-center px-4 flex py-2 text-left bg-blue-700 text-gray-200 hover:bg-blue-800"
                      onClick={() => {
                        setIsProfile(false)
                        setIsProfileModal(true)
                      }
                      }
                    >
                      <UserPen size={20} /> <p>My Profile</p>
                    </button>
                    {role == 'admin' && (
                      <button
                        className="gap-2 w-full items-center px-4 flex py-2 text-left bg-yellow-700 text-gray-200 hover:bg-yellow-800"
                        onClick={handleDashboard}
                      >
                        <LayoutDashboard size={20} /> <p>Dashboard</p>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsProfile(false);
                      }}
                      className="flex gap-2 items-center w-full bg-red-700 text-gray-200 text-left px-4 py-2 hover:bg-red-800"
                    >
                      <LogOut size={20} /> <p>Logout</p>
                    </button>
                  </div>
                )}
              </div>
            )
          }

          {!isAuthenticated && (
            <button
              onClick={() => setIsModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex gap-3">
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
              } shadow-md flex flex-col px-6 py-4 space-y-4 lg:hidden z-50`}
          >
            {isAuthenticated && (
              <div className={`flex justify-between items-center cursor-pointer gap-4 px-4 pt-2 pb-4 border-b ${darkMode ? "border-gray-400" : "border-gray-800"}`}>
                <div className='flex justify-start items-center gap-4' onClick={() => {
                  setIsProfileModal(true)
                  setIsOpen(false)
                }}>
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-600 text-white font-bold text-[25px] uppercase">
                    {name?.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <p className={`${darkMode ? "text-white" : "text-black"} text-[20px] font-medium`}>{name}</p>
                  </div>
                </div>
                <div className='flex justify-center gap-5 items-center'>
                  <div onClick={() => {
                    setIsProfileModal(true)
                    setIsOpen(false)
                  }}>
                    <UserPen className={`${darkMode ? "text-white" : "text-black"}`} size={25} />
                  </div>
                  {
                    role === 'admin' &&
                    (
                      <div onClick={handleDashboard}>
                        <LayoutDashboard className={`${darkMode ? "text-white" : "text-black"}`} size={25} />
                      </div>
                    )
                  }
                </div>
              </div>
            )}
            {linksToRender.map((item) => (
              <NavLink key={item.path} to={item.path} className={navLinkClass}>
                {item.name}
              </NavLink>
            ))}

            {/* Mobile Explore Dropdown */}
            <div className="">
              <button
                onClick={() => setIsExploreOpen((prev) => !prev)}
                className={`w-full flex justify-between items-center text-left ${darkMode ? 'text-gray-200' : 'text-gray-700'} font-medium hover:text-blue-600`}
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
                  setIsOpen(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Login
              </button>
            ) :
              (
                <button
                  onClick={handleLogout}
                  className="bg-red-600 flex justify-center items-center gap-2 text-white px-4 py-2 rounded-md"
                >
                  <LogOut /> <p>Logout</p>
                </button>
              )}
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {isModal && <Login onClose={() => setIsModal(false)} />}

      {/* Profile Modal */}
      {isProfileModal && (
        <div className={`fixed inset-0 z-[999] bg-black bg-opacity-60 flex items-center justify-center px-4`}>
          <div className={`relative w-full max-w-lg ${darkMode ? "bg-gradient-to-br from-[#111827] to-[#0f172a]" : "bg-gradient-to-br from-[#fcfdff] to-[#dbe1ef]"} border-2 border-purple-700/40 rounded-2xl shadow-2xl text-white p-6`}>

            {/* Close Button */}
            <button
              onClick={() => setIsProfileModal(false)}
              className={`absolute top-4 right-4 ${darkMode ? "text-gray-400" : "text-gray-800"} hover:text-red-500 transition`}
            >
              <X size={26} />
            </button>

            {/* Heading */}
            <h2 className={`text-2xl font-bold text-center text-transparent bg-clip-text ${darkMode ? "bg-gradient-to-r from-cyan-400 to-purple-500" : "bg-gradient-to-r from-cyan-700 to-purple-700"} mb-6`}>
              My Profile
            </h2>

            {/* Profile Form */}
            <form className="space-y-5">
              {/* Name */}
              <div>
                <label className={`block text-sm ${darkMode ? "text-gray-300" : "text-gray-900"} mb-1`}>Name</label>
                <input
                  type="text"
                  value={name}
                  readOnly={!isEditing}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full bg-transparent border px-4 py-2 rounded-lg focus:outline-none ${isEditing
                    ? `border-cyan-400 focus:ring-2 focus:ring-cyan-500 ${darkMode ? "text-white" : "text-black"}`
                    : "border-gray-700 text-gray-400"
                    }`}
                />
              </div>

              {/* Email with OTP */}
              <div>
                <label className={`${darkMode ? "text-gray-300" : "text-gray-900"} block text-sm mb-1`}>Email</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    readOnly={!isEditing || emailVerified}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailVerified(false);
                      setOtpSent(false);
                      setOtp("");
                    }}
                    className={`flex-1 bg-transparent border px-4 py-2 rounded-lg focus:outline-none ${isEditing
                      ? `border-cyan-400 focus:ring-2 focus:ring-cyan-500 ${darkMode ? "text-white" : "text-black"}`
                      : "border-gray-700 text-gray-400"
                      }`}
                  />
                  {isEditing && !emailVerified && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isSendingOtp}
                      className={`bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm`}
                    >
                      {isSendingOtp ? "Sending..." : otpSent ? "Resend OTP" : "Send OTP"}
                    </button>
                  )}
                </div>
                {otpSent && !emailVerified && (
                  <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className={`flex-1 bg-transparent border border-gray-600 px-4 py-2 rounded-lg ${darkMode ? "text-white" : "text-black"}`}
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={isVerifyingOtp}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm"
                    >
                      {isVerifyingOtp ? "Verifying..." : "Verify"}
                    </button>
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className={`block text-sm ${darkMode ? "text-gray-300" : "text-gray-900"} mb-1`}>Phone</label>
                <input
                  type="text"
                  value={phone}
                  readOnly={!isEditing}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full bg-transparent border px-4 py-2 rounded-lg focus:outline-none ${isEditing
                    ? `border-cyan-400 focus:ring-2 focus:ring-cyan-500 ${darkMode ? "text-white" : "text-black"}`
                    : "border-gray-700 text-gray-400"
                    }`}
                />
              </div>

              {/* Role (always readonly) */}
              <div>
                <label className={`block text-sm ${darkMode ? "text-gray-300" : "text-gray-900"} mb-1`}>Role</label>
                <input
                  type="text"
                  value={role}
                  readOnly
                  className="w-full bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg text-gray-300"
                />
              </div>

              {/* Update / Save Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={async () => {
                    if (isEditing && emailVerified) {
                      try {
                        const idToken = await auth.currentUser.getIdToken();
                        // console.log(uid)
                        const res = await axios.put(
                          `${import.meta.env.VITE_API_BASE_URL}/api/user/update-profile`,
                          { name, email, phone, uid },
                          {
                            headers: {
                              Authorization: `Bearer ${idToken}`,
                            },
                          }
                        );
                        if (res.data.success) {
                          toast.success("Profile updated");
                          setIsEditing(false);
                          setIsProfileModal(false);
                        }
                        else {
                          toast.error("Update failed");
                        }
                      }
                      catch (err) {
                        toast.error("Server error");
                      }
                    }
                    else if (!isEditing) {
                      setIsEditing(true);
                    }
                    else {
                      toast.error("Please verify your email first");
                    }
                  }}
                  className={`w-full text-white font-semibold py-2 rounded-lg transition ${isEditing
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                    }`}
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;