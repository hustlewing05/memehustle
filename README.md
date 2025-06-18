# 🧠 MemeHustle - Meme Bidding Platform

> A real-time meme marketplace where users can upload memes, generate captions using AI, bid on memes, and vote for their favorites — all in a stylish cyberpunk theme.

---

## 🌐 Live Demo

🚀 [Click here to view the live app](https://memehustle-frontend.netlify.app)  
🧑‍💻 [View the source code on GitHub](https://github.com/hustlewing05/memehustle)

---

## 📸 Preview

![MemeHustle Screenshot](./screenshots/gallery.png)
> Live meme gallery with upvotes, bidding, and vibes.

---

## ✨ Features

- 🎨 Meme Upload :Add and share memes with the world
- 🧠 AI Caption Generator :Uses Google Gemini API to generate fun, engaging captions and vibe descriptions
- 💸 Live Bidding System : Bid on memes in real time using Socket.io
- 📈 Upvotes & Popularity Tracking
- 🔐 Supabase Backend : Meme & bid storage with real-time updates
- 🕶️ Cyberpunk UI : Clean, modern design inspired by cyberpunk colors

---

## 🏗️ Tech Stack

| Frontend       | Backend         | AI & DB           |
|----------------|------------------|-------------------|
| React + Vite   | Node.js + Express | Supabase (PostgreSQL) |
| Tailwind CSS   | Socket.io         | Google Gemini API |

---

## 🧠 How It Works

- Users upload a meme → caption + vibe is auto-generated using Gemini
- Anyone can bid on memes in real-time
- Highest bid is shown instantly
- Everyone can upvote memes they like
- Backend handles meme storage, bidding, and broadcasting events

---

## ⚙️ Local Setup

```bash
# Clone the repo
git clone https://github.com/hustlewing05/memehustle.git
cd memehustle

# Setup frontend
cd frontend
npm install
npm run dev

# Setup backend (in another terminal)
cd ../backend
npm install
node index.js
