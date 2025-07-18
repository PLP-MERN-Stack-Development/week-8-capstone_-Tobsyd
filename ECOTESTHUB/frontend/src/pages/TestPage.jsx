import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';
import TestTimer from '../components/TestTimer';
import QuestionCard from '../components/QuestionCard';
import SideMenu from '../components/layouts/SideMenu';
import Navbar from '../components/layouts/Navbar';
export default function TestPage({ activeMenu }) {
  const { id } = useParams();
  const nav = useNavigate();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  // useEffect(()=>{ API.get(`/tests/${id}`).then(r=>setTest(r.data)); }, [id]);
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const { data } = await API.get(`/tests/${id}`);
        setTest(data);
        setAnswers(Array(data.questions.length).fill(null));
      } catch (err) {
        console.error('Failed to load test', err)
      }
    };
    fetchTest();
  }, [id]);
  if (!test) return <p> Loading test...</p>;

  const handleSelect = (questionIndex, answerIndex) => {
    const updated = [...answers];
    updated[questionIndex] = answerIndex;
    setAnswers(updated);
  };

  //   useEffect(() => {
  //   API.get(`/tests/${id}`)
  //     .then(r => setTest(r.data))
  //     .catch(err => {
  //       if (err.response?.status === 403) {
  //         alert('Trial limit reached. Please subscribe to continue.');
  //         nav('/subscription');
  //       }
  //     });
  // }, [id]);
  const onTimeUp = () => submit();
  const submit = async (e) => {
    try {
      e.preventDefault();
      const arr = test.questions.map((_, i) =>
        typeof answers[i] !== 'undefined' ? answers[i] : null);
      await API.post('/results', { testId: id, answers: arr });

      nav('/history');
    } catch (err) {
      console.error('Failed to Submit Test', err)
    }
  };
  return (
    <div className="p-4">
      <Navbar activeMenu={activeMenu} />

      <div className='flex'>
        <div className="max-[1080px]:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>

        <div className="grow m-5">
          <h1 className="text-2xl font-bold mb-4 text-center">{test.title}</h1>
          <TestTimer duration={test.duration} onTimeUp={onTimeUp} />
          {/* <form onSubmit={submit}> */}
          {test.questions.map((q, i) => <QuestionCard key={i} q={q} index={i} selected={answers[i]}
            // onSelect={opt=>setAnswers({...answers,[i]:opt})} 
            onSelect={(index) => handleSelect(i, index)}
          />)}
          <button onClick={submit}
            type='submit'
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit</button>
        </div>
      </div>
      {/* </form> */}
    </div>
  );
}