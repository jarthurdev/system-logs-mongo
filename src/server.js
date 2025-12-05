// src/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logRoutes from './routes.js';
import connect from './db.js';

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
console.log('Teste de conecção ao MongoDB');

connect().catch(err => {
  // Erro já logado em `src/db.js`
});

// --- Inicialização do Servidor ---
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});