document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Handle scroll for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Initial check in case page is loaded midway down
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Prevent scrolling when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
            document.body.style.overflow = '';
        });
    });
    // Slider Navigation
    const track = document.querySelector('.testimonials-track');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    if (track && prevBtn && nextBtn) {
        let currentTranslate = 0;
        let isManual = false;

        const getCardWidth = () => {
            const card = document.querySelector('.testimonial-card');
            const style = window.getComputedStyle(card);
            const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
            return card.offsetWidth + gap;
        };

        const moveSlider = (direction) => {
            if (!isManual) {
                // Stop CSS animation
                const computedStyle = window.getComputedStyle(track);
                const matrix = new WebKitCSSMatrix(computedStyle.transform);
                currentTranslate = matrix.m41;
                
                track.classList.add('no-animation');
                track.style.transform = `translateX(${currentTranslate}px)`;
                isManual = true;
            }

            const cardWidth = getCardWidth();
            
            if (direction === 'next') {
                currentTranslate -= cardWidth;
            } else {
                currentTranslate += cardWidth;
            }

            // Boundary checks for the loop
            const totalWidth = track.offsetWidth / 2; // Because we duplicated cards
            if (Math.abs(currentTranslate) >= totalWidth) {
                currentTranslate = 0;
            } else if (currentTranslate > 0) {
                currentTranslate = -totalWidth + cardWidth;
            }

            track.style.transition = 'transform 0.5s ease-out';
            track.style.transform = `translateX(${currentTranslate}px)`;
        };

        prevBtn.addEventListener('click', () => moveSlider('prev'));
        nextBtn.addEventListener('click', () => moveSlider('next'));
    }
});
