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
        setTimeout(() => initializeWebsite(), 100);
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
    createActivityGrid();
    createLocationGrid();
    setupEventListeners();
    initializeBackgroundElements();
    loadFromLocalStorage();
}

function setupEventListeners() {
    // Section navigation buttons
    document.querySelectorAll('[data-section]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const section = parseInt(this.getAttribute('data-section'));
            if (section === 2) {
                startJourney();
            } else {
                goToSection(section);
            }
        }, false);
    });

    // Special event handlers
    const dateBtn = document.getElementById('dateBtn');
    if (dateBtn) dateBtn.addEventListener('click', validateDateAndContinue, false);

    const noBtn = document.getElementById('noBtn');
    if (noBtn) {
        noBtn.addEventListener('click', moveNoButton, false);
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            moveNoButton();
        }, false);
    }

    const otherActivityBtn = document.getElementById('otherActivityBtn');
    if (otherActivityBtn) otherActivityBtn.addEventListener('click', toggleOtherInput, false);

    const confirmOther = document.getElementById('confirmOther');
    if (confirmOther) confirmOther.addEventListener('click', selectActivityOther, false);

    const finalBtn = document.getElementById('finalBtn');
    if (finalBtn) finalBtn.addEventListener('click', finalCelebration, false);

    const activityContinue = document.getElementById('activityContinue');
    if (activityContinue) activityContinue.addEventListener('click', () => goToSection(8), false);

    const locationContinue = document.getElementById('locationContinue');
    if (locationContinue) locationContinue.addEventListener('click', () => goToSection(9), false);
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
    if (!grid) return;
    
    grid.innerHTML = '';
    
    activities.forEach((activity) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'activity-card';
        btn.textContent = activity;
        btn.style.cursor = 'pointer';
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (activity === '✍️ Other') {
                toggleOtherInput();
            } else {
                selectActivity(activity);
            }
        }, false);
        
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
    if (!grid) return;
    
    grid.innerHTML = '';
    
    locations.forEach(location => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'location-card';
        btn.textContent = location;
        btn.style.cursor = 'pointer';
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            selectLocation(location);
        }, false);
        
        grid.appendChild(btn);
    });
}

function startJourney() {
    // Play music with proper iOS/Android handling
    if (!musicStarted && audio) {
        try {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('Music playing');
                        musicStarted = true;
                        audio.loop = true;
                    })
                    .catch((err) => {
                        console.log('Autoplay prevented:', err);
                        musicStarted = true;
                    });
            }
        } catch (e) {
            console.log('Error playing music:', e);
            musicStarted = true;
        }
    }
    
    setTimeout(() => goToSection(2), 150);
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
    if (!btn) return;
    const x = (Math.random() * 200 - 100);
    const y = (Math.random() * 150 - 75);
    btn.style.transform = `translate(${x}px, ${y}px)`;
}

function selectActivity(activity) {
    selectedActivity = activity;
    saveToLocalStorage();
    document.querySelectorAll('.activity-card').forEach(c => {
        c.classList.remove('selected');
        if (c.textContent.trim() === activity.trim()) {
            c.classList.add('selected');
        }
    });
    const continueBtn = document.getElementById('activityContinue');
    if (continueBtn) continueBtn.style.display = 'block';
    const container = document.getElementById('otherInputContainer');
    if (container) container.style.display = 'none';
}

function toggleOtherInput() {
    const container = document.getElementById('otherInputContainer');
    if (container) {
        container.style.display = container.style.display === 'none' || container.style.display === '' ? 'flex' : 'none';
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
    document.querySelectorAll('.location-card').forEach(c => {
        c.classList.remove('selected');
        if (c.textContent.trim() === location.trim()) {
            c.classList.add('selected');
        }
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
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = ['#FFB6C1', '#FF69B4', '#FF1493', '#B76E79', '#FFF0](#)`*

