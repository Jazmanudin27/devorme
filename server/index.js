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
// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Serve static frontend build files from client/dist if available
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
}

// Request Logger sederhana
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes Mounting (dukung /api/v1, /api, dan /v1)
app.use('/api/v1', apiRoutes);
app.use('/api', apiRoutes);
app.use('/v1', apiRoutes);

// Health Check Endpoint singkat
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Devorme API Server Running', timestamp: new Date().toISOString() });
});

// API 404 Handler (khusus request berawalan /api atau /v1)
app.use(['/api*', '/v1*'], (req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint API '${req.originalUrl}' tidak ditemukan pada server API Devorme.`
  });
});

// SPA Client Fallback (serve index.html untuk rute frontend seperti /admin)
app.get('*', (req, res) => {
  const clientIndex = path.join(__dirname, '../client/dist/index.html');
  if (fs.existsSync(clientIndex)) {
    return res.sendFile(clientIndex);
  }
  const rootIndex = path.join(__dirname, '../index.html');
  if (fs.existsSync(rootIndex)) {
    return res.sendFile(rootIndex);
  }
  res.status(404).send('Devorme Server: Halaman tidak ditemukan.');
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
