import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import Navbar from '../components/layouts/Navbar';
import SideMenu from '../components/layouts/SideMenu';
// import FAQsAndTips from './FAQsAndTips';
import AvailableTests from './AvailableTests';
import FAQsAccordion from './FAQAccordion';
export default function Dashboard({ activeMenu }) {
  // const [tests, setTests] = useState([]);
  // useEffect(() => { API.get('/tests').then(res => setTests(res.data)); }, []);
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
          {/* <h2 className="text-2xl font-bold mb-4 text-center">📚 Available Tests</h2>
          <ul className="text-sm  text-green-700 dark:text-green-300 w-full">
            {tests.map(t => <li key={t._id}><Link className='bg-blue-50' to={`/test/${t._id}`}>{t.title}</Link></li>)}
          </ul>
          <Link to="/history">History</Link> */}

          <AvailableTests/>

          <FAQsAccordion/>
        </div>
      </div>
    </div>

  );
}

// const [eligible, setEligible] = useState({});
// useEffect(() => {
//   tests.forEach(t => API.get(`/tests/${t._id}`).then(
//     () => setEligible(e => ({ ...e, [t._id]: true })),
//     () => setEligible(e => ({ ...e, [t._id]: false }))
//   ));
// }, [tests]);

// // In JSX list
// {tests.map(t => (
//   <li key={t._id}>
//     {eligible[t._id]
//       ? <Link to={`/test/${t._id}`}>{t.title} ({t.year})</Link>
//       : <span className="text-gray-400">{t.title} ({t.year}) - Upgrade to access</span>
//     }
//   </li>
// ))}

// import React, { useEffect, useState } from 'react';
// import API from '../services/api';
// import { useNavigate } from 'react-router-dom';

// export default function UserDashboard() {
//   const [tests, setTests] = useState([]);
//   const [search, setSearch] = useState('');
//   const [yearFilter, setYearFilter] = useState('');
//   const [history, setHistory] = useState([]);
//   const nav = useNavigate();

//   useEffect(() => {
//     fetchTests();
//     fetchHistory();
//   }, []);

//   const fetchTests = async () => {
//     const { data } = await API.get('/tests');
//     setTests(data);
//   };

//   const fetchHistory = async () => {
//     const { data } = await API.get('/results/history');
//     setHistory(data);
//   };

//   const isCompleted = (testId) => {
//     return history.some((h) => h.test._id === testId);
//   };

//   const filteredTests = tests.filter((t) => {
//     const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
//     const matchesYear = yearFilter ? t.year === yearFilter : true;
//     return matchesSearch && matchesYear;
//   });

//   const uniqueYears = [...new Set(tests.map((t) => t.year))];

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">📚 Available Tests</h2>

//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Search by title..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border p-2 rounded w-1/2"
//         />
//         <select
//           value={yearFilter}
//           onChange={(e) => setYearFilter(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">All Years</option>
//           {uniqueYears.map((year) => (
//             <option key={year} value={year}>{year}</option>
//           ))}
//         </select>
//       </div>

//       <div className="space-y-3">
//         {filteredTests.map((test) => (
//           <div key={test._id} className="border p-4 rounded flex justify-between items-center">
//             <div>
//               <h3 className="font-semibold">{test.title} ({test.subject})</h3>
//               <p className="text-gray-500">Year: {test.year} | Duration: {test.duration} min</p>
//             </div>
//             <div className="flex items-center gap-4">
//               {isCompleted(test._id) ? (
//                 <span className="text-green-600 font-semibold">Completed</span>
//               ) : (
//                 <button
//                   onClick={() => nav(/test/${test._id})}
//                   className="bg-blue-600 text-white px-4 py-1 rounded"
//                 >
//                   Start Test
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       <h2 className="text-xl font-bold mt-10">📝 Your History</h2>
//       <div className="space-y-2 mt-2">
//         {history.map((h, idx) => (
//           <div key={idx} className="border p-3 rounded bg-gray-50">
//             <strong>{h.test.title}</strong> - Score: {h.score || 'N/A'}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }