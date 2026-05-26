// Stella Maris HR Consulting - JavaScript Main Functionality

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Sticky Navbar & Scroll Events
  const navbar = document.querySelector('.navbar-stella');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  };
  
  // Trigger initially on page load/refresh
  handleScroll();
  window.addEventListener('scroll', handleScroll);
  
  // 2. Active Navigation link on scroll (Scrollspy alternative)
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.navbar-stella .nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 120)) {
        current = section.getAttribute('id') || '';
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + current || (current === '' && href === '#')) {
        link.classList.add('active');
      }
    });
  });
  
  // 3. Mobile Navigation Auto-Collapse
  const navItems = document.querySelectorAll('.navbar-stella .nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navbarToggler = document.querySelector('.navbar-toggler');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        navbarToggler.click(); // Programmatic click to collapse menu
      }
    });
  });
  
  // 4. Smooth Scrolling for Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80; // Offset for fixed nav
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // 5. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.animate-slide-up, .reveal-on-scroll');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.classList.add('animated');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
  });
  
  // 6. Statistics Counter Animation
  const counterSection = document.getElementById('why-us');
  const counters = document.querySelectorAll('.counter-value');
  let countersAnimated = false;
  
  const startCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000; // Animation duration in ms
      const stepTime = Math.abs(Math.floor(duration / target));
      let current = 0;
      
      const timer = setInterval(() => {
        current += Math.ceil(target / (duration / 30)); // Scale steps for fluid motion
        if (current >= target) {
          counter.textContent = target.toLocaleString() + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = current.toLocaleString() + suffix;
        }
      }, 30);
    });
  };
  
  if (counterSection && counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          startCounters();
          countersAnimated = true;
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    counterObserver.observe(counterSection);
  }
  
  // 7. Contact Form Handling with Premium Success Feedbacks
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic Validation Check
      if (!contactForm.checkValidity()) {
        e.stopPropagation();
        contactForm.classList.add('was-validated');
        return;
      }
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Loading State
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Sending Message...
      `;
      
      // Simulating Premium Send (Mock backend wait)
      setTimeout(() => {
        // Success State
        submitBtn.innerHTML = `
          <svg class="me-2" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Sent Successfully!
        `;
        submitBtn.classList.remove('btn-gold');
        submitBtn.classList.add('btn-success');
        submitBtn.style.backgroundColor = '#25D366';
        submitBtn.style.borderColor = '#25D366';
        
        // Show success popover/modal or alert
        const alertBox = document.createElement('div');
        alertBox.className = 'alert alert-success mt-4 animate-fade-in glass-panel';
        alertBox.style.borderLeft = '4px solid #C5A059';
        alertBox.style.color = '#0A2240';
        alertBox.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        alertBox.innerHTML = `
          <h5 class="fw-bold mb-1" style="font-family: 'Playfair Display', serif;">Thank You!</h5>
          <p class="mb-0 fs-6 text-muted">Your inquiry has been successfully sent. A Stella Maris consultant will reach out to you within 24 hours to help guide your path.</p>
        `;
        contactForm.appendChild(alertBox);
        
        // Reset form
        contactForm.reset();
        contactForm.classList.remove('was-validated');
        
        // Reset button after 5 seconds
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.classList.add('btn-gold');
          submitBtn.classList.remove('btn-success');
          submitBtn.style.backgroundColor = '';
          submitBtn.style.borderColor = '';
          alertBox.style.opacity = '0';
          alertBox.style.transform = 'translateY(10px)';
          alertBox.style.transition = 'all 0.5s ease';
          setTimeout(() => alertBox.remove(), 500);
        }, 6000);
        
      }, 1500);
    });
  }
  
});
