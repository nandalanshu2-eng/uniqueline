// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== HERO PARTICLES =====
function createParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 6 + 2;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 8 + 6) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(p);
  }
}
createParticles();

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

document.querySelectorAll('.product-card-img').forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ===== INTERACTIVE CANVAS (Mouse-following particles) =====
const canvas = document.getElementById('interactiveCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let mouse = { x: 0, y: 0 };
  let particles = [];
  const colors = ['#c9a84c', '#e8762b', '#e8d5a3', '#c06070', '#1a6b6b'];

  function resizeCanvas() {
    const section = canvas.parentElement;
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.parentElement.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    for (let i = 0; i < 3; i++) {
      particles.push({
        x: mouse.x, y: mouse.y,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3 - 1,
        size: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1
      });
    }
  });

  // Background floating orbs
  const orbs = [];
  for (let i = 0; i < 15; i++) {
    orbs.push({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 500),
      size: Math.random() * 30 + 10,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: -Math.random() * 0.3 - 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.15 + 0.05
    });
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw orbs
    orbs.forEach(o => {
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.size, 0, Math.PI * 2);
      ctx.fillStyle = o.color + Math.floor(o.opacity * 255).toString(16).padStart(2, '0');
      ctx.fill();
      o.x += o.speedX;
      o.y += o.speedY;
      if (o.y < -o.size) o.y = canvas.height + o.size;
      if (o.x < -o.size) o.x = canvas.width + o.size;
      if (o.x > canvas.width + o.size) o.x = -o.size;
    });

    // Draw mouse particles
    particles.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.fill();
      ctx.globalAlpha = 1;
      p.x += p.vx;
      p.y += p.vy;
      p.vy -= 0.02; // antigravity - particles float up
      p.life -= 0.015;
    });
    particles = particles.filter(p => p.life > 0);

    requestAnimationFrame(animateCanvas);
  }
  animateCanvas();
}

// ===== PARALLAX on scroll =====
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroImg = document.querySelector('.hero-image-wrapper');
  if (heroImg) {
    const rect = heroImg.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      heroImg.style.transform = `translateY(${-scrolled * 0.08}px)`;
    }
  }
});

// ===== SMOOTH ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== FORM HANDLING =====
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #1a6b6b, #2a9d8f)';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// ===== STAGGERED CARD ANIMATION =====
const cards = document.querySelectorAll('.product-card');
cards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

