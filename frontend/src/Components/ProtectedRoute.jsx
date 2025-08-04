import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spin } from 'antd';
import Login from './Login';

function ProtectedRoute() {

  const user = JSON.parse(localStorage.getItem('uplify_user'));
  const uid = user?.uid;
  const [loginShow, setLoginShow] = useState(true);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const RoleHandle = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/getuser/${uid}`);
      setIsLogin(true);
    }
    catch (err) {
      console.error("Error fetching user role:", err);
      setIsLogin(false);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uid) RoleHandle();
    else setLoading(false);
  }, [uid]);

  if (loading) return <div className='h-screen flex justify-center items-center'><Spin /></div>

  return isLogin ? <Outlet /> : (
    loginShow && (
      <Login
        onClose={() => {
          setLoginShow(false);
          navigate('/guest');
        }}
      />
    )
  );
}
export default ProtectedRoute;