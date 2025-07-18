import React, { useState } from 'react';
import API from '../services/api';
import Navbar from '../components/layouts/Navbar';
import SideMenu from '../components/layouts/SideMenu';
import { useAuth } from '../context/AuthContext';
export default function Admin({ activeMenu }) {
  // const [form, setForm] = useState({ title:'',subject:'WAEC',year:new Date().getFullYear(),
  //   duration:30,questions:[] });

  const {user}= useAuth;
  console.log(user);
  const [testInfo, setTestInfo] = useState({
    title: '', subject: 'WAEC', year: new Date().getFullYear(),
    duration: 30
  });
  const [question, setQuestion] = useState({ question: '', options: ['', '', '', ''], correctIndex: 0 });
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState('')

  //Handle test-level fields
  const handleTestChange = (e) => {
    setTestInfo({ ...testInfo, [e.target.name]: e.target.value })
  }

  //Handle question fields
  const handleQuestionChange = (e, index = null) => {
    if (index !== null) {
      const updated = [...question.options];
      updated[index] = e.target.value;
      setQuestion({ ...question, options: updated });
    } else {
      setQuestion({ ...question, [e.target.name]: e.target.value });
    }
  };

  //Add question to list
  const addQuestion = () => {
    try {
      setQuestions([...questions, question]);
      setQuestion({ question: '', options: ['', '', '', ''], correctIndex: 0 })
    } catch (err) {

    }
  }

  //Submit full test
  const submitTest = async () => {
    if(!user?.isAdmin){
      setMessage("You are not authorized to submit tests.");
      return;
    }

    console.log(user);
    try {
      const payload = {
        ...testInfo,
        duration: parseInt(testInfo.duration),
        questions,
      };
      const { data } = await API.post('/tests', payload, {withCredentials: true});
      setMessage(`Test saved: ${data.title}`);
      setQuestions([]);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to save test");
    }
  }

  // const addQ = () => {
  //   setForm({ ...form, questions: [...form.questions, q] });
  //   setQ({ question: '', options: ['', ''], correctIndex: 0 });
  // };
  // const [error, setError]= useState();
  // const submit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await API.post('/tests', form);
  //     alert('Test created');
  //   } catch (err) {
  //      setError(
  //       err?.response?.data?.message || 'Error in Adding Questions')
  //   }
  // };
  return (
    
      <div className="max-w-3xl mx-auto p-4">

        <Navbar activeMenu={activeMenu} />

        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow m-5">
            <h2 className="text-2xl font-bold mb-4">Create New Test</h2>

            {/* Test Info Form */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {['title', 'subject', 'year', 'duration'].map((field) => (
                <input
                  key={field}
                  name={field}
                  placeholder={field}
                  value={testInfo[field]}
                  onChange={handleTestChange}
                  className="border p-2 rounded"
                />
              ))}
            </div>

            {/* Add a Question */}
            <div className="mb-4 border p-4 rounded">
              <input
                type="text"
                name="question"
                placeholder="Question"
                value={question.question}
                onChange={(e) => handleQuestionChange(e)}
                className="w-full border p-2 mb-2"
              />
              {question.options.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => handleQuestionChange(e, i)}
                  className="w-full border p-2 mb-1"
                />
              ))}
              <input
                type="number"
                name="correctIndex"
                placeholder="Correct Option Index (0-3)"
                value={question.correctIndex}
                onChange={(e) => handleQuestionChange(e)}
                className="w-full border p-2 mb-2"
              />
              <button
                onClick={addQuestion}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                ➕ Add Question
              </button>
            </div>

            {/* Live Preview */}
            <h3 className="font-bold mb-2">📝 Preview Questions</h3>
            <div className="space-y-2">
              {questions.map((q, idx) => (
                <div key={idx} className="border p-3 rounded bg-gray-50">
                  <strong>Q{idx + 1}:</strong> {q.question}
                  <ul className="ml-5 list-disc">
                    {q.options.map((opt, i) => (
                      <li key={i} className={i === q.correctIndex ? 'text-green-600 font-semibold' : ''}>
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Submit Test */}
            <div className="mt-6">
              <button
                onClick={submitTest}
                className="bg-blue-700 text-white px-6 py-2 rounded"
              >
                📤 Save Test to Database
              </button>
              {message && <p className="mt-2 text-red-500">{message}</p>}
            </div>
          </div>
        </div>
      </div>
  );
}