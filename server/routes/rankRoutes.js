// server/routes/rankRoutes.js
const express = require('express');
const Rank = require('../models/Rank');
const router = express.Router();

// Obter o ranking global
router.get('/', async (req, res) => {
  try {
    const ranks = await Rank.find().sort({ score: -1 }).limit(10); // Top 10
    res.json(ranks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar ranking' });
  }
});

// Atualizar o ranking após um quiz
router.post('/update', async (req, res) => {
  const { username, score } = req.body;
  try {
    let rank = await Rank.findOne({ username });
    if (rank) {
      rank.score = Math.max(rank.score, score);  // Atualiza apenas se for maior
    } else {
      rank = new Rank({ username, score });
    }
    await rank.save();
    res.json({ message: 'Rank atualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar ranking' });
  }
});

module.exports = router;
