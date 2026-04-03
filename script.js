document.addEventListener('DOMContentLoaded', () => {
    // Theme Persistence and Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    const updateIcons = (isDarkMode) => {
        if (!sunIcon || !moonIcon) return;
        if (isDarkMode) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    };

    // Initialize Theme
    const savedTheme = localStorage.getItem('lifeforce-theme');
    const isDark = savedTheme === 'dark';
    if (isDark) {
        document.body.classList.add('dark-mode');
    }
    updateIcons(isDark);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDarkModeNow = document.body.classList.toggle('dark-mode');
            localStorage.setItem('lifeforce-theme', isDarkModeNow ? 'dark' : 'light');
            updateIcons(isDarkModeNow);
        });
    }

    // RTL Toggle
    const rtlToggleBtn = document.getElementById('rtl-toggle');
    if (rtlToggleBtn) {
        rtlToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('rtl');
            document.documentElement.dir = document.body.classList.contains('rtl') ? 'rtl' : 'ltr';
        });
    }

    // Reveal on Scroll
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-pop, .reveal-left, .reveal-right, .reveal-up, .reveal-blur, .reveal-zoom-out, .fade-in');
    revealElements.forEach(el => observer.observe(el));

    // Header Interaction on Scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header:not(.dash-header)');
        if (!header) return;
        if (window.scrollY > 50) {
            header.style.height = '65px';
            header.style.background = 'var(--bg-card)';
        } else {
            header.style.height = '80px';
            header.style.background = 'var(--bg-card)';
        }
    });

    // Dashboard Sidebar Navigation and Tab Switching
    const sidebarLinks = document.querySelectorAll('.sidebar-nav li a');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (sidebarLinks.length > 0) {
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetTabId = link.getAttribute('data-tab');
                if (!targetTabId) return; // Allow normal links like Logout

                e.preventDefault();
                
                // Update active state in sidebar
                sidebarLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Switch tab content
                if (tabPanes.length > 0) {
                    tabPanes.forEach(pane => pane.classList.remove('active'));
                    const targetPane = document.getElementById(`tab-${targetTabId}`);
                    if (targetPane) {
                        targetPane.classList.add('active');
                    }
                }

                // Update dashboard header title
                const title = document.querySelector('.dash-header h2');
                const span = link.querySelector('span');
                if (title && span) {
                    title.textContent = span.textContent;
                }
            });
        });
    }

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    
    if (mobileToggle && navMenu && menuOverlay) {
        const toggleMenu = () => {
            const isActive = navMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = isActive ? 'hidden' : '';
            
            // Toggle between menu and close icon
            const icon = mobileToggle.querySelector('i');
            if (isActive) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        };

        mobileToggle.addEventListener('click', toggleMenu);
        menuOverlay.addEventListener('click', toggleMenu);

        // Close menu when a link is clicked
        const menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                const icon = mobileToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // Accordion Toggle Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                
                // Optional: Close other items (Single Open Mode)
                // document.querySelectorAll('.accordion-item').forEach(otherItem => {
                //     if (otherItem !== item) otherItem.classList.remove('active');
                // });

                item.classList.toggle('active');
            });
        });
    }

    // Back to Top Logic
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Re-initialize Lucide (Insurance)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
