// Navbar functionality
const initNavbar = () => {
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    menuButton.addEventListener('click', function() {
        // Toggle active class on button
        this.classList.toggle('active');
        
        // Toggle mobile menu
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
            // Wait for next frame to add transitions
            requestAnimationFrame(() => {
                mobileMenu.classList.add('opacity-100');
                mobileMenu.classList.remove('opacity-0', '-translate-y-2');
            });
        } else {
            mobileMenu.classList.add('opacity-0', '-translate-y-2');
            mobileMenu.addEventListener('transitionend', function handler() {
                mobileMenu.classList.add('hidden');
                mobileMenu.removeEventListener('transitionend', handler);
            });
        }
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initNavbar); 