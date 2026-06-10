/* ==========================================================================
   Javascript Interactions & Registration for EL-Roomey Course
   ========================================================================== */

// 1. CONFIGURATION
const CONFIG = {
    whatsappNumber: "6281515528098"
};

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initBookingForm();
    initQuickSearch();
    initScrollReveal();
});

// --- NAVBAR SCROLL & MOBILE DRAWER ---
function initNavbar() {
    const navbar = document.getElementById("navbar");
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Sticky Navbar on Scroll
    window.addEventListener("scroll", () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
    });

    // Mobile Hamburger Toggle
    if (hamburgerBtn && navMenu) {
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
}

// --- SELECT PROGRAM FROM CARD ---
window.selectProgram = function(programName) {
    const programSelect = document.getElementById("programKursus");
    if (programSelect && programName) {
        programSelect.value = programName;
    }
    
    // Smooth scroll focus to registration section
    smoothScrollTo("#daftar");
};

// --- HERO QUICK PROGRAM SEARCH ACTION ---
function initQuickSearch() {
    const quickProgram = document.getElementById("quickProgram");
    const quickMethod = document.getElementById("quickMethod");
    const quickSearchBtn = document.getElementById("quickSearchBtn");
    
    if (!quickSearchBtn) return;
    
    quickSearchBtn.addEventListener("click", () => {
        const progVal = quickProgram ? quickProgram.value : "";
        const methodVal = quickMethod ? quickMethod.value : "";
        
        const programSelect = document.getElementById("programKursus");
        const methodSelect = document.getElementById("metodeBelajar");
        
        if (programSelect && progVal) {
            programSelect.value = progVal;
        }
        if (methodSelect && methodVal) {
            methodSelect.value = methodVal;
        }
        
        smoothScrollTo("#daftar");
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

// --- REGISTRATION FORM WHATSAPP REDIRECT ---
function initBookingForm() {
    const form = document.getElementById("courseBookingForm");
    
    if (!form) return;

    // Set min date of form to today automatically
    const today = new Date().toISOString().split('T')[0];
    const tanggalInput = document.getElementById("tanggalMulai");
    if (tanggalInput) {
        tanggalInput.min = today;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        // Retrieve values
        const namaSiswa = document.getElementById("namaSiswa").value.trim();
        const noWa = document.getElementById("noWa").value.trim();
        const tanggalMulai = document.getElementById("tanggalMulai").value;
        const programKursus = document.getElementById("programKursus").value;
        const metodeBelajar = document.getElementById("metodeBelajar").value;
        const pilihanJadwal = document.getElementById("pilihanJadwal").value;
        const targetSkor = document.getElementById("targetSkor").value.trim() || "-";
        const sumberInfo = document.getElementById("sumberInfo").value;
        const catatan = document.getElementById("catatan").value.trim() || "-";

        // Convert date format to local format
        const dateObj = new Date(tanggalMulai);
        const formattedDate = dateObj.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        // Construct message template
        const textMessage = `Halo EL-Roomey Course

Saya ingin mendaftar kelas kursus dengan rincian berikut:

Nama Lengkap : ${namaSiswa}
Nomor WA : ${noWa}
Tanggal Mulai : ${formattedDate}

Program Kursus : ${programKursus}
Metode Belajar : ${metodeBelajar}
Pilihan Jadwal : ${pilihanJadwal}
Target Skor : ${targetSkor}

Info Kursus : ${sumberInfo}
Catatan Tambahan : ${catatan}`;

        // URL Encode compilation
        const encodedText = encodeURIComponent(textMessage);
        
        // Build final redirection URL
        const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedText}`;
        
        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
    });
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
