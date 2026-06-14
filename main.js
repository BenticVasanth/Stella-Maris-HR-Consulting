/* ==========================================================================
   STELLA MARIS HR CONSULTING - PREMIUM LANDING PAGE JS LOGIC
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // STICKY HEADER & SCROLL HANDLING
  // ==========================================
  const header = document.querySelector('.header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once on load to catch page refresh scroll state

  // ==========================================
  // MOBILE MENU TOGGLE
  // ==========================================
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      
      // Toggle menu icons
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // ==========================================
  // ACTIVE NAV LINK HIGHLIGHTING
  // ==========================================
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Target middle-top area of screen
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // ==========================================
  // SERVICES DETAILED DATA FOR DESKTOP DRAWER
  // ==========================================
  const servicesData = {
    'talent-acquisition': {
      title: 'Talent Acquisition & Executive Search',
      description: 'Helping organizations identify and hire top talent.',
      icon: 'fa-user-tie',
      items: [
        'Permanent Staffing',
        'Executive Search',
        'Leadership Hiring',
        'Mid & Senior-Level Recruitment',
        'Campus Recruitment',
        'Contract Staffing',
        'Bulk Hiring Projects',
        'Recruitment Process Outsourcing (RPO)',
        'Talent Mapping',
        'Employer Branding'
      ]
    },
    'hr-advisory': {
      title: 'HR Advisory Services',
      description: 'Strategic HR solutions aligned to business objectives.',
      icon: 'fa-award',
      items: [
        'HR Policy Development',
        'Employee Handbook Creation',
        'Organization Structure Design',
        'HR Process Design',
        'Performance Management Systems',
        'Succession Planning',
        'Competency Framework Development',
        'Workforce Planning',
        'HR Audits',
        'Employee Engagement Strategies'
      ]
    },
    'compliance': {
      title: 'Compliance & Labour Law Advisory',
      description: 'Helping businesses remain compliant and risk-free.',
      icon: 'fa-shield-halved',
      items: [
        'Labour Law Compliance Reviews',
        'Statutory Compliance Audits',
        'Shops & Establishments Compliance',
        'Employment Documentation',
        'Standing Orders',
        'Wage Code Advisory',
        'POSH Compliance',
        'Contract Labour Compliance',
        'Payroll Compliance',
        'HR Documentation'
      ]
    },
    'transformation': {
      title: 'HR Transformation & Digitalization',
      description: 'Modernizing HR through technology and process optimization.',
      icon: 'fa-laptop-code',
      items: [
        'HRMS Implementation Support',
        'HR Process Automation',
        'Employee Lifecycle Digitization',
        'Analytics & HR Dashboards',
        'Workforce Analytics',
        'HR Shared Services Setup',
        'Change Management Programs',
        'Digital HR Strategy'
      ]
    },
    'learning': {
      title: 'Learning & Development',
      description: 'Building future-ready organizations.',
      icon: 'fa-chalkboard-user',
      items: [
        'Leadership Development',
        'Managerial Effectiveness',
        'HR Capability Building',
        'Interviewing Skills',
        'Employee Engagement Workshops',
        'Communication Skills',
        'Team Building Programs'
      ]
    }
  };

  // Drawer Controls (Desktop)
  const drawerOverlay = document.getElementById('serviceDrawerOverlay');
  const drawer = document.getElementById('serviceDrawer');
  const drawerCloseBtn = document.getElementById('serviceDrawerClose');
  const serviceCards = document.querySelectorAll('.service-card');

  const openDrawer = (serviceKey) => {
    const data = servicesData[serviceKey];
    if (!data || !drawer || !drawerOverlay) return;

    // Inject content
    drawer.querySelector('.drawer-service-icon-container i').className = `fa-solid ${data.icon}`;
    drawer.querySelector('.service-drawer-header .service-drawer-title h2').textContent = data.title;
    drawer.querySelector('.service-drawer-description').textContent = data.description;
    
    const listContainer = drawer.querySelector('.service-drawer-list');
    listContainer.innerHTML = ''; // Clear previous items

    data.items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'service-drawer-list-item';
      li.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${item}</span>`;
      listContainer.appendChild(li);
    });

    // Show drawer
    drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Disable background scrolling
  };

  const closeDrawer = () => {
    if (!drawerOverlay) return;
    drawerOverlay.classList.remove('open');
    document.body.style.overflow = ''; // Enable background scrolling
  };

  if (serviceCards && drawerOverlay && drawerCloseBtn) {
    serviceCards.forEach(card => {
      card.addEventListener('click', () => {
        const key = card.getAttribute('data-service');
        openDrawer(key);
      });
    });

    drawerCloseBtn.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) {
        closeDrawer();
      }
    });

    // Esc key closes drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDrawer();
      }
    });
  }

  // Mobile Accordion Toggle
  const accordionItems = document.querySelectorAll('.services-acc-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.services-acc-header');
    const content = item.querySelector('.services-acc-content');

    if (header && content) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other items
        accordionItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.services-acc-content');
          if (otherContent) otherContent.style.maxHeight = null;
        });

        // Toggle active item
        if (!isActive) {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  });

  // ==========================================
  // RECRUITMENT EXPERTISE SEARCH FILTER
  // ==========================================
  const searchInput = document.getElementById('recruitmentSearch');
  const techChips = document.querySelectorAll('.tech-chip');
  const catCards = document.querySelectorAll('.recruitment-cat-card');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      if (query === '') {
        // Reset all states
        techChips.forEach(chip => {
          chip.classList.remove('highlight', 'dim');
        });
        catCards.forEach(card => {
          card.classList.remove('dim');
        });
        return;
      }

      catCards.forEach(card => {
        const chipsInCard = card.querySelectorAll('.tech-chip');
        let cardHasMatch = false;

        chipsInCard.forEach(chip => {
          const text = chip.textContent.toLowerCase();
          if (text.includes(query)) {
            chip.classList.add('highlight');
            chip.classList.remove('dim');
            cardHasMatch = true;
          } else {
            chip.classList.add('dim');
            chip.classList.remove('highlight');
          }
        });

        if (cardHasMatch) {
          card.classList.remove('dim');
        } else {
          card.classList.add('dim');
        }
      });
    });
  }

  // ==========================================
  // TESTIMONIAL CAROUSEL SLIDER
  // ==========================================
  const track = document.getElementById('testimonialTrack');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;
  const slideCount = dots.length;
  let autoplayInterval;

  const goToSlide = (slideIndex) => {
    if (!track) return;
    track.style.transform = `translateX(-${slideIndex * 50}%)`;
    dots.forEach((dot, idx) => {
      if (idx === slideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
    currentSlide = slideIndex;
  };

  const startAutoplay = () => {
    autoplayInterval = setInterval(() => {
      let nextSlide = (currentSlide + 1) % slideCount;
      goToSlide(nextSlide);
    }, 6000); // Change testimonial every 6 seconds
  };

  const stopAutoplay = () => {
    clearInterval(autoplayInterval);
  };

  if (track && dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopAutoplay();
        goToSlide(index);
        startAutoplay();
      });
    });

    startAutoplay();
  }

  // ==========================================
  // GLASSMORPHIC CONTACT FORM VALIDATION & SUCCESS STATE
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const successOverlay = document.getElementById('formSuccessOverlay');
  const closeSuccessBtn = document.getElementById('closeSuccessOverlay');

  if (contactForm && successOverlay) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic field validation
      const name = document.getElementById('formName').value.trim();
      const company = document.getElementById('formCompany').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const mobile = document.getElementById('formMobile').value.trim();
      const service = document.getElementById('formService').value;
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !company || !email || !mobile || !service || !message) {
        alert('Please fill out all fields before submitting.');
        return;
      }

      // Email formatting check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Success transition
      successOverlay.classList.add('active');
      contactForm.reset();
      
      // Reset floating labels placeholder state manually
      const textInputs = contactForm.querySelectorAll('.form-input, .form-textarea');
      textInputs.forEach(input => {
        input.dispatchEvent(new Event('input'));
      });
    });

    if (closeSuccessBtn) {
      closeSuccessBtn.addEventListener('click', () => {
        successOverlay.classList.remove('active');
      });
    }
  }

});
