/**
 * Authentication Controller (Centralized SSO)
 * Melayani login terpusat yang bisa digunakan lintas domain (devorme.com, flowdesk.id, dll).
 */
const db = require('../config/db');

// Login Terpusat
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email dan password wajib diisi.'
      });
    }

    // Simulasi autentikasi terhadap tabel users terpusat di server
    const dummyUser = {
      id: "usr_1001",
      name: "Super Administrator",
      email: email,
      role: "admin",
      domainsAccess: ["flowdesk.id", "paynexus.com", "pulseai.io"]
    };

    const token = "devorme_sso_mock_jwt_token_" + Buffer.from(email).toString('base64');

    return res.status(200).json({
      success: true,
      message: 'Login berhasil via Devorme Central SSO.',
      data: {
        user: dummyUser,
        token: token,
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
