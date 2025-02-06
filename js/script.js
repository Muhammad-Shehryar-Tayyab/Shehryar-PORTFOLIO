// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Dark/Light Mode Toggle
class ThemeManager {
    constructor() {
        this.darkMode = true;
        this.themeToggle = document.getElementById('theme-toggle');
        this.initTheme();
    }

    initTheme() {
        // Add theme toggle listener
        this.themeToggle?.addEventListener('click', () => this.toggleTheme());
        
        // Add theme transition class
        document.documentElement.classList.add('theme-transition');
        
        // Remove transition class after animation
        document.addEventListener('transitionend', () => {
            document.documentElement.classList.remove('theme-transition');
        });
    }

    toggleTheme() {
        this.darkMode = !this.darkMode;
        document.documentElement.classList.toggle('light-mode');
        
        // Animate theme toggle icon
        gsap.to(this.themeToggle, {
            rotate: '+=180',
            duration: 0.5,
            ease: 'back.out'
        });
    }
}

// Navbar Scroll Highlight
class NavbarManager {
    constructor() {
        this.navbar = document.querySelector('nav');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.initNavbar();
    }

    initNavbar() {
        // Smooth scroll for nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: targetSection,
                        ease: 'power2.inOut'
                    });
                }
            });
        });

        // Highlight active section on scroll
        window.addEventListener('scroll', () => this.highlightActiveSection());
    }

    highlightActiveSection() {
        const scrollPosition = window.scrollY + 100;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// 3D Hover Effects
class HoverEffectManager {
    constructor() {
        this.hoverElements = document.querySelectorAll('.hover-3d');
        this.initHoverEffects();
    }

    initHoverEffects() {
        this.hoverElements.forEach(element => {
            element.addEventListener('mousemove', (e) => this.handleHover(e, element));
            element.addEventListener('mouseleave', (e) => this.resetElement(e, element));
        });
    }

    handleHover(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        gsap.to(element, {
            duration: 0.5,
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.05,
            ease: 'power2.out'
        });
    }

    resetElement(e, element) {
        gsap.to(element, {
            duration: 0.5,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            ease: 'power2.out'
        });
    }
}

// Lazy Loading Images
class LazyLoadManager {
    constructor() {
        this.lazyImages = document.querySelectorAll('img[data-src]');
        this.initLazyLoad();
    }

    initLazyLoad() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            });

            this.lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            this.lazyImages.forEach(img => this.loadImage(img));
        }
    }

    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;

        // Create a preloader
        const preloader = new Image();
        preloader.onload = () => {
            img.src = src;
            img.classList.add('loaded');
            gsap.to(img, {
                duration: 0.5,
                opacity: 1,
                scale: 1,
                ease: 'power2.out'
            });
        };
        preloader.src = src;
    }
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new NavbarManager();
    new HoverEffectManager();
    new LazyLoadManager();
});

// Add smooth scroll behavior
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf); 