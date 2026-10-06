const db = require('../config/db');

let mockInquiries = [
  {
    id: 1,
    full_name: "Budi Santoso",
    email: "budi@smk4surabaya.sch.id",
    phone: "08123456789",
    institution: "SMK Negeri 4 Surabaya",
    product_interest: "E-Sekolah Cloud Platform",
    message: "Tertarik mencoba modul presensi guru & siswa dan e-rapor.",
    status: "new",
    created_at: new Date().toISOString()
  }
];

const createInquiry = async (req, res, next) => {
  try {
    const { full_name, email, phone, institution, product_interest, message } = req.body;

    if (!full_name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Nama lengkap, email, dan pesan wajib diisi.'
      });
    }

    if (db.isMySqlAvailable()) {
      const sql = `
        INSERT INTO inquiries (full_name, email, phone, institution, product_interest, message, status)
        VALUES (?, ?, ?, ?, ?, ?, 'new')
      `;
      const result = await db.execute(sql, [
        full_name,
        email,
        phone || '',
        institution || '',
        product_interest || 'General Software',
        message
      ]);

      return res.status(201).json({
        success: true,
        message: 'Permintaan konsultasi & demo Anda telah terkirim. Tim Devorme akan segera menghubungi Anda!',
        id: result.insertId
      });
    }

    const newInquiry = {
      id: mockInquiries.length + 1,
      full_name,
      email,
      phone: phone || '',
      institution: institution || '',
      product_interest: product_interest || 'General Software',
      message,
      status: 'new',
      created_at: new Date().toISOString()
    };
    mockInquiries.unshift(newInquiry);

    return res.status(201).json({
      success: true,
      message: 'Permintaan konsultasi & demo Anda telah terkirim. Tim Devorme akan segera menghubungi Anda!',
      id: newInquiry.id
    });
  } catch (error) {
    next(error);
  }
};

const getInquiries = async (req, res, next) => {
  try {
    if (db.isMySqlAvailable()) {
      const rows = await db.execute('SELECT * FROM inquiries ORDER BY id DESC');
      return res.status(200).json({
        success: true,
        data: rows
      });
    }

    return res.status(200).json({
      success: true,
      data: mockInquiries
    });
  } catch (error) {
    next(error);
  }
};

const updateInquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (db.isMySqlAvailable()) {
      await db.execute('UPDATE inquiries SET status = ? WHERE id = ?', [status, id]);
      return res.status(200).json({
        success: true,
        message: 'Status inquiry berhasil diperbarui.'
      });
    }

    const item = mockInquiries.find(i => i.id == id);
    if (item) item.status = status;

    return res.status(200).json({
      success: true,
      message: 'Status inquiry berhasil diperbarui.'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInquiry,
  getInquiries,
  updateInquiryStatus
};
