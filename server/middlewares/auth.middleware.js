/**
 * Single Sign-On (SSO) Auth Middleware
 * Memeriksa Bearer Token JWT agar user yang login di satu domain dapat dikenali di domain lain.
 */
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'devorme_secret_key_2026';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Akses ditolak: Token autentikasi tidak ditemukan. Silakan login admin terlebih dahulu.'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Token autentikasi tidak valid atau telah kedaluwarsa.'
    });
  }
};


module.exports = {
  verifyToken
};
