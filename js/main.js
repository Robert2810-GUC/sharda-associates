/* ============================================================
   SHARDA ASSOCIATES — main.js
   Complete rewrite with all animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── PRELOADER ────────────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const minShow = 2400;
    const start = Date.now();
    window.addEventListener('load', () => {
      const elapsed = Date.now() - start;
      const delay = Math.max(0, minShow - elapsed);
      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
        // Trigger hero word animation after preloader
        initHeroWords();
        initTyped();
      }, delay);
    });
  } else {
    initHeroWords();
    initTyped();
  }

  /* ── SCROLL PROGRESS BAR ──────────────────────────────── */
  const scrollBar = document.getElementById('scroll-progress');
  function updateScrollProgress() {
    if (!scrollBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollBar.style.width = pct + '%';
  }

  /* ── CUSTOM CURSOR ────────────────────────────────────── */
  const cursorDot = document.getElementById('cursorDot');
  const isTouch = window.matchMedia('(hover: none)').matches;

  if (cursorDot && !isTouch) {
    let cx = 0, cy = 0;
    let tx = 0, ty = 0;
    let rafId;

    document.addEventListener('mousemove', (e) => {
      tx = e.clientX;
      ty = e.clientY;
    });

    function animateCursor() {
      const ease = 0.18;
      cx += (tx - cx) * ease;
      cy += (ty - cy) * ease;
      cursorDot.style.transform = `translate(${cx - 5}px, ${cy - 5}px)`;
      rafId = requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Expand on interactive elements
    const hoverTargets = 'a, button, .btn-primary, .btn-outline, .submit-btn, .tab-btn, .hamburger, .proj-card, .running-card, .comp-card, .service-card, .testi-card';
    document.querySelectorAll(hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', () => cursorDot.classList.add('cursor-expanded'));
      el.addEventListener('mouseleave', () => cursorDot.classList.remove('cursor-expanded'));
    });

    document.addEventListener('mouseleave', () => { cursorDot.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursorDot.style.opacity = '1'; });
  } else if (cursorDot) {
    cursorDot.style.display = 'none';
    document.body.style.cursor = 'auto';
  }

  /* ── NAVBAR SCROLL BEHAVIOUR ──────────────────────────── */
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        updateScrollProgress();

        // Scrolled state
        if (navbar) {
          if (scrollY > 40) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
          // Hide on scroll down, show on scroll up
          if (scrollY > 200) {
            if (scrollY > lastScrollY + 5) {
              navbar.classList.add('nav-hidden');
            } else if (scrollY < lastScrollY - 5) {
              navbar.classList.remove('nav-hidden');
            }
          } else {
            navbar.classList.remove('nav-hidden');
          }
        }

        // Back-to-top button
        const btn = document.getElementById('back-to-top');
        if (btn) {
          if (scrollY > 400) {
            btn.classList.add('visible');
          } else {
            btn.classList.remove('visible');
          }
        }

        lastScrollY = scrollY;
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── BACK TO TOP ──────────────────────────────────────── */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── HAMBURGER / MOBILE NAV ───────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');

  function openMobileNav() {
    hamburger?.classList.add('open');
    mobileOverlay?.classList.add('open');
    mobileDrawer?.classList.add('open');
    document.body.classList.add('nav-open');
    if (navbar) navbar.classList.remove('nav-hidden');
  }

  function closeMobileNav() {
    hamburger?.classList.remove('open');
    mobileOverlay?.classList.remove('open');
    mobileDrawer?.classList.remove('open');
    document.body.classList.remove('nav-open');
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (hamburger.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileNav);
  }

  // Close mobile nav on link click
  if (mobileDrawer) {
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });
  }

  /* ── ACTIVE NAV LINK (single-page anchor) ─────────────── */
  function updateActiveNavSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-drawer a');
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        const id = section.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavSection, { passive: true });

  /* ── HERO TEXT WORD-BY-WORD REVEAL ───────────────────── */
  function initHeroWords() {
    const words = document.querySelectorAll('.hero-headline .word, .page-hero-title .word');
    words.forEach((word, i) => {
      setTimeout(() => {
        word.classList.add('visible');
      }, 150 + i * 120);
    });
  }

  /* ── TYPED EFFECT ON HERO SUB-HEADLINE ───────────────── */
  function initTyped() {
    const subEl = document.querySelector('.hero-sub[data-typed]');
    if (!subEl) return;

    const text = subEl.getAttribute('data-typed') || subEl.textContent.trim();
    subEl.textContent = '';

    // Create typed cursor
    const cursor = document.createElement('span');
    cursor.id = 'typed-cursor';
    subEl.appendChild(cursor);

    let i = 0;
    const speed = 28;

    function typeChar() {
      if (i < text.length) {
        const textNode = document.createTextNode(text[i]);
        subEl.insertBefore(textNode, cursor);
        i++;
        setTimeout(typeChar, speed);
      }
    }

    setTimeout(typeChar, 600);
  }

  /* ── PARALLAX HERO BG ─────────────────────────────────── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.5) {
        heroBg.style.transform = `translateY(${y * 0.4}px)`;
      }
    }, { passive: true });
  }

  /* ── SMOOTH COUNTER WITH EASING ──────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;
    const duration = 1800;
    const startTime = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(eased * target);
      el.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-counter]').forEach(el => {
    counterObserver.observe(el);
  });

  /* ── PROGRESS BARS WITH SHIMMER ──────────────────────── */
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width') || '0';
        bar.style.width = width + '%';
        setTimeout(() => {
          bar.classList.add('shimmer-done');
        }, 1500);
        progressObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.progress-bar-fill').forEach(bar => {
    progressObserver.observe(bar);
  });

  /* ── STAGGERED CARD ENTRANCE ──────────────────────────── */
  const cardGridObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const grid = entry.target;
        const cards = grid.querySelectorAll(':scope > *');
        cards.forEach((card, i) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(24px)';
          card.style.transition = `opacity .5s ease ${i * 80}ms, transform .5s ease ${i * 80}ms`;
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50 + i * 80);
        });
        cardGridObserver.unobserve(grid);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.values-grid, .goals-grid, .certs-grid, .community-inner').forEach(grid => {
    cardGridObserver.observe(grid);
  });

  /* ── IMAGE LAZY REVEAL ────────────────────────────────── */
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.complete) {
          img.classList.add('img-loaded');
        } else {
          img.addEventListener('load', () => img.classList.add('img-loaded'), { once: true });
        }
        imgObserver.unobserve(img);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 80px 0px' });

  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imgObserver.observe(img);
  });

  /* ── MAGNETIC BUTTON EFFECT ───────────────────────────── */
  if (!isTouch) {
    document.querySelectorAll('.btn-primary, .submit-btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = (e.clientX - centerX) * 0.3;
        const dy = (e.clientY - centerY) * 0.3;
        const maxShift = 8;
        const shiftX = Math.max(-maxShift, Math.min(maxShift, dx));
        const shiftY = Math.max(-maxShift, Math.min(maxShift, dy));
        btn.style.transform = `translate(${shiftX}px, ${shiftY}px) translateY(-2px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ── CARD 3D TILT ─────────────────────────────────────── */
  if (!isTouch) {
    document.querySelectorAll('.proj-card, .running-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const maxTilt = 6;
        const rotX = (-y * maxTilt).toFixed(2);
        const rotY = (x * maxTilt).toFixed(2);
        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
        card.style.transition = 'transform .1s ease';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform .4s ease, border-color .35s ease, box-shadow .35s ease';
      });
    });
  }

  /* ── TAB SWITCHING ────────────────────────────────────── */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.add('active');
        // Re-trigger progress bars in newly visible tab
        target.querySelectorAll('.progress-bar-fill').forEach(bar => {
          if (bar.style.width === '0px' || !bar.style.width) {
            const width = bar.getAttribute('data-width') || '0';
            bar.style.width = width + '%';
            setTimeout(() => bar.classList.add('shimmer-done'), 1500);
          }
        });
        // Re-trigger AOS for newly visible content
        if (window.AOS) window.AOS.refresh();
      }
    });
  });

  /* ── CONTACT FORM ─────────────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const requiredFields = contactForm.querySelectorAll('[required]');
      let valid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = 'var(--crimson-light)';
          field.addEventListener('input', () => {
            field.style.borderColor = '';
          }, { once: true });
        }
      });

      if (!valid) return;

      const submitBtn = contactForm.querySelector('.submit-btn');
      if (submitBtn) {
        submitBtn.textContent = 'SENDING...';
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        contactForm.style.display = 'none';
        if (formSuccess) {
          formSuccess.style.display = 'block';
          formSuccess.style.animation = 'fadeUp .5s ease both';
        }
      }, 1200);
    });
  }

  /* ── AOS INIT ─────────────────────────────────────────── */
  if (window.AOS) {
    AOS.init({
      duration: 700,
      once: true,
      offset: 60,
      easing: 'ease-out-cubic',
    });
  }

  /* ── WHATSAPP FLOATING BUTTON ─────────────────────────── */
  const waBtn = document.getElementById('whatsapp-btn');
  if (waBtn && !isTouch) {
    waBtn.addEventListener('mousemove', (e) => {
      const rect = waBtn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
      waBtn.style.transform = `translate(${x}px, ${y}px) scale(1.08)`;
    });
    waBtn.addEventListener('mouseleave', () => {
      waBtn.style.transform = '';
    });
  }

  /* ── FOOTER YEAR ──────────────────────────────────────── */
  const yearEls = document.querySelectorAll('.footer-year');
  yearEls.forEach(el => {
    el.textContent = new Date().getFullYear();
  });

});
/* end DOMContentLoaded */
