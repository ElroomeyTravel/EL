/* ==========================================================================
   Javascript Logic for TOEFL Listening Practice Test - EL-Roomey Course
   ========================================================================== */

const CONFIG = {
    whatsappNumber: "6285800734579",
    examDurationSeconds: 37 * 60
};

// 1. VOICES AUDIO SCRIPTS (TTS SIMULATION)
const VOICES_SCRIPTS = {
    // Part A: Short Conversations (1-30)
    1: { woman: "Are you finished with the report yet?", man: "Not quite, but I should be done by the end of the hour.", narrator: "What does the man imply?" },
    2: { man: "I'd like to sign up for the molecular biology course.", woman: "I'm sorry, but that class filled up yesterday.", narrator: "What does the woman mean?" },
    3: { woman: "How was your flight to Chicago?", man: "The turbulence was so bad I couldn't read or sleep at all.", narrator: "What does the man mean?" },
    4: { man: "Would you like some help moving those boxes?", woman: "Thanks, but my brother is coming over to help me in a few minutes.", narrator: "What will the woman probably do?" },
    5: { woman: "Can you recommend a good place to eat near the campus?", man: "The Italian restaurant on Main Street has great food, but it's a bit pricey.", narrator: "What does the man suggest about the restaurant?" },
    6: { man: "Do you have the key to the conference room?", woman: "You should ask Mr. Johnson; he usually keeps it in his office.", narrator: "What does the woman suggest the man do?" },
    7: { woman: "I hope we don't miss the beginning of the movie.", man: "Don't worry, the theater is only a five-minute walk from here.", narrator: "What does the man mean?" },
    8: { man: "Did you buy the newspaper today?", woman: "I tried to, but the store was completely out of them.", narrator: "What does the woman mean?" },
    9: { woman: "Should we invite Mark to the party?", man: "He mentioned yesterday that he had to study for his history exam all weekend.", narrator: "What does the man imply about Mark?" },
    10: { man: "I'm really tired of eating cafeteria food.", woman: "Why don't we try that new sushi restaurant down the street?", narrator: "What does the woman suggest?" },
    11: { woman: "I can't believe how cold it is outside.", man: "You'd better put on a heavy coat before you leave.", narrator: "What does the man advise the woman to do?" },
    12: { man: "Did you hear that Professor Davis is retiring?", woman: "Really? He has been teaching here for over thirty years.", narrator: "What does the woman react to?" },
    13: { woman: "I need to get these documents photocopied as soon as possible.", man: "The copy machine down the hall is out of order, but there is another one on the third floor.", narrator: "What does the man suggest the woman do?" },
    14: { man: "I'm looking for a gift for my sister's graduation.", woman: "A nice watch or a leather portfolio is always a popular choice.", narrator: "What does the woman do?" },
    15: { woman: "Did you manage to repair your computer?", man: "No, I had to take it to a professional repair shop yesterday.", narrator: "What did the man do?" },
    16: { man: "The traffic on the highway was terrible this morning.", woman: "It's always bad during rush hour; you should try taking the back roads next time.", narrator: "What does the woman suggest?" },
    17: { woman: "I'm thinking of joining the tennis club.", man: "It's a great club, but the annual membership fee is quite high.", narrator: "What does the man imply?" },
    18: { man: "Has the postman delivered the mail yet?", woman: "Yes, but there was nothing in the mailbox except for some advertisements.", narrator: "What does the woman mean?" },
    19: { woman: "Could you tell me how to get to the chemistry building?", man: "I'm actually heading there right now to turn in a lab report; just follow me.", narrator: "What does the man offer to do?" },
    20: { man: "I'd like to book a flight to Paris for next Friday.", woman: "All flights for next Friday are fully booked, but I can check for Saturday.", narrator: "What does the woman mean?" },
    21: { woman: "Are you planning to go to the concert tonight?", man: "I'd love to, but I have to work the night shift at the hospital.", narrator: "What will the man probably do tonight?" },
    22: { man: "I need to find a new apartment before my lease expires next month.", woman: "The local newspaper usually has a lot of rental listings in the Saturday edition.", narrator: "What does the woman suggest the man do?" },
    23: { woman: "I'm exhausted from studying for this biology exam.", man: "Why don't you take a short break and walk around the campus?", narrator: "What does the man suggest?" },
    24: { man: "Did you enjoy the guest speaker's presentation?", woman: "His slides were great, but it was hard to hear him from the back of the room.", narrator: "What was the problem with the presentation?" },
    25: { woman: "I need to buy some ingredients for the cake.", man: "The grocery store is closed today, but the convenience store down the street is open.", narrator: "What does the man imply?" },
    26: { man: "I really need to get my car washed.", woman: "It's supposed to rain tomorrow, so you might want to wait a couple of days.", narrator: "What does the woman suggest the man do?" },
    27: { woman: "Do you have the phone number for the campus health center?", man: "It's listed on the back of your student ID card.", narrator: "What does the man mean?" },
    28: { man: "I was hoping to meet with Professor Green during his office hours today.", woman: "He had to leave campus early for a faculty meeting, but he'll be back tomorrow.", narrator: "What does the woman say about Professor Green?" },
    29: { woman: "Could you help me move this desk to the corner?", man: "I'd like to, but I have a bad back and shouldn't lift anything heavy.", narrator: "What does the man imply?" },
    30: { man: "I'm thinking of buying a used bicycle from the local shop.", woman: "You should check online first; you might find a better deal there.", narrator: "What does the woman suggest?" },

    // Part B: Long Conversations
    "long-1": {
        man: "Hi, Diana. Did you attend the student council meeting yesterday?",
        woman: "Yes, I did, Steve. We discussed the new campus recycling program.",
        narrator: "Now Steve and Diana will talk about the university's recycling plans."
    },
    "long-2": {
        woman: "Hi, Kevin. Have you decided on your major yet?",
        man: "Not yet, Sarah. I'm torn between computer science and environmental science.",
        narrator: "Now Kevin and Sarah will discuss geographic information systems and campus science research."
    },

    // Part C: Talks
    "talk-1": {
        narrator: "Listen to a lecture by an astronomy professor about the planet Mars.",
        man: "Good morning, class. Today we're going to discuss the planet Mars, often referred to as the Red Planet due to the iron oxide on its surface. Mars is the fourth planet from the Sun and has long fascinated scientists because of its similarities to Earth. It has a thin atmosphere, polar ice caps, and evidence of ancient water flows. One of the most notable features of Mars is Olympus Mons, which is the largest volcano in the solar system. It is three times taller than Mount Everest. Over the years, numerous robotic missions, including rovers like Curiosity and Perseverance, have been sent to explore Mars. These missions aim to search for signs of past microbial life and study the planet's geology. In the future, space agencies hope to send human missions to Mars, which presents massive technical challenges, particularly in terms of life support and radiation protection. For your homework, please read chapter five about Mars' atmosphere."
    },
    "talk-2": {
        narrator: "Listen to a guide speaking to a group of tourists at a national park.",
        woman: "Welcome to Yellowstone National Park, everyone! As the world's first national park, established in 1872, Yellowstone is famous for its wildlife and geothermal features. The park sits on top of a giant supervolcano, which heats underground water and produces the geysers and hot springs we see today. The most famous geyser in the park is Old Faithful. It was named in 1870 because its eruptions are highly predictable, occurring approximately every 90 minutes. Each eruption can shoot boiling water up to 55 meters in the air and lasts for several minutes. While walking around the geyser basin, it is extremely important that you stay on the designated wooden boardwalks. The ground is very thin, and the water beneath is boiling hot and highly acidic. Stepping off the boardwalk is not only illegal but also extremely dangerous. After our stop at Old Faithful, we will proceed to the Grand Prismatic Spring, the largest hot spring in the United States, known for its vibrant colors."
    },
    "talk-3": {
        narrator: "Listen to a lecture by a biology professor about honeybees.",
        man: "Today, we're going to examine the fascinating social structure of honeybees. A honeybee colony is a highly organized society consisting of three types of bees: the queen, drones, and worker bees. The queen is the only fertile female in the hive, and her primary role is to lay eggs—sometimes up to 2,000 eggs a day. Drones are male bees whose sole purpose is to mate with the queen. The vast majority of the hive consists of worker bees, which are sterile females. Worker bees perform all the tasks necessary to maintain the hive, including foraging for nectar, building honeycomb, cleaning, and defending the colony. Honeybees are also famous for their unique method of communication known as the 'waggle dance'. When a worker bee finds a rich source of nectar, she returns to the hive and performs a figure-eight dance. The angle and duration of the dance communicate the exact direction and distance of the food source relative to the sun. This cooperative behavior is essential for the survival of the colony."
    }
};

// 2. ANSWER KEY (Q1-Q50)
const CORRECT_ANSWERS = {
    q1: "B", q2: "C", q3: "B", q4: "D", q5: "C",
    q6: "B", q7: "B", q8: "B", q9: "C", q10: "B",
    q11: "B", q12: "D", q13: "B", q14: "A", q15: "C",
    q16: "C", q17: "C", q18: "B", q19: "B", q20: "B",
    q21: "C", q22: "B", q23: "B", q24: "B", q25: "B",
    q26: "B", q27: "B", q28: "B", q29: "B", q30: "B",
    q31: "B", q32: "C", q33: "C", q34: "B",
    q35: "B", q36: "C", q37: "A", q38: "C",
    q39: "B", q40: "B", q41: "C", q42: "C",
    q43: "B", q44: "B", q45: "C", q46: "B",
    q47: "B", q48: "C", q49: "B", q50: "B"
};

let currentPlayingId = null;
let examTimerInterval = null;
let remainingExamSeconds = CONFIG.examDurationSeconds;
let isQuizSubmitted = false;

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    initNavigationGrid();
    initAudioSimulation();
    initToggleScripts();
    initProgressTracker();
    initQuizSubmit();
    initExamTimer();
    initNavbarSticky();
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

    for (let i = 1; i <= 50; i++) {
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
    const safeSeconds = Math.max(remainingExamSeconds, 0);
    const minutes = Math.floor(safeSeconds / 60);
    const seconds = safeSeconds % 60;

    if (timer) {
        timer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    if (timerCard) {
        timerCard.classList.toggle("is-warning", safeSeconds <= 300);
    }
}

// --- TTS AUDIO SIMULATION ---
function initAudioSimulation() {
    const playButtons = document.querySelectorAll(".play-audio-btn");
    
    playButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const id = btn.getAttribute("data-audio-id");
            
            if (currentPlayingId === id) {
                window.speechSynthesis.cancel();
                resetPlayButtons();
                currentPlayingId = null;
                return;
            }

            resetPlayButtons();
            currentPlayingId = id;
            
            if (id.startsWith("long-") || id.startsWith("talk-")) {
                playLongAudio(id, btn);
            } else {
                playDialogue(id, btn);
            }
        });
    });
}

function resetPlayButtons() {
    const playButtons = document.querySelectorAll(".play-audio-btn");
    playButtons.forEach(btn => {
        btn.innerHTML = '<i class="fas fa-play"></i>';
    });
}

// Play Short Dialogue (Part A)
function playDialogue(id, playButton) {
    if (!window.speechSynthesis) {
        alert("Speech synthesis is not supported in this browser. Please read the script using the 'Show Script' button.");
        return;
    }
    
    window.speechSynthesis.cancel();
    const script = VOICES_SCRIPTS[id];
    if (!script) return;
    
    playButton.innerHTML = '<i class="fas fa-stop"></i>';
    
    const speakUtterance = (text, rate, pitch, callback) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.onend = () => {
            if (currentPlayingId === id) callback();
        };
        utterance.onerror = () => {
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            currentPlayingId = null;
        };
        window.speechSynthesis.speak(utterance);
    };
    
    const speaker1Text = (id % 2 === 0) ? script.man : script.woman;
    const speaker1Pitch = (id % 2 === 0) ? 0.9 : 1.15;
    
    const speaker2Text = (id % 2 === 0) ? script.woman : script.man;
    const speaker2Pitch = (id % 2 === 0) ? 1.15 : 0.9;

    speakUtterance(speaker1Text, 0.9, speaker1Pitch, () => {
        setTimeout(() => {
            if (currentPlayingId !== id) return;
            speakUtterance(speaker2Text, 0.9, speaker2Pitch, () => {
                setTimeout(() => {
                    if (currentPlayingId !== id) return;
                    speakUtterance(script.narrator, 0.85, 1.0, () => {
                        playButton.innerHTML = '<i class="fas fa-play"></i>';
                        currentPlayingId = null;
                    });
                }, 800);
            });
        }, 800);
    });
}

// Play Long Audio (Part B / Part C)
function playLongAudio(id, playButton) {
    if (!window.speechSynthesis) {
        alert("Speech synthesis is not supported in this browser.");
        return;
    }
    
    window.speechSynthesis.cancel();
    const script = VOICES_SCRIPTS[id];
    if (!script) return;
    
    playButton.innerHTML = '<i class="fas fa-stop"></i>';
    
    const speakUtterance = (text, rate, pitch, callback) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.onend = () => {
            if (currentPlayingId === id) callback();
        };
        utterance.onerror = () => {
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            currentPlayingId = null;
        };
        window.speechSynthesis.speak(utterance);
    };

    if (id.startsWith("long-")) {
        // Dialogue between man and woman
        speakUtterance(script.man, 0.9, 0.9, () => {
            setTimeout(() => {
                if (currentPlayingId !== id) return;
                speakUtterance(script.woman, 0.9, 1.15, () => {
                    playButton.innerHTML = '<i class="fas fa-play"></i>';
                    currentPlayingId = null;
                });
            }, 800);
        });
    } else {
        // Single speaker (Talk)
        const speakerText = script.narrator + " " + script.man || script.woman;
        const pitchVal = script.man ? 0.9 : 1.15;
        speakUtterance(speakerText, 0.9, pitchVal, () => {
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            currentPlayingId = null;
        });
    }
}

// --- TOGGLE SHOW/HIDE SCRIPT ---
function initToggleScripts() {
    const toggleBtns = document.querySelectorAll(".toggle-script-btn");
    
    toggleBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            const scriptBox = document.getElementById(targetId);
            
            if (scriptBox) {
                const isVisible = scriptBox.style.display === "block";
                scriptBox.style.display = isVisible ? "none" : "block";
                btn.textContent = isVisible ? "Show Script" : "Hide Script";
            }
        });
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
    
    for (let i = 1; i <= 50; i++) {
        const radioChecked = document.querySelector(`input[name="q${i}"]:checked`);
        const navBtn = document.getElementById(`nav-num-${i}`);
        
        if (radioChecked) {
            answeredCount++;
            if (navBtn) navBtn.classList.add("answered");
        } else {
            if (navBtn) navBtn.classList.remove("answered");
        }
    }

    const percent = Math.round((answeredCount / 50) * 100);
    
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");
    const percentText = document.getElementById("percentText");

    if (progressBar) progressBar.style.width = `${percent}%`;
    if (progressText) progressText.textContent = `${answeredCount} of 50 Answered`;
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

    window.speechSynthesis.cancel();
    resetPlayButtons();
    currentPlayingId = null;

    let score = 0;
    
    for (let i = 1; i <= 50; i++) {
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
    let desc = "Skor Anda berada di tingkat awal. Persiapan terencana sangat direkomendasikan untuk meningkatkan pemahaman struktur tata bahasa, kosakata, serta kemampuan mendengar Anda.";
    
    if (score >= 16 && score <= 30) {
        rating = "HIGH BASIC";
        scoreRange = "430 - 490";
        ratingColor = "#e67e22";
        desc = "Kerja bagus! Anda sudah memiliki pemahaman dasar yang cukup baik. Perbanyak latihan strategi mendengar untuk memperkuat skor Anda di atas 500.";
    } else if (score >= 31 && score <= 42) {
        rating = "INTERMEDIATE";
        scoreRange = "500 - 570";
        ratingColor = "#d4af37";
        desc = "Luar biasa! Kemampuan menyimak Anda berada di tingkat menengah. Dapatkan tips strategis untuk menyaring informasi tersirat guna mencapai skor 580+.";
    } else if (score >= 43) {
        rating = "ADVANCED";
        scoreRange = "580 - 677";
        ratingColor = "#2ecc71";
        desc = "Sangat memukau! Anda menguasai seluruh aspek Listening TOEFL dengan sempurna. Anda siap menghadapi ujian resmi kapan pun!";
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
            ? "Waktu pengerjaan 37 menit telah selesai. Jawaban Anda otomatis dikirim."
            : "Berikut adalah hasil evaluasi TOEFL Listening Anda";
    }
    if (resultScore) resultScore.textContent = `${score}/50`;
    if (resultRating) {
        resultRating.textContent = `${rating} (Estimasi TOEFL: ${scoreRange})`;
        resultRating.style.color = ratingColor;
    }
    if (resultDesc) resultDesc.textContent = desc;

    if (waShareBtn) {
        const submitStatus = autoSubmitted ? "Terkirim otomatis karena waktu habis" : "Terkirim manual";
        const waText = `Halo EL-Roomey Course!

Saya baru saja menyelesaikan simulasi ujian TOEFL Listening (50 Soal) di website dengan hasil berikut:

Nama: (Tulis Nama Anda)
Skor Latihan: ${score} / 50
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
    for (let i = 1; i <= 50; i++) {
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
