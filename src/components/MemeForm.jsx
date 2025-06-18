import React, { useState } from 'react';
import { createMeme } from '../services/api';

const MemeForm = ({ onMemeCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    tags: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const tagArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    try {
      const res = await createMeme({
        title: formData.title.trim(),
        image_url: formData.image_url.trim() || 'https://picsum.photos/200',
        tags: tagArray
      });

      if (onMemeCreated) {
  onMemeCreated(); // refetch full meme list from backend
}

      // Reset form
      setFormData({ title: '', image_url: '', tags: '' });
    } catch (err) {
      console.error('❌ Meme submit error:', err);
      alert('❌ Failed to create meme. Please check console for error.');
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0f0f0f] p-6 rounded-xl shadow-2xl text-white w-full max-w-xl mx-auto mb-8 border border-pink-500"
    >
      <h2 className="text-2xl font-bold mb-4 text-pink-400">Create a Meme 🚀</h2>

      <input
        type="text"
        name="title"
        placeholder="Meme title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 mb-3 bg-[#1f1f1f] border border-pink-400 rounded text-white"
        required
      />

      <input
        type="text"
        name="image_url"
        placeholder="Image URL (optional)"
        value={formData.image_url}
        onChange={handleChange}
        className="w-full p-2 mb-3 bg-[#1f1f1f] border border-pink-400 rounded text-white"
      />

      <input
        type="text"
        name="tags"
        placeholder="Tags (comma-separated)"
        value={formData.tags}
        onChange={handleChange}
        className="w-full p-2 mb-3 bg-[#1f1f1f] border border-pink-400 rounded text-white"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-pink-500 to-purple-700 py-2 px-4 rounded-lg hover:scale-105 transition-all w-full"
      >
        {loading ? 'Uploading...' : 'Create Meme 🎨'}
      </button>
    </form>
  );
};

export default MemeForm;
