/**
 * Konfigurasi Terpusat Variabel Lingkungan (Environment Config)
 * Memastikan semua variabel sistem tervalidasi dengan nilai default yang aman.
 */
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB: {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.DB_PORT || 3306,
    USER: process.env.DB_USER || 'devorme',
    PASSWORD: process.env.DB_PASSWORD || 'Jazman@271998',
    NAME: process.env.DB_NAME || 'devorme'
  },
  JWT: {
    SECRET: process.env.JWT_SECRET || 'devorme_secret_key_default',
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d'
  },
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:5173', 'http://localhost:3000']
};
