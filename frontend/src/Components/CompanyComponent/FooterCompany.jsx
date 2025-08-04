import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png';
import { Facebook, Linkedin, Mail, Twitter } from 'lucide-react';

function FooterCompany() {
    return (
        <footer className="bg-gradient-to-tr from-gray-800 via-gray-900 to-blue-950 text-blue-100 py-5 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 pt-8 gap-8">

                {/* Logo & About */}
                <div>
                    <Link to="/" className="flex items-center gap-2 mb-4">
                        <img src={logo} alt="Uplify" className="h-8" />
                        {/* <span className="text-white text-xl font-bold">Uplify</span> */}
                    </Link>
                    <p className="text-sm leading-relaxed">
                        Empowering companies with the tools to hire smarter and faster. At Uplify, we bridge talent with opportunity.
                    </p>
                </div>

                {/* Navigation Links */}
                <div>
                    <h3 className="text-blue-400 text-lg font-semibold mb-3">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/about" className="hover:text-white transition">Post Internship</a></li>
                        <li><a href="/careers" className="hover:text-white transition">Application</a></li>
                        <li><a href="/about" className="hover:text-white transition">About Us</a></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="text-blue-400 text-lg font-semibold mb-3">Resources</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
                        <li><a href="/user/uplify-community" className="hover:text-white transition">Uplify-community</a></li>
                        <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Contact & Social */}
                <div>
                    <h4 className="text-blue-400 text-lg font-semibold mb-3">Connect</h4>
                    <p className="text-sm mb-3 text-gray-400">Email: <a href="mailto:hello@uplify.in" className="hover:text-blue-400">hello@uplify.in</a></p>
                    <div className="flex gap-4 mt-2">
                        <a href="#" target="_blank" rel="noreferrer" className="hover:text-blue-400"><Facebook size={20} /></a>
                        <a href="#" target="_blank" rel="noreferrer" className="hover:text-blue-400"><Twitter size={20} /></a>
                        <a href="#" target="_blank" rel="noreferrer" className="hover:text-blue-400"><Linkedin size={20} /></a>
                        <a href="mailto:hello@uplify.in" className="hover:text-blue-400"><Mail size={20} /></a>
                    </div>
                </div>
            </div>

            <hr className="my-8 border-blue-700" />

            <p className="text-center text-sm text-blue-300">
                © {new Date().getFullYear()} Uplify. All rights reserved.
            </p>
        </footer>
    )
}
export default FooterCompany