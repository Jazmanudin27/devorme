# 🌐 Devorme - Software Ecosystem Architecture (Multi-Domain & Centralized Database)

Proyek ini dibangun menggunakan struktur modular yang rapi, memisahkan sisi **Server (Backend API)** dan **Client (Frontend React + Mobile Ready)** sama seperti arsitektur standar industri dan pola proyek Anda (E-Sekolah).

---

## 📁 Struktur Direktori Proyek

```text
g:/Devorme/
│
├── server/                          # BACKEND (Node.js + Express API)
│   ├── config/                      # Konfigurasi database & environment
│   │   ├── db.js                    # Koneksi database server (PostgreSQL / MySQL)
│   │   └── env.js                   # Konfigurasi PORT, JWT, domain whitelist
│   ├── controllers/                 # Logika bisnis terpisah per modul
│   │   ├── auth.controller.js       # Autentikasi Single Sign-On (SSO) terpusat
│   │   ├── company.controller.js    # Data profil perusahaan & portofolio produk
│   │   └── product.controller.js    # Endpoint khusus data produk (FlowDesk, dll)
│   ├── middlewares/                 # Middleware keamanan & validasi
│   │   ├── auth.middleware.js       # Verifikasi token JWT untuk lintas domain
│   │   └── errorHandler.js          # Penanganan error seragam & terpusat
│   ├── routes/                      # Routing URL REST API
│   │   ├── auth.routes.js
│   │   ├── company.routes.js
│   │   ├── product.routes.js
│   │   └── index.js                 # Master router (/api/v1)
│   ├── .env.example                 # Contoh variabel lingkungan
│   ├── package.json
│   └── index.js                     # Entry point server backend
│
├── client/                          # FRONTEND (React.js + Mobile Ready)
│   ├── public/                      # Aset publik, PWA, & Mobile App
│   │   ├── manifest.json            # Manifest aplikasi HP (PWA/Android)
│   │   └── favicon.svg              # Logo icon
│   ├── src/
│   │   ├── api/                     # Layer komunikasi HTTP ke server
│   │   │   ├── axiosClient.js       # Konfigurasi dasar Axios & interceptor
│   │   │   └── productService.js    # Fungsi-fungsi pemanggilan API produk
│   │   ├── components/              # Komponen UI modular yang dapat digunakan ulang
│   │   │   ├── Navbar.jsx           # Navigasi responsif desktop & mobile
│   │   │   ├── Footer.jsx           # Footer ekosistem & status server
│   │   │   ├── ProductCard.jsx      # Card produk dengan navigasi multi-domain
│   │   │   └── DomainSimulator.jsx  # Simulator interaktif transisi domain
│   │   ├── views/                   # Tampilan Halaman (Pages)
│   │   │   ├── HomeView.jsx         # Website Utama Perusahaan (devorme.com)
│   │   │   ├── ProductDetailView.jsx# Website Khusus Produk (flowdesk.id, dll)
│   │   │   └── ArchitectureView.jsx # Dokumentasi cara kerja server terpusat
│   │   ├── App.jsx                  # Main routing & state aplikasi
│   │   ├── main.jsx                 # Entry point React
│   │   └── index.css                # Styling modern, luxury dark mode & responsive
│   ├── index.html                   # HTML template Vite
│   ├── vite.config.js               # Konfigurasi Vite
│   └── package.json                 # Dependensi client
│
└── README.md                        # Dokumentasi teknis untuk programmer
```

---

## 🚀 Cara Menjalankan untuk Programmer

### 1. Menjalankan Server Backend:
```bash
cd server
npm install
npm run dev
# Server berjalan di http://localhost:5000 (API: http://localhost:5000/api/v1)
```

### 2. Menjalankan Client Frontend:
```bash
cd client
npm install
npm run dev
# Aplikasi web berjalan di http://localhost:5173
```

### 3. Build Menjadi Aplikasi Mobile Android (Capacitor/PWA):
Aplikasi ini sudah dilengkapi `manifest.json`. Untuk membuat file APK Android:
```bash
cd client
npx cap add android
npx cap copy
npx cap open android
```
*(Bisa langsung dibuka di Android Studio untuk di-build menjadi file .apk)*
