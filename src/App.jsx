
import React, { useState, useEffect } from 'react';

export default function App() {
  const [form, setForm] = useState({
    role: '',
    subject: '',
    audience: '',
    style: 'رسمي',
    constraints: '',
    improve: false,
    lang: 'ar'
  });
  const [prompt, setPrompt] = useState('');
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('prompts');
    if (stored) setSaved(JSON.parse(stored));
  }, []);

  const generatePrompt = () => {
    const { role, subject, audience, style, constraints, improve, lang } = form;
    let prompt = '';

    if (lang === 'ar') {
      prompt = `أنت ${role}. المطلوب: ${subject}. بأسلوب ${style} مناسب لـ ${audience}.`;
      if (constraints) prompt += ` تأكد من أن الشرح يتبع القيد التالي: ${constraints}.`;
      if (improve) prompt += ` يُفضّل إعادة صياغة السؤال لجعله أكثر وضوحًا قبل الإجابة.`;
    } else {
      prompt = `You are a ${role}. Your task is: ${subject}. Use a ${style} style suitable for ${audience}.`;
      if (constraints) prompt += ` Make sure to follow this constraint: ${constraints}.`;
      if (improve) prompt += ` It is preferred to rephrase the question to make it clearer before answering.`;
    }

    setPrompt(prompt);
  };

  const savePrompt = () => {
    const updated = [...saved, prompt];
    setSaved(updated);
    localStorage.setItem('prompts', JSON.stringify(updated));
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    alert(form.lang === 'ar' ? 'تم نسخ البرومبت' : 'Prompt copied!');
  };

  const updateField = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const isArabic = form.lang === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';
  const align = isArabic ? 'text-right' : 'text-left';

  return (
    <div className={`min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 py-10 px-4 ${align}`} dir={dir}>
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-10 border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-700 tracking-tight">{isArabic ? '🔑 مفتاح الأسرار' : '🔑 Key of Secrets'}</h1>
          <select name="lang" value={form.lang} onChange={updateField} className="border border-indigo-300 px-3 py-1.5 rounded-full text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">{isArabic ? 'الدور' : 'Role'}</label>
            <input name="role" onChange={updateField} placeholder={isArabic ? 'مثال: خبير تقني، مبرمج، شاعر...' : 'e.g., Technical expert, programmer, poet...'} className="mt-1 border border-gray-300 p-2 w-full rounded-xl focus:ring-2 focus:ring-indigo-300" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">{isArabic ? 'الموضوع' : 'Subject'}</label>
            <input name="subject" onChange={updateField} placeholder={isArabic ? 'ما الذي تحتاج أن يفعله؟ مثال: شرح خطوات تثبيت ويندوز' : 'e.g., explain Windows installation'} className="mt-1 border border-gray-300 p-2 w-full rounded-xl focus:ring-2 focus:ring-indigo-300" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">{isArabic ? 'الجمهور المستهدف' : 'Audience'}</label>
            <select name="audience" onChange={updateField} className="mt-1 border border-gray-300 p-2 w-full rounded-xl focus:ring-2 focus:ring-indigo-300">
              <option value="">{isArabic ? '-- اختر --' : '-- Select --'}</option>
              <option value={isArabic ? 'مبتدئ' : 'Beginner'}>{isArabic ? 'مبتدئ' : 'Beginner'}</option>
              <option value={isArabic ? 'محترف' : 'Professional'}>{isArabic ? 'محترف' : 'Professional'}</option>
              <option value={isArabic ? 'رائد أعمال' : 'Entrepreneur'}>{isArabic ? 'رائد أعمال' : 'Entrepreneur'}</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">{isArabic ? 'نمط الشرح' : 'Style'}</label>
            <select name="style" onChange={updateField} className="mt-1 border border-gray-300 p-2 w-full rounded-xl focus:ring-2 focus:ring-indigo-300">
              <option value={isArabic ? 'رسمي' : 'Formal'}>{isArabic ? 'رسمي' : 'Formal'}</option>
              <option value={isArabic ? 'ودي' : 'Friendly'}>{isArabic ? 'ودي' : 'Friendly'}</option>
              <option value={isArabic ? 'عملي' : 'Practical'}>{isArabic ? 'عملي' : 'Practical'}</option>
              <option value={isArabic ? 'مبسط' : 'Simple'}>{isArabic ? 'مبسط' : 'Simple'}</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">{isArabic ? 'قيود (اختياري)' : 'Constraints (Optional)'}</label>
            <input name="constraints" onChange={updateField} placeholder={isArabic ? 'شروط أو حدود خاصة (اختياري)' : 'Any specific constraints (optional)'} className="mt-1 border border-gray-300 p-2 w-full rounded-xl focus:ring-2 focus:ring-indigo-300" />
          </div>

          <div className="md:col-span-2 flex items-center">
            <input type="checkbox" name="improve" onChange={updateField} className="mr-2 w-4 h-4" />
            <span className="text-sm text-gray-700">{isArabic ? 'تحسين وضوح السؤال؟' : 'Improve clarity of question?'}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-8">
          <button onClick={generatePrompt} className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-full shadow-lg">
            {isArabic ? '🔍 توليد البرومبت' : '🔍 Generate Prompt'}
          </button>
          <button onClick={savePrompt} className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-full shadow-lg">
            {isArabic ? '💾 حفظ' : '💾 Save'}
          </button>
          <button onClick={copyPrompt} className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-full shadow-lg">
            {isArabic ? '📋 نسخ' : '📋 Copy'}
          </button>
          <button onClick={() => window.open(`https://chat.openai.com/?model=gpt-4&prompt=${encodeURIComponent(prompt)}`, '_blank')}
            className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-full shadow-lg">
            {isArabic ? '🚀 افتح في شات جي بي تي' : '🚀 Open in ChatGPT'}
          </button>
        </div>

        <textarea value={prompt} readOnly className="block w-full h-40 mt-6 border border-gray-300 p-4 rounded-xl bg-gray-50 text-gray-800" />

        <h2 className="mt-8 text-xl font-semibold text-indigo-700">{isArabic ? 'المحفوظات' : 'Saved Prompts'}</h2>
        <ul className="list-disc pl-5 text-sm mt-2 text-gray-700">
          {saved.map((p, i) => <li key={i} className="mb-1">{p}</li>)}
        </ul>
      </div>
    </div>
  );
}
