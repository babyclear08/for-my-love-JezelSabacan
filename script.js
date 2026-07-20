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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const isMobileDevice = detectMobileDevice();
    const desktopBlock = document.getElementById('desktopBlock');
    const mobileContent = document.getElementById('mobileContent');
    
    if (isMobileDevice) {
        desktopBlock.classList.add('hidden');
        mobileContent.classList.remove('hidden');
        initializeWebsite();
    } else {
        desktopBlock.classList.remove('hidden');
        mobileContent.classList.add('hidden');
    }
});

// Global State
let currentSection = 1;
let selectedDate = '';
let selectedActivity = '';
let selectedLocation = '';
let musicStarted = false;
const audio = document.getElementById('bgMusic');

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

function initializeWebsite() {
    setupEventListeners();
    createActivityGrid();
    createLocationGrid();
    initializeBackgroundElements();
    loadFromLocalStorage();
}

function setupEventListeners() {
    // Section buttons
    document.querySelectorAll('[data-section]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const section = parseInt(this.getAttribute('data-section'));
            if (this.getAttribute('data-section') === '2') {
                startJourney();
            } else {
                goToSection(section);
            }
        });
    });

    // Special handlers
    document.getElementById('dateBtn').addEventListener('click', validateDateAndContinue);
    document.getElementById('noBtn').addEventListener('click', moveNoButton);
    document.getElementById('noBtn').addEventListener('touchstart', moveNoButton);
    document.getElementById('otherActivityBtn').addEventListener('click', toggleOtherInput);
    document.getElementById('confirmOther').addEventListener('click', selectActivityOther);
    document.getElementById('finalBtn').addEventListener('click', finalCelebration);
    document.getElementById('activityContinue').addEventListener('click', function() {
        goToSection(8);
    });
    document.getElementById('locationContinue').addEventListener('click', function() {
        goToSection(9);
    });
}

function createActivityGrid() {
    const activities = [
        '🍝 Romantic Dinner',
        '☕ Coffee Date',
        '🎬 Movie Date',
        '🌅 Sunset Walk',
        '🌊 Beach Date',
        '🍕 Food Trip',
        '🚗 Road Trip',
        '🎳 Bowling',
        '🎁 Surprise Me',
        '✍️ Other'
    ];
    
    const grid = document.getElementById('activityGrid');
    grid.innerHTML = '';
    
    activities.forEach((activity, index) => {
        const btn = document.createElement('button');
        btn.className = 'activity-card';
        btn.textContent = activity;
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (activity === '✍️ Other') {
                toggleOtherInput();
            } else {
                selectActivity(activity);
            }
        });
        grid.appendChild(btn);
    });
}

function createLocationGrid() {
    const locations = [
        '❤️ Zaycoland Resort & Hotel',
        '☕ Coffee Shop',
        '🌊 Beach',
        '🍕 Restaurant',
        '🚗 Road Trip',
        '🌅 Anywhere with You'
    ];
    
    const grid = document.getElementById('locationGrid');
    grid.innerHTML = '';
    
    locations.forEach(location => {
        const btn = document.createElement('button');
        btn.className = 'location-card';
        btn.textContent = location;
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            selectLocation(location);
        });
        grid.appendChild(btn);
    });
}

function startJourney() {
    if (!musicStarted && audio) {
        audio.play().catch(() => {});
        musicStarted = true;
    }
    setTimeout(() => goToSection(2), 100);
}

function goToSection(sectionNumber) {
    const current = document.getElementById(`section${currentSection}`);
    if (current) current.classList.remove('active');

    currentSection = sectionNumber;

    const next = document.getElementById(`section${sectionNumber}`);
    if (next) {
        next.classList.add('active');
        
        if (sectionNumber === 3) {
            setTimeout(() => startTypewriter(), 100);
        } else if (sectionNumber === 4) {
            setTimeout(() => startSlideshow(), 100);
        } else if (sectionNumber === 9) {
            setTimeout(() => {
                showConfetti();
                setTimeout(() => goToSection(10), 1000);
            }, 2000);
        } else if (sectionNumber === 10) {
            setTimeout(() => goToSection(11), 2000);
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
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 150 - 75;
    btn.style.transform = `translate(${x}px, ${y}px)`;
}

function selectActivity(activity) {
    selectedActivity = activity;
    saveToLocalStorage();
    document.querySelectorAll('.activity-card').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.activity-card').forEach(c => {
        if (c.textContent === activity) c.classList.add('selected');
    });
    document.getElementById('activityContinue').style.display = 'block';
    const cont = document.getElementById('otherInputContainer');
    if (cont) cont.style.display = 'none';
}

function toggleOtherInput() {
    const cont = document.getElementById('otherInputContainer');
    if (cont) cont.style.display = cont.style.display === 'none' ? 'flex' : 'none';
}

function selectActivityOther() {
    const input = document.getElementById('otherActivityInput');
    if (input && input.value.trim()) {
        selectedActivity = input.value.trim();
        saveToLocalStorage();
        document.getElementById('activityContinue').style.display = 'block';
        const cont = document.getElementById('otherInputContainer');
        if (cont) cont.style.display = 'none';
    }
}

function selectLocation(location) {
    selectedLocation = location;
    saveToLocalStorage();
    document.querySelectorAll('.location-card').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.location-card').forEach(c => {
        if (c.textContent === location) c.classList.add('selected');
    });
    document.getElementById('locationContinue').style.display = 'block';
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
    const formatted = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
    for (let i = 0; i < 50; i++) {
        const conf = document.createElement('div');
        conf.className = 'confetti';
        conf.style.left = Math.random() * 100 + '%';
        conf.style.background = ['#FFB6C1', '#FF69B4', '#FF1493', '#B76E79', '#FFF0F5'][Math.floor(Math.random() * 5)];
        conf.style.animationDelay = Math.random() * 0.5 + 's';
        conf.style.zIndex = '1000';
        document.body.appendChild(conf);
        setTimeout(() => conf.remove(), 3500);
    }
}

function finalCelebration() {
    document.getElementById('sectionFinal').classList.add('active');
    document.getElementById('section12').classList.remove('active');
    createHeartExplosion();
    showConfetti();
    setInterval(() => showConfetti(), 2000);
}

function createHeartExplosion() {
    setInterval(() => {
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
    const cont = document.querySelector('.floating-hearts-welcome');
    if (cont) {
        for (let i = 0; i < 3; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = '❤️';
            heart.style.left = (30 + i * 35) + '%';
            heart.style.animationDelay = (i * 0.3) + 's';
            cont.appendChild(heart);
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
