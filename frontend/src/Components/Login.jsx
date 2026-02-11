import { useState } from "react";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../Store/Slice/authSlice.js";
import { X, Mail, Lock, Eye, EyeOff, User, Phone, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { FaLock } from "react-icons/fa";
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
        dispatch(loginAction({ uid: user.uid }));
        toast.success("Login Successfully");
        onClose();
        navigate('/');
      }
      catch (err) {
        // first time login
        if (err.response?.status === 404) {
          console.log("here i am");
          setPendingUser(user);
          setShowRoleModal(true);
          console.log(showRoleModal);
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

    setManual(true);

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
      dispatch(loginAction({ uid: pendingUser.uid }));
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
      <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-[100] flex justify-center items-center px-4 py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white w-full max-w-5xl rounded-[2.5rem] flex flex-col md:flex-row shadow-2xl overflow-hidden relative border border-white/20"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-all z-50 p-2 hover:bg-slate-100 rounded-full"
          >
            <X size={22} />
          </button>

          {/* --- LEFT SIDE: THE BRAND PANEL --- */}
          <div className="hidden md:flex w-2/5 bg-gradient-to-br from-[#f0fdf4] via-[#f7fee7] to-[#ecfccb] flex-col items-center justify-center p-12 border-r border-slate-100 relative overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#c7ee3f]/30 blur-[100px] rounded-full"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#3DDC84]/20 blur-[100px] rounded-full"></div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative z-10 text-center"
            >
              <img src={loginImg} alt="Uplify Auth" className="w-full max-w-[280px] drop-shadow-2xl mb-8" />
              <h3 className="text-2xl font-black text-[#064e3b] leading-tight tracking-tighter">
                Empowering Careers <br /> with Intelligence
              </h3>
              <p className="text-emerald-700/60 mt-4 text-sm font-medium">Join Uplify and launch your professional journey today.</p>
            </motion.div>
          </div>

          {/* --- RIGHT SIDE: THE AUTH FORM --- */}
          <div className="w-full md:w-3/5 p-8 md:p-14 bg-white flex flex-col overflow-y-auto max-h-[90vh] custom-scrollbar">

            <div className="mb-8">
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
                {isLogin ? "Welcome Back" : "Create Your Account"}
              </h2>
              <p className="text-slate-500 mt-2 text-sm">Please enter your details to continue.</p>
            </div>

            {/* Google SSO Button */}
            <button
              onClick={handleGoogleLogin} // <-- Add this line
              disabled={loadingGoogle}
              className="group w-full border border-slate-200 rounded-2xl py-3.5 flex items-center justify-center gap-3 mb-6 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 disabled:opacity-50"
            >
              <img src={google} width={20} height={20} alt="Google" className={loadingGoogle ? "animate-spin" : ""} />
              <span className="text-slate-700 font-bold text-xs uppercase tracking-widest">
                {loadingGoogle ? "Connecting..." : "Continue with Google"}
              </span>
            </button>

            <div className="relative flex items-center mb-8">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="mx-4 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">OR USE EMAIL</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            <div className="space-y-4">
              {/* --- SIGN UP FIELDS --- */}
              {!isLogin && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="group flex items-center border border-slate-200 rounded-2xl px-4 py-3.5 focus-within:border-[#3DDC84] focus-within:ring-4 focus-within:ring-[#3DDC84]/10 transition-all">
                    <User size={18} className="text-slate-400 group-focus-within:text-[#3DDC84]" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="ml-3 w-full outline-none text-slate-900 font-semibold bg-transparent"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="group flex items-center border border-slate-200 rounded-2xl px-4 py-3.5 focus-within:border-[#3DDC84] focus-within:ring-4 focus-within:ring-[#3DDC84]/10 transition-all flex-grow">
                      <Mail size={18} className="text-slate-400" />
                      <input
                        type="email"
                        placeholder="Email address"
                        disabled={emailVerified}
                        className={`ml-3 w-full outline-none font-semibold bg-transparent ${emailVerified ? 'text-slate-400' : 'text-slate-900'}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {emailVerified && <CheckCircle2 size={18} className="text-emerald-500" />}
                    </div>

                    {!emailVerified && (
                      <button
                        onClick={handleSendOtp}
                        disabled={isSendingOtp}
                        className="px-6 py-3.5 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all disabled:bg-slate-300"
                      >
                        {isSendingOtp ? "..." : (otpSent ? "Resend" : "Send OTP")}
                      </button>
                    )}
                  </div>

                  {otpSent && !emailVerified && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="flex gap-2 bg-[#f7fee7] p-2 rounded-2xl border border-[#c7ee3f]">
                      <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        className="w-full px-4 py-2 bg-white rounded-xl border-none outline-none font-bold text-center tracking-widest"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <button onClick={handleVerifyOtp} className="px-6 bg-[#3DDC84] text-[#002D15] rounded-xl font-black text-[10px] uppercase">
                        {isVerifyingOtp ? "..." : "Verify"}
                      </button>
                    </motion.div>
                  )}

                  <div className="group flex items-center border border-slate-200 rounded-2xl px-4 py-3.5 focus-within:border-[#3DDC84] focus-within:ring-4 focus-within:ring-[#3DDC84]/10 transition-all">
                    <Phone size={18} className="text-slate-400" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="ml-3 w-full outline-none text-slate-900 font-semibold bg-transparent"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </motion.div>
              )}

              {/* --- LOGIN FIELDS --- */}
              {isLogin && (
                <div className="group flex items-center border border-slate-200 rounded-2xl px-4 py-3.5 focus-within:border-[#3DDC84] focus-within:ring-4 focus-within:ring-[#3DDC84]/10 transition-all">
                  <Mail size={18} className="text-slate-400 group-focus-within:text-[#3DDC84]" />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="ml-3 w-full outline-none text-slate-900 font-semibold bg-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}

              {/* Password Block */}
              <div className="space-y-4">
                <div className="group flex items-center border border-slate-200 rounded-2xl px-4 py-3.5 focus-within:border-[#3DDC84] transition-all relative">
                  <FaLock size={16} className="text-slate-400" />
                  <input
                    type={isLogin ? (showLoginPassword ? "text" : "password") : (showPassword ? "text" : "password")}
                    placeholder="Password"
                    className="ml-3 w-full outline-none text-slate-900 font-semibold bg-transparent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    onClick={() => isLogin ? setShowLoginPassword(!showLoginPassword) : setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    {(isLogin ? showLoginPassword : showPassword) ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {!isLogin && (
                  <div className="group flex items-center border border-slate-200 rounded-2xl px-4 py-3.5 focus-within:border-[#3DDC84] transition-all">
                    <ShieldCheck size={18} className="text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      className="ml-3 w-full outline-none text-slate-900 font-semibold bg-transparent"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {isLogin && (
                <div className="flex justify-end px-1">
                  <button className="text-[10px] font-black text-[#166534] hover:text-[#3DDC84] transition-colors uppercase tracking-widest">
                    Forgot password?
                  </button>
                </div>
              )}
            </div>

            {/* --- MAIN ACTION BUTTON --- */}
            <button
              onClick={handleManualAuth}
              className="group w-full mt-10 py-4 rounded-2xl flex items-center justify-center gap-3
                       bg-gradient-to-r from-[#3DDC84] via-[#C7EE3F] to-[#facc15] 
                       text-[#002D15] font-black uppercase tracking-[0.2em] text-xs 
                       shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 
                       hover:-translate-y-1 active:scale-95 transition-all duration-300"
            >
              <span>{isLogin ? (manual ? "Signing In..." : "Sign In") : (manual ? "Creating..." : "Create Account")}</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
            </button>

            <p className="text-center text-sm text-slate-500 mt-8 font-medium">
              {isLogin ? "Don't have an account?" : "Already a member?"}{" "}
              <button
                onClick={() => { setIsLogin(!isLogin); setOtpSent(false); }}
                className="text-[#166534] font-black hover:underline underline-offset-4 decoration-2 transition-all"
              >
                {isLogin ? "Create Account" : "Sign In"}
              </button>
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