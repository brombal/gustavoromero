/**
 * GUSTAVO ROMERO - Concert Pianist
 * Main JavaScript
 */

(function() {
    'use strict';

    // Scroll to section if URL has a hash (e.g. from 404 redirect of /biography -> /#biography)
    if (window.location.hash) {
        var target = document.getElementById(window.location.hash.substring(1));
        if (target) {
            // Use requestAnimationFrame to ensure layout is ready
            requestAnimationFrame(function() {
                target.scrollIntoView();
            });
        }
    }

    // DOM Elements
    const mainNav = document.getElementById('mainNav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const snapContainer = document.getElementById('snapContainer');
    const sectionIndicator = document.getElementById('sectionIndicator');
    const sections = document.querySelectorAll('.snap-section');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const indicatorDots = document.querySelectorAll('.indicator-dot');
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Album Modal Elements
    const albumModal = document.getElementById('albumModal');
    const modalBackdrop = albumModal ? albumModal.querySelector('.modal-backdrop') : null;
    const modalClose = albumModal ? albumModal.querySelector('.modal-close') : null;
    const albumCards = document.querySelectorAll('.album-card');

    // Album Data
    const albumData = {
        mompou: {
            title: 'Mompou',
            subtitle: 'Complete Canciones y Danzas / Complete Impresiones Intimas',
            composer: 'Frederic Mompou',
            performer: 'Gustavo Romero (piano)',
            image: 'assets/images/albums/mompou.jpg',
            description: 'The complete twelve Canciones y Danzas and the nine pieces of Impresiones Intimas.',
            purchaseUrl: 'https://www.amazon.com/Mompou-Complete-Canciones-Impresiones-Intimas/dp/B000001SG4/ref=sr_1_1?s=music&ie=UTF8&qid=1530554215&sr=1-1&keywords=gustavo+romero'
        },
        chopin: {
            title: 'Chopin',
            subtitle: 'Complete Impromptus',
            composer: 'Frederic Chopin',
            performer: 'Gustavo Romero (piano)',
            image: 'assets/images/albums/chopin.jpg',
            description: 'Ten works including the four Impromptus, Fantaisie-Impromptu, Barcarolle, Scherzo No. 2, two Polonaises, and two Etudes.',
            purchaseUrl: 'https://www.amazon.com/Chopin-Complete-Impromptus-Other-Works/dp/B000001SI8/ref=sr_1_2?s=music&ie=UTF8&qid=1530554215&sr=1-2&keywords=gustavo+romero'
        },
        beethoven: {
            title: 'Beethoven',
            subtitle: 'Five Piano Concertos',
            composer: 'Ludwig van Beethoven',
            performer: 'Gustavo Romero (piano), English Chamber Orchestra, conducted by James Sedares',
            image: 'assets/images/albums/beethoven.jpg',
            description: 'All five piano concertos, including the "Emperor," with the English Chamber Orchestra conducted by James Sedares.',
            purchaseUrl: 'https://www.amazon.com/Piano-Concertos-Ludwig-van-Beethoven/dp/B000001SIO/ref=sr_1_4?s=music&ie=UTF8&qid=1530554215&sr=1-4&keywords=gustavo+romero'
        },
        turina: {
            title: 'Turina / Rodrigo',
            subtitle: 'Spanish Orchestral Works',
            composer: 'Joaquin Turina & Joaquin Rodrigo',
            performer: 'Gustavo Romero (piano), San Diego Symphony Orchestra',
            image: 'assets/images/albums/turina-rodrigo.jpg',
            description: 'Eleven Spanish orchestral and vocal works including Rapsodia Sinfonica, La Oración Del Torero, and Cuatro Madrigales Amatorios.',
            purchaseUrl: 'https://www.amazon.com/gp/product/B000001SFN'
        }
    };

    // State
    let currentSection = 'home';
    let isScrolling = false;
    let scrollTimeout;

    /**
     * Initialize the application
     */
    function init() {
        setupNavigation();
        setupScrollObserver();
        setupIndicatorDots();
        setupSmoothScroll();
        setupAlbumModals();
        setupVideoThumbnails();
        updateCurrentYear();

        // Initial check for visible elements
        checkVisibleElements();
    }

    /**
     * Setup mobile navigation toggle
     */
    function setupNavigation() {
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', toggleMobileNav);

            // Close nav when clicking a link
            navLinkItems.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });

            // Close nav when clicking outside
            document.addEventListener('click', (e) => {
                if (!mainNav.contains(e.target) && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        }

        // Update nav background on scroll
        if (snapContainer && mainNav) {
            snapContainer.addEventListener('scroll', () => {
                if (snapContainer.scrollTop > 50) {
                    mainNav.classList.add('scrolled');
                } else {
                    mainNav.classList.remove('scrolled');
                }
            });
        }
    }

    /**
     * Toggle mobile navigation
     */
    function toggleMobileNav() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    }

    /**
     * Setup Intersection Observer for section tracking
     */
    function setupScrollObserver() {
        const observerOptions = {
            root: snapContainer,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    updateActiveSection(sectionId);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

        // Observer for scroll animations
        const animationObserverOptions = {
            root: snapContainer,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, animationObserverOptions);

        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    }

    /**
     * Update active section in navigation and indicators
     */
    function updateActiveSection(sectionId) {
        if (currentSection === sectionId) return;
        currentSection = sectionId;

        // Update nav links
        navLinkItems.forEach(link => {
            const href = link.getAttribute('href').slice(1);
            link.classList.toggle('active', href === sectionId);
        });

        // Update indicator dots
        indicatorDots.forEach(dot => {
            const section = dot.dataset.section;
            dot.classList.toggle('active', section === sectionId);
        });
    }

    /**
     * Setup indicator dot click handlers
     */
    function setupIndicatorDots() {
        indicatorDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const sectionId = dot.dataset.section;
                scrollToSection(sectionId);
            });
        });
    }

    /**
     * Setup smooth scrolling for anchor links
     */
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]:not([target="_blank"])').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').slice(1);
                scrollToSection(targetId);
                history.replaceState(null, '', '#' + targetId);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboardNav);
    }

    /**
     * Scroll to a specific section
     */
    function scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection && snapContainer) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    /**
     * Handle keyboard navigation
     */
    function handleKeyboardNav(e) {
        // Don't interfere if modal is open
        if (albumModal && albumModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeModal();
            }
            return;
        }

        const sectionIds = Array.from(sections).map(s => s.id);
        const currentIndex = sectionIds.indexOf(currentSection);

        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            if (currentIndex < sectionIds.length - 1) {
                e.preventDefault();
                scrollToSection(sectionIds[currentIndex + 1]);
            }
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            if (currentIndex > 0) {
                e.preventDefault();
                scrollToSection(sectionIds[currentIndex - 1]);
            }
        } else if (e.key === 'Home') {
            e.preventDefault();
            scrollToSection(sectionIds[0]);
        } else if (e.key === 'End') {
            e.preventDefault();
            scrollToSection(sectionIds[sectionIds.length - 1]);
        }
    }

    /**
     * Setup album modal functionality
     */
    function setupAlbumModals() {
        if (!albumModal) return;

        // Album card clicks
        albumCards.forEach(card => {
            card.addEventListener('click', () => {
                const albumKey = card.dataset.album;
                if (albumData[albumKey]) {
                    openModal(albumData[albumKey]);
                }
            });
        });

        // Close modal on backdrop click
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', closeModal);
        }

        // Close modal on close button click
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

    }

    /**
     * Open album modal with data
     */
    function openModal(album) {
        const coverImg = document.getElementById('modalAlbumCover');
        const titleEl = document.getElementById('modalAlbumTitle');
        const subtitleEl = document.getElementById('modalAlbumSubtitle');
        const composerEl = document.getElementById('modalComposer');
        const performerEl = document.getElementById('modalPerformer');
        const tracksEl = document.getElementById('modalTracks');
        const purchaseLink = document.getElementById('modalPurchaseLink');

        if (coverImg) {
            coverImg.src = album.image;
            coverImg.alt = album.title + ' Album Cover';
        }
        if (titleEl) titleEl.textContent = album.title;
        if (subtitleEl) subtitleEl.textContent = album.subtitle;
        if (composerEl) composerEl.textContent = album.composer;
        if (performerEl) performerEl.textContent = album.performer;
        if (purchaseLink) purchaseLink.href = album.purchaseUrl;

        if (tracksEl && album.description) {
            tracksEl.innerHTML = `<p>${album.description}</p>`;
        }

        albumModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close album modal
     */
    function closeModal() {
        if (albumModal) {
            albumModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    /**
     * Setup video thumbnail click handlers
     */
    function setupVideoThumbnails() {
        const videoThumbs = document.querySelectorAll('.video-thumb');
        const featuredVideo = document.querySelector('.video-featured .video-wrapper iframe');

        if (!featuredVideo || videoThumbs.length === 0) return;

        videoThumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const videoId = thumb.dataset.video;
                if (videoId) {
                    featuredVideo.src = `https://www.youtube.com/embed/${videoId}`;

                    // Update active thumbnail
                    videoThumbs.forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');

                    // Scroll to featured video
                    const videoSection = document.querySelector('.video-featured');
                    if (videoSection) {
                        videoSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            });
        });
    }

    /**
     * Check and animate visible elements on load
     */
    function checkVisibleElements() {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const containerRect = snapContainer.getBoundingClientRect();

            if (rect.top < containerRect.bottom && rect.bottom > containerRect.top) {
                element.classList.add('visible');
            }
        });
    }

    /**
     * Update the current year in footer
     */
    function updateCurrentYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
