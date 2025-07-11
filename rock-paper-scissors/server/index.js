const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();

// ✅ CORS Setup
app.use(cors({
  origin: [
    'https://rock-paper-scissor-2ph08g22c-nageswararao198s-projects.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));

app.use(express.json()); // ✅ Body parser

// ✅ Routes
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);

// ✅ DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// ✅ Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
