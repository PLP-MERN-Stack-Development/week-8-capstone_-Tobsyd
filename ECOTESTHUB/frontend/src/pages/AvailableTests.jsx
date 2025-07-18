import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api'; // Adjust path to your API helper if needed

export default function AvailableTests() {
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [search, setSearch] = useState({ title: '', year: '', subject: '' });

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const { data } = await API.get('/tests'); // Ensure your backend route exists
        setTests(data);
        setFilteredTests(data);
      } catch (err) {
        console.error('Failed to fetch tests:', err);
      }
    };
    fetchTests();
  }, []);

  const handleSearch = () => {
    const { title, year, subject } = search;
    const filtered = tests.filter(test =>
      test.title.toLowerCase().includes(title.toLowerCase()) &&
      year? test.year?.toString()===year: true &&
      test.subject.toLowerCase().includes(subject.toLowerCase())
    );
    setFilteredTests(filtered);
  };

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">📋 Available Tests</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          name="title"
          value={search.title}
          onChange={handleChange}
          placeholder="Search by Title"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="year"
          value={search.year}
          onChange={handleChange}
          placeholder="Search by Year"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="subject"
          value={search.subject}
          onChange={handleChange}
          placeholder="Search by Subject"
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={handleSearch}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>

      <div className="space-y-3">
        {filteredTests.length === 0 ? (
          <p>No tests found matching your criteria.</p>
        ) : (
          filteredTests.map((test) => (
            <Link
              key={test._id}
              to={`/test/${test._id}`}
              className="block p-4 border rounded hover:bg-gray-50 transition"
            >
              <h3 className="font-semibold">{test.title}</h3>
              <p className="text-sm text-gray-600">Year: {test.year} | Subject: {test.subject}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}