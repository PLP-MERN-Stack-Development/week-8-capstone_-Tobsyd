import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/layouts/Navbar';
import SideMenu from '../components/layouts/SideMenu';
export default function History({ activeMenu }) {
  const [hist, setHist] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await API.get('/results'); //Ensure route exists
        setHist(data);
      } catch (err) {
        setError('Failed to load history');
        console.error('Failed to fetch results', err);
      }
    };
    fetchResults();
  }, []);
  return (
    <div className="p-4 block">
      <Navbar activeMenu={activeMenu} />
      <div className='flex'>
        <div className="max-[1080px]:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
        <div className='grow m-5'>
          <h1 className="text-2xl font-bold mb-4 text-center">Test History</h1>
          {error && <div className='text-red-500'>{error}</div>}
          {hist.length === 0 ? (
            <p>No test results found.</p>
          ) : (
            <ul className="space-y-4">
              {hist.map((r, i) => (
                <li key={i} className="p-4 border rounded">
                  <p><strong> Test:</strong>{r.test?.title || 'Untitled'}</p>
                  <p><strong>Score:</strong>{r.score}</p>
                  <p><strong>Date:</strong>{new Date(r.takenAt).toLocaleString()}</p>

                  <div className='mt-4 space-y-2'>
                    <p className="font-semibold">Correct Answers:</p>
                    {r.test?.questions?.map((q, idx) => (
                      <div key={idx} className='bg-gray-100 p-2 rounded'>
                        <p><strong>Q{idx + 1}</strong> {q.question}</p>
                        <p><strong>Correct Answer:</strong>{q.options[q.correctIndex]}</p>
                      </div>
                    ))}
                  </div>
                </li>

              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}