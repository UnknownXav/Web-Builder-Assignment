
document.addEventListener('DOMContentLoaded', function() {
    console.log('Marci Metzger Homes website loaded successfully');
    
    // Initialize all components
    initCurrentYear();
    initSmoothScrolling();
    initBackToTop();
    initContactForm();
    initSearchForm();
    initNavbarScroll();
    initMobileMenu();
    initEnhancedCarousel(); // Consolidated carousel functions
    
    // Performance optimization: Lazy load images
    initLazyLoading();
    
    // Initialize smart logo functionality
    initSmartLogo();
});

/**
 * Update copyright year automatically
 */
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
}

/**
 * Update active navigation link
 */
function updateActiveNavLink(targetId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId || 
            (targetId === 'index.html' && link.id === 'homeLink')) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Initialize contact form submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector('textarea').value.trim();
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Disable submit button and show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        submitButton.disabled = true;
        
        // Simulate API call (in production, this would be a real fetch/axios call)
        setTimeout(() => {
            // Show success message
            showNotification('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 1500);
        
        // Log for demonstration
        console.log('Contact Form Submitted:', { name, email, message });
    });
}

/**
 * Initialize property search form
 */
function initSearchForm() {
    const searchForm = document.querySelector('.property-search-form');
    
    if (!searchForm) return;
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get search criteria
        const location = this.querySelector('[placeholder*="Pahrump"]')?.value || 'Pahrump, NV';
        const type = this.querySelector('[placeholder*="Type"]')?.value || 'Any Type';
        const bedrooms = this.querySelector('[placeholder*="Bedrooms"]')?.value || 'Any Number';
        const baths = this.querySelector('[placeholder*="Baths"]')?.value || 'Any Number';
        const minPrice = this.querySelector('[placeholder*="Min Price"]')?.value || '0';
        const maxPrice = this.querySelector('[placeholder*="Max Price"]')?.value || 'No Max';
        
        // Show loading state
        const searchButton = this.querySelector('button[type="submit"]');
        const originalText = searchButton.innerHTML;
        
        searchButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Searching...';
        searchButton.disabled = true;
        
        // Simulate search (in production, this would fetch from API)
        setTimeout(() => {
            showNotification(`Searching for ${bedrooms} bedroom, ${baths} bath properties in ${location}...`, 'info');
            
            // Reset button
            setTimeout(() => {
                searchButton.innerHTML = originalText;
                searchButton.disabled = false;
            }, 2000);
        }, 1000);
        
        // Log search criteria
        console.log('Property Search:', {
            location,
            type,
            bedrooms,
            baths,
            minPrice,
            maxPrice
        });
    });
}

/**
 * Initialize navbar scroll effects
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

/**
 * Initialize mobile menu enhancements
 */
function initMobileMenu() {
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarToggler = document.querySelector('.navbar-toggler');
        
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
}

/**
 * Initialize enhanced carousel functionality
 */
function initEnhancedCarousel() {
    const carousel = document.getElementById('propertyCarousel');
    if (!carousel) return;
    
    const bsCarousel = new bootstrap.Carousel(carousel, {
        interval: 3000,
        wrap: true,
        pause: 'hover',
        touch: true
    });
    
    // Handle both old and new thumbnail systems
    const oldThumbnails = document.querySelectorAll('.gallery-thumbnails .img-thumbnail');
    const newThumbnails = document.querySelectorAll('.thumbnail-item');
    
    // Update thumbnail active state
    carousel.addEventListener('slid.bs.carousel', function(event) {
        const activeIndex = event.to;
        
        // Update old thumbnails (if they exist)
        oldThumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === activeIndex);
        });
        
        // Update new thumbnails (if they exist)
        newThumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === activeIndex);
            
            // Update thumbnail number visibility
            const number = thumb.querySelector('.thumbnail-number');
            if (number) {
                number.textContent = index + 1;
            }
        });
        
        // Update preview images if dynamic previews are enabled
        updatePreviewImages(activeIndex);
    });
    
    // Add click events to old thumbnails
    oldThumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            bsCarousel.to(index);
        });
    });
    
    // Add click events to new thumbnails
    newThumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            bsCarousel.to(index);
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            bsCarousel.prev();
        } else if (e.key === 'ArrowRight') {
            bsCarousel.next();
        }
    });
}

/**
 * Update preview images (optional - for dynamic previews)
 */
function updatePreviewImages(currentIndex) {
    const previews = document.querySelectorAll('.carousel-preview img');
    if (previews.length >= 2) {
        const totalImages = 7; // Default to 3 images, adjust based on your setup
        
        const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
        const nextIndex = (currentIndex + 1) % totalImages;
        
        // Update previous preview
        previews[0].src = `images/property${prevIndex + 1}.jpg`;
        previews[0].alt = `Property ${prevIndex + 1} preview`;
        
        // Update next preview
        previews[1].src = `images/property${nextIndex + 1}.jpg`;
        previews[1].alt = `Property ${nextIndex + 1} preview`;
    }
}

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * Show notification messages
 */
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification alert alert-${type} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1060;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add styles for animation if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Set icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/**
 * Initialize smart logo functionality
 */
function initSmartLogo() {
    const logoLink = document.getElementById('logoLink');
    const logoImage = document.getElementById('logoImage');
    
    if (!logoLink || !logoImage) return;
    
    logoLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        const currentScroll = window.scrollY;
        
        // Animation feedback
        logoImage.style.transform = 'scale(0.95)';
        setTimeout(() => {
            logoImage.style.transform = 'scale(1)';
        }, 150);
        
        if (currentScroll > 300) {
            // Far from top - scroll smoothly to top
            smoothScrollToTop();
        } else if (currentScroll > 50) {
            // Close to top - instant scroll
            window.scrollTo({ top: 0, behavior: 'smooth' });
            updateActiveNavLink('index.html');
        } else {
            // Already at top - just update state
            updateActiveNavLink('index.html');
        }
        
        // Close mobile menu if open
        if (window.innerWidth < 992) {
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        }
        
        return false;
    });
}

/**
 * Smooth scroll to top with easing
 */
function smoothScrollToTop() {
    const duration = 800;
    const start = window.pageYOffset;
    const startTime = performance.now();
    
    function scrollStep(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeOutCubic(progress);
        
        window.scrollTo(0, start * (1 - easeProgress));
        
        if (progress < 1) {
            requestAnimationFrame(scrollStep);
        } else {
            updateActiveNavLink('index.html');
        }
    }
    
    requestAnimationFrame(scrollStep);
}

/**
 * Easing function for smooth scroll
 */
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

/**
 * Utility: Format phone number
 */
function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
}

/**
 * Utility: Debounce function for performance
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimizations
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    console.log('Page fully loaded');
});

// Handle browser back/forward navigation
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        console.log('Page restored from bfcache');
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Unhandled promise rejection
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

document.addEventListener('DOMContentLoaded', function() {
    // Days of the week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Get current date and time
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Office hours: 8 AM to 7 PM daily
    const openHour = 8;
    const closeHour = 19;
    
    // Check if currently open
    const isOpen = currentHour >= openHour && currentHour < closeHour;
    
    // Update the display
    const todayStatus = document.getElementById('todayStatus');
    const todayHours = document.getElementById('todayHours');
    const currentDayLine = document.getElementById('currentDayLine');
    
    // Get current day name
    const dayName = days[currentDay];
    
    // Update status based on current time
    if (isOpen) {
        todayStatus.textContent = '✓ Open Now ';
        todayStatus.className = 'mb-1 text-success fw-bold';
        
        // Update hours line with day
        todayHours.innerHTML = `08:00 am – 07:00 pm <span class="text-muted ms-2">• ${dayName}</span>`;
    } else {
        todayStatus.textContent = '✗ Closed Now • ' + dayName;
        todayStatus.className = 'mb-1 text-danger fw-bold';
        
        // Update hours line with day
        todayHours.innerHTML = `08:00 am – 07:00 pm <span class="text-muted ms-2">• ${dayName}</span>`;
    }
    
    // Optional: Add timezone info
    const timezoneInfo = document.createElement('small');
    timezoneInfo.className = 'd-block text-muted mt-1';
    todayHours.parentNode.appendChild(timezoneInfo);
    
    
    // Remove the separate currentDayLine element since we're displaying day inline
    currentDayLine.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Optional: Add hover effects to badges
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.custom-carousel');
    const track = document.querySelector('.custom-carousel-track');
    const slides = Array.from(track.querySelectorAll('.custom-carousel-slide'));
    const dots = document.querySelectorAll('.custom-carousel-dot');
    const thumbnails = document.querySelectorAll('.custom-thumbnail-item');
    const prevBtn = document.querySelector('.custom-carousel-left-arrow');
    const nextBtn = document.querySelector('.custom-carousel-right-arrow');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Initialize carousel
    updateCarousel();
    
    // Navigation functions
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    function updateCarousel() {
        // Move track
        const slideWidth = slides[0].getBoundingClientRect().width;
        const moveX = currentSlide * slideWidth;
        track.style.transform = `translateX(-${moveX}px)`;
        
        // Update active classes
        slides.forEach((slide, index) => {
            slide.classList.toggle('custom-carousel-slide-selected', index === currentSlide);
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('selected', index === currentSlide);
        });
        
        // Update thumbnails
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentSlide);
        });
        
        // Update ARIA labels
        slides.forEach((slide, index) => {
            slide.setAttribute('aria-hidden', index !== currentSlide);
        });
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => goToSlide(index));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left
            } else {
                prevSlide(); // Swipe right
            }
        }
    }
    
    // Auto-play (optional)
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Start auto-play
    startAutoPlay();
    
    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Pause on touch
    carousel.addEventListener('touchstart', stopAutoPlay);
    carousel.addEventListener('touchend', () => {
        setTimeout(startAutoPlay, 3000);
    });
});