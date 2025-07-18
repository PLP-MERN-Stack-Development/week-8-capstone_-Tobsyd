import React, { useState } from 'react';

const faqs = [
    {
        question: 'How do I start a test?',
        answer: 'Simply click on any test in the "Available Tests" section. The test will begin immediately with a timer.',
    },
    {
        question: 'Can I review my past performance?',
        answer: 'Yes! Your completed tests and scores appear in the "Your History" section. Use this to track your progress.',
    },
    {
        question: 'How should I prepare?',
        answer: 'Review your past mistakes. Focus on subjects where you scored lower. Practice under realistic time limits.',
    },
    {
        question: 'Can I improve my performance?',
        answer: 'Absolutely. Practice consistently, understand the solutions, and manage your time wisely during each test.',
    },
    {
        question: 'What is the purpose of this platform?',
        answer: 'This platform helps you simulate real exams, measure progress, and build confidence through repeated practice.',
    },
];

export default function FAQsAccordion() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="bg-white rounded p-6 shadow mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">❓ FAQs (Click to Expand)</h2>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border rounded">
                        <button
                            className="w-full text-left p-4 font-semibold flex justify-between items-center"
                            onClick={() => toggle(index)}
                        >
                            {faq.question}
                            <span>{activeIndex === index ? '−' : '+'}</span>
                        </button>
                        {activeIndex === index && (
                            <div className="p-4 border-t text-gray-700">{faq.answer}</div>
                        )}
                    </div>
                ))}
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