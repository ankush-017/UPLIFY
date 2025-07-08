import React from 'react'
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { login as loginAction } from "./Store/Slice/authSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { app } from "../firebase";
import ShowRole from './Components/ShowRole';
import ScrollToTop from './Components/ScrollToTop';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function App() {

  const dispatch = useDispatch();
  const [pendingUser, setPendingUser] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const handleRoleSelection = async (role) => {
    if (!pendingUser) return;
    try {
      const currentUser = auth.currentUser;
      const idToken = await currentUser.getIdToken();
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
        uid: pendingUser.uid,
        email: pendingUser.email,
        name: pendingUser.displayName,
        role,
      }, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      dispatch(loginAction({ uid: pendingUser.uid, role }));
      setShowRoleModal(false);
      setPendingUser(null);
      toast.success("Registration Successful");
    } catch (err) {
      toast.error("Failed to register role");
      console.error("Role selection error:", err);
    }
  };


  useEffect(() => {
    const handleRedirect = async () => {
      const inRedirect = sessionStorage.getItem("redirectInProgress");
      if (!inRedirect) return;
      const loadingToastId = toast.loading("Logging in...");

      try {
        const result = await getRedirectResult(auth);
        sessionStorage.removeItem("redirectInProgress");
        console.log(result);
        if (result?.user) {
          const user = result.user;
          const idToken = await user.getIdToken();
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/role/${user.uid}`, {
              headers: { Authorization: `Bearer ${idToken}` },
            });
            dispatch(loginAction({ uid: user.uid, role: res.data.role }));
            toast.dismiss(loadingToastId);
            toast.success("Login Successful");
          }
          catch (err) {
            if (err.response?.status === 404) {
              setPendingUser(user);           // Set user for registration
              setShowRoleModal(true);         // Show role selection modal
              toast.dismiss(loadingToastId);
            } else {
              toast.dismiss(loadingToastId);
              toast.error("Something went wrong in login");
            }
          }
        }
      } catch (err) {
        console.error("Redirect login error:", err);
        sessionStorage.removeItem("redirectInProgress");
        toast.dismiss(loadingToastId);
        toast.error("Redirect Google login failed");
      }
    };

    handleRedirect();
  }, []);


  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#1f2937',
            color: '#fff',
            fontSize: '14px',
          },
        }}
      />
      <ScrollToTop/>
      <Navbar />
      <Outlet />
      <Footer />
      {showRoleModal && (
        <ShowRole
          handleRoleSelection={handleRoleSelection}
        />
      )}

    </>
  )
}
export default App;