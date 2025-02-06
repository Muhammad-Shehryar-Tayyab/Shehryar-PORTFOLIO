// Add at the top of the file
gsap.registerPlugin(ScrollTrigger);

// Initialize Vanilla Tilt
VanillaTilt.init(document.querySelectorAll(".project-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter projects
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
            gsap.to(card, {
                duration: 0.3,
                opacity: 0,
                y: 20,
                onComplete: () => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        gsap.to(card, {
                            duration: 0.3,
                            opacity: 1,
                            y: 0
                        });
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const projectImages = document.querySelectorAll('.project-card img');

projectImages.forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
    });
});

document.querySelector('.close-lightbox').addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// Initialize particles.js
particlesJS('particles-js', {
    particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: '#64ffda' },
        shape: { type: 'circle' },
        opacity: {
            value: 0.1,
            random: true,
            animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false }
        },
        size: {
            value: 3,
            random: true,
            animation: { enable: true, speed: 4, minimumValue: 0.3, sync: false }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#64ffda',
            opacity: 0.1,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detectsOn: 'canvas',
        events: {
            onhover: { enable: true, mode: 'grab' },
            onclick: { enable: true, mode: 'push' },
            resize: true
        }
    },
    retina_detect: true
});

// Scroll animations
gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: i * 0.1
    });
});

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0
    });
    
    gsap.to(cursorFollower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
});

// Cursor effects on hover
document.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.borderColor = 'var(--accent)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.borderColor = 'var(--accent)';
    });
});

// Smooth scroll initialization
// const scroll = new LocomotiveScroll({...});

// Enhanced card hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = x / rect.width;
        const yPercent = y / rect.height;
        
        gsap.to(card, {
            rotationY: (xPercent - 0.5) * 20,
            rotationX: (yPercent - 0.5) * -20,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

// Update the scroll animation to use window scroll instead
window.addEventListener('scroll', () => {
    document.querySelectorAll('.project-card').forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const scrollPercentage = (window.innerHeight - rect.top) / window.innerHeight;
        if (scrollPercentage > 0 && scrollPercentage < 1) {
            const speed = i % 2 === 0 ? 0.1 : 0.05;
            card.style.transform = `translateY(${scrollPercentage * speed * 100}px)`;
        }
    });
});

// Mobile Menu Functionality
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const hamburger = document.querySelector('.hamburger');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        mobileMenu.classList.add('hidden');
    }
});

// Close mobile menu when window is resized to desktop size
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        mobileMenu.classList.add('hidden');
    }
});

// Update active nav link based on current page
const updateActiveNavLink = () => {
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

updateActiveNavLink(); 