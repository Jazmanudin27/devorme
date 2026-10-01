/**
 * DEVORME - Interactive Multi-Domain Ecosystem Scripts
 */

// Product Directory Data
const productsData = {
  flowdesk: {
    id: "flowdesk",
    name: "FlowDesk ERP",
    domain: "flowdesk.id",
    category: "Enterprise SaaS & Supply Chain",
    iconBg: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    tagline: "Enterprise Resource Planning & Realtime Automated Workflow",
    description: "FlowDesk beroperasi di domain independen https://flowdesk.id untuk kemudahan branding B2B enterprise. Seluruh pencatatan inventory, invoice pesanan, dan hak akses staf tersimpan aman di server database terpusat Devorme.",
    serverDetails: {
      dbSchema: "schema_flowdesk_prod",
      serverIP: "103.144.120.45",
      authMechanism: "Devorme SSO (OAuth2 / JWT)",
      apiEndpoint: "https://api.devorme.com/v1/flowdesk"
    },
    features: [
      "Pelacakan Multi-Gudang & Stok Otomatis",
      "Dashboard Approval Hierarki Multi-Divisi",
      "Koneksi Realtime Database PostgreSQL Server",
      "Penerbitan Surat Jalan & Faktur Pajak Otomatis"
    ],
    demoScreenshotText: "Menampilkan Antarmuka Khusus Domain flowdesk.id"
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
      apiEndpoint: "https://api.devorme.com/v1/payments"
    },
    features: [
      "Auto-settlement Dana H+0 ke 20+ Bank Nasional",
      "QRIS Statis & Dinamis Terintegrasi Mesin POS",
      "Logging Transaksi Terenkripsi di Database Server",
      "Webhook Notifikasi Otomatis untuk Notifikasi Toko"
    ],
    demoScreenshotText: "Menampilkan Antarmuka Khusus Domain paynexus.com"
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
      apiEndpoint: "https://api.devorme.com/v1/ai-engine"
    },
    features: [
      "Prediksi Penjualan 30 Hari Mendatang Berbasis AI",
      "Peringatan Dini Produk Habis & Tren Pembelian",
      "Dashboard Interaktif High-Speed Analytics",
      "Ekspor Laporan PDF & Spreadsheet Otomatis"
    ],
    demoScreenshotText: "Menampilkan Antarmuka Khusus Domain pulseai.io"
  }
};

// DOM Content Loaded Handler
document.addEventListener("DOMContentLoaded", () => {
  initFilterTabs();
  initMobileMenu();
  simulateDomainSwitch("main");
  initNavScrollSpy();
});

// Category Filter Handling
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
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// Mobile Menu Navigation Toggle
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

// Open Dedicated Product Domain Modal
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
        <h2 style="font-size: 1.8rem; margin-bottom: 4px;">${product.name}</h2>
        <span style="color: var(--accent-cyan); font-weight: 600; font-family: monospace; font-size: 0.95rem;">Domain Resmi: https://${product.domain}</span>
      </div>
    </div>

    <!-- Live Server Connection Info -->
    <div class="modal-info-bar">
      <div class="info-item">
        <span>STATUS KONEKSI SERVER</span>
        <strong style="color: #34d399;">● Terhubung (Host: ${product.serverDetails.serverIP})</strong>
      </div>
      <div class="info-item">
        <span>DATABASE SERVER</span>
        <code>${product.serverDetails.dbSchema}</code>
      </div>
      <div class="info-item">
        <span>AUTENTIKASI</span>
        <strong>${product.serverDetails.authMechanism}</strong>
      </div>
    </div>

    <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6; margin-bottom: 24px;">
      ${product.description}
    </p>

    <!-- Simulated UI of the Dedicated Product Site -->
    <div style="background: #090c12; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 24px; margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 16px;">
        <strong style="color: #ffffff; font-size: 0.95rem;">${product.name} Cloud Portal</strong>
        <span style="font-size: 0.75rem; background: rgba(56, 189, 248, 0.15); color: #38bdf8; padding: 2px 8px; border-radius: 4px;">Standalone Web App</span>
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
      ${product.id === 'flowdesk' ? `
        <a href="products/flowdesk/index.html" class="btn btn-primary" id="btnOpenFlowdeskPrototype">
          <span>🚀 Buka Prototipe Website Produk (flowdesk.id)</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      ` : `
        <a href="javascript:void(0)" class="btn btn-primary" onclick="alertSimulatedRedirect('${product.domain}');">
          <span>Buka Website https://${product.domain}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      `}
      <button class="btn btn-glass" onclick="closeDomainModal()">Tutup Pratinjau</button>
    </div>
  `;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function alertSimulatedRedirect(domain) {
  alert(`[SIMULASI SUKSES]\n\nBrowser sekarang berpindah ke domain mandiri:\n👉 https://${domain}\n\nDi server VPS nanti, Nginx akan otomatis memetakan domain ini ke folder/aplikasi frontend produk tersebut dan mengarahkannya ke database terpusat yang sama.`);
}

function closeDomainModal() {
  const modal = document.getElementById("domainModal");
  if (modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
}

// Close modal on Escape key or backdrop click
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDomainModal();
});

document.getElementById("domainModal")?.addEventListener("click", (e) => {
  if (e.target.id === "domainModal") closeDomainModal();
});

// Interactive Domain Switcher Simulator in Architecture Section
function simulateDomainSwitch(selectedKey) {
  const mockupUrlText = document.getElementById("mockupUrlText");
  const mockupViewport = document.getElementById("mockupViewport");

  if (selectedKey === "main") {
    mockupUrlText.textContent = "https://devorme.com";
    mockupViewport.innerHTML = `
      <div style="text-align: center; max-width: 520px;">
        <div style="font-size: 0.85rem; color: var(--accent-cyan); text-transform: uppercase; font-weight: 700; margin-bottom: 6px;">
          Website Utama Perusahaan
        </div>
        <h4 style="font-size: 1.4rem; color: #ffffff; margin-bottom: 10px;">Devorme Technologies Inc.</h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px;">
          Menyajikan profil perusahaan, daftar seluruh software, dan tautan resmi ke masing-masing produk berdomain mandiri.
        </p>
        <span style="font-size: 0.8rem; background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.3); color: #818cf8; padding: 4px 12px; border-radius: 99px;">
          Sumber Data: Database Server Devorme (Central)
        </span>
      </div>
    `;
  } else {
    const prod = productsData[selectedKey];
    if (!prod) return;

    mockupUrlText.textContent = `https://${prod.domain}`;
    mockupViewport.innerHTML = `
      <div style="text-align: center; max-width: 560px;">
        <div style="display: inline-block; padding: 3px 12px; border-radius: 99px; background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-size: 0.75rem; font-family: monospace; margin-bottom: 8px;">
          Dedicated Domain Active: ${prod.domain}
        </div>
        <h4 style="font-size: 1.35rem; color: #ffffff; margin-bottom: 8px;">${prod.name}</h4>
        <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 14px;">
          ${prod.tagline}
        </p>
        <div style="background: rgba(255,255,255,0.03); border: 1px dashed var(--border-subtle); border-radius: 8px; padding: 12px; font-size: 0.82rem; color: #94a3b8; display: flex; justify-content: space-around; flex-wrap: wrap; gap: 8px;">
          <span>📦 Schema: <b style="color: #f8fafc">${prod.serverDetails.dbSchema}</b></span>
          <span>⚡ API: <b style="color: #f8fafc">${prod.serverDetails.apiEndpoint}</b></span>
        </div>
      </div>
    `;
  }
}

// Hero visual quick trigger
function previewProduct(key) {
  const map = { flow: 'flowdesk', pay: 'paynexus', pulse: 'pulseai' };
  openDomainModal(map[key] || 'flowdesk');
}

// Contact form handling
function handleContactSubmit(e) {
  e.preventDefault();
  const formSuccess = document.getElementById("formSuccess");
  const submitBtn = document.getElementById("btnSubmitContact");

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>Mengirim Data ke Server...</span>`;

  setTimeout(() => {
    submitBtn.style.display = "none";
    formSuccess.style.display = "block";
    e.target.reset();
  }, 900);
}

// Active Nav Scroll Spy
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
