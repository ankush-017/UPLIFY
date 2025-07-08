import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { supabase } from '../../supabaseClient.js';
// import { Helmet } from 'react-helmet-async';

function Dashboard() {

    const [users, setUsers] = useState([]);
    //   const [waitlist, setWaitlist] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user`);
                setUsers(usersRes.data?.alluser || []);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>

            <div className="p-6 text-white">
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-purple-600 p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-semibold">Total Users</h2>
                        <p className="text-4xl font-bold mt-2">{users.length}</p>
                    </div>
                </div>

                {/* USERS TABLE */}
                <div className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">All Users</h2>
                    <div className="overflow-x-auto bg-white/20 rounded-lg">
                        <table className="min-w-full text-left border border-gray-700">
                            <thead className="bg-white/10">
                                <tr>
                                    <th className="px-4 py-3 border-b border-gray-700">Name</th>
                                    <th className="px-4 py-3 border-b border-gray-700">Email</th>
                                    <th className="px-4 py-3 border-b border-gray-700">Phone</th>
                                    <th className="px-4 py-3 border-b border-gray-700">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, i) => (
                                    <tr key={i} className="hover:bg-white/5">
                                        <td className="px-4 py-2 border-b border-gray-700">{user.name}</td>
                                        <td className="px-4 py-2 border-b border-gray-700">{user.email}</td>
                                        <td className="px-4 py-2 border-b border-gray-700">{user.phone}</td>
                                        <td className="px-4 py-2 border-b border-gray-700 capitalize">{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;