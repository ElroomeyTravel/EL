/* ==========================================================================
   Javascript Logic for TOEFL Reading Practice Test - EL-Roomey Course
   ========================================================================== */

const CONFIG = {
    whatsappNumber: "6285800734579",
    examDurationSeconds: 60 * 60,
    totalQuestions: 50
};

const CORRECT_ANSWERS = {
    q1: "B", q2: "C", q3: "B", q4: "C", q5: "C",
    q6: "D", q7: "B", q8: "B", q9: "C", q10: "C",
    q11: "B", q12: "C", q13: "B", q14: "C", q15: "C",
    q16: "B", q17: "B", q18: "B", q19: "C", q20: "C",
    q21: "C", q22: "A", q23: "C", q24: "C", q25: "B",
    q26: "C", q27: "B", q28: "C", q29: "C", q30: "C",
    q31: "B", q32: "A", q33: "C", q34: "B", q35: "C",
    q36: "B", q37: "B", q38: "B", q39: "C", q40: "B",
    q41: "B", q42: "C", q43: "B", q44: "B", q45: "B",
    q46: "B", q47: "C", q48: "C", q49: "B", q50: "B"
};

let examTimerInterval = null;
let remainingExamSeconds = CONFIG.examDurationSeconds;
let isQuizSubmitted = false;

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    initNavigationGrid();
    initProgressTracker();
    initQuizSubmit();
    initExamTimer();
    initNavbarSticky();
    initMobileTimerPanel();
});

// --- NAVBAR SCROLL ---
function initNavbarSticky() {
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
    });
}

// --- INITIALIZE QUESTION NUMBER GRID (1-50) ---
function initNavigationGrid() {
    const grid = document.getElementById("navNumbersGrid");
    if (!grid) return;

    for (let i = 1; i <= CONFIG.totalQuestions; i++) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "nav-num-btn";
        btn.id = `nav-num-${i}`;
        btn.textContent = i;
        
        btn.addEventListener("click", () => {
            const targetCard = document.getElementById(`q-box-${i}`);
            const questionsWrapper = document.querySelector(".questions-wrapper");
            if (targetCard) {
                if (questionsWrapper) {
                    questionsWrapper.scrollTo({
                        top: targetCard.offsetTop - questionsWrapper.offsetTop - 12,
                        behavior: "smooth"
                    });
                } else {
                    window.scrollTo({
                        top: targetCard.offsetTop - 120,
                        behavior: "smooth"
                    });
                }
            }
        });

        grid.appendChild(btn);
    }
}

// --- EXAM TIMER ---
function initExamTimer() {
    remainingExamSeconds = CONFIG.examDurationSeconds;
    updateExamTimerDisplay();

    if (examTimerInterval) clearInterval(examTimerInterval);

    examTimerInterval = setInterval(() => {
        if (isQuizSubmitted) {
            clearInterval(examTimerInterval);
            return;
        }

        remainingExamSeconds--;
        updateExamTimerDisplay();

        if (remainingExamSeconds <= 0) {
            clearInterval(examTimerInterval);
            submitQuiz(true);
        }
    }, 1000);
}

function updateExamTimerDisplay() {
    const timer = document.getElementById("examTimer");
    const timerCard = document.getElementById("timerCard");
    const mobileTimerBadge = document.getElementById("mobileTimerBadge");
    const safeSeconds = Math.max(remainingExamSeconds, 0);
    const minutes = Math.floor(safeSeconds / 60);
    const seconds = safeSeconds % 60;
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    if (timer) {
        timer.textContent = formattedTime;
    }

    if (mobileTimerBadge) {
        mobileTimerBadge.textContent = formattedTime;
    }

    if (timerCard) {
        timerCard.classList.toggle("is-warning", safeSeconds <= 300);
    }
}

function initMobileTimerPanel() {
    const fab = document.getElementById("mobileTimerFab");
    const panel = document.getElementById("quizNavigationPanel");
    const backdrop = document.getElementById("mobileQuizBackdrop");

    if (!fab || !panel) return;

    const closePanel = () => {
        panel.classList.remove("open");
        fab.setAttribute("aria-expanded", "false");
        if (backdrop) {
            backdrop.classList.remove("open");
        }
    };

    const openPanel = () => {
        panel.classList.add("open");
        fab.setAttribute("aria-expanded", "true");
        if (backdrop) {
            backdrop.classList.add("open");
        }
    };

    fab.addEventListener("click", (event) => {
        event.preventDefault();
        if (panel.classList.contains("open")) {
            closePanel();
        } else {
            openPanel();
        }
    });

    if (backdrop) {
        backdrop.addEventListener("click", closePanel);
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closePanel();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 991) {
            closePanel();
        }
    });
}

// --- TRACK PROGRESS AND ANIMATE SIDEBAR ---
function initProgressTracker() {
    const form = document.getElementById("toeflQuizForm");
    if (!form) return;

    form.addEventListener("change", () => {
        updateProgress();
    });
}

function updateProgress() {
    let answeredCount = 0;
    
    for (let i = 1; i <= CONFIG.totalQuestions; i++) {
        const radioChecked = document.querySelector(`input[name="q${i}"]:checked`);
        const navBtn = document.getElementById(`nav-num-${i}`);
        
        if (radioChecked) {
            answeredCount++;
            if (navBtn) navBtn.classList.add("answered");
        } else {
            if (navBtn) navBtn.classList.remove("answered");
        }
    }

    const percent = Math.round((answeredCount / CONFIG.totalQuestions) * 100);
    
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");
    const percentText = document.getElementById("percentText");

    if (progressBar) progressBar.style.width = `${percent}%`;
    if (progressText) progressText.textContent = `${answeredCount} of ${CONFIG.totalQuestions} Answered`;
    if (percentText) percentText.textContent = `${percent}%`;
}

// --- SUBMIT QUIZ AND SHOW SCORE ---
function initQuizSubmit() {
    const form = document.getElementById("toeflQuizForm");
    const modal = document.getElementById("resultModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        submitQuiz(false);
    });

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener("click", () => {
            modal.classList.remove("open");
            scrollQuestionsToTop();
        });
    }

    // Retry Exam
    const retryExamBtn = document.getElementById("retryExamBtn");
    if (retryExamBtn && modal) {
        retryExamBtn.addEventListener("click", () => {
            // Reset all radio buttons
            form.reset();
            // Remove answer markings
            document.querySelectorAll(".option-item").forEach(item => {
                item.style.borderColor = "";
                item.style.background = "";
                const text = item.querySelector(".option-text");
                if (text) {
                    text.innerHTML = text.innerHTML.replace(/ <span style="color:#2ecc71; font-weight:bold;">\(Jawaban Benar\) ✔️<\/span>/g, "");
                    text.innerHTML = text.innerHTML.replace(/ <span style="color:#e74c3c; font-weight:bold;">\(Jawaban Anda\) ❌<\/span>/g, "");
                }
            });
            // Reset nav buttons
            document.querySelectorAll(".nav-num-btn").forEach(btn => btn.classList.remove("answered"));
            // Reset progress
            updateProgress();
            isQuizSubmitted = false;
            setQuizControlsDisabled(false);
            initExamTimer();
            // Close modal and scroll to top
            modal.classList.remove("open");
            scrollQuestionsToTop();
        });
    }
}

function submitQuiz(autoSubmitted = false) {
    if (isQuizSubmitted) return;

    isQuizSubmitted = true;
    if (examTimerInterval) clearInterval(examTimerInterval);
    remainingExamSeconds = Math.max(remainingExamSeconds, 0);
    updateExamTimerDisplay();

    let score = 0;
    
    for (let i = 1; i <= CONFIG.totalQuestions; i++) {
        const checkedRadio = document.querySelector(`input[name="q${i}"]:checked`);
        const answer = checkedRadio ? checkedRadio.value : null;
        const correctAnswer = CORRECT_ANSWERS[`q${i}`];
        
        if (answer === correctAnswer) {
            score++;
        }
    }
    
    let rating = "BEGINNER";
    let scoreRange = "310 - 420";
    let ratingColor = "#e74c3c";
    let desc = "Skor Anda berada di tingkat awal. Persiapan terencana sangat direkomendasikan untuk meningkatkan pemahaman membaca, kosakata, serta kemampuan menganalisis teks akademik Anda.";
    
    if (score >= 16 && score <= 30) {
        rating = "HIGH BASIC";
        scoreRange = "430 - 490";
        ratingColor = "#e67e22";
        desc = "Kerja bagus! Anda sudah memiliki pemahaman dasar yang cukup baik. Perbanyak latihan membaca teks akademik untuk memperkuat skor Anda di atas 500.";
    } else if (score >= 31 && score <= 42) {
        rating = "INTERMEDIATE";
        scoreRange = "500 - 570";
        ratingColor = "#d4af37";
        desc = "Luar biasa! Kemampuan membaca Anda berada di tingkat menengah. Dapatkan tips strategis untuk memahami detail dan inferensi guna mencapai skor 580+.";
    } else if (score >= 43) {
        rating = "ADVANCED";
        scoreRange = "580 - 677";
        ratingColor = "#2ecc71";
        desc = "Sangat memukau! Anda menguasai seluruh aspek Reading TOEFL dengan sempurna. Anda siap menghadapi ujian resmi kapan pun!";
    }

    const modal = document.getElementById("resultModal");
    const modalTitle = modal ? modal.querySelector("h2") : null;
    const modalSubtitle = modal ? modal.querySelector("p") : null;
    const resultScore = document.getElementById("resultScore");
    const resultRating = document.getElementById("resultRating");
    const resultDesc = document.getElementById("resultDesc");
    const waShareBtn = document.getElementById("waShareBtn");

    if (modalTitle) modalTitle.textContent = autoSubmitted ? "Waktu Habis!" : "Quiz Completed!";
    if (modalSubtitle) {
        modalSubtitle.textContent = autoSubmitted
            ? "Waktu pengerjaan 60 menit telah selesai. Jawaban Anda otomatis dikirim."
            : "Berikut adalah hasil evaluasi TOEFL Reading Anda";
    }
    if (resultScore) resultScore.textContent = `${score}/${CONFIG.totalQuestions}`;
    if (resultRating) {
        resultRating.textContent = `${rating} (Estimasi TOEFL: ${scoreRange})`;
        resultRating.style.color = ratingColor;
    }
    if (resultDesc) resultDesc.textContent = desc;

    if (waShareBtn) {
        const submitStatus = autoSubmitted ? "Terkirim otomatis karena waktu habis" : "Terkirim manual";
        const waText = `Halo EL-Roomey Course!

Saya baru saja menyelesaikan simulasi ujian TOEFL Reading Comprehension (50 Soal) di website dengan hasil berikut:

Nama: (Tulis Nama Anda)
Skor Latihan: ${score} / ${CONFIG.totalQuestions}
Tingkat Kemampuan: ${rating} (Est. Skor TOEFL: ${scoreRange})
Status: ${submitStatus}

Saya ingin berkonsultasi mengenai hasil simulasi ini dan informasi pendaftaran program kelas persiapan TOEFL.`;
        waShareBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`;
        waShareBtn.target = "_blank";
    }

    showIncorrectAnswersMarkings();
    setQuizControlsDisabled(true);

    if (modal) modal.classList.add("open");
}

function setQuizControlsDisabled(disabled) {
    const form = document.getElementById("toeflQuizForm");
    if (!form) return;

    form.querySelectorAll("input, button").forEach(control => {
        control.disabled = disabled;
    });
}

function scrollQuestionsToTop() {
    const questionsWrapper = document.querySelector(".questions-wrapper");

    if (questionsWrapper) {
        questionsWrapper.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

// Mark each option item green for correct, red for checked incorrect
function showIncorrectAnswersMarkings() {
    for (let i = 1; i <= CONFIG.totalQuestions; i++) {
        const correctVal = CORRECT_ANSWERS[`q${i}`];
        const card = document.getElementById(`q-box-${i}`);
        
        if (!card) continue;
        
        const optionItems = card.querySelectorAll(".option-item");
        
        optionItems.forEach(item => {
            const input = item.querySelector("input");
            const val = input.value;
            
            item.style.borderColor = "rgba(255,255,255,0.05)";
            item.style.background = "rgba(255,255,255,0.02)";
            
            if (val === correctVal) {
                item.style.borderColor = "#2ecc71";
                item.style.background = "rgba(46, 204, 113, 0.08)";
                const textNode = item.querySelector(".option-text");
                if (textNode && !textNode.innerHTML.includes("✔️")) {
                    textNode.innerHTML += ' <span style="color:#2ecc71; font-weight:bold;">(Jawaban Benar) ✔️</span>';
                }
            } else if (input.checked) {
                item.style.borderColor = "#e74c3c";
                item.style.background = "rgba(231, 76, 60, 0.08)";
                const textNode = item.querySelector(".option-text");
                if (textNode && !textNode.innerHTML.includes("❌")) {
                    textNode.innerHTML += ' <span style="color:#e74c3c; font-weight:bold;">(Jawaban Anda) ❌</span>';
                }
            }
        });
    }
}
