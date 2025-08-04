import { Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';

function UserAdmin() {

    const user = JSON.parse(localStorage.getItem('uplify_user'));
    const uid = user?.uid;
    const [auth, setAuth] = useState(false);
    const [loginShow, setLoginShow] = useState(true);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useSelector((state) => state.auth);

    const checkUserAdmin = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/getuser/${uid}`);
            // console.log("User fetched:", res.data); 

            const role = res?.data?.user?.role;
            // console.log(role)
            if (role === 'student' || role === 'admin') {
                setAuth(true);
            }
        } catch (err) {
            console.error("Error in UserAdmin:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (uid) checkUserAdmin();
        else setLoading(false); // No user found
    }, [uid]);

    // if(!auth && !isAuthenticated){
    //     setAuth(true);
    // }

    if (loading) return <div className="h-screen flex justify-center items-center"><Spin /></div>;

    return auth ? <Outlet /> : (
        loginShow && (
          <Login
            onClose={() => {
              setLoginShow(false);
              navigate('/guest');
            }}
          />
        )
    )
}
export default UserAdmin;