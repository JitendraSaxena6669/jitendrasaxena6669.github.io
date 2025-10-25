// JavaScript for Sanjeev Tiwari Travel Agency Website

document.addEventListener('DOMContentLoaded', function() {
    // Gallery Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Filter gallery cards
            galleryCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    if (card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    // Add smooth transitions
    galleryCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease';
        card.style.opacity = '1';
    });

    // Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validation
            if (!name || !email || !phone || !message) {
                showAlert('Please fill in all required fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }

            if (!isValidPhone(phone)) {
                showAlert('Please enter a valid phone number', 'error');
                return;
            }

            // If validation passes, show success message
            showAlert('Thank you for your message! We will contact you soon.', 'success');

            // Reset form
            contactForm.reset();

            // Optionally send data to server or email service
            console.log('Form submitted:', { name, email, phone, message });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar active state on scroll
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Add animation on scroll
    observeElementsOnScroll();

    // Lazy loading for images
    lazyLoadImages();
});

// Helper Functions

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Show alert message
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Find the form or contact section
    const contactSection = document.querySelector('.contact-section') || document.querySelector('.contact-form-container');
    if (contactSection) {
        contactSection.insertBefore(alertDiv, contactSection.firstChild);

        // Auto-remove alert after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}

// Observe elements on scroll for animations
function observeElementsOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation-capable classes
    document.querySelectorAll('.destination-card, .feature-box, .gallery-card, .mission-card').forEach(el => {
        observer.observe(el);
    });
}

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger image load
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.src;
        });
    }
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler) {
        navbarToggler.addEventListener('click', () => {
            navbarCollapse.classList.toggle('show');
        });
    }

    // Close navbar when a link is clicked
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
});

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    img.loaded {
        animation: fadeInUp 0.5s ease-out;
    }
`;
document.head.appendChild(style);

// Service worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js').then(reg => {
        //     console.log('Service Worker registered');
        // }).catch(err => {
        //     console.log('Service Worker registration failed:', err);
        // });
    });
}

// Track user interactions for analytics
function trackEvent(eventName, eventData) {
    // Send to analytics service (Google Analytics, etc.)
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
    console.log(`Event: ${eventName}`, eventData);
}

// Track WhatsApp clicks
document.addEventListener('click', (e) => {
    if (e.target.closest('.cta-whatsapp') || e.target.closest('a[href*="wa.me"]')) {
        trackEvent('whatsapp_click', {
            element: 'CTA Button'
        });
    }
});

// Track phone calls
document.addEventListener('click', (e) => {
    if (e.target.closest('.cta-call') || e.target.closest('a[href^="tel:"]')) {
        trackEvent('phone_call', {
            element: 'CTA Button'
        });
    }
});

// Track form submissions
document.addEventListener('submit', (e) => {
    if (e.target.id === 'contactForm') {
        trackEvent('form_submission', {
            form_name: 'contact_form'
        });
    }
});