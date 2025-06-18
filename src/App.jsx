import React, { useEffect, useState } from 'react';
import MemeForm from './components/MemeForm';
import MemeGallery from './components/MemeGallery';
import { fetchLeaderboard } from './services/api';

function App() {
  const [memes, setMemes] = useState([]);

  const fetchMemes = async () => {
    try {
      const res = await fetchLeaderboard();
      setMemes(res.data || []);
    } catch (err) {
      console.error("❌ Error fetching memes:", err);
    }
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  return (
    <div className="bg-black min-h-screen py-8">
      <h1 className="text-4xl text-center font-bold text-white mb-6">🚀 MemeHustle</h1>
      <MemeForm onMemeCreated={fetchMemes} />
      <MemeGallery memes={memes} refreshMemes={fetchMemes} />
    </div>
  );
}

export default App;
