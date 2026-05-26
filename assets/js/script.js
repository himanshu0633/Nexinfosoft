document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 0. UNIFIED NAVIGATION
    // ==========================================
    const fallbackServices = [
        ['business-website', 'Business Website'],
        ['ecommerce-website', 'E-Commerce Website'],
        ['custom-web-development', 'Custom Web Development'],
        ['mobile-applications', 'Mobile Applications'],
        ['branding-graphic-design', 'Branding & Graphic Design'],
        ['video-editing-promotional-content', 'Video Editing & Promotional Content'],
        ['digital-marketing', 'Digital Marketing'],
        ['erp-development', 'ERP Development'],
        ['custom-crm-development', 'Custom CRM Development'],
        ['mvp-development', 'MVP Development'],
        ['recruitment-services', 'Recruitment Services']
    ].map(([slug, title]) => ({ slug, title }));
    const services = window.NEX_SERVICES || fallbackServices;
    const sitePages = [
        ['index.html', 'Home'],
        ['about.html', 'About Us'],
        ['services.html', 'Services', 'services'],
        ['free-consultation.html', 'Free Consultation'],
        ['faqs.html', 'FAQs'],
        ['portfolio.html', 'Portfolio'],
        ['technology-stack.html', 'Tech Stack'],
        ['contact.html', 'Contact']
    ];

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isServicePage = currentPage.startsWith('service-') || currentPage === 'services.html';
    const navMenuEl = document.querySelector('.nav-menu');
    if (navMenuEl) {
        const servicesDropdown = services.map(service => (
            `<a href="service-${service.slug}.html" class="mega-service-link"><span></span>${service.title}</a>`
        )).join('');

        navMenuEl.innerHTML = sitePages.map(([href, label, type]) => {
            const isActive = type === 'services' ? isServicePage : href === currentPage;
            if (type === 'services') {
                return `
                    <li class="nav-item has-mega-menu">
                        <a href="${href}" class="nav-link${isActive ? ' active' : ''}">Services</a>
                        <div class="services-mega-menu">
                            <div class="mega-menu-head">
                                <div>
                                    <h3>Our Services</h3>
                                    <p>Everything we build for your business</p>
                                </div>
                                <a href="services.html" class="mega-view-all">View all <i class="ri-arrow-right-s-line"></i></a>
                            </div>
                            <div class="mega-services-grid">${servicesDropdown}</div>
                            <div class="mega-menu-foot">
                                <span></span>
                                <p>Not sure which service you need?</p>
                                <a href="free-consultation.html">Get free guidance <i class="ri-arrow-right-line"></i></a>
                            </div>
                        </div>
                    </li>
                `;
            }
            return `<li class="nav-item"><a href="${href}" class="nav-link${isActive ? ' active' : ''}">${label}</a></li>`;
        }).join('');
    }

    const servicesMenuItem = document.querySelector('.has-mega-menu');
    if (servicesMenuItem) {
        let closeServicesMenuTimer;

        const openServicesMenu = () => {
            clearTimeout(closeServicesMenuTimer);
            servicesMenuItem.classList.add('mega-open');
        };

        const closeServicesMenu = () => {
            closeServicesMenuTimer = setTimeout(() => {
                servicesMenuItem.classList.remove('mega-open');
            }, 320);
        };

        servicesMenuItem.addEventListener('mouseenter', openServicesMenu);
        servicesMenuItem.addEventListener('mouseleave', closeServicesMenu);
        servicesMenuItem.addEventListener('focusin', openServicesMenu);
        servicesMenuItem.addEventListener('focusout', closeServicesMenu);
    }

    const serviceDetailRoot = document.querySelector('[data-service-detail]');
    if (serviceDetailRoot && services.length > 0) {
        const slug = serviceDetailRoot.getAttribute('data-service-detail');
        const service = services.find(item => item.slug === slug);

        if (service) {
            document.title = `${service.title} | Nexinfosoft`;
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) metaDescription.setAttribute('content', service.subtitle);

            serviceDetailRoot.innerHTML = `
                <div class="page-hero service-single-hero">
                    <div class="container reveal slide-up">
                        <span class="section-tag">Service</span>
                        <h1 class="page-hero-title">${service.title}</h1>
                        <p class="page-hero-desc">${service.subtitle}</p>
                    </div>
                </div>

                <section class="service-single-section">
                    <div class="container service-single-grid">
                        <div class="elegant-card service-single-main reveal slide-left">
                            <div class="service-single-icon"><i class="${service.icon}"></i></div>
                            <h2 class="section-title">How this helps your business</h2>
                            <p class="section-desc">${service.intro}</p>
                            <div class="benefit-grid">
                                ${service.benefits.map(benefit => `
                                    <div class="benefit-card">
                                        <i class="ri-check-line"></i>
                                        <span>${benefit}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <aside class="elegant-card service-single-side reveal slide-right delay-200">
                            <h3>What we include</h3>
                            <ul class="elegant-list">
                                ${service.deliverables.map(item => `<li><i class="ri-checkbox-circle-line"></i><span>${item}</span></li>`).join('')}
                            </ul>
                            <a href="free-consultation.html" class="btn btn-primary service-cta-btn">
                                <span>Get Free Guidance</span>
                                <i class="ri-arrow-right-line"></i>
                            </a>
                        </aside>
                    </div>
                </section>
            `;
        }
    }

    document.querySelectorAll('.nav-actions').forEach(actions => {
        actions.innerHTML = `
            <a href="free-consultation.html" class="btn btn-secondary nav-btn">Consultation</a>
            <a href="contact.html" class="btn btn-primary nav-btn">Get Started</a>
        `;
    });
    
    // ==========================================
    // 1. PRELOADER
    // ==========================================
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 600); // Small delay to let users appreciate the premium animation
        });
    }

    // ==========================================
    // 2. SCROLL HEADER BLUR
    // ==========================================
    const header = document.querySelector('.header');
    const handleScroll = () => {
        const hero = document.querySelector('.hero');
        const heroHeight = hero ? hero.offsetHeight : 420;
        const scrollProgress = Math.min(Math.max(window.scrollY / Math.max(heroHeight * 0.55, 1), 0), 1);

        if (header) {
            header.style.setProperty('--nav-blur-progress', scrollProgress.toFixed(3));
        }

        if (window.scrollY > 12) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once in case user refreshes midway

    // ==========================================
    // 3. RESPONSIVE MOBILE MENU
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 4. SCROLL REVEAL (INTERSECTION OBSERVER)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve once triggered to lock position (or leave to repeat)
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // 5. ANIMATED STATS COUNTER
    // ==========================================
    const statsSection = document.querySelector('.stats');
    const statNums = document.querySelectorAll('.stat-num');
    
    if (statsSection && statNums.length > 0) {
        let countStarted = false;

        const startCounting = () => {
            statNums.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'), 10);
                const suffix = num.getAttribute('data-suffix') || '';
                let current = 0;
                const duration = 2000; // 2 seconds counting time
                const stepTime = Math.max(Math.floor(duration / target), 15);
                
                const counter = setInterval(() => {
                    current += Math.ceil(target / (duration / stepTime));
                    if (current >= target) {
                        num.textContent = target + suffix;
                        clearInterval(counter);
                    } else {
                        num.textContent = current + suffix;
                    }
                }, stepTime);
            });
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countStarted) {
                    countStarted = true;
                    startCounting();
                }
            });
        }, { threshold: 0.3 });

        counterObserver.observe(statsSection);
    }

    // ==========================================
    // 6. WHATSAPP FLOATING CHAT WIDGET
    // ==========================================
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    const whatsappBox = document.querySelector('.whatsapp-box');
    
    if (whatsappBtn && whatsappBox) {
        whatsappBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            whatsappBox.classList.toggle('active');
        });

        // Close widget when clicking outside
        document.addEventListener('click', (e) => {
            if (!whatsappBox.contains(e.target) && e.target !== whatsappBtn) {
                whatsappBox.classList.remove('active');
            }
        });

        // Hide notification badge once opened
        whatsappBtn.addEventListener('click', () => {
            const badge = whatsappBtn.querySelector('.whatsapp-badge');
            if (badge) badge.style.display = 'none';
        });
    }

    // ==========================================
    // 7. PORTFOLIO JS CATEGORY FILTER
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    if (filterBtns.length > 0 && portfolioCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Active Button styling
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterVal = btn.getAttribute('data-filter');

                portfolioCards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');
                    
                    if (filterVal === 'all' || categories.includes(filterVal)) {
                        card.style.display = 'block';
                        // Trigger small entrance animation
                        card.style.animation = 'scalePulse 0.4s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ==========================================
    // 8. TESTIMONIALS SLIDER
    // ==========================================
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    const testDots = document.querySelectorAll('.test-dot');
    
    if (testimonialsSlider && testDots.length > 0) {
        let activeSlideIndex = 0;
        let slideInterval;

        const updateSlider = (index) => {
            activeSlideIndex = index;
            testimonialsSlider.style.transform = `translateX(-${index * 33.333}%)`;
            
            testDots.forEach((dot, idx) => {
                if (idx === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        testDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateSlider(index);
                resetAutoSlide();
            });
        });

        // Auto slider rotation every 6 seconds
        const startAutoSlide = () => {
            slideInterval = setInterval(() => {
                let nextSlide = (activeSlideIndex + 1) % testDots.length;
                updateSlider(nextSlide);
            }, 6000);
        };

        const resetAutoSlide = () => {
            clearInterval(slideInterval);
            startAutoSlide();
        };

        startAutoSlide();
    }

    // ==========================================
    // 9. PREMIUM CONTACT FORM VALIDATION & MODAL
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalCloseBtn = document.querySelector('.modal-close-btn');

    if (contactForm && modalOverlay) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation flags
            let isValid = true;
            const inputs = contactForm.querySelectorAll('.form-control[required]');

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                    input.addEventListener('input', () => {
                        input.style.borderColor = '';
                    }, { once: true });
                }
            });

            if (isValid) {
                // Show high-end custom glass modal popup
                modalOverlay.classList.add('active');
                contactForm.reset();
            }
        });

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', () => {
                modalOverlay.classList.remove('active');
            });
        }

        // Close modal clicking overlay background
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    // ==========================================
    // 10. TECHNOLOGY STACK TABS
    // ==========================================
    const techTabs = document.querySelectorAll('[data-tech-tab]');
    const techPanels = document.querySelectorAll('[data-tech-panel]');

    if (techTabs.length > 0 && techPanels.length > 0) {
        techTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const activeKey = tab.getAttribute('data-tech-tab');

                techTabs.forEach(item => {
                    item.classList.toggle('active', item === tab);
                });

                techPanels.forEach(panel => {
                    panel.classList.toggle('active', panel.getAttribute('data-tech-panel') === activeKey);
                });
            });
        });
    }

    // ==========================================
    // 11. CURRENT YEAR IN FOOTER & ACTIVE LINK HIGHLIGHT
    // ==========================================
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Highlight navigation items matching the current html page
    const currentPath = currentPage;
    const navLinksList = document.querySelectorAll('.nav-link');
    
    navLinksList.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (linkPath === 'services.html' && isServicePage)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    document.querySelectorAll('.footer a').forEach(link => {
        const text = link.textContent.trim().toLowerCase();
        if (text.includes('terms')) link.setAttribute('href', 'terms-conditions.html');
        if (text.includes('privacy')) link.setAttribute('href', 'privacy-policy.html');
        if (text.includes('faq')) link.setAttribute('href', 'faqs.html');
        if (text.includes('consultation')) link.setAttribute('href', 'free-consultation.html');
    });

    // ==========================================
    // 12. PREMIUM SAAS INTERACTIONS
    // ==========================================
    const keyword = document.querySelector('.rotating-keyword');
    if (keyword) {
        const words = keyword.dataset.words.split(',').map(word => word.trim());
        let wordIndex = 0;

        setInterval(() => {
            wordIndex = (wordIndex + 1) % words.length;
            if (window.gsap) {
                gsap.to(keyword, {
                    y: -16,
                    opacity: 0,
                    duration: 0.24,
                    ease: 'power2.in',
                    onComplete: () => {
                        keyword.textContent = words[wordIndex];
                        gsap.fromTo(keyword, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.36, ease: 'power3.out' });
                    }
                });
            } else {
                keyword.textContent = words[wordIndex];
            }
        }, 2200);
    }

    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (event) => {
            cursorGlow.style.opacity = '1';
            cursorGlow.style.left = `${event.clientX}px`;
            cursorGlow.style.top = `${event.clientY}px`;
        });
    }

    document.querySelectorAll('.service-card, .why-item, .industry-card, .portfolio-card, .process-step').forEach(card => {
        card.addEventListener('mousemove', (event) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
            card.style.setProperty('--my', `${event.clientY - rect.top}px`);
        });
    });

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousemove', (event) => {
            const rect = button.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;
            button.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });

    const tiltCards = document.querySelectorAll('.service-card, .dashboard-wrapper, .portfolio-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (event) => {
            const rect = card.getBoundingClientRect();
            const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
            const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
            card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const input = newsletterForm.querySelector('input');
            if (input) {
                input.value = '';
                input.placeholder = 'Thanks, we will be in touch';
            }
        });
    }

    document.querySelectorAll('[data-parallax-card]').forEach(card => {
        card.addEventListener('mousemove', event => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(1100px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    if (window.gsap) {
        if (window.ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
        }

        gsap.from('.hero-tag, .hero-title, .hero-desc, .hero-btns, .hero-trust-row, .hero-stats-row', {
            y: 34,
            opacity: 0,
            duration: 0.9,
            stagger: 0.09,
            ease: 'power3.out'
        });

        gsap.from('.dashboard-wrapper', {
            y: 44,
            opacity: 0,
            rotateX: 10,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out'
        });

        if (window.ScrollTrigger) {
            gsap.utils.toArray('section').forEach(section => {
                gsap.from(section.querySelectorAll('.section-tag, .section-title, .section-desc, .service-card, .why-item, .industry-card, .process-step, .portfolio-card, .capability-item'), {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 78%'
                    },
                    y: 28,
                    opacity: 0,
                    duration: 0.75,
                    stagger: 0.06,
                    ease: 'power3.out'
                });
            });

            gsap.to('.hero-mesh-one', {
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
                y: 120,
                x: 40
            });

            gsap.to('.hero-mesh-two', {
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
                y: -80,
                x: -80
            });
        }
    }
});
