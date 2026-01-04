/* ========================================
   VARAPRASAD ERAPU - PORTFOLIO SCRIPTS
   Smooth interactions and animations
======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initActiveNavLink();
    initSmoothScroll();
    initTypingEffect();
});

/* ========================================
   NAVBAR SCROLL EFFECT
======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
}

/* ========================================
   MOBILE MENU TOGGLE
======================================== */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/* ========================================
   SCROLL ANIMATIONS (INTERSECTION OBSERVER)
======================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.skill-category, .timeline-item, .project-card, .education-card, .publication-card, .contact-method'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/* ========================================
   ACTIVE NAV LINK ON SCROLL
======================================== */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

/* ========================================
   SMOOTH SCROLL FOR ANCHOR LINKS
======================================== */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   CODE TYPING EFFECT (OPTIONAL)
======================================== */
function initTypingEffect() {
    const codeContent = document.querySelector('.code-content code');
    if (!codeContent) return;
    
    const originalHTML = codeContent.innerHTML;
    const lines = originalHTML.split('\n');
    
    codeContent.innerHTML = '';
    codeContent.style.visibility = 'visible';
    
    let lineIndex = 0;
    
    function typeLine() {
        if (lineIndex < lines.length) {
            codeContent.innerHTML += lines[lineIndex] + (lineIndex < lines.length - 1 ? '\n' : '');
            lineIndex++;
            setTimeout(typeLine, 100);
        }
    }
    
    // Start typing after a short delay
    setTimeout(() => {
        typeLine();
    }, 500);
}

/* ========================================
   UTILITY FUNCTIONS
======================================== */

// Debounce function for scroll events
function debounce(func, wait = 20) {
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* ========================================
   CONSOLE EASTER EGG
======================================== */
console.log(`
╔══════════════════════════════════════════╗
║                                          ║
║   👋 Hello there, curious developer!     ║
║                                          ║
║   Welcome to my portfolio.               ║
║   Built with ❤️ using vanilla HTML,      ║
║   CSS, and JavaScript.                   ║
║                                          ║
║   📧 varaprasad.erapu@gmail.com          ║
║   🔗 linkedin.com/in/varaprasaderapu     ║
║   💻 github.com/VaraprasadE              ║
║                                          ║
╚══════════════════════════════════════════╝
`);
