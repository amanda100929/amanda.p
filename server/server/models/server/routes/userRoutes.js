// server/routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Registrar um novo usuário
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Usuário já existe' });

    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar' });
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Senha incorreta' });

    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

module.exports = router;
