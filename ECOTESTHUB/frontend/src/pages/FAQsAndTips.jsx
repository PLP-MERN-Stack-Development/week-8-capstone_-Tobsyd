import React from 'react';

export default function FAQsAndTips() {
  return (
    <div className="bg-white rounded p-6 shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">❓ FAQs & Tips for Success</h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">How do I start a test?</h3>
          <p className="text-gray-700">
            Simply click on any test in the "Available Tests" section. The test will begin immediately with a timer.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Can I review my past performance?</h3>
          <p className="text-gray-700">
            Yes! Your completed tests and scores appear in the "Your History" section. Use this to track your progress.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">How should I prepare?</h3>
          <p className="text-gray-700">
            Review your past mistakes. Focus on subjects where you scored lower. Practice under realistic time limits.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Can I improve my performance?</h3>
          <p className="text-gray-700">
            Absolutely. Practice consistently, understand the solutions, and manage your time wisely during each test.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">What is the purpose of this platform?</h3>
          <p className="text-gray-700">
            This platform helps you simulate real exams, measure progress, and build confidence through repeated practice.
          </p>
        </div>
      </div>

      <h3 className="mt-6 text-xl font-semibold text-center">✨ Quick Success Tips</h3>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>Stay consistent with practice.</li>
        <li>Track your weak areas and focus on them.</li>
        <li>Take timed tests to improve speed and accuracy.</li>
        <li>Review explanations for every mistake.</li>
        <li>Stay calm and confident during your tests.</li>
      </ul>
    </div>
  );
}