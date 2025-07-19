import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import performanceTracking from '../assets/PerformanceTracking.jpg';
import cbttest from '../assets/cbttest.jpg';
import timedtest from '../assets/cbttest.jpg';
import pastquestion from '../assets/pastquestion.jpg';

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-600 shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">ECOTESTHUB</div>
          {/* Desktop Links */}
          <div className="space-x-4 hidden md:flex items-center">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#contact" className="hover:text-white">Contact</a>
            <Link to='/login' className="hover:text-white">Login</Link>
            <Link to='/register' className="hover:text-white">Register</Link>
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen(prev => !prev)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
        {/* Mobile Links */}
        {menuOpen && (
          <div className="md:hidden bg-blue px-6 pb-4">
            <a href="#features" className="block py-2 hover:text-white">Features</a>
            <a href="#about" className="block py-2 hover:text-blue-600">About</a>
            <a href="#contact" className="block py-2 hover:text-blue-600">Contact</a>
            <Link to="/login" className="block py-2 hover:text-blue-600">Login</Link>
            <Link to='/register' className="block py-2 hover:text-blue-600">Register</Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="bg-gray-50 flex-1">
        <div className="container mx-auto px-6 py-16 flex flex-col-reverse lg:flex-row items-center">
          <div className="w-full lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">
              Practice Real CBT Exams <span className="text-blue-600">Like a Pro</span>
            </h1>
            <p className="mt-4 text-gray-600">
              ECOTESTHUB provides you with past questions, timed exercises, and detailed solutions to
              help you excel in your real exams. Get started with free trials today!
            </p>
            <div className="mt-6 space-x-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
                Get Started
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-50">
                Learn More
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <img
              src={cbttest}
              alt="Student taking test"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800">Features</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <img
              src={timedtest}
              alt="Timed Tests"
              className="h-40 w-full object-cover rounded"
            />
            <h3 className="mt-4 text-xl font-semibold">Timed Tests</h3>
            <p className="mt-2 text-gray-600">Simulate exam conditions with our built-in timer.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <img
              src={pastquestion}
              alt="Past Questions"
              className="h-40 w-full object-cover rounded"
            />
            <h3 className="mt-4 text-xl font-semibold">Past Questions</h3>
            <p className="mt-2 text-gray-600">Access a repository of past exam questions and answers.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <img
              src={performanceTracking}
              alt="Performance Tracking"
              className="h-40 w-full object-cover rounded"
            />
            <h3 className="mt-4 text-xl font-semibold">Performance Tracking</h3>
            <p className="mt-2 text-gray-600">Monitor your progress with detailed analytics.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-300 py-8">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold">ECOTESTHUB</h4>
            <p className="mt-2">Your partner in exam preparation and success.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="mt-2 space-y-1">
              <li><a href="#features" className="hover:text-blue">Features</a></li>
              <li><a href="#about" className="hover:text-blue">About</a></li>
              <li><a href="#contact" className="hover:text-blue">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <p className="mt-2">info@ecotesthub.com</p>
            <p>+234 808 855 3845</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          © {new Date().getFullYear()} ECOTESTHUB. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
