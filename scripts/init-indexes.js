db = db.getSiblingDB('mongodb'); // Assegura que estamos no DB correto

// 1. Otimiza filtro por nível de erro (Index Simples)
db.logs.createIndex(
   { "level": 1 }, 
   { name: "idx_level" }
);

// 2. Otimiza filtro por serviço de origem (Index Simples)
db.logs.createIndex(
   { "service": 1 }, 
   { name: "idx_service" }
);

// 3. TTL Index para Limpeza Automática (ExpireAfterSeconds)
// Os documentos serão removidos 30 dias após o valor do campo 'timestamp'
db.logs.createIndex(
   { "timestamp": 1 }, 
   { expireAfterSeconds: 2592000 }, // 30 dias em segundos (30 * 24 * 60 * 60)
   { name: "idx_ttl_timestamp" }
);

print("✅ Índices criados na coleção 'logs' do banco 'mongodb'.");