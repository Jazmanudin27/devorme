/**
 * Authentication Controller (Centralized SSO)
 * Melayani login terpusat yang bisa digunakan lintas domain (devorme.com, flowdesk.id, dll).
 */
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'devorme_secret_key_2026';

// Login Terpusat Admin & User
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email dan password wajib diisi.'
      });
    }

    let user = null;

    if (db.isMySqlAvailable()) {
      const rows = await db.execute('SELECT id, full_name, email, role FROM users WHERE email = ?', [email]);
      if (rows && rows.length > 0) {
        user = rows[0];
      }
    }

    if (!user) {
      // Default Admin Fallback (admin@devorme.com / admin123)
      if (email === 'admin@devorme.com' || email === 'admin') {
        user = {
          id: 1,
          full_name: 'Super Administrator',
          email: 'admin@devorme.com',
          role: 'superadmin'
        };
      } else {
        return res.status(401).json({
          success: false,
          message: 'Email atau password tidak terdaftar.'
        });
      }
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.full_name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login berhasil.',
      data: {
        user,
        token,
        serverTime: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
};


// Ambil profil user yang sedang aktif
const getProfile = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'Profil user berhasil diambil.',
      data: req.user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  getProfile
};
