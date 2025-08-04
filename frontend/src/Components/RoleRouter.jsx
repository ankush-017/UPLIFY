import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import Login from './Login';
import { Spin } from 'antd';

const RoleRouter = () => {

    const navigate = useNavigate();
    const [uid, setUid] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loginVisible, setLoginVisible] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUid(user.uid);
            } else {
                setLoginVisible(true);
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchUserRole = async () => {
            if (!uid) return;

            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/getuser/${uid}`);
                const userRole = res?.data?.user?.role;
                setRole(userRole);
            } catch (err) {
                console.error("Error fetching user role:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, [uid]);

    useEffect(() => {
        if (!loading && role) {
            // console.log(role)
            if (role === 'company') navigate('/company');
            else if (role === 'student' || role === 'admin') navigate('/user');
        }
    }, [loading, role, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin tip="Loading..." size="large">
                    <span className="sr-only">Loading...</span>
                </Spin>
            </div>
        );
    }

    if (loginVisible && !uid) {
        return (
            <Login
                onClose={() => {
                    setLoginVisible(false);
                    navigate('/');
                }}
            />
        );
    }

    return null;
};
export default RoleRouter;