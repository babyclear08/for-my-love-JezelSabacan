// Global State
let currentSection = 1;
let selectedDate = '';
let selectedActivity = '';
let selectedLocation = '';
let musicStarted = false;
const audio = document.getElementById('bgMusic');

// Love Letter Text
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeBackgroundElements();
    loadFromLocalStorage();
});

// Start Journey - Play Music and Go to Section 2
function startJourney() {
    if (!musicStarted) {
        audio.play().catch(err => console.log('Auto-play prevented'));
        musicStarted = true;
    }
    goToSection(2);
}

// Navigate to Section
function goToSection(sectionNumber) {
    // Hide current section
    const currentSectionElement = document.getElementById(`section${currentSection}`);
    if (currentSectionElement) {
        currentSectionElement.classList.remove('active');
    }

    currentSection = sectionNumber;

    // Show new section
    const newSectionElement = document.getElementById(`section${sectionNumber}`);
    if (newSectionElement) {
        newSectionElement.classList.add('active');
        
        // Special handling for specific sections
        if (sectionNumber === 3) {
            startTypewriter();
        } else if (sectionNumber === 4) {
            startSlideshow();
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

// Typewriter Effect
function startTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    typewriterElement.textContent = '';
    let index = 0;

    function type() {
        if (index < loveLetterText.length) {
            typewriterElement.textContent += loveLetterText[index];
            index++;
            setTimeout(type, 30);
        }
    }

    type();
}

// Slideshow
let currentSlide = 0;
let slideshowInterval;

function startSlideshow() {
    const slides = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'];
    currentSlide = 0;
    
    clearInterval(slideshowInterval);
    document.getElementById('slideshow-image').src = slides[0];

    slideshowInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        const img = document.getElementById('slideshow-image');
        img.style.animation = 'none';
        setTimeout(() => {
            img.src = slides[currentSlide];
            img.style.animation = 'fadeInImage 0.8s ease-in';
        }, 10);
    }, 3000);
}

// Move "Not Yet" Button
function moveNoButton() {
    const btn = document.getElementById('noBtn');
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 150 - 75;
    btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Activity Selection
function selectActivity(activity) {
    selectedActivity = activity;
    saveToLocalStorage();
    document.querySelectorAll('.activity-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.target.classList.add('selected');
    document.getElementById('activityContinue').style.display = 'block';
    document.getElementById('otherInputContainer').style.display = 'none';
}

function toggleOtherInput() {
    const container = document.getElementById('otherInputContainer');
    container.style.display = container.style.display === 'none' ? 'flex' : 'none';
}

function selectActivityOther() {
    const input = document.getElementById('otherActivityInput');
    if (input.value.trim()) {
        selectedActivity = input.value.trim();
        saveToLocalStorage();
        document.getElementById('activityContinue').style.display = 'block';
        document.getElementById('otherInputContainer').style.display = 'none';
    }
}

// Location Selection
function selectLocation(location) {
    selectedLocation = location;
    saveToLocalStorage();
    document.querySelectorAll('.location-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.target.classList.add('selected');
    document.getElementById('locationContinue').style.display = 'block';
}

// Date Picker Validation
function validateDateAndContinue() {
    const datePicker = document.getElementById('datePicker');
    if (datePicker.value) {
        selectedDate = datePicker.value;
        saveToLocalStorage();
        goToSection(7);
    } else {
        alert('Please select a date ❤️');
    }
}

// Display Summary
function displaySummary() {
    const summaryContent = document.getElementById('summaryContent');
    const dateObj = new Date(selectedDate);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    let summaryHTML = `
        <div style="margin-bottom: 15px;">
            <strong>📅 Date:</strong><br>${formattedDate}
        </div>
        <div style="margin-bottom: 15px;">
            <strong>Activity:</strong><br>${selectedActivity}
        </div>
        <div style="margin-bottom: 15px;">
            <strong>📍 Location:</strong><br>${selectedLocation}
        </div>
    `;

    summaryContent.innerHTML = summaryHTML;
}

// Confetti Animation
function showConfetti() {
    const confettiCount = 50;
    const container = document.body;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = ['#FFB6C1', '#FF69B4', '#FF1493', '#B76E79', '#FFF0F5'][Math.floor(Math.random() * 5)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3500);
    }
}

// Final Celebration
function finalCelebration() {
    const section = document.getElementById('sectionFinal');
    section.classList.add('active');
    document.getElementById('section12').classList.remove('active');

    // Create massive celebration
    createHeartExplosion();
    showConfetti();
    
    // Loop confetti every 2 seconds
    setInterval(() => {
        showConfetti();
    }, 2000);
}

// Heart Explosion
function createHeartExplosion() {
    const container = document.getElementById('sectionFinal');
    setInterval(() => {
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.textContent = '❤️';
            heart.style.position = 'fixed';
            heart.style.fontSize = Math.random() * 40 + 20 + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = 100;
            heart.style.animation = `heartFloat ${3 + Math.random() * 2}s ease-out forwards`;
            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 5000);
        }
    }, 300);
}

// Background Elements
function initializeBackgroundElements() {
    createFloatingHearts();
    createFallingPetals();
}

function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts-container');
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

// Create Floating Hearts on Welcome Section
document.addEventListener('DOMContentLoaded', () => {
    const welcomeHeartsContainer = document.querySelector('.floating-hearts-welcome');
    if (welcomeHeartsContainer) {
        for (let i = 0; i < 3; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = '❤️';
            heart.style.left = (30 + i * 35) + '%';
            heart.style.animationDelay = (i * 0.3) + 's';
            welcomeHeartsContainer.appendChild(heart);
        }
    }
});

// Local Storage Functions
function saveToLocalStorage() {
    const data = {
        selectedDate,
        selectedActivity,
        selectedLocation,
        currentSection
    };
    localStorage.setItem('romanticWebsiteData', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const data = localStorage.getItem('romanticWebsiteData');
    if (data) {
        const parsed = JSON.parse(data);
        selectedDate = parsed.selectedDate || '';
        selectedActivity = parsed.selectedActivity || '';
        selectedLocation = parsed.selectedLocation || '';
    }
}
