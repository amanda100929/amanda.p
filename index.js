// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/quizapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch((err) => {
  console.error('Erro de conexão:', err);
});

// Rotas
const userRoutes = require('./routes/userRoutes');
const rankRoutes = require('./routes/rankRoutes');
app.use('/api/users', userRoutes);
app.use('/api/rank', rankRoutes);

// Iniciar o servidor
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
