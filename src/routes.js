import express from 'express';
import Log from './models/Log.js'; 

const router = express.Router();

// Criação de um novo log
router.post('/', async (req, res) => {
  try {
    const { level, service, message, metadata } = req.body;
    
    // Cria o log no banco
    const newLog = await Log.create({
      level,
      service,
      message,
      metadata // Se não vier nada, salva como objeto vazio {}
    });

    res.status(201).json(newLog);
  } catch (error) {
    // Se faltar campo obrigatório (required), cai aqui
    res.status(400).json({ error: 'Erro ao salvar log', details: error.message });
  }
});

// Listagem de logs com filtros opcionais
router.get('/', async (req, res) => {
  try {
    const { level, service, startDate, endDate } = req.query;
    const query = {};

    // Monta o filtro dinamicamente se o usuário passou parâmetros
    if (level) query.level = level.toUpperCase();
    if (service) query.service = service;
    
    // Filtro por intervalo de datas
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }

    // Busca os logs com os filtros aplicados, ordenados do mais recente para o mais antigo
    // Limita a 100 resultados para evitar sobrecarga
    const logs = await Log.find(query).sort({ timestamp: -1 }).limit(100);
    
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar logs' });
  }
});

// Detalhes de um log específico
router.get('/:id', async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);
    if (!log) return res.status(404).json({ error: 'Log não encontrado' });
    res.json(log);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar log' });
  }
});

// Deleção de um log específico
router.delete('/:id', async (req, res) => {
  try {
    const log = await Log.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ error: 'Log não encontrado' });
    res.json({ message: 'Log removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar log' });
  }
});

// Atualização parcial de um log específico
router.patch('/:id', async (req, res) => {
  try {
    // Atualiza apenas os campos enviados no corpo da requisição
    // Retorna o log atualizado
    const updatedLog = await Log.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedLog);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar log' });
  }
});

export default router;