import React from 'react';
export default function QuestionCard({ q, selected, onSelect, index }) {
  return (
    <div className="p-4 border rounded">
      <h3 className="mb-2"><strong>Q{index + 1}:</strong> {q.question}</h3>
      {q.options.map((opt, i) => (
        <button key={i} className={`block w-full text-left p-2 mb-1 border ${selected===i? 'bg-blue-200':''}`} onClick={()=>onSelect(i)}>
          {opt}
        </button>
      ))}
    </div>
  );
}