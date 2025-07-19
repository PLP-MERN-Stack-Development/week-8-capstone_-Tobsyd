import React, { useEffect, useState } from 'react';
import Navbar from '../components/layouts/Navbar';
import SideMenu from '../components/layouts/SideMenu';
import AvailableTests from './AvailableTests';
import FAQsAccordion from './FAQAccordion';
import Footer from '../components/layouts/Footer';
export default function Dashboard({ activeMenu }) {

  return (
    <div className="p-4">
      <Navbar activeMenu={activeMenu} />

      <div className='flex'>
        <div className="max-[1080px]:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
        <div className="grow m-5">
          <div className="bg-blue-50 p-6 rounded-md">
            <h1 className="text-3xl font-bold mb-2">👋 Welcome, User!</h1>
            <p className="text-gray-700">
              This platform is designed to help you prepare for your exams with realistic practice tests.
              Explore available tests, track your progress, and improve your skills. Your result will be saved automatically.
            </p>
          </div>

          <AvailableTests />

          <FAQsAccordion />
        </div>
      </div>
      <Footer/>
    </div>

  );
}