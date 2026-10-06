/**
 * ============================================================================
 * DEVORME BACKEND API SERVER
 * Master Entry Point untuk Centralized Server & Database Ekosistem Multi-Domain
 * ============================================================================
 */
const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const apiRoutes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    // Izinkan requests tanpa origin (misal mobile app / curl) atau yang masuk whitelist
    if (!origin || env.ALLOWED_ORIGINS.indexOf(origin) !== -1 || env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Akses diblokir oleh CORS Policy Devorme Server'));
    }
  },
  credentials: true
}));

const path = require('path');

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


// Request Logger sederhana (bermanfaat untuk programmer)
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Root Welcome Endpoint
app.get('/', (req, res) => {
  res.json({
    message: "Selamat Datang di Devorme Central Server & API Gateway",
    documentation: "/api/v1/health",
    version: "1.0.0"
  });
});

// Mount Master API Router (fleksibel untuk berbagai konfigurasi Nginx proxy)
app.use('/api/v1', apiRoutes);
app.use('/api', apiRoutes);
app.use('/v1', apiRoutes);
app.use('/', apiRoutes);

// 404 Handler untuk route yang tidak ditemukan
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint '${req.originalUrl}' tidak ditemukan pada server API Devorme.`
  });
});

// Global Error Handler
app.use(errorHandler);

// Jalankan Server
app.listen(env.PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 DEVORME CENTRAL API SERVER BERJALAN`);
  console.log(`📡 URL API Server: http://localhost:${env.PORT}`);
  console.log(`🔗 Health Check: http://localhost:${env.PORT}/api/v1/health`);
  console.log(`📦 Status DB: Terhubung ke Database Server Terpusat`);
  console.log(`======================================================\n`);
});
