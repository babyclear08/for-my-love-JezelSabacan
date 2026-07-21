// Global State
let currentSection = 1;
let selectedDate = '';
let selectedActivity = '';
let selectedLocation = '';
let musicStarted = false;
let audio = null;

const loveLetterText = `My Dearest Jezel,

I know life hasn't been easy lately.

You've been tired.

You've been stressed.

But I hope this little surprise can make you smile today.

Thank you for choosing me.

Thank you for loving me.

Every day with you becomes my favorite memory.

I don't need perfect places.

I don't need perfect moments.

As long as I have you,
everything becomes perfect.

I love you more than yesterday,
but not as much as tomorrow.

Forever yours,

Baby Clear Jong ❤️`;

// Mobile Detection
function detectMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|phone/i;
    const isMobile = mobileRegex.test(userAgent.toLowerCase());
    const isSmallScreen = window.innerWidth <= 768;
    const isTouchDevice = () => {
        return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    };
    return isMobile || (isSmallScreen && isTouchDevice());
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded fired');

    // Get audio element after DOM is ready
    audio = document.getElementById('bgMusic');
    console.log('Audio element:', audio);

    const isMobileDevice = detectMobileDevice();
    const desktopBlock = document.getElementById('desktopBlock');
    const mobileContent = document.getElementById('mobileContent');

    if (isMobileDevice) {
        desktopBlock.classList.add('hidden');
        mobileContent.style.display = 'block';
        setTimeout(() => initializeWebsite(), 300);
    } else {
        desktopBlock.classList.remove('hidden');
        mobileContent.style.display = 'none';
    }
});

function initializeWebsite() {
    console.log('Initializing website...');
    setupEventListeners();
    initializeBackgroundElements();
    loadFromLocalStorage();
    console.log('Website initialized');
}

// FIX: This function is called directly from the HTML's
// onclick="openMessage()" on the very first button. It was previously
// missing, which caused a ReferenceError (and a "stuck" button) if the
// button was tapped before setupEventListeners() finished rebinding it.
function openMessage() {
    playMusicAndGo();
}

function setupEventListeners() {
    console.log('Setting up event listeners...');

    // Open Message button (backup binding in case inline onclick is
    // ever removed from the HTML — openMessage() above covers the
    // inline handler path)
    const openMessageBtn = document.querySelector('.notification-btn');
    if (openMessageBtn) {
        openMessageBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('✓ Open Message clicked!');
            playMusicAndGo();
            return false;
        };
    }

    // Activity cards
    document.querySelectorAll('.activity-card').forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            const activity = this.getAttribute('data-activity');
            if (activity === 'other') {
                document.getElementById('otherInputContainer').style.display = 'flex';
            } else {
                selectActivity(activity);
            }
            return false;
        };
    });

    // Location cards
    document.querySelectorAll('.location-card').forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            selectLocation(this.getAttribute('data-location'));
            return false;
        };
    });

    // No button
    const noBtn = document.getElementById('noBtn');
    if (noBtn) {
        noBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            moveNoButton();
            return false;
        };
    }

    console.log('✓ Event listeners set up');
}

function playMusicAndGo() {
    console.log('playMusicAndGo called');

    // Try to play music
    if (audio && !musicStarted) {
        try {
            console.log('Attempting to play audio...');
            audio.currentTime = 0;
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('✓ Music started successfully');
                        musicStarted = true;
                        audio.loop = true;
                    })
                    .catch(error => {
                        console.log('✗ Autoplay prevented (normal on some browsers):', error.message);
                        musicStarted = true;
                    });
            }
        } catch (error) {
            console.log('✗ Error playing music:', error);
            musicStarted = true;
        }
    }

    // Go to section 2 after a short delay
    setTimeout(() => {
        console.log('Navigating to section 2');
        goToSection(2);
    }, 200);
}

function goToSection(sectionNumber) {
    console.log('goToSection:', sectionNumber);

    const current = document.getElementById(`section${currentSection}`);
    if (current) {
        current.classList.remove('active');
    }

    currentSection = sectionNumber;

    const next = document.getElementById(`section${sectionNumber}`);
    if (next) {
        next.classList.add('active');
        console.log('✓ Section', sectionNumber, 'is active');

        if (sectionNumber === 3) {
            setTimeout(() => startTypewriter(), 200);
        } else if (sectionNumber === 4) {
            setTimeout(() => startSlideshow(), 200);
        } else if (sectionNumber === 9) {
            setTimeout(() => {
                showConfetti();
                setTimeout(() => goToSection(10), 1500);
            }, 2000);
        } else if (sectionNumber === 10) {
            setTimeout(() => goToSection(11), 2500);
        } else if (sectionNumber === 11) {
            displaySummary();
        }
    }

    window.scrollTo(0, 0);
}

function startTypewriter() {
    const elem = document.getElementById('typewriter');
    if (!elem) return;

    elem.textContent = '';
    let i = 0;

    function type() {
        if (i < loveLetterText.length) {
            elem.textContent += loveLetterText[i++];
            setTimeout(type, 30);
        }
    }

    type();
}

let currentSlide = 0;
let slideshowInterval;

function startSlideshow() {
    const slides = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'];
    currentSlide = 0;
    clearInterval(slideshowInterval);
    const img = document.getElementById('slideshow-image');
    if (img) {
        img.src = slides[0];
        slideshowInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            img.style.animation = 'none';
            setTimeout(() => {
                img.src = slides[currentSlide];
                img.style.animation = 'fadeInImage 0.8s ease-in';
            }, 10);
        }, 3000);
    }
}

function moveNoButton() {
    const btn = document.getElementById('noBtn');
    if (!btn) return;
    const x = (Math.random() * 200 - 100);
    const y = (Math.random() * 150 - 75);
    btn.style.transform = `translate(${x}px, ${y}px)`;
}

function selectActivity(activity) {
    selectedActivity = activity;
    saveToLocalStorage();

    document.querySelectorAll('.activity-card').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.activity-card').forEach(c => {
        if (c.getAttribute('data-activity') === activity) c.classList.add('selected');
    });

    const continueBtn = document.getElementById('activityContinue');
    if (continueBtn) continueBtn.style.display = 'block';

    const container = document.getElementById('otherInputContainer');
    if (container) container.style.display = 'none';
}

function toggleOtherInput() {
    const container = document.getElementById('otherInputContainer');
    if (container) {
        container.style.display = container.style.display === 'none' ? 'flex' : 'none';
    }
}

function selectActivityOther() {
    const input = document.getElementById('otherActivityInput');
    if (input && input.value.trim()) {
        selectedActivity = input.value.trim();
        saveToLocalStorage();

        const continueBtn = document.getElementById('activityContinue');
        if (continueBtn) continueBtn.style.display = 'block';

        const container = document.getElementById('otherInputContainer');
        if (container) container.style.display = 'none';
    }
}

function selectLocation(location) {
    selectedLocation = location;
    saveToLocalStorage();

    document.querySelectorAll('.location-card').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.location-card').forEach(c => {
        if (c.getAttribute('data-location') === location) c.classList.add('selected');
    });

    const continueBtn = document.getElementById('locationContinue');
    if (continueBtn) continueBtn.style.display = 'block';
}

function validateDateAndContinue() {
    const picker = document.getElementById('datePicker');
    if (picker && picker.value) {
        selectedDate = picker.value;
        saveToLocalStorage();
        goToSection(7);
    } else {
        alert('Please select a date ❤️');
    }
}

function displaySummary() {
    const content = document.getElementById('summaryContent');
    if (!content) return;

    const dateObj = new Date(selectedDate);
    const formatted = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    content.innerHTML = `
        <div style="margin-bottom: 15px;">
            <strong>📅 Date:</strong><br>${formatted}
        </div>
        <div style="margin-bottom: 15px;">
            <strong>Activity:</strong><br>${selectedActivity}
        </div>
        <div style="margin-bottom: 15px;">
            <strong>📍 Location:</strong><br>${selectedLocation}
        </div>
    `;
}

function showConfetti() {
    const confettiCount = 50;
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = ['#FFB6C1', '#FF69B4', '#FF1493', '#B76E79', '#FFF0F5'][Math.floor(Math.random() * 5)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.zIndex = '1000';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3500);
    }
}

// FIX: the confetti/heart intervals below used to run forever once the
// final section was reached. They're now capped at 30 seconds so the
// page doesn't keep spawning DOM elements indefinitely if left open.
function finalCelebration() {
    const final = document.getElementById('sectionFinal');
    const section12 = document.getElementById('section12');
    if (final) final.classList.add('active');
    if (section12) section12.classList.remove('active');

    createHeartExplosion();
    showConfetti();

    const confettiInterval = setInterval(() => showConfetti(), 2000);
    setTimeout(() => clearInterval(confettiInterval), 30000);
}

function createHeartExplosion() {
    const heartInterval = setInterval(() => {
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.textContent = '❤️';
            heart.style.position = 'fixed';
            heart.style.fontSize = Math.random() * 40 + 20 + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '100';
            heart.style.animation = `heartFloat ${3 + Math.random() * 2}s ease-out forwards`;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 5000);
        }
    }, 300);
    setTimeout(() => clearInterval(heartInterval), 30000);
}

function initializeBackgroundElements() {
    createFloatingHearts();
    createFallingPetals();
    createWelcomeHearts();
}

function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts-container');
    if (!container) return;
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.textContent = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '100%';
        heart.style.animationDuration = (5 + Math.random() * 5) + 's';
        heart.style.fontSize = (15 + Math.random() * 20) + 'px';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 10000);
    }, 500);
}

function createFallingPetals() {
    const container = document.querySelector('.falling-petals');
    if (!container) return;
    const petals = ['🌹', '🌸', '💐'];
    setInterval(() => {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.top = '-50px';
        petal.style.animationDuration = (4 + Math.random() * 4) + 's';
        petal.style.animationDelay = Math.random() * 0.5 + 's';
        container.appendChild(petal);
        setTimeout(() => petal.remove(), 8000);
    }, 1000);
}

function createWelcomeHearts() {
    const container = document.querySelector('.floating-hearts-welcome');
    if (container) {
        for (let i = 0; i < 3; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = '❤️';
            heart.style.left = (30 + i * 35) + '%';
            heart.style.animationDelay = (i * 0.3) + 's';
            container.appendChild(heart);
        }
    }
}

function saveToLocalStorage() {
    try {
        localStorage.setItem('romanticWebsiteData', JSON.stringify({
            selectedDate, selectedActivity, selectedLocation, currentSection
        }));
    } catch (e) {}
}

function loadFromLocalStorage() {
    try {
        const data = localStorage.getItem('romanticWebsiteData');
        if (data) {
            const p = JSON.parse(data);
            selectedDate = p.selectedDate || '';
            selectedActivity = p.selectedActivity || '';
            selectedLocation = p.selectedLocation || '';
        }
    } catch (e) {}
}

const style = document.createElement('style');
style.textContent = `
    @keyframes heartFloat {
        0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.6; }
        50% { opacity: 0.8; }
        100% { transform: translateY(-100vh) translateX(100px) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

console.log('✓ Script loaded successfully');
