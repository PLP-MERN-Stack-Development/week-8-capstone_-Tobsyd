import React from 'react';

export default function Footer(){
    return (
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
            <p>+234 800 123 4567</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          © {new Date().getFullYear()} ECOTESTHUB. All rights reserved.
        </div>
      </footer>
    )
};