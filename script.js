/* ==========================================================================
   Javascript Interactions & Booking Integration for ElRoomeny Travel
   ========================================================================== */

// 1. CONFIGURATION (Mudah diubah oleh orang awam)
const CONFIG = {
    // Nomor WhatsApp Admin (Gunakan kode negara tanpa tanda '+', contoh: 6285800734579)
    whatsappNumber: "6285800734579",
    
    // Durasi transisi slider testimoni (milidetik)
    testimonialInterval: 5000 
};

// 2. FLEET DATA DATABASE (Mudah ditambah / diedit)
const FLEET_DATA = [
    {
        id: "avanza",
        nama: "Toyota Avanza FWD",
        gambar: "assets/AvanzaFWD.jpeg",
        kapasitas: "4-5 Orang",
        fasilitas: [
            "Cocok Untuk: Antar jemput bandara, Travel keluarga, Perjalanan dinas, Wisata Malang, Batu, Bromo",
            "Keunggulan: Kabin nyaman, Irit bahan bakar, Harga ekonomis, Suspensi nyaman untuk perjalanan jauh",
            "Fasilitas: Termasuk driver berpengalaman dan tidak merokok saat berkendara, Via-Toll/Non-Toll, BBM, Parkir, Rest area, Belanja Oleh-oleh",
        ],
        harga: "Rp 500.000"
    },
    {
        id: "innova",
        nama: "Toyota Innova Reborn",
        gambar: "assets/INNOVA.jpeg",
        kapasitas: "5-6 Penumpang",
        fasilitas: [
            "Cocok Untuk: Antar jemput bandara, Perjalanan dinas perusahaan, Wisata keluarga, Malang, Batu, Bromo, Perjalanan luar kota jarak jauh",
            "Keunggulan: Kabin lebih luas dan lega, Suspensi nyaman untuk perjalanan jauh, Bagasi lebih besar dibanding Avanza, Sangat nyaman untuk semua kalangan, Cocok untuk perjalanan 3-10 jam",
            "Fasilitas: Termasuk driver berpengalaman dan tidak merokok saat berkendara, Via-Toll/Non-Toll, BBM, Parkir, Rest area, Belanja Oleh-oleh",
        ],
        harga: "Rp 700.000"
    },
    {
        id: "hiace-commuter",
        nama: "Toyota Hiace Commuter",
        gambar: "assets/HIACE.jpeg",
        kapasitas: "10-14 Penumpang",
        fasilitas: [
            "Cocok Untuk: Antar jemput rombongan bandara, Wisata Malang, Batu, Bromo, Family gathering dan komunitas, Perjalanan dinas dan kunjungan kerja",
            "Keunggulan: Kapasitas besar hingga 14 orang dewasa, Kabin luas dengan ruang kaki yang lega, Lebih praktis dan ekonomis untuk rombongan, Memudahkan koordinasi seluruh peserta, Cocok untuk perjalanan jarak dekat maupun luar kota",
            "Fasilitas: Termasuk driver berpengalaman dan tidak merokok saat berkendara, Via-Toll/Non-Toll, BBM, Parkir, Rest area, Belanja Oleh-oleh, Free Karaoke",
        ],
        harga: "Rp 1.300.000"
    },
    {
        id: "hiace-premio",
        nama: "Toyota Hiace Premio",
        gambar: "assets/PREMIO.jpeg",
        kapasitas: "12-14 Penumpang",
        fasilitas: [
            "Cocok Untuk: Antar jemput rombongan bandara, Wisata Malang, Batu, Bromo, Family gathering dan komunitas, Perjalanan dinas dan kunjungan kerja",
            "Keunggulan: Pengalaman perjalanan kelas Premium/VIP, Kapasitas besar hingga 14 orang dewasa, Kabin luas dengan ruang kaki yang lega, Lebih praktis dan ekonomis untuk rombongan, Memudahkan koordinasi seluruh peserta",
            "Fasilitas: Termasuk driver berpengalaman dan tidak merokok saat berkendara, Via-Toll/Non-Toll, BBM, Parkir, Rest area, Belanja Oleh-oleh, Free Karaoke",
        ],
        harga: "Rp 1.500.000"
    },
    {
        id: "elf-giga",
        nama: "Isuzu ELF GIGA",
        gambar: "assets/ELFGIGA.jpeg",
        kapasitas: "14-19 Penumpang",
        fasilitas: [
            "Cocok Untuk: Antar jemput rombongan bandara, Wisata Bromo, Batu, Malang, Study tour, Family gathering, Company outing, Acara komunitas",
            "Keunggulan: Kapasitas besar dalam satu kendaraan, Lebih hemat dibanding menyewa beberapa mobil, Memudahkan koordinasi seluruh peserta, Cocok untuk perjalanan wisata satu hari maupun beberapa hari",
            "Fasilitas: Termasuk driver berpengalaman dan tidak merokok saat berkendara, Via-Toll/Non-Toll, BBM, Parkir, Rest area, Belanja Oleh-oleh, Free Karaoke",
        ],
        harga: "Rp 1.650.000"
    }
];

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    
    // Update Display Phone Number in Form Panel
    const csPhoneDisplay = document.getElementById("csPhoneDisplay");
    if (csPhoneDisplay) {
        // Format display for humans: e.g. +62 858-0073-4579
        csPhoneDisplay.textContent = `+62 858-0073-4579`;
    }

    // Initialize Page functions
    initNavbar();
    renderFleet();
    initTestimonials();
    initBookingForm();
    initScrollReveal();
    initQuickSearch();
});

/* ==========================================================================
   3. FUNCTIONS & INTERACTIVITY
   ========================================================================== */

// --- NAVBAR SCROLL & MOBILE DRAWER ---
function initNavbar() {
    const navbar = document.getElementById("navbar");
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Sticky Navbar on Scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
        
        // Active Nav link highlight based on section scroll
        let current = "";
        const sections = document.querySelectorAll("section");
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").slice(1) === current) {
                link.classList.add("active");
            }
        });
    });

    // Mobile Hamburger Toggle
    hamburgerBtn.addEventListener("click", () => {
        hamburgerBtn.classList.toggle("open");
        navMenu.classList.toggle("open");
    });

    // Close Menu when clicking navigation link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburgerBtn.classList.remove("open");
            navMenu.classList.remove("open");
        });
    });
    
    // Close mobile menu if clicked outside
    document.addEventListener("click", (e) => {
        if (!hamburgerBtn.contains(e.target) && !navMenu.contains(e.target)) {
            hamburgerBtn.classList.remove("open");
            navMenu.classList.remove("open");
        }
    });
}

// --- DYNAMIC FLEET CARD GENERATION ---
function renderFleet() {
    const fleetGrid = document.getElementById("fleetGrid");
    const selectMobil = document.getElementById("mobil");
    
    if (!fleetGrid) return;
    
    // Clear skeletons
    fleetGrid.innerHTML = "";
    
    // Reset Select Option inside Booking Form
    if (selectMobil) {
        selectMobil.innerHTML = '<option value="" disabled selected>Pilih jenis armada mobil</option>';
    }

    // Build Cards & Options
    FLEET_DATA.forEach(car => {
        // 1. Build facilities list HTML
        let facilitiesHTML = "";
        car.fasilitas.forEach(fac => {
            facilitiesHTML += `
                <div class="facility-item">
                    <i class="fas fa-check-circle"></i>
                    <span>${fac}</span>
                </div>
            `;
        });

        // 2. Build Card element
        const card = document.createElement("div");
        card.className = "fleet-card reveal-item";
        card.innerHTML = `
            <div class="fleet-img-wrapper">
                <img src="${car.gambar}" alt="${car.nama}" loading="lazy">
            </div>
            <div class="fleet-info">
                <h3 class="fleet-name">${car.nama}</h3>
                <span class="fleet-capacity">
                    <i class="fas fa-users"></i> Kapasitas: ${car.kapasitas}
                </span>
                <div class="fleet-facilities">
                    ${facilitiesHTML}
                </div>
                <div class="fleet-footer">
                    <div class="fleet-price-box">
                        <span class="price-label">Mulai Dari</span>
                        <span class="fleet-price">${car.harga}</span>
                    </div>
                    <a href="#pesan" onclick="selectCar('${car.nama}')" class="btn btn-gold btn-glow">Pesan Sekarang</a>
                </div>
            </div>
        `;
        
        fleetGrid.appendChild(card);

        // 3. Add to Form Selector options
        if (selectMobil) {
            const option = document.createElement("option");
            option.value = car.nama;
            option.textContent = `${car.nama} (Kapasitas: ${car.kapasitas})`;
            selectMobil.appendChild(option);
        }
    });
}

// --- AUTOMATIC TESTIMONIALS SLIDER ---
function initTestimonials() {
    const testimonialCards = document.querySelectorAll(".testimonial-card");
    const dots = document.querySelectorAll(".dot");
    let currentSlide = 0;
    let slideInterval;

    if (testimonialCards.length === 0) return;

    function showSlide(index) {
        testimonialCards.forEach(card => card.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));
        
        testimonialCards[index].classList.add("active");
        dots[index].classList.add("active");
        currentSlide = index;
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % testimonialCards.length;
        showSlide(nextIndex);
    }

    // Auto run slider
    function startInterval() {
        slideInterval = setInterval(nextSlide, CONFIG.testimonialInterval);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Dot indicators click events
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            resetInterval();
        });
    });

    startInterval();
}

// --- SELECT FLIGHT ROUTE (FROM CARD) ---
window.selectRoute = function(asal, tujuan) {
    const jemputInput = document.getElementById("jemput");
    const tujuanInput = document.getElementById("tujuan");

    if (jemputInput && asal) {
        jemputInput.value = asal;
    }

    if (tujuanInput && tujuan && tujuan !== "Tujuan") {
        tujuanInput.value = tujuan;
    }

    updateKediriPickupLimit();

    // Smooth scroll focus to booking section
    smoothScrollTo("#pesan");
};

// --- SELECT CAR FROM FLEET CARD ---
window.selectCar = function(carName) {
    smoothScrollTo("#pesan");
};

// --- CEK HARGA: DATA TABLES ---
const regularPrices = {
  "Bandara Juanda|Malang Kota": 150000,
  "Malang Kota|Bandara Juanda": 150000,
  "Kediri Kota|Bandara Juanda": 150000,
  "Bandara Juanda|Kediri Kota": 150000,
  "Bandara Juanda|Malang Kabupaten": 170000,
  "Malang Kabupaten|Bandara Juanda": 170000,
  "Batu Kota|Bandara Juanda": 170000,
  "Bandara Juanda|Batu Kota": 170000,
  "Malang Kota|Surabaya Kota": 170000,
  "Surabaya Kota|Malang Kota": 170000,
  "Batu Kota|Surabaya Kota": 180000,
  "Surabaya Kota|Batu Kota": 180000
};

const carterPrices = {
  "Bandara Juanda|Malang Kota": {
    Avanza: 550000, Expander: 600000, "Innova Reborn": 750000, Hiace: 1350000, "Elf Giga": null
  },
  "Malang Kota|Bandara Juanda": {
    Avanza: 550000, Expander: 600000, "Innova Reborn": 750000, Hiace: 1350000, "Elf Giga": null
  },
  "Bandara Juanda|Batu Kota": {
    Avanza: 600000, Expander: 650000, "Innova Reborn": 800000, Hiace: 1400000, "Elf Giga": null
    },
  "Batu Kota|Bandara Juanda": {
    Avanza: 600000, Expander: 650000, "Innova Reborn": 800000, Hiace: 1400000, "Elf Giga": null
  },
  "Surabaya Kota|Malang Kota": {
    Avanza: 600000, Expander: 650000, "Innova Reborn": 800000, Hiace: 1400000, "Elf Giga": null
  },
  "Malang Kota|Surabaya Kota": {
    Avanza: 600000, Expander: 650000, "Innova Reborn": 800000, Hiace: 1400000, "Elf Giga": null
  },
  "Batu Kota|Surabaya Kota": {
    Avanza: 650000, Expander: 700000, "Innova Reborn": 850000, Hiace: 1450000, "Elf Giga": null
  },
  "Surabaya Kota|Batu Kota": {
    Avanza: 650000, Expander: 700000, "Innova Reborn": 850000, Hiace: 1450000, "Elf Giga": null
  }
};

const armadaRegularPool = ["Random/Acak"];

const ROUTE_ALIASES = {
  "kediri": "Kediri Kota",
  "kediri kota": "Kediri Kota",
  "malang kota": "Malang Kota",
  "malang kabupaten": "Malang Kabupaten",
  "batu kota": "Batu Kota",
  "surabaya kota": "Surabaya Kota",
  "bandara juanda": "Bandara Juanda"
};

function normalizeRouteName(value) {
  if (!value) return value;
  const trimmed = value.trim();
  const key = trimmed.toLowerCase();
  if (ROUTE_ALIASES[key]) return ROUTE_ALIASES[key];
  return trimmed.replace(/\b\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase());
}

const jadwalRegular = {
  "Malang Kota|Surabaya Kota": ["01:00","03:00","05:00","07:00","09:00","11:00","13:00","15:00"],
  "Surabaya Kota|Malang Kota": ["07:00","09:00","11:00","13:00","15:00","17:00","19:00"],
  "Malang Kota|Kediri Kota": ["07:00","13:00","18:00"],
  "Kediri Kota|Malang Kota": ["07:00","13:00","18:00"]
};

const notesRegular = [
  "Belum termasuk biaya toll (toll dibayar patungan antar penumpang)",
  "Layanan door to door — jadwal penjemputan & pengantaran bergantian dengan penumpang lain",
  "free bagasi untuk 1 koper dan 1 ransel"
];
const notesCarterDrop = [
  "Harga sudah termasuk toll"
];

const WA_ADMIN = CONFIG.whatsappNumber;

function formatRupiah(num) {
  return "Rp " + num.toLocaleString("id-ID");
}

function generateInvoiceNumber() {
  return "INV-" + Date.now();
}

function getJadwalForRoute(routeKey) {
  if (jadwalRegular[routeKey]) return jadwalRegular[routeKey].join(", ");
  // Bandara Juanda routes use Surabaya schedules
  const asalTujuan = routeKey.split("|");
  const asal = asalTujuan[0];
  const tujuan = asalTujuan[1];
  // Try matching with Surabaya substitute for Bandara Juanda
  const subbedAsal = asal === "Bandara Juanda" ? "Surabaya Kota" : asal;
  const subbedTujuan = tujuan === "Bandara Juanda" ? "Surabaya Kota" : tujuan;
  const altKey = subbedAsal + "|" + subbedTujuan;
  if (jadwalRegular[altKey]) return jadwalRegular[altKey].join(", ");
  return null;
}

// --- RENDER CONSULTATION CARD ---
function renderConsultCard(container, asal, tujuan, paket) {
  const msg = encodeURIComponent(
    `Halo El-Roomey Travel, saya ingin konsultasi harga untuk:\n\nRute: ${asal} → ${tujuan}\nPaket: ${paket}\n\nMohon info harga dan ketersediaan. Terima kasih.`
  );
  container.innerHTML = `
    <div class="price-result-card consult-card">
      <div class="result-icon"><i class="fas fa-headset"></i></div>
      <h4>Konsultasi Admin via WhatsApp</h4>
      <p class="consult-desc">Harga untuk rute <strong>${asal} → ${tujuan}</strong> dengan paket <strong>${paket}</strong> memerlukan konsultasi langsung dengan admin kami.</p>
      <a href="https://wa.me/${WA_ADMIN}?text=${msg}" target="_blank" class="btn btn-whatsapp-result">
        <i class="fab fa-whatsapp"></i> Chat Admin Sekarang
      </a>
    </div>
  `;
  container.style.display = "block";
}

// --- RENDER INVOICE CARD ---
function renderInvoice(container, data) {
  const notesHTML = data.notes.map(n => `<li><i class="fas fa-info-circle"></i> ${n}</li>`).join("");
  const formattedDate = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  const waMsg = encodeURIComponent(
    `Halo El-Roomey Travel, berikut ringkasan cek harga saya:\n\n` +
    `No. Invoice: ${data.invoiceNo}\n` +
    `Rute: ${data.asal} → ${data.tujuan}\n` +
    `Paket: ${data.paket}\n` +
    `Armada: ${data.armada}\n` +
    `Jumlah Penumpang: ${data.jumlah}\n` +
    `Total Harga: ${data.totalFormatted}\n\n` +
    `Saya ingin melanjutkan pemesanan. Terima kasih.`
  );

  container.innerHTML = `
    <div class="price-result-card invoice-card">
      <div class="invoice-header">
        <div class="invoice-badge"><i class="fas fa-file-invoice"></i> INVOICE</div>
        <span class="invoice-number">${data.invoiceNo}</span>
      </div>
      <div class="invoice-date"><i class="fas fa-calendar-alt"></i> ${formattedDate}</div>
      <div class="invoice-body">
        <div class="invoice-row"><span class="invoice-label">Rute</span><span class="invoice-value">${data.asal} → ${data.tujuan}</span></div>
        <div class="invoice-row"><span class="invoice-label">Paket</span><span class="invoice-value">${data.paket}</span></div>
        <div class="invoice-row"><span class="invoice-label">Jumlah Penumpang</span><span class="invoice-value">${data.jumlah}</span></div>
        <div class="invoice-row"><span class="invoice-label">Armada</span><span class="invoice-value">${data.armada}</span></div>
        <div class="invoice-row"><span class="invoice-label">Jadwal</span><span class="invoice-value">${data.jadwal}</span></div>
        <div class="invoice-total">
          <span class="total-label">Total Harga</span>
          <span class="total-value">${data.totalFormatted}</span>
        </div>
      </div>
      ${notesHTML.length > 0 ? `<ul class="invoice-notes">${notesHTML}</ul>` : ""}
      <div class="invoice-actions">
        <button type="button" class="btn btn-gold invoice-btn" id="invoiceToFormBtn">
          <i class="fas fa-clipboard-list"></i> Lanjut ke Form Pemesanan
        </button>
        <a href="https://wa.me/${WA_ADMIN}?text=${waMsg}" target="_blank" class="btn btn-whatsapp-result invoice-btn">
          <i class="fab fa-whatsapp"></i> Chat Admin via WhatsApp
        </a>
      </div>
    </div>
  `;
  container.style.display = "block";

  // Attach form auto-fill handler
  document.getElementById("invoiceToFormBtn").addEventListener("click", () => {
    // Auto-fill booking form
    const paketSelect = document.getElementById("paketTravel");
    if (paketSelect) paketSelect.value = data.paket;

    const jumlahInput = document.getElementById("jumlah");
    if (jumlahInput) jumlahInput.value = data.jumlah;

    const jemputInput = document.getElementById("jemput");
    if (jemputInput) jemputInput.value = data.asal;

    const tujuanInput = document.getElementById("tujuan");
    if (tujuanInput) tujuanInput.value = data.tujuan;

    const catatanInput = document.getElementById("catatan");
    if (catatanInput) catatanInput.value = `Armada: ${data.armada}`;

    smoothScrollTo("#pesan");
  });
}

// --- RENDER CARTER DROP ARMADA SELECTOR ---
function renderCarterDropSelector(container, asal, tujuan, jumlah, routeKey) {
  const prices = carterPrices[routeKey];
  const armadaNames = ["Avanza", "Expander", "Innova Reborn", "Hiace", "Elf Giga"];

  let cardsHTML = armadaNames.map(name => {
    const price = prices[name];
    const isNull = price === null;
    return `
      <div class="armada-option ${isNull ? 'armada-disabled' : ''}" data-armada="${name}" data-price="${price}">
        <div class="armada-name"><i class="fas fa-car-side"></i> ${name}</div>
        <div class="armada-price">${isNull ? "Konsultasi Admin" : formatRupiah(price)}</div>
        ${isNull
          ? `<span class="armada-tag tag-consult">Hubungi Admin</span>`
          : `<button type="button" class="btn btn-gold armada-select-btn" data-armada="${name}" data-price="${price}">Pilih</button>`
        }
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <div class="price-result-card carter-selector-card">
      <h4><i class="fas fa-truck-pickup"></i> Pilih Armada — Carter Drop</h4>
      <p class="carter-route">${asal} → ${tujuan}</p>
      <div class="armada-grid">${cardsHTML}</div>
    </div>
  `;
  container.style.display = "block";

  // Attach click handlers for selectable armada
  container.querySelectorAll(".armada-select-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const armadaName = btn.getAttribute("data-armada");
      const armadaPrice = parseInt(btn.getAttribute("data-price"));

      const invoiceData = {
        invoiceNo: generateInvoiceNumber(),
        asal, tujuan,
        paket: "Carter Drop",
        jumlah,
        armada: armadaName,
        jadwal: "Siap 24 jam",
        total: armadaPrice,
        totalFormatted: formatRupiah(armadaPrice),
        notes: notesCarterDrop
      };
      renderInvoice(container, invoiceData);
    });
  });
}

// --- HERO QUICK PRICE CHECK ACTION ---
function initQuickSearch() {
    const quickSearchBtn = document.getElementById("quickSearchBtn");
    if (!quickSearchBtn) return;

    quickSearchBtn.addEventListener("click", () => {
        const asal = normalizeRouteName(document.getElementById("quickAsal").value);
        const tujuan = normalizeRouteName(document.getElementById("quickTujuan").value);
        const paket = document.getElementById("quickPaket").value;
        const jumlah = parseInt(document.getElementById("quickJumlah").value) || 1;
        const resultArea = document.getElementById("priceResultArea");

        // Validation
        if (!asal || !tujuan || !paket) {
            resultArea.innerHTML = `
              <div class="price-result-card error-card">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Silakan lengkapi semua field (Kota Asal, Kota Tujuan, dan Paket Travel) terlebih dahulu.</p>
              </div>`;
            resultArea.style.display = "block";
            return;
        }

        if (asal === tujuan) {
            resultArea.innerHTML = `
              <div class="price-result-card error-card">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Kota asal dan tujuan tidak boleh sama.</p>
              </div>`;
            resultArea.style.display = "block";
            return;
        }

        const routeKey = asal + "|" + tujuan;

        // --- Carter PP or Carter Wisata → always consult ---
        if (paket === "Carter PP" || paket === "Carter Wisata") {
            renderConsultCard(resultArea, asal, tujuan, paket);
            return;
        }

        // --- Regular Gabung ---
        if (paket === "Regular Gabung") {
            const price = regularPrices[routeKey];
            if (!price) {
                renderConsultCard(resultArea, asal, tujuan, paket);
                return;
            }
            const total = price * jumlah;
            const armada = armadaRegularPool[Math.floor(Math.random() * armadaRegularPool.length)];
            const jadwal = getJadwalForRoute(routeKey) || "Hubungi admin untuk info jadwal";

            const invoiceData = {
                invoiceNo: generateInvoiceNumber(),
                asal, tujuan,
                paket: "Regular Gabung",
                jumlah,
                armada,
                jadwal,
                total,
                totalFormatted: formatRupiah(total),
                notes: notesRegular
            };
            renderInvoice(resultArea, invoiceData);
            return;
        }

        // --- Carter Drop ---
        if (paket === "Carter Drop") {
            const prices = carterPrices[routeKey];
            if (!prices) {
                renderConsultCard(resultArea, asal, tujuan, paket);
                return;
            }
            renderCarterDropSelector(resultArea, asal, tujuan, jumlah, routeKey);
            return;
        }
    });
}

// --- SMOOTH SCROLL HELPER ---
function smoothScrollTo(targetSelector) {
    const targetElement = document.querySelector(targetSelector);
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust height for navbar padding
            behavior: "smooth"
        });
    }
}

// --- KIRIM DATA KE GOOGLE SHEETS ---
async function kirimKeSheets(formData) {
  try {
    await fetch("https://script.google.com/macros/s/AKfycbz4wfYs6aHcrVBT0xAtUjD5zwcNdpkJqHh6PdWi2uqMwKlfYZunRQa-QBvTKexcC6VY/exec", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        tanggalKeberangkatan: formData.tanggalKeberangkatan,
        jamPenjemputan: formData.jamPenjemputan,
        kodePesawat: formData.kodePesawat,
        namaPemesan: formData.namaPemesan,
        noWhatsapp: formData.noWhatsapp,
        jumlahPenumpang: formData.jumlahPenumpang,
        alamatJemput: formData.alamatJemput,
        alamatTujuan: formData.alamatTujuan,
        barangBawaan: formData.barangBawaan,
        paketTravel: formData.paketTravel,
        paketPerjalanan: formData.paketPerjalanan,
        infoTravel: formData.infoTravel,
        catatanTambahan: formData.catatanTambahan
      })
    });
  } catch (err) {
    console.error("Gagal kirim ke Sheets:", err);
  }
}

// --- BOOKING WHATSAPP REDIRECT ---
function initBookingForm() {
    const form = document.getElementById("bookingForm");
    
    if (!form) return;

    // Set min date of booking form to today automatically
    const today = new Date().toISOString().split('T')[0];
    const tanggalInput = document.getElementById("tanggal");
    if (tanggalInput) {
        tanggalInput.min = today;
    }

    const jamInput = document.getElementById("jam");
    const jemputInput = document.getElementById("jemput");

    if (jemputInput) {
        jemputInput.addEventListener("input", updateKediriPickupLimit);
    }

    if (jamInput) {
        jamInput.addEventListener("input", updateKediriPickupLimit);
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        // Retrieve values
        const tanggal = document.getElementById("tanggal").value;
        const jam = document.getElementById("jam").value;
        const kodePesawat = document.getElementById("kodePesawat").value.trim() || "-";
        const nama = document.getElementById("nama").value.trim();
        const noWa = document.getElementById("noWa").value.trim();
        const jemput = document.getElementById("jemput").value.trim();
        const tujuan = document.getElementById("tujuan").value.trim();
        const barang = document.getElementById("barang").value.trim() || "-";
        const jumlah = document.getElementById("jumlah").value;
        const paketTravel = document.getElementById("paketTravel").value;
        const paketJalan = document.getElementById("paketJalan").value;
        const infoTravel = document.getElementById("infoTravel").value;
        const catatan = document.getElementById("catatan").value.trim() || "-";

        if (isKediriPickup(jemput) && jam > "15:00") {
            alert("Jadwal keberangkatan dari Kediri maksimal pukul 15.00.");
            document.getElementById("jam").focus();
            return;
        }

        // Convert date format to local format
        const dateObj = new Date(tanggal);
        const formattedDate = dateObj.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        // Construct message template
        const textMessage = `Halo ElRoomey Travel

Saya ingin memesan travel dengan rincian berikut:

Tanggal Keberangkatan : ${formattedDate}
Jam Penjemputan : ${jam}
Kode Pesawat/Kapal : ${kodePesawat}

Nama : ${nama}
Nomor WA : ${noWa}
Penjemputan : ${jemput}
Tujuan : ${tujuan}
Barang : ${barang}
Jumlah Penumpang : ${jumlah}

Paket Travel : ${paketTravel}
Paket Perjalanan : ${paketJalan}
Info Travel : ${infoTravel}
Catatan Tambahan : ${catatan}`;

        // URL Encode compilation
        const encodedText = encodeURIComponent(textMessage);
        
        // Build final redirection URL
        const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedText}`;
        
        // Kirim data ke Google Sheets (fire-and-forget, tidak memblokir redirect WA)
        const formData = {
            tanggalKeberangkatan: tanggal,
            jamPenjemputan: jam,
            kodePesawat: kodePesawat,
            namaPemesan: nama,
            noWhatsapp: noWa,
            jumlahPenumpang: jumlah,
            alamatJemput: jemput,
            alamatTujuan: tujuan,
            barangBawaan: barang,
            paketTravel: paketTravel,
            paketPerjalanan: paketJalan,
            infoTravel: infoTravel,
            catatanTambahan: catatan
        };
        kirimKeSheets(formData);

        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
    });
}

function isKediriPickup(jemputValue) {
    return jemputValue.toLowerCase().includes("kediri");
}

function updateKediriPickupLimit() {
    const jamInput = document.getElementById("jam");
    const jemputInput = document.getElementById("jemput");

    if (!jamInput || !jemputInput) return;

    if (isKediriPickup(jemputInput.value)) {
        jamInput.max = "15:00";

        if (jamInput.value > "15:00") {
            jamInput.value = "15:00";
        }
    } else {
        jamInput.removeAttribute("max");
    }
}

// --- SCROLL REVEAL OBSERVER ---
function initScrollReveal() {
    const revealItems = document.querySelectorAll(".reveal-item");
    
    if (revealItems.length === 0) return;
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                // Stop observing after reveal is done
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observerOptions = {
        root: null,
        threshold: 0.1, // trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px" // triggers slightly before entering viewport fully
    };
    
    const observer = new IntersectionObserver(revealCallback, observerOptions);
    
    revealItems.forEach(item => {
        observer.observe(item);
    });
}
