// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navToggle) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scroll offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add active state to nav links on scroll
const sections = document.querySelectorAll('.section');
const observerOptions = {
    threshold: 0.3,
    rootMargin: '-80px 0px 0px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Add scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.music-card, .social-link, .contact-link');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial setup for animated elements
document.querySelectorAll('.music-card, .social-link, .contact-link').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Run on scroll
window.addEventListener('scroll', animateOnScroll);
// Run on load
window.addEventListener('load', animateOnScroll);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 600;
    }
});

// Random Lyrics Feature with Typewriter Effect
const lyrics = [
    "Anger and proximity, somethings gotten into me",
    "There's always a problem these days; it's gonna cause a problem today",
    "We'll call it a life, we'll burry the lie…but we all know",
    "These days we're too close to it, blow your kisses, have some fun",
    "Off meds, online, and too shy; someone get this man a gun",
    "Must have been the wrong way, miss-marked by apathy",
    "With a smile I turn around",
    "All dressed up in fun, too late to turn back now…and it's closing in",
    "I saw the most beautiful painting that I've ever seen, It's in a funeral home that seats 23",
    "We just have to wait, and that's the hardest part",
    "My hope is slowly dying while they're fucking in the dark",
    "And I've let a lot of people down, but you shouldn't be one of them",
    "All the time that you didn't even know who I am",
    "If I separate the feeling it could start again",
    "You never listen or agree; a lesson learned in apathy",
    "Last in line, first place anomaly",
    "The way I'm alive somehow…In a way less personal",
    "Last in line, mistake the memory…I'll run till I hit the ground",
    "When it's said and done no one fears what they can see"
];

const talkButton = document.getElementById('talk-button');
const lyricsDisplay = document.getElementById('lyrics-display');

if (talkButton && lyricsDisplay) {
    talkButton.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * lyrics.length);
        const randomLyric = lyrics[randomIndex];
        
        // Clear previous lyric
        lyricsDisplay.innerHTML = '';
        
        // Create the lyric element
        const lyricElement = document.createElement('p');
        lyricElement.className = 'lyric-text';
        lyricsDisplay.appendChild(lyricElement);
        
        // Type out characters one by one
        let i = 0;
        lyricElement.textContent = '';
        
        const typeInterval = setInterval(() => {
            if (i < randomLyric.length) {
                lyricElement.textContent += randomLyric[i];
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 30);
    });
}

// Photo Gallery Slideshow
const slides = document.querySelectorAll('.gallery-slide');
const prevBtn = document.querySelector('.gallery-nav.prev');
const nextBtn = document.querySelector('.gallery-nav.next');
const dotsContainer = document.querySelector('.gallery-dots');

let currentSlide = 0;

// Create dots for each slide
if (slides.length > 0 && dotsContainer) {
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'gallery-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

const dots = document.querySelectorAll('.gallery-dot');

function updateSlideshow() {
    // Update slides
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentSlide) {
            dot.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlideshow();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlideshow();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlideshow();
}

// Add event listeners
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// Lightbox functionality for gallery images
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const galleryImages = document.querySelectorAll('.gallery-slide img');
const galleryContainer = document.querySelector('.gallery-container');

let currentLightboxIndex = 0;

function openLightbox(index) {
    currentLightboxIndex = index;
    lightbox.classList.add('active');
    updateLightboxImage();
    document.body.style.overflow = 'hidden';
}

function updateLightboxImage() {
    const img = galleryImages[currentLightboxIndex];
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
}

function nextLightboxImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

function prevLightboxImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Open lightbox when clicking on any gallery image - use current slideshow position
if (galleryContainer) {
    galleryContainer.addEventListener('click', (e) => {
        // Check if click was on an image
        if (e.target.tagName === 'IMG') {
            openLightbox(currentSlide);
        }
    });
}

// Make images show pointer cursor
galleryImages.forEach(img => {
    img.style.cursor = 'pointer';
});

// Lightbox navigation
if (lightboxNext) {
    lightboxNext.addEventListener('click', nextLightboxImage);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', prevLightboxImage);
}

// Close lightbox when clicking X button
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

// Close lightbox when clicking outside the image
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            prevLightboxImage();
        } else if (e.key === 'ArrowRight') {
            nextLightboxImage();
        }
    }
});
