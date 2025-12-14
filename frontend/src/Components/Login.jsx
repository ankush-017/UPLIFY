import { useState } from "react";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../Store/Slice/authSlice.js";
import { X } from "lucide-react";
import { FaLock } from "react-icons/fa";
import { Mail, User, Eye, EyeOff, Phone } from "lucide-react";
import toast from 'react-hot-toast';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import axios from "axios";
import { app } from "../../firebase";
import { loginImg, google } from "../assets/image.js";
import { motion } from "framer-motion";
import ShowRole from "./ShowRole.jsx";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Login({ onClose }) {

  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [pendingUser, setPendingUser] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [phone, setPhone] = useState("");

  // email verified
  const [emailVerified, setEmailVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [manual, setManual] = useState(false);

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {

    setLoadingGoogle(true);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    try {
      let result;
      try {
        result = await signInWithPopup(auth, provider);
      }
      catch (popupErr) {
        if (isMobile) {
          // Use redirect login flow on mobile devices
          sessionStorage.setItem("redirectInProgress", "true");
          await signInWithRedirect(auth, provider);
          return; // skip the rest, as redirect will handle post-login
        }
        else {
          toast.error("Google login failed");
          return;
        }
      }

      const user = result.user;
      const idToken = await user.getIdToken();
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/role/${user.uid}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        dispatch(loginAction({ uid: user.uid}));
        toast.success("Login Successfully");
        onClose();
        navigate('/');
      }
      catch (err) {
        // first time login
        if (err.response?.status === 404) {
          setPendingUser(user);
          setShowRoleModal(true);
        }
        else {
          console.error("Role fetch failed:", err);
          toast.error("Something went wrong");
        }
      }
    }
    catch (err) {
      console.error("Google login failed:", err);
      // alert(err.message);
    }
    finally {
      setLoadingGoogle(false);
    }
  };

  const handleManualAuth = async () => {
    setManual(true);
    if (isLogin) {
      // Login form validation
      if (!email || !password) {
        toast.error("Please fill in all required fields.");
        setManual(false);
        return;
      }
    } else {
      // Registration form validation
      if (!email || !phone || !password || !name || !confirmPassword) {
        toast.error("Please fill in all required fields.");
        setManual(false);
        return;
      }
    }

    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!emailVerified && !isLogin) {
      toast.error("Please Verify Email");
      return;
    }

    try {
      let userCred;

      if (isLogin) {
        // Sign In
        userCred = await signInWithEmailAndPassword(auth, email, password);
        const user = userCred.user;
        const idToken = await user.getIdToken();
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/role/${user.uid}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        // admin.auth().setCustomUserClaims(uid, { role: res?.data?.role });
        dispatch(loginAction({
          uid: user.uid,
          // name: user.displayName || name || "",
          // email: user.email,
          // role: res.data.role,
        }));
        toast.success("Login Successfully");
        onClose();
        navigate('/')
      }
      else {
        // Register
        userCred = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCred.user;
        // Save basic info temporarily
        setPendingUser({
          uid: user.uid,
          email: user.email,
          displayName: name,
          userphone: phone
        });
        setShowRoleModal(true);
      }
    }
    catch (err) {
      console.error("Manual auth error:", err.code, err.message);
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered")
      }
      else {
        toast.error("Check Email/Password");
      }
    }
    finally {
      setManual(false);
    }
  };

  const handleRoleSelection = async (role) => {
    if (!pendingUser) return;
    // console.log(role);

    try {
      const currentUser = auth.currentUser;
      const idToken = await currentUser.getIdToken();
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
        uid: pendingUser.uid,
        email: pendingUser.email,
        name: pendingUser.displayName,
        phone: pendingUser.userphone,
        role
      },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      // admin.auth().setCustomUserClaims(uid, { role: role });
      dispatch(loginAction({ uid: pendingUser.uid}));
      setPendingUser(null);
      setShowRoleModal(false);
      toast.success("Register Successfully");
      onClose();
      navigate('/')
    }
    catch (err) {
      console.error("Registration failed:", err);
      console.log("Role assignment failed. Your account will be removed for safety.");
      toast.error("Something went Wrong");

      // Clean up Firebase Auth user
      try {
        const currentUser = auth.currentUser;
        if (currentUser?.uid === pendingUser.uid) {
          await currentUser.delete();
        }
      }
      catch (deleteErr) {
        console.error("Failed to delete Firebase user:", deleteErr);
      }
      setPendingUser(null);
      setShowRoleModal(false);
    }
  };

  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const handleSendOtp = async () => {

    if (!email) {
      toast.error("Enter email first");
      return;
    }
    setIsSendingOtp(true); // Start loading
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/send-otp`, { email });
      toast.success("OTP sent to email");
      setOtpSent(true);
      setShowOtpModal(true);
    }
    catch (err) {
      // console.error("Send OTP error:", err.response?.data || err.message);
      toast.error("Failed to send OTP");
    }
    finally {
      setIsSendingOtp(false); // Stop loading
    }
  };

  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const handleVerifyOtp = async () => {
    // console.log("Verifying OTP for:", email, "OTP:", otp);
    setIsVerifyingOtp(true); // Start loading
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/verify-otp`, {
        email: email.toLowerCase(),
        otp,
      });
      // console.log("Verify OTP response:", res.data);

      if (res.data.success) {
        toast.success("Email verified");
        setEmailVerified(true);
        setShowOtpModal(false);
      } else {
        toast.error("Invalid OTP");
      }
    } catch (err) {
      console.log("OTP verification error:", err.response?.data || err.message);
      toast.error("OTP verification failed");
    } finally {
      setIsVerifyingOtp(false); // Stop loading
    }
  };

  const handleForgotPassword = async (e) => {
    
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");
    const Email = email.toLowerCase().trim();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/check-email`, { Email });
      if (response.data.success) {
        await sendPasswordResetEmail(getAuth(), Email);
        toast.success("Password reset email sent");
      }
      else {
        toast.error("Email Not registered");
      }

    }
    catch (err) {
      toast.error("Something went wrong");
      console.error("Error:", err.message);
    }
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white w-full max-w-4xl rounded-3xl flex shadow-2xl overflow-hidden relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-red-600 z-10">
            <X size={24} />
          </button>

          <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#e0e7ff] to-[#ffe4e6] items-center justify-center p-6">
            <img src={loginImg} alt="Login Art" className="w-full max-w-sm" />
          </div>

          <div className="w-full md:w-1/2 p-8 mt-7 bg-white/90 backdrop-blur">
            <button
              onClick={handleGoogleLogin}
              className="w-full border border-gray-300 rounded-md py-2 flex items-center justify-center gap-2 mb-4 mt-4 hover:bg-gray-50 transition"
            >
              <img src={google} width={20} height={20} alt="" />
              <span className="text-gray-800 font-medium">
                {loadingGoogle ? "Logging in..." : "Continue with Google"}
              </span>
            </button>

            <div className="flex items-center mb-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-400 text-sm">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {
              isLogin ? (<>
                <div className="flex items-center border rounded-lg px-3 py-2 mb-3 shadow-sm">
                  <Mail size={18} className="text-blue-800" />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="ml-2 w-full outline-none text-purple-700 placeholder:text-gray-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex items-center border rounded-lg px-3 py-2 mb-4 shadow-sm">
                  <FaLock size={18} className="text-blue-800" />
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Password"
                    className="ml-2 w-full outline-none text-purple-700 placeholder:text-gray-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-11 cursor-pointer text-sm text-blue-600"
                  >
                    {showLoginPassword ? <EyeOff /> : <Eye />}
                  </span>
                </div>
                <div
                  className="flex justify-end mb-2 cursor-pointer text-blue-900 hover:underline"
                  onClick={handleForgotPassword}
                >
                  <p>Forgot password?</p>
                </div>
              </>
              ) :
                (
                  <>
                    <div className="flex items-center border rounded-lg px-3 py-2 mb-3 shadow-sm">
                      <User size={18} className="text-blue-800" />
                      <input
                        type="text"
                        placeholder="Your name"
                        className="ml-2 w-full outline-none text-purple-700 placeholder:text-gray-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-4 flex flex-col gap-3">
                      {/* Email Input + Send OTP Button */}
                      <div className="flex gap-2 flex-col sm:flex-row items-stretch">
                        <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm w-full sm:w-2/3 bg-white">
                          <Mail size={18} className="text-blue-800" />
                          <input
                            type="email"
                            placeholder="Enter your email"
                            className="ml-2 w-full outline-none text-purple-700 placeholder:text-gray-400 bg-transparent"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setEmailVerified(false);
                              setOtpSent(false);
                              setOtp("");
                            }}
                            disabled={emailVerified}
                          />
                        </div>

                        {!emailVerified && (
                          <button
                            onClick={handleSendOtp}
                            disabled={isSendingOtp}
                            className={`${isSendingOtp ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
                              } text-white px-4 py-2 rounded-lg transition w-full sm:w-auto`}
                          >
                            {isSendingOtp ? "Sending..." : (otpSent ? "Resend OTP" : "Send OTP")}
                          </button>
                        )}
                      </div>

                      {/* OTP Input appears after Send OTP is clicked */}
                      {otpSent && !emailVerified && (
                        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                          <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter 6-digit OTP"
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-2/3 text-center placeholder:text-gray-500"
                          />
                          <button
                            onClick={handleVerifyOtp}
                            disabled={isVerifyingOtp}
                            className={`${isVerifyingOtp ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                              } text-white px-4 py-2 rounded-lg transition w-full sm:w-auto`}
                          >
                            {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center border rounded-lg px-3 py-2 mb-3 shadow-sm">
                      <Phone className="text-blue-800" />
                      <input
                        type="tel"
                        placeholder="Phone number"
                        className="ml-2 w-full outline-none text-purple-700 placeholder:text-gray-400"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center border rounded-lg px-3 py-2 mb-3 shadow-sm relative">
                      <FaLock size={18} className="text-blue-800" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="ml-2 w-full outline-none text-purple-700 placeholder:text-gray-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 cursor-pointer text-sm text-blue-600"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </span>
                    </div>

                    <div className="flex items-center border rounded-lg px-3 py-2 mb-4 shadow-sm relative">
                      <FaLock size={18} className="text-blue-800" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        className="ml-2 w-full outline-none text-purple-700 placeholder:text-gray-400"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>

                  </>
                )
            }

            <button
              onClick={handleManualAuth}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {isLogin ? `${manual ? "Signing ..." : "Sign In"}` : `${manual ? "Creating ..." : "Create Account"}`}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              {isLogin ? (
                <>
                  Don’t have an account?{" "}
                  <span onClick={() => setIsLogin(false)} className="text-purple-800 cursor-pointer hover:underline">
                    Create Account
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span onClick={() => setIsLogin(true)} className="text-blue-600 cursor-pointer hover:underline">
                    Sign In
                  </span>
                </>
              )}
            </p>
          </div>
        </motion.div>
      </div>

      {showRoleModal && (
        <ShowRole handleRoleSelection={handleRoleSelection} />
      )}

    </>
  );
}