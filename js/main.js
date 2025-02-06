// Add this at the beginning
gsap.registerPlugin(ScrollTrigger);

// Enhanced Typing Animation with cursor
const text = "Building Digital Experiences";
const typingText = document.querySelector('.typing-text');
const heroDescription = document.querySelector('#hero-description');

// Create cursor element
const cursor = document.createElement('span');
cursor.innerHTML = '|';
cursor.style.color = 'var(--primary)';
cursor.style.textShadow = 'var(--neon-glow)';
cursor.style.animation = 'cursor-blink 1s infinite';
typingText.appendChild(cursor);

// Add this to your CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes cursor-blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Enhanced typing animation
const phrases = [
    "Building digital products",
    "Crafting user experiences",
    "Developing modern websites"
];

let currentPhrase = 0;

function typePhrase() {
    const phrase = phrases[currentPhrase];
    
    gsap.to(typingText, {
        duration: 0.1,
        text: {
            value: phrase,
            delimiter: ""
        },
        ease: "none",
        onComplete: () => {
            setTimeout(() => {
                gsap.to(typingText, {
                    duration: 0.1,
                    text: "",
                    ease: "none",
                    onComplete: () => {
                        currentPhrase = (currentPhrase + 1) % phrases.length;
                        typePhrase();
                    }
                });
            }, 2000);
        }
    });
}

// Start typing animation
typePhrase();

// Smooth parallax effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    gsap.to('#hero', {
        duration: 1.5,
        x: mouseX * 20,
        y: mouseY * 20,
        ease: "power2.out"
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        window.scrollTo({
            top: target.offsetTop - 100,
            behavior: 'smooth'
        });
    });
});

// Add hover effect for social icons
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
            scale: 1.2,
            duration: 0.3,
            ease: "back.out"
        });
    });

    icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
            scale: 1,
            duration: 0.3,
            ease: "back.out"
        });
    });
});

// Scroll animations
gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top center",
            toggleActions: "play none none reverse"
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Parallax scroll effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Enhanced hover effects
document.querySelectorAll('.hover-element').forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gsap.to(element, {
            duration: 0.3,
            x: (x - rect.width / 2) / rect.width * 20,
            y: (y - rect.height / 2) / rect.height * 20,
            rotation: ((x - rect.width / 2) / rect.width) * 5,
            ease: "power2.out"
        });
    });

    element.addEventListener('mouseleave', () => {
        gsap.to(element, {
            duration: 0.3,
            x: 0,
            y: 0,
            rotation: 0
        });
    });
});

// Fade in elements on scroll
gsap.utils.toArray('.fade-in').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
}); 