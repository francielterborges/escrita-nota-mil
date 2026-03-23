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
    const slider = document.querySelector('.testimonials-slider');
    const track = document.querySelector('.testimonials-track');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    if (track && prevBtn && nextBtn) {
        let currentTranslate = 0;
        let isManual = window.innerWidth <= 768; // Start manual on mobile
        let currentIndex = 0;

        if (isManual) {
            track.classList.add('no-animation');
        }

        const getCardWidth = () => {
            const card = document.querySelector('.testimonial-card');
            const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
            return card.offsetWidth + gap;
        };

        const updateSliderPosition = () => {
            const cardWidth = getCardWidth();
            const containerWidth = slider.offsetWidth;
            
            if (window.innerWidth <= 768) {
                // Center the card on mobile
                currentTranslate = (containerWidth / 2) - (cardWidth / 2) - (currentIndex * cardWidth);
            } else {
                // Simple translate for desktop manual mode
                currentTranslate = -(currentIndex * cardWidth);
            }

            track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
            track.style.transform = `translateX(${currentTranslate}px)`;
        };

        const moveSlider = (direction) => {
            if (!isManual) {
                // Capture current position from animation before stopping
                const computedStyle = window.getComputedStyle(track);
                const matrix = new WebKitCSSMatrix(computedStyle.transform);
                const x = matrix.m41;
                
                track.classList.add('no-animation');
                track.style.transform = `translateX(${x}px) translateZ(0)`;
                isManual = true;
                
                // Find nearest index
                const cardWidth = getCardWidth();
                currentIndex = Math.round(Math.abs(x) / cardWidth);
            }

            if (direction === 'next') {
                currentIndex++;
            } else {
                currentIndex--;
            }

            // Boundary checks
            const cards = document.querySelectorAll('.testimonial-card');
            if (currentIndex >= cards.length) currentIndex = 0;
            if (currentIndex < 0) currentIndex = cards.length - 1;

            updateSliderPosition();
        };

        prevBtn.addEventListener('click', () => moveSlider('prev'));
        nextBtn.addEventListener('click', () => moveSlider('next'));

        // Initial reposition for mobile
        if (window.innerWidth <= 768) {
            setTimeout(updateSliderPosition, 100);
        }

        // Handle resize
        window.addEventListener('resize', () => {
            if (isManual || window.innerWidth <= 768) {
                updateSliderPosition();
            }
        });
    }
});
