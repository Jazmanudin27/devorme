/**
 * DEVORME - Interactive Multi-Domain Ecosystem Scripts (V2.0 Enhanced)
 */

// Product Directory Data
const productsData = {
  flowdesk: {
    id: "flowdesk",
    name: "FlowDesk ERP",
    domain: "flowdesk.id",
    category: "Enterprise SaaS & Supply Chain",
    iconBg: "linear-gradient(135deg, #0066ff, #06b6d4)",
    tagline: "Enterprise Resource Planning & Realtime Automated Workflow",
    description: "FlowDesk beroperasi di domain independen https://flowdesk.id untuk kemudahan branding B2B enterprise. Seluruh pencatatan inventory, invoice pesanan, dan hak akses staf tersimpan aman di server database terpusat Devorme.",
    serverDetails: {
      dbSchema: "schema_flowdesk_prod",
      serverIP: "103.144.120.45",
      authMechanism: "Devorme SSO (OAuth2 / JWT)",
      apiEndpoint: "https://api.devorme.site/v1/flowdesk"
    },
    features: [
      "Pelacakan Multi-Gudang & Stok Otomatis",
      "Dashboard Approval Hierarki Multi-Divisi",
      "Koneksi Realtime Database PostgreSQL Server",
      "Penerbitan Surat Jalan & Faktur Pajak Otomatis"
    ]
  },
  paynexus: {
    id: "paynexus",
    name: "PayNexus Gateway",
    domain: "paynexus.com",
    category: "Fintech & Smart POS Checkout",
    iconBg: "linear-gradient(135deg, #a855f7, #ec4899)",
    tagline: "Sistem Pembayaran Omnichannel, QRIS Dinamis & Virtual Account",
    description: "Berjalan di domain https://paynexus.com dengan enkripsi SSL tingkat tinggi khusus transaksi keuangan. Menghubungkan kasir toko dan e-commerce ke akun rekening bank terpusat.",
    serverDetails: {
      dbSchema: "schema_paynexus_secure",
      serverIP: "103.144.120.45",
      authMechanism: "Devorme SSO + Two-Factor PIN",
      apiEndpoint: "https://api.devorme.site/v1/payments"
    },
    features: [
      "Auto-settlement Dana H+0 ke 20+ Bank Nasional",
      "QRIS Statis & Dinamis Terintegrasi Mesin POS",
      "Logging Transaksi Terenkripsi di Database Server",
      "Webhook Notifikasi Otomatis untuk Notifikasi Toko"
    ]
  },
  pulseai: {
    id: "pulseai",
    name: "PulseAI Analytics",
    domain: "pulseai.io",
    category: "AI & Predictive Business Intelligence",
    iconBg: "linear-gradient(135deg, #10b981, #059669)",
    tagline: "Engine Kecerdasan Buatan Pemantau Performa Bisnis Real-Time",
    description: "Mengakses domain https://pulseai.io membawa tim eksekutif ke ruang kendali data. AI membaca data transaksi dari server utama lalu memberikan rekomendasi restock dan proyeksi pendapatan.",
    serverDetails: {
      dbSchema: "schema_central_analytics",
      serverIP: "103.144.120.45",
      authMechanism: "Devorme SSO (Role-Based AI Admin)",
      apiEndpoint: "https://api.devorme.site/v1/ai-engine"
    },
    features: [
      "Prediksi Penjualan 30 Hari Mendatang Berbasis AI",
      "Peringatan Dini Produk Habis & Tren Pembelian",
      "Dashboard Interaktif High-Speed Analytics",
      "Ekspor Laporan PDF & Spreadsheet Otomatis"
    ]
  },
  esekolah: {
    id: "esekolah",
    name: "E-Sekolah Cloud Platform",
    domain: "e-sekolah.devorme.site",
    category: "Pendidikan & Sekolah",
    iconBg: "linear-gradient(135deg, #0066ff, #00c4ff)",
    tagline: "Sistem Informasi Akademik Sekolah, Presensi Realtime & E-Rapor",
    description: "E-Sekolah Cloud Platform beroperasi di domain mandiri https://e-sekolah.devorme.site untuk sekolah dan yayasan pendidikan. Mengotomasi presensi QR/GPS, jadwal pelajaran, penilaian e-rapor, serta kenaikan kelas.",
    serverDetails: {
      dbSchema: "e_sekolah_db",
      serverIP: "103.144.120.45",
      authMechanism: "Devorme SSO (Guru, Siswa, Ortu)",
      apiEndpoint: "https://api.devorme.site/v1/e-sekolah"
    },
    features: [
      "Presensi Guru & Siswa Real-time (QR & GPS)",
      "Kenaikan Kelas & Manajemen Alumni Otomatis",
      "Database Terpusat & Sinkronisasi Realtime",
      "Aplikasi Mobile Android Native (.apk ready)"
    ]
  },
  dis: {
    id: "dis",
    name: "DIS Smart System",
    domain: "dis.devorme.site",
    category: "Layanan Publik & Dinas",
    iconBg: "linear-gradient(135deg, #a855f7, #ec4899)",
    tagline: "Digital Information System & Layanan Birokrasi Dinas Terpadu",
    description: "Platform DIS beroperasi di domain mandiri https://dis.devorme.site untuk birokrasi pemerintahan dan pelaporan publik. Dilengkapi approval bertingkat, enkripsi dokumen 256-bit, dan statistik instansi realtime.",
    serverDetails: {
      dbSchema: "dis_db",
      serverIP: "103.144.120.45",
      authMechanism: "Devorme SSO + Two-Factor Authentication",
      apiEndpoint: "https://api.devorme.site/v1/dis"
    },
    features: [
      "Digitalisasi Dokumen & Approval Alur Dinas",
      "Dashboard Pelaporan Publik & Statistik Real-time",
      "Enkripsi Enterprise & Database Terpusat",
      "Enkripsi Data & Hak Akses Berjenjang Tingkat Tinggi"
    ]
  }
};

// DOM Initializer
document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  initHeaderScroll();
  initMobileMenu();
  initFilterTabs();
  initScrollReveal();
  initFaqAccordion();
  initNavScrollSpy();
  simulateDomainSwitch("main");
});

/* ==========================================================================
   PARTICLE CANVAS BACKGROUND
   ========================================================================== */
function initParticles() {
  const canvas = document.getElementById("bgParticlesCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor(width / 25), 45);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 180, 255, ${p.alpha})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 102, 255, ${0.15 * (1 - dist / 140)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   NAVBAR & SCROLL EFFECTS
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById("mainHeader");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

function initMobileMenu() {
  const toggle = document.getElementById("mobileMenuToggle");
  const navMenu = document.getElementById("navMenu");

  if (toggle && navMenu) {
    toggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });

    navMenu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });
  }
}

/* ==========================================================================
   SCROLL REVEAL OBSERVER
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal-on-scroll");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   CATEGORY FILTER HANDLING
   ========================================================================== */
function initFilterTabs() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterVal = btn.getAttribute("data-filter");

      productCards.forEach(card => {
        if (filterVal === "all" || card.getAttribute("data-category") === filterVal) {
          card.style.display = "flex";
          card.style.animation = "fadeInUp 0.4s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* ==========================================================================
   PRODUCT PREVIEW MODAL
   ========================================================================== */
function openDomainModal(productId) {
  const product = productsData[productId];
  if (!product) return;

  const modal = document.getElementById("domainModal");
  const modalBrowserDomain = document.getElementById("modalBrowserDomain");
  const modalBodyContent = document.getElementById("modalBodyContent");

  modalBrowserDomain.textContent = `https://${product.domain}`;

  modalBodyContent.innerHTML = `
    <div class="modal-hero">
      <div class="modal-prod-icon" style="background: ${product.iconBg}">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      </div>
      <div>
        <h2 style="font-size: 1.8rem; margin-bottom: 4px; color: #ffffff;">${product.name}</h2>
        <span style="color: var(--accent-cyan); font-weight: 700; font-family: monospace; font-size: 0.95rem;">Domain Resmi: https://${product.domain}</span>
      </div>
    </div>

    <!-- Live Server Connection Info -->
    <div class="modal-info-bar">
      <div class="info-item">
        <span>STATUS KONEKSI SERVER</span>
        <strong style="color: #34d399;">● Terhubung (Host: ${product.serverDetails.serverIP})</strong>
      </div>
      <div class="info-item">
        <span>DATABASE SCHEMA</span>
        <code style="color: #38bdf8;">${product.serverDetails.dbSchema}</code>
      </div>
      <div class="info-item">
        <span>AUTENTIKASI</span>
        <strong style="color: #ffffff;">${product.serverDetails.authMechanism}</strong>
      </div>
    </div>

    <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6; margin-bottom: 24px;">
      ${product.description}
    </p>

    <!-- Features Overview -->
    <div style="background: #090c12; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 24px; margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 16px;">
        <strong style="color: #ffffff; font-size: 0.95rem;">${product.name} Feature Matrix</strong>
        <span style="font-size: 0.75rem; background: rgba(56, 189, 248, 0.15); color: #38bdf8; padding: 2px 8px; border-radius: 4px;">Dedicated Web App</span>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
        ${product.features.map(f => `
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 12px; border-radius: 8px; font-size: 0.85rem; color: #cbd5e1; display: flex; align-items: center; gap: 8px;">
            <span style="color: var(--accent-emerald);">✔</span> ${f}
          </div>
        `).join('')}
      </div>
    </div>

    <div class="modal-actions">
      <a href="https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20ingin%20tanya%20detail%20mengenai%20${encodeURIComponent(product.name)}" target="_blank" class="btn btn-success">
        <span>💬 Konsultasi Live via WA</span>
      </a>
      <button class="btn btn-glass" onclick="closeDomainModal()">Tutup Pratinjau</button>
    </div>
  `;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeDomainModal() {
  const modal = document.getElementById("domainModal");
  if (modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
}

// Global Modal Listeners
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDomainModal();
});

document.getElementById("domainModal")?.addEventListener("click", (e) => {
  if (e.target.id === "domainModal") closeDomainModal();
});

/* ==========================================================================
   INTERACTIVE DOMAIN SIMULATOR
   ========================================================================== */
function simulateDomainSwitch(selectedKey) {
  const mockupUrlText = document.getElementById("mockupUrlText");
  const mockupViewport = document.getElementById("mockupViewport");
  if (!mockupUrlText || !mockupViewport) return;

  if (selectedKey === "main") {
    mockupUrlText.textContent = "https://devorme.site";
    mockupViewport.innerHTML = `
      <div style="text-align: center; max-width: 540px;">
        <div style="font-size: 0.85rem; color: var(--accent-cyan); text-transform: uppercase; font-weight: 700; margin-bottom: 6px;">
          Website Utama Perusahaan
        </div>
        <h4 style="font-size: 1.5rem; color: #ffffff; margin-bottom: 10px;">Devorme Technologies Inc.</h4>
        <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px;">
          Menyajikan profil perusahaan, katalog produk software multi-domain, dan koneksi server terpusat.
        </p>
        <span style="font-size: 0.8rem; background: rgba(0, 102, 255, 0.15); border: 1px solid rgba(0, 102, 255, 0.3); color: #38bdf8; padding: 4px 14px; border-radius: 99px;">
          Central Database Host: 103.144.120.45
        </span>
      </div>
    `;
  } else {
    const prod = productsData[selectedKey];
    if (!prod) return;

    mockupUrlText.textContent = `https://${prod.domain}`;
    mockupViewport.innerHTML = `
      <div style="text-align: center; max-width: 580px;">
        <div style="display: inline-block; padding: 4px 14px; border-radius: 99px; background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-size: 0.78rem; font-family: monospace; margin-bottom: 10px;">
          Dedicated Subdomain Active: ${prod.domain}
        </div>
        <h4 style="font-size: 1.4rem; color: #ffffff; margin-bottom: 8px;">${prod.name}</h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px;">
          ${prod.tagline}
        </p>
        <div style="background: rgba(255,255,255,0.03); border: 1px dashed var(--border-subtle); border-radius: 8px; padding: 14px; font-size: 0.84rem; color: #94a3b8; display: flex; justify-content: space-around; flex-wrap: wrap; gap: 10px;">
          <span>📦 Database: <b style="color: #f8fafc">${prod.serverDetails.dbSchema}</b></span>
          <span>⚡ API Endpoint: <b style="color: #f8fafc">${prod.serverDetails.apiEndpoint}</b></span>
        </div>
      </div>
    `;
  }
}

function previewProduct(key) {
  const map = { flow: 'flowdesk', pay: 'paynexus', pulse: 'pulseai', ese: 'esekolah', dis: 'dis' };
  openDomainModal(map[key] || 'flowdesk');
}

/* ==========================================================================
   FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-question");
    btn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach(i => i.classList.remove("active"));

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

/* ==========================================================================
   CONTACT FORM HANDLER
   ========================================================================== */
function handleContactSubmit(e) {
  e.preventDefault();
  const formSuccess = document.getElementById("formSuccess");
  const submitBtn = document.getElementById("btnSubmitContact");

  if (!submitBtn) return;

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>Mengirim data ke server Devorme...</span>`;

  setTimeout(() => {
    submitBtn.style.display = "none";
    if (formSuccess) formSuccess.style.display = "block";
    e.target.reset();
  }, 900);
}

/* ==========================================================================
   SCROLLSPY FOR NAV LINKS
   ========================================================================== */
function initNavScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-menu .nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}
