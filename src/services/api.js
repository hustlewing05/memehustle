import axios from 'axios';

const baseURL = 'http://localhost:5000'; // ✅ Keep this for local OR change to Render/Vercel URL on deployment

export const createMeme = (data) => axios.post(`${baseURL}/memes`, data);

export const fetchLeaderboard = () =>
  axios.get(`${baseURL}/leaderboard?top=10`);

export const voteMeme = (id, type) =>
  axios.post(`${baseURL}/memes/${id}/vote`, { type });

export const generateCaption = (id, tags) =>
  axios.post(`${baseURL}/memes/${id}/caption`, { tags });

export const bidOnMeme = (id, credits) =>
  axios.post(`${baseURL}/memes/${id}/bid`, { credits });
