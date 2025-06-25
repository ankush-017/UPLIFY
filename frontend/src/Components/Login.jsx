import { useState } from "react";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../Store/Slice/authSlice.js";
import { X } from "lucide-react";
import { FaLock } from "react-icons/fa";
import { Mail, User, Eye, EyeOff } from "lucide-react";
import toast from 'react-hot-toast';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";
import { app } from "../../firebase";
import { loginImg, google } from "../assets/image.js";
import { motion } from "framer-motion";

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

  // email verified
  const [emailVerified, setEmailVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      try {
        const res = await axios.get(`https://uplify.onrender.com/api/auth/role/${user.uid}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        dispatch(loginAction({ uid: user.uid, role: res.data.role }));
        toast.success("Login Successfully");
        onClose();
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
  };

  const handleManualAuth = async () => {
    try {
      if (!email || !password || (!isLogin && (!name || !confirmPassword))) {
        toast.error("Please fill in all required fields.");
        return;
      }

      if (!isLogin && password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }

      if (!emailVerified) {
        toast.error('Please Verify Email');
        return;
      }
      let userCred;

      if (isLogin) {
        // Sign In
        userCred = await signInWithEmailAndPassword(auth, email, password);
        const user = userCred.user;
        const idToken = await user.getIdToken();
        const res = await axios.get(`https://uplify.onrender.com/api/auth/role/${user.uid}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        dispatch(loginAction({
          uid: user.uid,
          // name: user.displayName || name || "",
          // email: user.email,
          role: res.data.role,
        }));
        toast.success("Login Successfully");
        onClose();
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
        toast.error("Please try again.");
      }
    }
  };

  const handleRoleSelection = async (role) => {
    if (!pendingUser) return;

    try {
      const currentUser = auth.currentUser;
      const idToken = await currentUser.getIdToken();
      const res = await axios.post("https://uplify.onrender.com/api/auth/register", {
        uid: pendingUser.uid,
        email: pendingUser.email,
        name: pendingUser.displayName,
        role
      },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      dispatch(loginAction({ uid: pendingUser.uid, role }));
      setPendingUser(null);
      setShowRoleModal(false);
      toast.success("Register Successfully");
      onClose();
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

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Enter email first");
      return;
    }
    try {
      const res = await axios.post("https://uplify.onrender.com/api/auth/send-otp", { email });
      toast.success("OTP sent to email");
      setOtpSent(true);
      setShowOtpModal(true);
    }
    catch (err) {
      toast.error("Failed to send OTP");
    }
  };
  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("https://uplify.onrender.com/api/auth/verify-otp", { email, otp });
      if (res.data.success) {
        toast.success("Email verified");
        setEmailVerified(true);
        setShowOtpModal(false);
      }
      else {
        toast.error("Invalid OTP");
      }
    } catch (err) {
      toast.error("OTP verification failed");
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
              <span className="text-gray-800 font-medium">Continue with Google</span>
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
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition w-full sm:w-auto"
                          >
                            {otpSent ? "Resend OTP" : "Send OTP"}
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
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
                          >
                            Verify OTP
                          </button>
                        </div>
                      )}
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
              {isLogin ? "Sign In" : "Create Account"}
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
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 shadow-lg text-center space-y-4">
            <h2 className="text-xl font-semibold">Who are you?</h2>
            <p className="text-gray-600">Please select your role</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleRoleSelection("student")}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                I'm a Student
              </button>
              <button
                onClick={() => handleRoleSelection("company")}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
              >
                I'm a Company
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}