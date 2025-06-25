import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import logo from '../assets/logo.png';

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0f172a] via-[#0c1b2c] to-[#091122] text-gray-300 border-t-2 pt-14 pb-6 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        
        {/* Logo & About */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Uplify" className="h-8" />
            {/* <span className="text-white text-xl font-bold">Uplify</span> */}
          </Link>
          <p className="text-sm text-gray-400">
            Your one-stop platform for internships, skill-building courses, and career tools.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/internships" className="hover:text-blue-400">Internships</Link></li>
            <li><Link to="/resources" className="hover:text-blue-400">Resources</Link></li>
            <li><Link to="/about" className="hover:text-blue-400">About Us</Link></li>
            <li><Link to="/blogs" className="hover:text-blue-400">Blogs</Link></li>
          </ul>
        </div>

        {/* Tools */}
        <div>
          <h4 className="text-white font-semibold mb-3">Tools</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/resume" className="hover:text-blue-400">Resume Builder</Link></li>
            {/* <li><Link to="/verify" className="hover:text-blue-400">Verify Certificate</Link></li> */}
            <li><Link to="/login" className="hover:text-blue-400">Login</Link></li>
            {/* <li><Link to="/register" className="hover:text-blue-400">Register</Link></li> */}
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-white font-semibold mb-3">Connect</h4>
          <p className="text-sm mb-3 text-gray-400">Email: <a href="mailto:hello@uplify.in" className="hover:text-blue-400">hello@uplify.in</a></p>
          <div className="flex gap-4 mt-2">
            <a href="#" target="_blank" rel="noreferrer" className="hover:text-blue-400"><Facebook size={20} /></a>
            <a href="#" target="_blank" rel="noreferrer" className="hover:text-blue-400"><Twitter size={20} /></a>
            <a href="#" target="_blank" rel="noreferrer" className="hover:text-blue-400"><Linkedin size={20} /></a>
            <a href="mailto:hello@uplify.in" className="hover:text-blue-400"><Mail size={20} /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center border-t border-gray-700 pt-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Uplify. All rights reserved.
      </div>
    </footer>
  );
}
export default Footer;