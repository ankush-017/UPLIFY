import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { Spin } from 'antd';

function AdminProtectedRoute() {

  const user = JSON.parse(localStorage.getItem('uplify_user'));
  const uid = user?.uid;

  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  const RoleHandle = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/getuser/${uid}`);
      setRole(res?.data?.user?.role || '');
    } 
    catch (err) {
      console.error("Error fetching user role:", err);
      setRole('');
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uid) RoleHandle();
    else setLoading(false);
  }, [uid]);

  const isAdmin = role === 'admin';

  if (loading) return <div className='h-screen flex justify-center items-center'><Spin/></div>

  return isAdmin ? <Outlet /> : <Navigate to="/" />;
}
export default AdminProtectedRoute;