// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animate skill bars on scroll
document.querySelectorAll('.skill-item').forEach(item => {
    const level = item.dataset.level;
    const progress = item.querySelector('.skill-progress');
    
    gsap.to(progress, {
        width: `${level}%`,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// Animate timeline items
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.from(item, {
        opacity: 0,
        x: -50,
        duration: 1,
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        delay: i * 0.2
    });
});

// Initialize particles.js
particlesJS('particles-js', {
    particles: {
        number: { value: 80 },
        color: { value: '#64FFDA' },
        shape: { type: 'circle' },
        opacity: {
            value: 0.5,
            random: true
        },
        size: {
            value: 3,
            random: true
        },
        move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            out_mode: 'out'
        }
    },
    interactivity: {
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            }
        }
    }
});

// Add hover effect to certificates
document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
}); 