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
        gambar: "assets/avanza.jpg",
        kapasitas: "4-5 Orang",
        fasilitas: [
            "Cocok Untuk: Antar jemput bandara, Travel keluarga, Perjalanan dinas, Wisata Malang, Batu, Bromo",
            "Keunggulan: Kabin nyaman, Irit bahan bakar, Harga ekonomis, Suspensi nyaman untuk perjalanan jauh"
        ],
        harga: "Rp 500.000"
    },
    {
        id: "innova",
        nama: "Toyota Innova Reborn",
        gambar: "assets/innova.jpg",
        kapasitas: "5-6 Penumpang",
        fasilitas: [
            "Cocok Untuk: Antar jemput bandara, Perjalanan dinas perusahaan, Wisata keluarga, Malang, Batu, Bromo, Perjalanan luar kota jarak jauh",
            "Keunggulan: Kabin lebih luas dan lega, Suspensi nyaman untuk perjalanan jauh, Bagasi lebih besar dibanding Avanza, Sangat nyaman untuk semua kalangan, Cocok untuk perjalanan 3-10 jam"
        ],
        harga: "Rp 700.000"
    },
    {
        id: "hiace-commuter",
        nama: "Toyota Hiace Commuter",
        gambar: "assets/hiace.jpg",
        kapasitas: "10-14 Penumpang",
        fasilitas: [
            "Cocok Untuk: Antar jemput rombongan bandara, Wisata Malang, Batu, Bromo, Family gathering dan komunitas, Perjalanan dinas dan kunjungan kerja",
            "Keunggulan: Kapasitas besar hingga 14 orang dewasa, Kabin luas dengan ruang kaki yang lega, Lebih praktis dan ekonomis untuk rombongan, Memudahkan koordinasi seluruh peserta, Cocok untuk perjalanan jarak dekat maupun luar kota"
        ],
        harga: "Rp 1.300.000"
    },
    {
        id: "hiace-premio",
        nama: "Toyota Hiace Premio",
        gambar: "assets/hiace.jpg",
        kapasitas: "12-14 Penumpang",
        fasilitas: [
            "Cocok Untuk: Antar jemput rombongan bandara, Wisata Malang, Batu, Bromo, Family gathering dan komunitas, Perjalanan dinas dan kunjungan kerja",
            "Keunggulan: Pengalaman perjalanan kelas Premium/VIP, Kapasitas besar hingga 14 orang dewasa, Kabin luas dengan ruang kaki yang lega, Lebih praktis dan ekonomis untuk rombongan, Memudahkan koordinasi seluruh peserta"
        ],
        harga: "Rp 1.500.000"
    },
    {
        id: "elf-giga",
        nama: "Isuzu ELF GIGA",
        gambar: "assets/isuzu.jpg",
        kapasitas: "14-19 Penumpang",
        fasilitas: [
            "Cocok Untuk: Antar jemput rombongan bandara, Wisata Bromo, Batu, Malang, Study tour, Family gathering, Company outing, Acara komunitas",
            "Keunggulan: Kapasitas besar dalam satu kendaraan, Lebih hemat dibanding menyewa beberapa mobil, Memudahkan koordinasi seluruh peserta, Cocok untuk perjalanan wisata satu hari maupun beberapa hari"
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

// --- HERO QUICK BOOKING ACTION ---
function initQuickSearch() {
    const quickAsal = document.getElementById("quickAsal");
    const quickTujuan = document.getElementById("quickTujuan");
    const quickSearchBtn = document.getElementById("quickSearchBtn");
    
    if (!quickSearchBtn) return;
    
    quickSearchBtn.addEventListener("click", () => {
        const asalVal = quickAsal.value;
        const tujuanVal = quickTujuan.value;
        
        window.selectRoute(asalVal, tujuanVal);
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
Kode Pesawat (Jika Ada) : ${kodePesawat}
Nama Pemesan : ${nama}
Nomor WhatsApp Aktif : ${noWa}
Alamat Jemput : ${jemput}
Alamat Tujuan : ${tujuan}
Barang Bawaan : ${barang}
Jumlah Penumpang : ${jumlah}
Paket Travel (Regular/Carter Drop/PP/Wisata) : ${paketTravel}
Paket Perjalanan (Via Toll/Nontoll) : ${paketJalan}
Catatan Tambahan : ${catatan}`;

        // URL Encode compilation
        const encodedText = encodeURIComponent(textMessage);
        
        // Build final redirection URL
        const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedText}`;
        
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
