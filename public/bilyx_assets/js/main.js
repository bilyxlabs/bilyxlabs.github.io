/**
* Template Name: Strategy
* Template URL: https://bootstrapmade.com/strategy-bootstrap-agency-template/
* Updated: May 09 2025 with Bootstrap v5.3.6
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Theme management (light/dark with persistence)
   */
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('site-theme');
  const isDetailsPage = window.location.pathname.includes('/public/policy/details/');
  const initialTheme = storedTheme === 'light' ? 'light' : 'dark';

  function applyTheme(theme) {
    const normalizedTheme = theme === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', normalizedTheme);
    const themeToggleIcon = document.querySelector('[data-theme-icon]');
    const themeToggleBtn = document.querySelector('[data-theme-toggle]');
    if (themeToggleIcon) {
      themeToggleIcon.className = normalizedTheme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    }
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', normalizedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggleBtn.setAttribute('title', normalizedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  applyTheme(initialTheme);

  /**
   * Apply .scrolled class to the body and header as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader) return;
    
    if (window.scrollY > 50) {
      selectBody.classList.add('scrolled');
      selectHeader.classList.add('scrolled');
    } else {
      selectBody.classList.remove('scrolled');
      selectHeader.classList.remove('scrolled');
    }
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.querySelector('[data-theme-toggle]');
    if (!themeToggleBtn) return;
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('site-theme', nextTheme);
      applyTheme(nextTheme);
    });

    /**
     * Cyber-card mouse tracking for radial glow
     */
    document.addEventListener('mousemove', (e) => {
      const cards = document.querySelectorAll('.cyber-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });

    /**
     * Nebula Particle Generator
     */
    const nebula = document.querySelector('.nebula-bg');
    if (nebula) {
      const container = document.createElement('div');
      container.className = 'particles-container';
      nebula.appendChild(container);

      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.setProperty('--duration', `${10 + Math.random() * 15}s`);
        particle.style.animationDelay = `${Math.random() * -20}s`;
        container.appendChild(particle);
      }
    }
  });

  /**
   * Product cards: app-specific accent colors
   */
  document.addEventListener('DOMContentLoaded', () => {
    const APP_ACCENTS = {
      "limitly": "#ef4444",
      "habit loop pro": "#22c55e",
      "netlimit — block internet": "#ea580c",
      "phone pro": "#14b8a6",
      "eye shield": "#0ea5e9",
      "expenseflow pro": "#10b981",
      "fincalc pro": "#0ea5e9",
      "qr": "#64748b",
      "battery vitals": "#f59e0b",
      "internet blocker": "#f43f5e",
      "geosnap": "#2563eb",
      "bilyx widgets pro": "#ea580c",
      "bilyx dataflow": "#059669"
    };

    document.querySelectorAll('.product-card').forEach((card) => {
      const title = card.querySelector('.product-title');
      if (!title) return;
      const key = title.textContent.trim().toLowerCase();
      const accent = APP_ACCENTS[key] || "#7c9cff";
      card.style.setProperty('--app-accent', accent);
    });
  });

  /**
   * Products marquee: smooth infinite slide (no stops)
   */
  document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('[data-products-marquee-track]');
    if (!track) return;

    if (!track.dataset.loopReady) {
      const originals = Array.from(track.children);
      originals.forEach((node) => track.appendChild(node.cloneNode(true)));
      track.dataset.loopReady = 'true';
    }

    const originalWidth = track.scrollWidth / 2;
    const speed = 0.8;
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    let rafId = null;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartScroll = 0;
    let movedDuringDrag = false;

    const tick = () => {
      track.scrollLeft += speed;
      if (track.scrollLeft >= originalWidth) {
        track.scrollLeft -= originalWidth;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!rafId) return;
      window.cancelAnimationFrame(rafId);
      rafId = null;
    };

    const getClientX = (evt) => {
      if (evt.touches && evt.touches.length) return evt.touches[0].clientX;
      if (evt.changedTouches && evt.changedTouches.length) return evt.changedTouches[0].clientX;
      return evt.clientX;
    };

    const onDragStart = (evt) => {
      isDragging = true;
      movedDuringDrag = false;
      dragStartX = getClientX(evt);
      dragStartScroll = track.scrollLeft;
      track.classList.add('is-dragging');
      stop();
    };

    const onDragMove = (evt) => {
      if (!isDragging) return;
      const currentX = getClientX(evt);
      const deltaX = currentX - dragStartX;
      if (Math.abs(deltaX) > (isTouchDevice ? 12 : 4)) movedDuringDrag = true;
      track.scrollLeft = dragStartScroll - deltaX;
    };

    const onDragEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove('is-dragging');
      if (!isTouchDevice) {
        start();
      }
      if (movedDuringDrag) {
        window.setTimeout(() => {
          movedDuringDrag = false;
        }, 80);
      }
    };

    track.addEventListener('mousedown', onDragStart);
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);

    track.addEventListener('touchstart', onDragStart, { passive: true });
    track.addEventListener('touchmove', onDragMove, { passive: true });
    track.addEventListener('touchend', onDragEnd, { passive: true });
    track.addEventListener('touchcancel', onDragEnd, { passive: true });

    track.addEventListener('click', (evt) => {
      if (movedDuringDrag) {
        evt.preventDefault();
        evt.stopPropagation();
        movedDuringDrag = false;
      }
    }, true);

    if (!isTouchDevice) {
      start();
    }
  });

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  const navmenu = document.getElementById('navmenu');
  const headerContainer = document.querySelector('.header .header-container');
  let navmenuAnchor = null;

  function isMobileNavViewport() {
    return window.innerWidth < 1200;
  }

  function mountMobileNavPortal() {
    if (!navmenu || !headerContainer || navmenu.classList.contains('navmenu-portal')) return;

    navmenuAnchor = document.createComment('navmenu-anchor');
    const headerActions = headerContainer.querySelector('.header-actions');
    headerContainer.insertBefore(navmenuAnchor, headerActions);
    document.body.appendChild(navmenu);
    navmenu.classList.add('navmenu-portal');
  }

  function unmountMobileNavPortal() {
    if (!navmenu || !headerContainer || !navmenu.classList.contains('navmenu-portal')) return;

    if (navmenuAnchor && navmenuAnchor.parentNode) {
      headerContainer.insertBefore(navmenu, navmenuAnchor);
      navmenuAnchor.remove();
      navmenuAnchor = null;
    }

    navmenu.classList.remove('navmenu-portal');
  }

  function setMobileNavOpen(open) {
    const body = document.body;
    const isOpen = typeof open === 'boolean' ? open : !body.classList.contains('mobile-nav-active');

    body.classList.toggle('mobile-nav-active', isOpen);

    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.classList.toggle('bi-list', !isOpen);
      mobileNavToggleBtn.classList.toggle('bi-x', isOpen);
    }

    if (isMobileNavViewport()) {
      if (isOpen) {
        mountMobileNavPortal();
      } else {
        unmountMobileNavPortal();
      }
    } else {
      unmountMobileNavPortal();
    }
  }

  function mobileNavToogle() {
    setMobileNavOpen();
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  window.addEventListener('resize', () => {
    if (!isMobileNavViewport()) {
      setMobileNavOpen(false);
    }
  });

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Animated Counter for Statistics
   */
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  }

  function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          animateCounter(entry.target);
        }
      });
    }, observerOptions);

    counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  window.addEventListener('load', initCounters);

  /**
   * Technology Modal Functionality
   */
  const techData = {
    react: {
      icon: '<i class="bi bi-code-square"></i>',
      title: 'React',
      description: 'A powerful JavaScript library for building user interfaces. We use React to create dynamic, responsive, and scalable web applications with component-based architecture.',
      useCase: 'Building interactive user interfaces and single-page applications',
      expertise: 'Expert level - Advanced state management and hooks'
    },
    javascript: {
      icon: '<i class="bi bi-filetype-js"></i>',
      title: 'JavaScript',
      description: 'The core programming language of the web. We leverage modern JavaScript (ES6+) to build robust, performant applications with advanced features and best practices.',
      useCase: 'Frontend and backend development, full-stack solutions',
      expertise: 'Expert level - ES6+, async/await, modern patterns'
    },
    typescript: {
      icon: '<i class="bi bi-filetype-tsx"></i>',
      title: 'TypeScript',
      description: 'Type-safe JavaScript that scales. We use TypeScript to build more maintainable and error-free applications with enhanced developer experience and better code quality.',
      useCase: 'Large-scale applications requiring type safety',
      expertise: 'Advanced level - Complex types and generics'
    },
    html5: {
      icon: '<i class="bi bi-filetype-html"></i>',
      title: 'HTML5',
      description: 'The latest standard for structuring web content. We create semantic, accessible, and SEO-friendly HTML5 markup that works across all modern browsers and devices.',
      useCase: 'Semantic markup, multimedia content, web applications',
      expertise: 'Expert level - Accessibility and SEO optimization'
    },
    css3: {
      icon: '<i class="bi bi-filetype-css"></i>',
      title: 'CSS3',
      description: 'Advanced styling and layout capabilities. We use CSS3 features including Flexbox, Grid, animations, and custom properties to create stunning, responsive designs.',
      useCase: 'Responsive layouts, animations, modern UI design',
      expertise: 'Expert level - Advanced layouts and animations'
    },
    bootstrap: {
      icon: '<i class="bi bi-bootstrap"></i>',
      title: 'Bootstrap',
      description: 'The world\'s most popular front-end framework. We utilize Bootstrap to rapidly build responsive, mobile-first websites with a consistent design system.',
      useCase: 'Rapid prototyping and responsive web development',
      expertise: 'Expert level - Customization and theming'
    },
    nodejs: {
      icon: '<i class="bi bi-filetype-node"></i>',
      title: 'Node.js',
      description: 'JavaScript runtime for server-side development. We build scalable backend services, APIs, and real-time applications using Node.js and its extensive ecosystem.',
      useCase: 'Backend APIs, real-time applications, microservices',
      expertise: 'Advanced level - Express, RESTful APIs, WebSockets'
    },
    mongodb: {
      icon: '<i class="bi bi-database"></i>',
      title: 'MongoDB',
      description: 'A flexible NoSQL database for modern applications. We design and implement MongoDB solutions for scalable data storage with efficient querying and indexing.',
      useCase: 'Document-based data storage, scalable applications',
      expertise: 'Advanced level - Schema design and optimization'
    },
    mysql: {
      icon: '<i class="bi bi-database-fill"></i>',
      title: 'MySQL',
      description: 'Reliable relational database management system. We create optimized MySQL databases with proper indexing, relationships, and query optimization for high-performance applications.',
      useCase: 'Structured data storage, transactional systems',
      expertise: 'Advanced level - Query optimization and indexing'
    },
    android: {
      icon: '<i class="bi bi-android2"></i>',
      title: 'Android',
      description: 'Native Android app development using Kotlin and Java. We build high-performance mobile applications with modern Android architecture patterns and Material Design.',
      useCase: 'Native mobile applications for Android devices',
      expertise: 'Advanced level - Kotlin, Jetpack, Material Design'
    },
    ios: {
      icon: '<i class="bi bi-apple"></i>',
      title: 'iOS',
      description: 'Native iOS app development using Swift and SwiftUI. We create beautiful, intuitive iOS applications that follow Apple\'s Human Interface Guidelines.',
      useCase: 'Native mobile applications for iPhone and iPad',
      expertise: 'Advanced level - Swift, SwiftUI, Core Data'
    },
    git: {
      icon: '<i class="bi bi-git"></i>',
      title: 'Git',
      description: 'Version control system for tracking code changes. We use Git for collaborative development, branching strategies, and maintaining clean code repositories.',
      useCase: 'Version control, collaborative development, CI/CD',
      expertise: 'Expert level - Advanced workflows and branching'
    },
    aws: {
      icon: '<i class="bi bi-cloud"></i>',
      title: 'AWS',
      description: 'Amazon Web Services cloud platform. We deploy and manage scalable cloud infrastructure using AWS services including EC2, S3, Lambda, and more.',
      useCase: 'Cloud infrastructure, scalable deployments, serverless',
      expertise: 'Advanced level - Multiple AWS services integration'
    },
    firebase: {
      icon: '<i class="bi bi-fire"></i>',
      title: 'Firebase',
      description: 'Google\'s platform for building mobile and web applications. We leverage Firebase for authentication, real-time databases, cloud storage, and hosting.',
      useCase: 'Real-time apps, authentication, cloud storage',
      expertise: 'Advanced level - Full Firebase suite integration'
    },
    php: {
      icon: '<i class="bi bi-filetype-php"></i>',
      title: 'PHP',
      description: 'Server-side scripting language for web development. We build dynamic websites and web applications using modern PHP frameworks and best practices.',
      useCase: 'Server-side scripting, content management systems',
      expertise: 'Advanced level - Laravel, WordPress development'
    },
    python: {
      icon: '<i class="bi bi-filetype-py"></i>',
      title: 'Python',
      description: 'Versatile programming language for various applications. We use Python for backend development, data processing, automation, and machine learning projects.',
      useCase: 'Backend APIs, data processing, automation scripts',
      expertise: 'Advanced level - Django, Flask, data science'
    }
  };

  /**
   * Technology Domains Switching
   */
  function initTechDomains() {
    const domainItems = document.querySelectorAll('.domain-item');
    const techDomainContents = document.querySelectorAll('.tech-domain-content');

    if (domainItems.length === 0) {
      console.log('No domain items found');
      return;
    }
    
    if (techDomainContents.length === 0) {
      console.log('No tech domain contents found');
      return;
    }

    function switchDomain(domainName) {
      // Remove active class from all domain items
      domainItems.forEach(item => {
        item.classList.remove('active');
      });

      // Add active class to clicked domain item
      const clickedDomain = document.querySelector(`[data-domain="${domainName}"]`);
      if (clickedDomain) {
        clickedDomain.classList.add('active');
      }

      // Hide all tech domain contents
      techDomainContents.forEach(content => {
        content.classList.remove('active');
      });

      // Show selected tech domain content
      const selectedContent = document.querySelector(`[data-domain-content="${domainName}"]`);
      if (selectedContent) {
        selectedContent.classList.add('active');
      } else {
        console.log('Content not found for domain:', domainName);
      }
    }

    // Add click event listeners to domain items
    domainItems.forEach((item, index) => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const domainName = this.getAttribute('data-domain');
        if (domainName) {
          switchDomain(domainName);
        }
      });
    });
    
    // Ensure first domain is active on load
    if (domainItems.length > 0) {
      const firstDomain = domainItems[0].getAttribute('data-domain');
      if (firstDomain) {
        switchDomain(firstDomain);
      }
    }
  }

  // Initialize on DOM ready and window load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(initTechDomains, 100);
    });
  } else {
    setTimeout(initTechDomains, 100);
  }
  
  // Also try on window load as backup
  window.addEventListener('load', function() {
    setTimeout(initTechDomains, 200);
  });

  const techModal = document.getElementById('techModal');
  if (techModal) {
    const techModalOverlay = techModal.querySelector('.tech-modal-overlay');
    const techModalClose = techModal.querySelector('.tech-modal-close');
    const techModalIcon = document.getElementById('techModalIcon');
    const techModalTitle = document.getElementById('techModalTitle');
    const techModalDescription = document.getElementById('techModalDescription');
    const techModalUseCase = document.getElementById('techModalUseCase');
    const techModalExpertise = document.getElementById('techModalExpertise');

    function openTechModal(techKey) {
      const tech = techData[techKey];
      if (!tech) return;

      techModalIcon.innerHTML = tech.icon;
      techModalTitle.textContent = tech.title;
      techModalDescription.textContent = tech.description;
      techModalUseCase.textContent = tech.useCase;
      techModalExpertise.textContent = tech.expertise;

      techModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeTechModal() {
      techModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Add click event listeners to tech cards
    document.querySelectorAll('.tech-card').forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function() {
        const techKey = this.getAttribute('data-tech');
        if (techKey && techData[techKey]) {
          openTechModal(techKey);
        }
      });
    });

    // Close modal events
    if (techModalOverlay) {
      techModalOverlay.addEventListener('click', closeTechModal);
    }
    if (techModalClose) {
      techModalClose.addEventListener('click', closeTechModal);
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && techModal.classList.contains('active')) {
        closeTechModal();
      }
    });
  }

  /**
   * Contact email links — reliable open on mobile (mailto) and desktop (Gmail compose)
   */
  function initContactEmailLinks() {
    const DEFAULT_EMAIL = 'bilyxlabs@gmail.com';

    function openMailto(url) {
      const link = document.createElement('a');
      link.href = url;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

    document.querySelectorAll('[data-open-email]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        const to = link.getAttribute('data-open-email') || DEFAULT_EMAIL;
        const subject = link.getAttribute('data-email-subject') || 'Contact from Bilyx Website';
        let body = link.getAttribute('data-email-body') || '';

        if (!body) {
          if (subject === 'App Idea Discussion') {
            body = 'Hi Bilyx,\n\nI would like to discuss an app idea.\n\nApp concept:\nTarget platform:\nTimeline:\n\nThank you.';
          } else if (subject === 'Project Proposal Request') {
            body = 'Hi Bilyx,\n\nI would like to request a proposal for a project.\n\nProject details:\nTimeline:\n\nThank you.';
          }
        }

        const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isInAppBrowser = /FBAN|FBAV|Instagram|Line\/|Twitter|Snapchat|wv/i.test(navigator.userAgent);

        if (isMobile) {
          if (isInAppBrowser) {
            window.location.href = gmail;
            return;
          }

          // Shorter mailto URLs are more reliable on iOS and Android mail apps.
          openMailto(`mailto:${to}?subject=${encodeURIComponent(subject)}`);
          return;
        }

        const gmailWindow = window.open(gmail, '_blank', 'noopener,noreferrer');
        if (!gmailWindow) {
          openMailto(`mailto:${to}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactEmailLinks);
  } else {
    initContactEmailLinks();
  }

  /**
   * Update Copyright Year
   */
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = currentYear;
  }

})();