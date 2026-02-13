// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// Loader
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    
    if (loader) {
        // Add a small delay to ensure everything is loaded
        setTimeout(() => {
            loader.classList.add('loaded');
            
            // Remove loader from DOM after animation completes
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 500);
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// Page navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    // Update active nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`.nav-links a[href="#${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// FAQ Toggle
document.addEventListener('DOMContentLoaded', () => {
    // FAQ Toggle
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = question.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-question').forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = '0';
                    q.querySelector('.faq-icon').textContent = '+';
                }
            });
            
            // Toggle current item
            if (isOpen) {
                question.classList.remove('active');
                answer.style.maxHeight = '0';
                question.querySelector('.faq-icon').textContent = '+';
            } else {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                question.querySelector('.faq-icon').textContent = '−';
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // If it's a page link, use the page navigation
                if (targetId.startsWith('#')) {
                    const pageId = targetId.substring(1);
                    showPage(pageId);
                } else {
                    // Otherwise, scroll smoothly to the element
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Initialize animations
    initAnimations();
});

// Initialize animations with GSAP
function initAnimations() {
    // Animate feature cards on scroll
    gsap.utils.toArray('.feature-card, .stat-card, .team-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Animate hero content
    gsap.from('.hero-content', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out',
        delay: 0.5
    });

    // Animate hero image
    gsap.from('.hero-image', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out',
        delay: 0.8
    });

    // Animate section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
}

// Handle dark/light mode toggle (if implemented)
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Check for saved theme preference
function checkThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

// Initialize theme
checkThemePreference();
