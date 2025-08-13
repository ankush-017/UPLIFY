import { redirect } from 'react-router-dom';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

export const  roleLoader = async () => {

  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    return redirect('/guest');
  }

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/user/getuser/${user.uid}`
    );

    const role = res?.data?.user?.role;

    if (role === 'company') {
      return redirect('/company');
    }
    if (role === 'student' || role === 'admin') {
      return redirect('/user');
    }
    return redirect('/guest');
  } catch (err) {
    console.error('Error fetching user role, redirecting to guest:', err);
    return redirect('/guest');
  }
}