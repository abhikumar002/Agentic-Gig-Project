'use client';
import { useState } from 'react';

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('image', image);

    const res = await fetch('/api/diagnose', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setResult(data.result || 'No output');
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">🌿 Leaf Disease Diagnosis</h1>
      <input type="file" accept="image/*" onChange={handleChange} />
      <button 
        onClick={handleSubmit}
        disabled={loading || !image}
        className="bg-green-600 text-white px-4 py-2 rounded mt-2"
      >
        {loading ? 'Analyzing...' : 'Diagnose'}
      </button>
      <pre className="mt-4 whitespace-pre-wrap text-sm bg-gray-100 p-4 rounded">{result}</pre>
    </div>
  );
}
