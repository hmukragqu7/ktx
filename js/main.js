// ====== KT-X WEBSITE MAIN SCRIPT ======

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer
    loadComponents();
    
    // Initialize functionalities that don't depend on header
    initSmoothScroll();
    initFormValidation();
    initStatsAnimation();
    initAnimations();
    initServiceTabs();
});

// Load header and footer components
function loadComponents() {
    // Load header
    const headerContainer = document.querySelector('[data-header]');
    if (headerContainer) {
        headerContainer.innerHTML = `
            <header class="ktx-header" role="banner">
                <div class="header-container">
                    <a href="./" class="ktx-logo" aria-label="Koushalya Tantra Solutions Home">
                        <img src="assets/images/ktx-logo.png" alt="KT-X Logo" class="ktx-logo-img">
                        <div class="ktx-logo-text">
                            <span class="logo-primary">Koushalya</span>Tantra-X
                        </div>
                    </a>
                    
                    <button class="mobile-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
                        <i class="fas fa-bars" aria-hidden="true"></i>
                    </button>
                    
                    <nav class="main-navigation" role="navigation" aria-label="Main Navigation">
                        <ul>
                            <li class="nav-item">
                                <a href="./" class="nav-link">Home</a>
                            </li>
                            <li class="nav-item">
                                <a href="about-us" class="nav-link">About Us</a>
                            </li>
                            <li class="nav-item">
                                <a href="industrial-iot-consulting" class="nav-link">IIoT Consulting</a>
                            </li>
                            <li class="nav-item">
                                <a href="manpower-deployment-services" class="nav-link">Manpower Deployment</a>
                            </li>
                            <li class="nav-item">
                                <a href="contact-us" class="nav-link">Contact Us</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        `;
        
        // Load footer
        const footerContainer = document.querySelector('[data-footer]');
        if (footerContainer) {
            footerContainer.innerHTML = `
                <footer class="ktx-footer" role="contentinfo">
                    <div class="footer-container">
                        <div class="footer-content">
                            <div class="footer-logo-section">
                                <a href="./" class="footer-logo" aria-label="Koushalya Tantra Solutions">
                                    <div class="footer-logo-text">
                                        <span class="logo-primary">Koushalya</span>Tantra -X
                                    </div>
                                </a>
                                <p class="footer-tagline">
                                    Bridging technology and talent for industrial excellence. We provide integrated IIoT consulting and skilled manpower deployment solutions.
                                </p>
                                
                                <div class="footer-contact">
                                    <div class="contact-item">
                                        <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                                        <span>1157/1 13th Main, 8th Cross, BTM Layout, Bangalore - 560029</span>
                                    </div>
                                    <div class="contact-item">
                                        <i class="fas fa-phone" aria-hidden="true"></i>
                                        <span>+91 7090271555</span>
                                    </div>
                                    <div class="contact-item">
                                        <i class="fas fa-envelope" aria-hidden="true"></i>
                                        <span>avvinod@koushalyatantra.in</span>
                                    </div>
                                </div>
                                
                                <div class="social-links">
                                    <a href="#" class="social-link" aria-label="Follow on LinkedIn">
                                        <i class="fab fa-linkedin-in" aria-hidden="true"></i>
                                    </a>
                                    <a href="#" class="social-link" aria-label="Follow on Twitter">
                                        <i class="fab fa-twitter" aria-hidden="true"></i>
                                    </a>
                                    <a href="#" class="social-link" aria-label="Follow on Facebook">
                                        <i class="fab fa-facebook-f" aria-hidden="true"></i>
                                    </a>
                                    <a href="#" class="social-link" aria-label="Follow on Instagram">
                                        <i class="fab fa-instagram" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                            
                            <div>
                                <h3 class="footer-heading">Quick Links</h3>
                                <ul class="footer-links">
                                    <li><a href="./">Home</a></li>
                                    <li><a href="about-us">About Us</a></li>
                                    <li><a href="industrial-iot-consulting">IIoT Consulting</a></li>
                                    <li><a href="manpower-deployment-services">Manpower Deployment</a></li>
                                    <li><a href="contact-us">Contact Us</a></li>
                                    <li><a href="about-us.html#clients">Our Clients</a></li>
                                    <li><a href="about-us.html#values">Our Values</a></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 class="footer-heading">Our Services</h3>
                                <div class="footer-services">
                                    <div class="service-tag">Digital Transformation</div>
                                    <div class="service-tag">Predictive Maintenance</div>
                                    <div class="service-tag">Machine Monitoring</div>
                                    <div class="service-tag">Data Analytics</div>
                                    <div class="service-tag">Skilled Workforce</div>
                                    <div class="service-tag">On-Demand Staffing</div>
                                    <div class="service-tag">Technical Training</div>
                                </div>
                            </div>
                            
                            <div>
                                <h3 class="footer-heading">Industries Served</h3>
                                <ul class="footer-links">
                                    <li><a href="#">Manufacturing</a></li>
                                    <li><a href="#">Automotive</a></li>
                                    <li><a href="#">Pharmaceuticals</a></li>
                                    <li><a href="#">Electronics</a></li>
                                    <li><a href="#">Food Processing</a></li>
                                    <li><a href="#">Heavy Machinery</a></li>
                                    <li><a href="#">Logistics & Warehousing</a></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="footer-bottom">
                            <div class="copyright">
                                &copy; <span class="current-year">${new Date().getFullYear()}</span> Koushalya Tantra Solutions (KT-X). All rights reserved.
                            </div>
                            <div class="footer-legal">
                                <a href="privacy.html">Privacy Policy</a>
                                <a href="terms.html">Terms of Service</a>
                                <a href="cookies.html">Cookie Policy</a>
                            </div>
                        </div>
                    </div>
                </footer>
            `;
        }
        
        // Re-initialize mobile nav after loading
        setTimeout(() => {
            initMobileNavigation();
            initHeaderScroll();
            updateActiveNav();
        }, 100);
    }
}

// Update active navigation link
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || '';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if ((currentPage === '' && (linkHref === './' || linkHref === '')) || 
            (currentPage === linkHref)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Mobile Navigation
function initMobileNavigation() {
    console.log('initMobileNavigation called');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-navigation');
    
    console.log('Mobile toggle element:', mobileToggle);
    console.log('Main navigation element:', mainNav);
    
    if (!mobileToggle || !mainNav) {
        console.warn('Mobile navigation elements not found');
        return;
    }
    
    // Remove any existing event listeners by cloning the button
    const newMobileToggle = mobileToggle.cloneNode(true);
    mobileToggle.parentNode.replaceChild(newMobileToggle, mobileToggle);
    
    console.log('Event listener attached to mobile toggle');
    
    // Add click handler to toggle menu
    newMobileToggle.addEventListener('click', function(e) {
        console.log('Hamburger clicked!');
        e.stopPropagation();
        mainNav.classList.toggle('active');
        const isExpanded = mainNav.classList.contains('active');
        console.log('Menu is now', isExpanded ? 'OPEN' : 'CLOSED');
        this.setAttribute('aria-expanded', isExpanded);
        this.innerHTML = isExpanded 
            ? '<i class="fas fa-times" aria-hidden="true"></i>' 
            : '<i class="fas fa-bars" aria-hidden="true"></i>';
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            if (newMobileToggle) {
                newMobileToggle.setAttribute('aria-expanded', 'false');
                newMobileToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainNav && newMobileToggle && !mainNav.contains(event.target) && !newMobileToggle.contains(event.target)) {
            mainNav.classList.remove('active');
            newMobileToggle.setAttribute('aria-expanded', 'false');
            newMobileToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
        }
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.ktx-header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Trigger initially
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        }
    }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.ktx-header')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc3545';
                    
                    // Add error message
                    let errorMsg = field.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = '#dc3545';
                        errorMsg.style.fontSize = '0.875rem';
                        errorMsg.style.marginTop = '5px';
                        field.parentNode.appendChild(errorMsg);
                    }
                    errorMsg.textContent = 'This field is required';
                } else {
                    field.style.borderColor = '';
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    isValid = false;
                    emailField.style.borderColor = '#dc3545';
                    
                    let errorMsg = emailField.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = '#dc3545';
                        errorMsg.style.fontSize = '0.875rem';
                        errorMsg.style.marginTop = '5px';
                        emailField.parentNode.appendChild(errorMsg);
                    }
                    errorMsg.textContent = 'Please enter a valid email address';
                }
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'alert alert-success';
                    successMessage.style.background = '#d4edda';
                    successMessage.style.color = '#155724';
                    successMessage.style.padding = '15px';
                    successMessage.style.borderRadius = '4px';
                    successMessage.style.margin = '20px 0';
                    successMessage.style.border = '1px solid #c3e6cb';
                    successMessage.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <strong>Thank you, ${data.name}!</strong>
                        <p>Your message has been received. We'll contact you at ${data.email} within 24 hours.</p>
                    `;
                    
                    contactForm.parentNode.insertBefore(successMessage, contactForm);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
        
        // Clear error on input
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.style.borderColor = '';
                const errorMsg = this.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.remove();
                }
            });
        });
    }
}

// Animate statistics
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    statNumbers.forEach(stat => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const finalValue = parseInt(stat.getAttribute('data-count'));
                const duration = 2000;
                const step = finalValue / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= finalValue) {
                        stat.textContent = finalValue + (stat.textContent.includes('+') ? '+' : '');
                        clearInterval(timer);
                        observer.disconnect();
                    } else {
                        stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
                    }
                }, 16);
            }
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

// Scroll animations with stagger effect
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    
                    requestAnimationFrame(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    });
                }, index * 100); // Stagger effect
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.service-card, .stat-card, .service-item, .industry-card, .step').forEach(el => {
        observer.observe(el);
    });
    
    // Add 3D tilt effect to cards
    initCardTilt();
}

// 3D Card tilt effect
function initCardTilt() {
    const cards = document.querySelectorAll('.service-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Service tabs functionality
function initServiceTabs() {
    const serviceTabs = document.querySelectorAll('.service-tab');
    
    if (serviceTabs.length > 0) {
        serviceTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                
                // Remove active class from all tabs and content
                serviceTabs.forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.service-content').forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and target content
                this.classList.add('active');
                if (target) {
                    document.querySelector(target)?.classList.add('active');
                }
            });
        });
    }
}

// Page load transition
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});