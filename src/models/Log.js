import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
  // Nível do erro (INFO, ERROR, CRITICAL)
  level: { 
    type: String, 
    required: true,
    index: true, // índice para busca rápida (Tunning)
    uppercase: true,
    enum: ['INFO', 'WARNING', 'ERROR', 'CRITICAL'] // Validação básica
  },

  // Serviço ou componente que gerou o log
  service: { 
    type: String, 
    required: true, 
    index: true // Cria índice para busca rápida
  },

  // Mensagem do log
  message: { 
    type: String, 
    required: true 
  },

  // Dados adicionais (opcional)
  // Usamos Mixed para permitir qualquer estrutura de dados
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },

  // Data do evento
  timestamp: {
    type: Date,
    default: Date.now,
  }
}, {
  // Configurações extras do Mongoose
  timestamps: true // Cria createdAt e updatedAt automaticamente
});

// Índice TTL para expiração automática dos logs após 30 dias (2592000 segundos)
LogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 2592000 });

export default mongoose.model('Log', LogSchema);