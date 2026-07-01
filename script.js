// Typewriter effect for hero role text
const roles = ["WordPress Expert", "PHP & WooCommerce Custom Development", "Building Sites That Perform"];
const twEl = document.getElementById('typewriter');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  const current = roles[roleIndex];
  if(!deleting){
    charIndex++;
    twEl.textContent = current.slice(0, charIndex);
    if(charIndex === current.length){
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 55);
  } else {
    charIndex--;
    twEl.textContent = current.slice(0, charIndex);
    if(charIndex === 0){
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeLoop, 300);
      return;
    }
    setTimeout(typeLoop, 30);
  }
}
if(twEl){ typeLoop(); }

// Preloader
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if(pre){
    setTimeout(() => { pre.classList.add('loaded'); }, 1500);
  }
});

// Skills tabs
const skillsTabs = document.querySelectorAll('.skills-tab');
const skillsPanels = document.querySelectorAll('.skills-panel');
skillsTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    skillsTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.getAttribute('data-tab');
    skillsPanels.forEach(panel => {
      panel.hidden = panel.getAttribute('data-panel') !== target;
    });
  });
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('portfolio-theme');
if(savedTheme){
  root.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀';
}
themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  if(next === 'light'){ root.setAttribute('data-theme','light'); } else { root.removeAttribute('data-theme'); }
  themeToggle.textContent = next === 'light' ? '🌙' : '☀';
  localStorage.setItem('portfolio-theme', next);
});

// Mobile nav
const navBurger = document.getElementById('navBurger');
const navLinks = document.querySelector('.nav-links');
navBurger.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '64px';
  navLinks.style.right = '20px';
  navLinks.style.background = 'var(--surface)';
  navLinks.style.border = '1px solid var(--border)';
  navLinks.style.borderRadius = '12px';
  navLinks.style.padding = '16px 24px';
  navLinks.style.gap = '14px';
});

// Active link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if(rect.top <= 120 && rect.bottom >= 120){ current = sec.id; }
  });
  navItems.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll(
  '.about-grid, .skills-grid, .timeline-item, .contact-grid, .info-card, .skill-card, .checklist, .pill-row, .project-card, .skill-tags, .about-stat-box, .about-stat-text'
);
revealEls.forEach(el => {
  const rect = el.getBoundingClientRect();
  if(rect.top > window.innerHeight){
    el.classList.add('reveal', 'pre');
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      entry.target.classList.remove('pre');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => observer.observe(el));

// Safety net: guarantee nothing stays hidden
setTimeout(() => {
  document.querySelectorAll('.reveal.pre').forEach(el => {
    el.classList.add('in');
    el.classList.remove('pre');
  });
}, 1200);

// Contact form — sends directly to meraisweta11@gmail.com via FormSubmit
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = document.getElementById('cf-name').value.trim();
    const email   = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();
    const btn     = document.getElementById('cf-submit');
    const success = document.getElementById('cf-success');
    const errBox  = document.getElementById('cf-error');

    if(!name || !email || !message){ return; }

    btn.textContent = 'Sending…';
    btn.disabled    = true;
    success.style.display = 'none';
    errBox.style.display  = 'none';

    try {
      const res = await fetch('https://formsubmit.co/ajax/meraisweta11@gmail.com', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name:     name,
          email:    email,
          message:  message,
          _subject: 'Portfolio Inquiry from ' + name,
          _captcha: 'false'
        })
      });

      if(res.ok){
        success.style.display = 'block';
        contactForm.reset();
        btn.textContent = 'Message Sent ✓';
        btn.style.background = 'linear-gradient(100deg,#11998e,#38ef7d)';
        setTimeout(() => {
          btn.textContent = 'Send Message →';
          btn.style.background = '';
          btn.disabled = false;
          success.style.display = 'none';
        }, 5000);
      } else {
        throw new Error('Failed');
      }
    } catch(err) {
      errBox.style.display = 'block';
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      btn.disabled = false;
    }
  });
}

// Back to top button
const backToTop = document.getElementById('backToTop');
if(backToTop){
  window.addEventListener('scroll', () => {
    if(window.scrollY > 500){ backToTop.classList.add('show'); }
    else{ backToTop.classList.remove('show'); }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
