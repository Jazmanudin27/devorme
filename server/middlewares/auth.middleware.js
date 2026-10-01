/**
 * Single Sign-On (SSO) Auth Middleware
 * Memeriksa Bearer Token JWT agar user yang login di satu domain dapat dikenali di domain lain.
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Akses ditolak: Token autentikasi tidak ditemukan.'
    });
  }

  // Simulasi verifikasi token (akan menggunakan jwt.verify saat production)
  try {
    req.user = {
      id: "usr_99812",
      name: "Arya Admin",
      email: "arya@devorme.com",
      role: "enterprise_admin",
      allowedProducts: ["flowdesk", "paynexus", "pulseai"]
    };
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Token tidak valid atau telah kedaluwarsa.'
    });
  }
};

module.exports = {
  verifyToken
};
