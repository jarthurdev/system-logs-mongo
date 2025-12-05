// src/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017/logs_db?authSource=admin` || process.env.ME_CONFIG_MONGODB_URL;

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Conectado com Sucesso!');
  } catch (err) {
    console.error('Erro ao conectar no MongoDB:', err);
    throw err;
  }
};

export default connect;
export { connect };
