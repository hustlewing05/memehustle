const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// 🌐 Supabase + Gemini setup
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

// ✅ Root test route
app.get('/', (req, res) => {
  res.send('🚀 MemeHustle backend is running!');
});

// ✅ GET all memes (sorted by upvotes)
app.get('/memes', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('memes')
      .select('*')
      .order('upvotes', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('❌ Error fetching memes:', err);
    res.status(500).json({ error: 'Failed to fetch memes' });
  }
});

// ✅ Create a new meme
app.post('/memes', async (req, res) => {
  try {
    const meme = req.body;
    const { data, error } = await supabase.from('memes').insert([meme]);

    if (error) throw error;

    io.emit('newMeme', data[0]);
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('❌ Error creating meme:', err);
    res.status(500).json({ error: 'Failed to create meme' });
  }
});

// ✅ Vote a meme (up/down)
app.post('/memes/:id/vote', async (req, res) => {
  const { id } = req.params;
  const { type } = req.body;

  try {
    const { data: current } = await supabase
      .from('memes')
      .select('upvotes')
      .eq('id', id)
      .single();

    const currentUpvotes = current?.upvotes || 0;
    const updatedUpvotes = type === 'up' ? currentUpvotes + 1 : currentUpvotes - 1;

    const { data, error } = await supabase
      .from('memes')
      .update({ upvotes: updatedUpvotes })
      .eq('id', id)
      .select();

    if (error) throw error;

    io.emit('vote_update', data[0]);
    res.json(data[0]);
  } catch (err) {
    console.error('❌ Error voting:', err);
    res.status(500).json({ error: 'Failed to vote' });
  }
});

// ✅ Generate caption + vibe via Gemini
app.post('/memes/:id/caption', async (req, res) => {
  const { id } = req.params;
  const { tags } = req.body;

  try {
    const prompt = `Write a short meme caption and vibe for these tags: ${tags?.join(', ')}`;
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const captionMatch = text.match(/caption[:\-]?\s*(.*)/i);
    const vibeMatch = text.match(/vibe[:\-]?\s*(.*)/i);

    const caption = captionMatch ? captionMatch[1].trim() : 'No caption';
    const vibe = vibeMatch ? vibeMatch[1].trim() : 'No vibe';

    const { data, error } = await supabase
      .from('memes')
      .update({ caption, vibe })
      .eq('id', id)
      .select();

    if (error) throw error;

    res.json(data[0]);
  } catch (err) {
    console.error('❌ Gemini error:', err);
    res.status(500).json({ error: 'Failed to generate caption/vibe' });
  }
});

// ✅ Place bid on meme
app.post('/memes/:id/bid', async (req, res) => {
  const { id } = req.params;
  const { credits } = req.body;

  try {
    const { error } = await supabase.from('bids').insert([{ meme_id: id, credits }]);

    if (error) throw error;

    io.emit('bid_update', { meme_id: id, credits });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('❌ Bid error:', err);
    res.status(500).json({ error: 'Failed to place bid' });
  }
});

// ✅ WebSocket connect
io.on('connection', (socket) => {
  console.log('⚡ New client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// ✅ Start backend server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
