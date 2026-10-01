/**
 * Database Connection Pool (MySQL 8.0+)
 * Terhubung ke Database Server Terpusat 'devorme_master'
 */
const env = require('./env');
let pool = null;
let isMySqlAvailable = false;

try {
  const mysql = require('mysql2/promise');
  pool = mysql.createPool({
    host: env.DB.HOST || 'localhost',
    port: env.DB.PORT || 3306,
    user: env.DB.USER || 'root',
    password: env.DB.PASSWORD || '',
    database: env.DB.NAME || 'devorme_master',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // Uji koneksi awal
  pool.getConnection()
    .then((conn) => {
      isMySqlAvailable = true;
      console.log(`[MySQL Server] Berhasil terhubung ke database: ${env.DB.NAME} (${env.DB.HOST}:${env.DB.PORT || 3306})`);
      conn.release();
    })
    .catch((err) => {
      console.warn(`[MySQL Server Warning] MySQL belum aktif (${err.message}). Menggunakan In-Memory Mock Database agar server tetap berjalan lancar.`);
    });
} catch (e) {
  console.warn(`[MySQL Server Warning] Driver mysql2 belum diinstall (npm install). Menggunakan fallback memory.`);
}

/**
 * Helper execute query yang aman (mencegah SQL Injection via Prepared Statements)
 */
const execute = async (sql, params = []) => {
  if (isMySqlAvailable && pool) {
    const [rows] = await pool.execute(sql, params);
    return rows;
  }
  return null; // Fallback jika MySQL belum running
};

module.exports = {
  pool,
  execute,
  isMySqlAvailable: () => isMySqlAvailable,
  status: {
    engine: 'MySQL 8.0+',
    host: env.DB.HOST,
    database: env.DB.NAME
  }
};
