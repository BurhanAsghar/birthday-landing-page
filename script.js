const CONFIG = {
    bestieName: "Kainat",
    quizQuestions: [
        {
            question: "Kainat ko sab se zyada kya pasand hai?",
            options: ["A) Good Food & Coffee ☕", "B) Coding & Tech 💻", "C) Sleeping peacefully 😴", "D) All of the above ✨"],
            correctIndex: 3
        },
        {
            question: "Kainat ka favorite color kya hai?",
            options: ["A) Royal Purple 💜", "B) Midnight Black 🖤", "C) Rose Pink 🌸", "D) Golden Luxury ✨"],
            correctIndex: 0
        },
        {
            question: "Kainat ka dream kya hai?",
            options: ["A) Building cool software 🚀", "B) Traveling the world 🌍", "C) Achieving great success ✨", "D) All of these 💜"],
            correctIndex: 3
        },
        {
            question: "Kainat ki sab se funny habit kya hai?",
            options: ["A) Overthinking everything 🤔", "B) Disappearing randomly 👻", "C) Laughing at weird jokes 😂", "D) Drinking endless tea/coffee ☕"],
            correctIndex: 2
        }
    ],
    wishes: [
        "❤️ May your smile always stay this beautiful.",
        "✨ May this year bring you endless happiness and success.",
        "🌸 May every dream you have come closer to reality.",
        "💜 May you always be surrounded by people who love and value you.",
        "🌟 May your 21st chapter be your absolute favorite one yet."
    ],
    memories: [
        {
            type: "image",
            src: "assets/memories/photo1.jpg",
        },
        {
            type: "image",
            src: "assets/memories/photo2.jpg",
        },
        {
            type: "video",
            src: "assets/memories/video1.mp4",
        }
    ],
    specialMessage: `Dear Bestie,\n\nThank you for being one of the most beautiful parts of my life.\nThank you for every laugh, every memory, every little moment, and for always being there.\nI hope this new chapter of your life brings you everything your heart wishes for.\nYou deserve happiness, peace, success, and countless beautiful moments.\n\nHappy 21st Birthday, Bestie. 💜`
};

document.addEventListener("DOMContentLoaded", () => {
    initGalaxyCanvas();
    initFireflies();
    setupNavigation();
    setupQuiz();
    setupCakeInteraction();
    setupWishes();
    setupMemoriesCarousel();
    setupLetterDone();
    setupEnvelope();
    setupBirthdayVideo();
});

function initGalaxyCanvas() {
    const canvas = document.getElementById("galaxy-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const stars = Array.from({ length: 150 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005
    }));

    function animate() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#080310";
        ctx.fillRect(0, 0, width, height);

        stars.forEach(star => {
            star.alpha += star.speed;
            if (star.alpha > 1 || star.alpha < 0.2) star.speed = -star.speed;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(244, 240, 255, ${star.alpha})`;
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

function initFireflies() {
    const container = document.getElementById("fireflies");
    if (!container) return;
    for (let i = 0; i < 20; i++) {
        const firefly = document.createElement("div");
        firefly.className = "firefly";
        firefly.style.left = `${Math.random() * 100}%`;
        firefly.style.top = `${Math.random() * 100}%`;
        firefly.style.animationDelay = `${Math.random() * 4}s`;
        container.appendChild(firefly);
    }
}

function setupNavigation() {
    const nextButtons = document.querySelectorAll(".next-btn");
    nextButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-next");
            transitionToSection(targetId);
        });
    });

    const startBtn = document.getElementById("start-btn");
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            transitionToSection("section-countdown");
        });
    }
}

function transitionToSection(targetId) {
    const currentActive = document.querySelector(".site-section.active");
    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    if (currentActive) {
        gsap.to(currentActive, {
            opacity: 0,
            scale: 0.95,
            duration: 0.6,
            onComplete: () => {
                currentActive.classList.remove("active");
                targetSection.classList.add("active");
                gsap.fromTo(targetSection, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.8 });

                if (targetId === "section-countdown") {
                    runCountdownSequence();
                }
                if (targetId === "section-ending") {
                    startEndingSequence();
                }
            }
        });
    } else {
        targetSection.classList.add("active");
    }
}

function runCountdownSequence() {
    const numEl = document.getElementById("countdown-number");
    const countdownScreen = document.getElementById("countdown-screen");
    const birthdayAnimation = document.getElementById("birthday-animation");
    if (!numEl || !countdownScreen || !birthdayAnimation) return;

    birthdayAnimation.style.display = "none";
    countdownScreen.style.opacity = "1";
    numEl.classList.remove("hidden");

    let count = 3;
    numEl.textContent = count;
    gsap.fromTo(numEl, { scale: 1.35, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2)" });

    const timer = setInterval(() => {
        count--;
        if (count > 0) {
            numEl.textContent = count;
            gsap.fromTo(numEl, { scale: 1.45, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2)" });
        } else {
            clearInterval(timer);
            gsap.to(countdownScreen, { opacity: 0, duration: 0.7, onComplete: () => {
                countdownScreen.style.display = "none";
                birthdayAnimation.style.display = "flex";
                startBirthdayAnimation();
            }});
        }
    }, 1000);
}

function startBirthdayAnimation() {
    const animation = document.getElementById("birthday-animation");
    const title = document.getElementById("birthday-title");
    const starsCanvas = document.getElementById("birthday-stars");
    const fireworksCanvas = document.getElementById("birthday-fireworks");
    const hearts = document.getElementById("birthday-hearts");
    if (!animation || !title || !starsCanvas || !fireworksCanvas || !hearts) return;

    title.style.opacity = "0";
    animation.style.opacity = "1";

    const starCtx = starsCanvas.getContext("2d");
    const fireCtx = fireworksCanvas.getContext("2d");
    const resize = () => {
        starsCanvas.width = fireworksCanvas.width = window.innerWidth;
        starsCanvas.height = fireworksCanvas.height = window.innerHeight;
    };
    resize();

    const stars = Array.from({ length: 190 }, () => ({
        x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
        r: Math.random() * 1.8 + .4, a: Math.random(), s: Math.random() * .018 + .008
    }));
    const starLoop = () => {
        starCtx.clearRect(0,0,starsCanvas.width,starsCanvas.height);
        stars.forEach(star => {
            star.a += star.s;
            if (star.a > 1 || star.a < .12) star.s *= -1;
            starCtx.beginPath(); starCtx.arc(star.x,star.y,star.r,0,Math.PI*2);
            starCtx.fillStyle = `rgba(255,255,255,${star.a})`; starCtx.fill();
        });
        requestAnimationFrame(starLoop);
    };
    starLoop();

    let particles = [];
    function createFirework() {
        const x = Math.random() * fireworksCanvas.width;
        const y = Math.random() * fireworksCanvas.height * .52 + 50;
        const colors = ["#ffffff", "#ff758c", "#ffb3d1", "#b19cd9", "#f6d6ff"];
        const color = colors[Math.floor(Math.random()*colors.length)];
        for (let i=0;i<80;i++) {
            const angle = Math.random()*Math.PI*2, speed = Math.random()*5+2;
            particles.push({x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life:95,color});
        }
    }
    const fireLoop = () => {
        fireCtx.fillStyle = "rgba(5,2,10,.18)";
        fireCtx.fillRect(0,0,fireworksCanvas.width,fireworksCanvas.height);
        particles = particles.filter(p => p.life > 0);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy; p.vy += .035; p.life--;
            fireCtx.globalAlpha = p.life/95; fireCtx.beginPath(); fireCtx.arc(p.x,p.y,2,0,Math.PI*2); fireCtx.fillStyle=p.color; fireCtx.fill();
        });
        fireCtx.globalAlpha=1; requestAnimationFrame(fireLoop);
    };
    fireLoop();
    createFirework();
    const fireworkTimer = setInterval(createFirework, 1100);

    const heartTimer = setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "birthday-float-heart"; heart.textContent = Math.random()>.5 ? "♥" : "❤";
        heart.style.left = `${Math.random()*90+5}%`; heart.style.top = "92%"; hearts.appendChild(heart);
        gsap.to(heart,{y:-(window.innerHeight*.85),x:Math.random()*120-60,rotation:Math.random()*80-40,opacity:.9,duration:5+Math.random()*3,ease:"none",onComplete:()=>heart.remove()});
    }, 650);

    gsap.fromTo(title,{opacity:0,scale:.88,y:20},{opacity:1,scale:1,y:0,duration:1.3,ease:"power3.out",delay:.5});
    gsap.to(title,{textShadow:"0 0 18px #fff, 0 0 42px #ff758c, 0 0 85px #b19cd9",duration:1.4,repeat:2,yoyo:true,delay:1.8});

    setTimeout(() => {
        clearInterval(fireworkTimer); clearInterval(heartTimer);
        gsap.to(animation,{opacity:0,duration:1.2,onComplete:()=>{
            animation.style.display="none"; animation.style.opacity="1";
            transitionToSection("section-quiz");
        }});
    }, 7000);
}

function setupQuiz() {
    setupSpecialQuiz();
}

function setupSpecialQuiz() {
    const yes = document.getElementById("special-yes");
    const no = document.getElementById("special-no");
    const special = document.getElementById("special-quiz");
    const reveal = document.getElementById("special-reveal");
    if (!yes || !no || !special || !reveal) return;

    // YES + NO start together. NO moves ONLY when the cursor touches NO.
    let lastMove = 0;

    const moveNoButton = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const now = Date.now();
        if (now - lastMove < 400) return;
        lastMove = now;

        const rect = no.getBoundingClientRect();
        const margin = 20;
        const topSafe = 75;
        const maxX = Math.max(margin, window.innerWidth - rect.width - margin);
        const maxY = Math.max(topSafe, window.innerHeight - rect.height - margin);

        const pointerX = e.clientX;
        const pointerY = e.clientY;

        let x, y, tries = 0;
        do {
            x = margin + Math.random() * Math.max(1, maxX - margin);
            y = topSafe + Math.random() * Math.max(1, maxY - topSafe);
            tries++;
        } while (
            Math.hypot(
                (x + rect.width / 2) - pointerX,
                (y + rect.height / 2) - pointerY
            ) < 170 && tries < 50
        );

        no.style.position = "fixed";
        no.style.left = `${Math.min(x, maxX)}px`;
        no.style.top = `${Math.min(y, maxY)}px`;
        no.style.right = "auto";
        no.style.bottom = "auto";
        no.style.visibility = "visible";
        no.style.display = "inline-flex";
        no.style.pointerEvents = "auto";
        no.style.zIndex = "99999";

        gsap.fromTo(no,
            { scale: .88, rotation: Math.random() * 10 - 5 },
            { scale: 1, rotation: 0, duration: .25, ease: "back.out(1.6)" }
        );
    };

    // This is the ONLY event that moves NO.
    no.addEventListener("mouseenter", moveNoButton);

    // NO is never clickable.
    no.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
    });

    // Initial position: normal flow, directly beside YES.
    no.style.position = "relative";
    no.style.left = "auto";
    no.style.top = "auto";
    no.style.right = "auto";
    no.style.bottom = "auto";
    no.style.visibility = "visible";
    no.style.display = "inline-flex";
    no.style.pointerEvents = "auto";
    no.style.zIndex = "2";

    yes.addEventListener("click", () => {
        // NO belongs only to the quiz. Remove it BEFORE the I KNEW IT reveal
        // so it can never appear on the next section/page.
        no.remove();

        gsap.to(special, {
            opacity: 0,
            scale: .94,
            duration: .45,
            onComplete: () => {
                special.classList.add("hidden");

                // Show the reveal immediately and reliably.
                reveal.classList.remove("hidden");
                reveal.style.display = "block";
                reveal.style.visibility = "visible";
                reveal.style.opacity = "1";

                const revealImageWrap = reveal.querySelector(".reveal-image-wrap");
                const revealImage = reveal.querySelector(".reveal-image");

                gsap.fromTo(reveal,
                    { opacity: 0, y: 25, scale: .96 },
                    { opacity: 1, y: 0, scale: 1, duration: .8, ease: "power2.out" }
                );

                if (revealImageWrap) {
                    gsap.fromTo(revealImageWrap,
                        { opacity: 0, scale: .82, y: 18 },
                        { opacity: 1, scale: 1, y: 0, duration: 1, delay: .15, ease: "back.out(1.5)" }
                    );
                }

                if (revealImage) {
                    revealImage.style.display = "block";
                    revealImage.style.visibility = "visible";
                    gsap.fromTo(revealImage,
                        { scale: 1.06 },
                        { scale: 1, duration: 1.2, delay: .2, ease: "power2.out" }
                    );
                }

                // After the GIF/reveal has been visible, continue automatically.
                setTimeout(() => {
                    transitionToSection("section-cake");
                }, 4200);
            }
        });
    });
}

function setupCakeInteraction() {
    const candle = document.getElementById("interactive-candle");
    const flame = document.getElementById("candle-flame");
    const smoke = document.getElementById("candle-smoke");
    const hint = document.getElementById("cake-instruction");
    const nextBtn = document.getElementById("cake-next-btn");
    
    if (!candle || !flame || !smoke || !hint || !nextBtn) return;
    let extinguished = false;

    candle.addEventListener("click", () => {
        if (extinguished) return;
        extinguished = true;

        flame.style.display = "none";
        gsap.to(smoke, { opacity: 1, y: -25, scale: 2, duration: 1, ease: "power2.out" });
        hint.textContent = "Your wish is on its way... ✨";
        
        if (typeof confetti === "function") {
            confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        }

        setTimeout(() => {
            nextBtn.classList.remove("hidden");
        }, 800);
    });

    nextBtn.addEventListener("click", () => {
        transitionToSection("section-wishes");
    });
}
function setupWishes() {
    const container = document.getElementById("wishes-container");
    if (!container) return;
    container.innerHTML = CONFIG.wishes.map(wish => `<div class="wish-card">${wish}</div>`).join('');
}

let currentSlide = 0;

function setupMemoriesCarousel() {
    const track = document.getElementById("carousel-track");
    if (!track) return;

    track.innerHTML = CONFIG.memories.map((mem, index) => {
        if (mem.type === "video") {
            return `
                <div class="carousel-slide">
                    <video src="${mem.src}" controls playsinline preload="metadata"
                        onloadeddata="this.closest('.carousel-slide').classList.add('media-ready')"
                        onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden')"></video>
                    <div class="media-placeholder hidden">
                        <div class="placeholder-icon">🎬</div>
                        <h3>Add Memory Video</h3>
                        <p>Replace <strong>${mem.src}</strong> with your own video.</p>
                    </div>
                    <div class="slide-caption">${mem.caption}</div>
                </div>
            `;
        }

        return `
            <div class="carousel-slide">
                <img src="${mem.src}" alt="Memory ${index + 1}"
                    onload="this.closest('.carousel-slide').classList.add('media-ready')"
                    onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden')">
                <div class="media-placeholder hidden">
                    <div class="placeholder-icon">📸</div>
                    <h3>Add Memory Photo ${index + 1}</h3>
                    <p>Replace <strong>${mem.src}</strong> with your own photo.</p>
                </div>
                <div class="slide-caption">${mem.caption}</div>
            </div>
        `;
    }).join('');

    updateCarousel();

    const nextMemBtn = document.getElementById("next-memory");
    const prevMemBtn = document.getElementById("prev-memory");

    if (nextMemBtn) {
        nextMemBtn.addEventListener("click", () => {
            currentSlide = (currentSlide + 1) % CONFIG.memories.length;
            updateCarousel();
        });
    }

    if (prevMemBtn) {
        prevMemBtn.addEventListener("click", () => {
            currentSlide = (currentSlide - 1 + CONFIG.memories.length) % CONFIG.memories.length;
            updateCarousel();
        });
    }
}

function updateCarousel() {
    const track = document.getElementById("carousel-track");
    const counter = document.getElementById("memory-counter");
    if (!track || !counter) return;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    counter.textContent = `${currentSlide + 1} / ${CONFIG.memories.length}`;
}

function setupLetterDone() {
    const doneBtn = document.getElementById("letter-done-btn");
    if (!doneBtn) return;
    doneBtn.addEventListener("click", () => transitionToSection("section-video"));
}

function setupEnvelope() {
    const btn = document.getElementById("open-letter-btn");
    const envelope = document.getElementById("envelope");
    const stage = document.getElementById("envelope-stage");
    const reveal = document.getElementById("letter-reveal");
    if (!btn || !envelope || !stage || !reveal) return;

    btn.addEventListener("click", () => {
        btn.disabled = true;
        envelope.classList.add("open");
        gsap.to(btn, { opacity: 0, y: 12, duration: .35 });
        setTimeout(() => {
            gsap.to(stage, { opacity: 0, y: -20, duration: .55, onComplete: () => {
                stage.style.display = "none";
                reveal.style.display = "block";
                gsap.fromTo(reveal, { opacity:0, y:25, scale:.98 }, { opacity:1, y:0, scale:1, duration:.8, ease:"power3.out" });
                startTypingEffect();
            }});
        }, 750);
    });
}

function startTypingEffect() {
    const target = document.getElementById("typed-message");
    const doneBtn = document.getElementById("letter-done-btn");
    const signature = document.querySelector(".letter-signature");
    if (!target || !doneBtn) return;

    target.innerHTML = "";
    doneBtn.classList.add("hidden");
    if (signature) {
        signature.style.opacity = "0";
        signature.style.transform = "translateY(12px)";
    }

    let i = 0;
    const text = CONFIG.specialMessage;

    function type() {
        if (i < text.length) {
            target.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
            i++;
            setTimeout(type, 24);
        } else {
            if (signature) {
                gsap.to(signature, { opacity: 1, y: 0, duration: .8, ease: "power2.out" });
            }
            setTimeout(() => doneBtn.classList.remove("hidden"), 700);
        }
    }
    type();
}

function setupBirthdayVideo() {
    const frame = document.querySelector(".birthday-video-frame");
    const video = document.getElementById("birthday-video");
    if (!frame || !video) return;

    const markReady = () => frame.classList.add("has-video");
    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);
    video.addEventListener("error", () => frame.classList.remove("has-video"));

    if (video.readyState >= 2) markReady();
}

function startEndingSequence() {
    const seq1 = document.getElementById("ending-sequence-1");
    const seq2 = document.getElementById("ending-sequence-2");
    if (!seq1 || !seq2) return;

    seq1.classList.remove("hidden");
    seq2.classList.add("hidden");

    gsap.fromTo(seq1,
        { opacity: 0, y: 35, scale: .96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
    );

    if (typeof confetti === "function") {
        confetti({ particleCount: 120, spread: 90, origin: { y: .55 } });
    }

    setTimeout(() => {
        gsap.to(seq1, {
            opacity: 0,
            y: -25,
            duration: .9,
            ease: "power2.in",
            onComplete: () => {
                seq1.classList.add("hidden");
                seq2.classList.remove("hidden");
                gsap.fromTo(seq2,
                    { opacity: 0, scale: .82, y: 25 },
                    { opacity: 1, scale: 1, y: 0, duration: 1.25, ease: "back.out(1.5)" }
                );
                if (typeof confetti === "function") {
                    confetti({ particleCount: 160, spread: 110, origin: { y: .5 } });
                }
            }
        });
    }, 3500);
}

