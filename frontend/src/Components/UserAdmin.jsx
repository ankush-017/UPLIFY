// import { Spin } from 'antd';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Outlet, Navigate, useNavigate } from 'react-router-dom';
// import Login from './Login';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';

// function UserAdmin() {
//   const auth = getAuth();
//   const [Auth, setAuth] = useState(false);
//   const [loginShow, setLoginShow] = useState(true);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   const checkUserAdmin = async (uid) => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/getuser/${uid}`);
//       const role = res?.data?.user?.role;

//       if (role === 'student' || role === 'admin') {
//         setAuth(true);
//       }
//     } 
//     catch (err) {
//       console.error("Error in UserAdmin:", err);
//     } 
//     finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         checkUserAdmin(user.uid);
//       } else {
//         setLoading(false); // no user logged in
//       }
//     });

//     return () => unsubscribe();
//   }, [auth]);

//   if (loading)
//     return (
//       <div className="h-screen flex justify-center items-center">
//         <Spin />
//       </div>
//     );

//   return Auth ? (
//     <Outlet />
//   ) : (
//     loginShow && (
//       <Login
//         onClose={() => {
//           setLoginShow(false);
//           navigate('/guest');
//         }}
//       />
//     )
//   );
// }

// export default UserAdmin;

import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spin } from 'antd';
import Login from './Login';
import { getAuth } from 'firebase/auth';

function UserProtected() {

  const user = JSON.parse(localStorage.getItem('uplify_user'));
  const uid = user?.uid;

  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [loginShow, setLoginShow] = useState(true);
  const navigate = useNavigate();

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

  const isAdmin = (role === 'student' || role === 'admin');

  if (loading) return <div className='h-screen flex justify-center items-center'><Spin/></div>

  return isAdmin ? <Outlet /> : (
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

export default UserProtected;