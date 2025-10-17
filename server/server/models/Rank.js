// server/models/Rank.js
const mongoose = require('mongoose');

const rankSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
});

module.exports = mongoose.model('Rank', rankSchema);
