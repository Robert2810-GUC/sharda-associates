/* ============================================================
   SHARDA ASSOCIATES — MAIN JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── PRELOADER ──────────────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const bar = preloader.querySelector('.preloader-bar');
    if (bar) {
      setTimeout(() => { bar.style.width = '100%'; }, 100);
    }
    setTimeout(() => {
      preloader.classList.add('hidden');
      setTimeout(() => { preloader.remove(); }, 700);
    }, 2200);
  }

  /* ── NAVBAR SCROLL ──────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  function handleScroll() {
    if (navbar) {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    // Back to top
    const btt = document.getElementById('back-to-top');
    if (btt) {
      if (window.scrollY > 400) {
        btt.classList.add('show');
      } else {
        btt.classList.remove('show');
      }
    }
  }
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  /* ── ACTIVE NAV LINK ────────────────────────────────────── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (
      (href === 'index.html' && (page === 'index.html' || page === '')) ||
      (href !== 'index.html' && href === page)
    ) {
      link.classList.add('active');
    }
  });

  /* ── HAMBURGER MENU ─────────────────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('mobile-open');
      document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('mobile-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── BACK TO TOP ────────────────────────────────────────── */
  const bttBtn = document.getElementById('back-to-top');
  if (bttBtn) {
    bttBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── COUNTER ANIMATION ──────────────────────────────────── */
  function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const startTime = performance.now();
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * target);
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const target = parseInt(entry.target.dataset.target, 10);
        animateCounter(entry.target, target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-counter]').forEach(el => {
    counterObserver.observe(el);
  });

  /* ── PROGRESS BARS ANIMATION ────────────────────────────── */
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        const pct = entry.target.dataset.width || '0';
        entry.target.style.width = pct + '%';
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.progress-bar-fill').forEach(bar => {
    progressObserver.observe(bar);
  });

  /* ── TAB NAVIGATION (Projects page) ────────────────────── */
  const tabBtns    = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      const content = document.getElementById(target);
      if (content) content.classList.add('active');
    });
  });

  /* ── CONTACT FORM ────────────────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.submit-btn');
      if (btn) {
        btn.textContent = 'SENDING...';
        btn.disabled = true;
      }
      setTimeout(() => {
        contactForm.style.display = 'none';
        const successMsg = document.getElementById('form-success');
        if (successMsg) successMsg.classList.add('show');
      }, 1200);
    });
  }

  /* ── AOS INIT ────────────────────────────────────────────── */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
    });
  }

  /* ── MARQUEE DUPLICATE ───────────────────────────────────── */
  const track = document.querySelector('.marquee-track');
  if (track) {
    // already duplicated in HTML for seamless loop
  }

});
