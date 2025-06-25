import React from 'react'
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
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
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
export default App;