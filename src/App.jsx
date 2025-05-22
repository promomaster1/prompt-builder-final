
import React, { useState } from 'react';

export default function App() {
  const [prompt, setPrompt] = useState('');

  const generatePrompt = () => {
    setPrompt("أنت مساعد ذكي. المطلوب: صِف المهمة المطلوبة بدقة.");
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">🔑 مفتاح الأسرار</h1>
      <button onClick={generatePrompt} className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-full">
        توليد البرومبت
      </button>
      <textarea value={prompt} readOnly className="block w-full h-40 mt-4 border p-2 rounded" />
    </div>
  );
}
