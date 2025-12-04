// src/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import logRoutes from './routes.js';

// Carrega variáveis de ambiente
dotenv.config();

const app = express();

// Middlewares
// Permite receber JSON no corpo das requisições
app.use(express.json());
app.use(cors());

// Rotas
app.use('/logs', logRoutes);

// Tenta pegar do .env, senão usa localhost (para rodar híbrido)
const MONGO_URI = process.env.ME_CONFIG_MONGODB_URL || 
                  `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017/logs_db?authSource=admin`;

console.log('Teste de conecção ao MongoDB');

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Conectado com Sucesso!'))
  .catch(err => {
    console.error('Erro ao conectar no MongoDB:', err);
  });

// --- Rota de Teste (Health Check) ---
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'System Logs API rodando com sucesso!',
    documentation: '/docs (pendente)'
  });
});

// --- Inicialização do Servidor ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});