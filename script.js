/* ============================================================
   AANCHAL — PORTFOLIO JAVASCRIPT
   ============================================================ */

/* ── CUSTOM CURSOR ── */
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    follower.style.left = e.clientX + 'px';
    follower.style.top  = e.clientY + 'px';
  }, 80);
});

document.querySelectorAll('a, button, .service-card, .portfolio-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform   = 'translate(-50%, -50%) scale(2)';
    follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    follower.style.opacity   = '0.2';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform   = 'translate(-50%, -50%) scale(1)';
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.opacity   = '0.5';
  });
});

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ── MOBILE MENU ── */
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .timeline-item');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

/* ── PORTFOLIO FILTER ── */
function filterPortfolio(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.portfolio-card').forEach(card => {
    const match = cat === 'all' || card.dataset.cat === cat;
    card.style.opacity   = match ? '1' : '0.2';
    card.style.transform = match ? 'scale(1)' : 'scale(0.95)';
    card.style.transition = 'all 0.4s ease';
  });
}

/* ── CONTACT FORM ── */
function handleSubmit() {
  const name  = document.getElementById('fname').value;
  const email = document.getElementById('femail').value;
  const msg   = document.getElementById('fmessage').value;
  if (!name || !email || !msg) {
    showToast('Please fill in all required fields.', 'warning');
    return;
  }
  setTimeout(() => {
    showToast("Message sent! I'll get back to you soon.");
    document.getElementById('fname').value    = '';
    document.getElementById('femail').value   = '';
    document.getElementById('fsubject').value = '';
    document.getElementById('fbudget').value  = '';
    document.getElementById('fmessage').value = '';
  }, 500);
}

/* ── TOAST ── */
function showToast(msg, type = 'success') {
  const toast    = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ── CV DOWNLOAD ── */
function downloadCV(e) {
  e.preventDefault();
  showToast('CV download started!');
  // In production: window.open('Aanchal_CV.pdf', '_blank');
}

/* ── ACTIVE NAV HIGHLIGHT ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--warm)';
    }
  });
});

function downloadCV(event) {
  event.preventDefault(); // prevent default link behavior
  const link = event.currentTarget;
  const url = link.getAttribute('href');
  const a = document.createElement('a');
  a.href = url;
  a.download = url.split('/').pop();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
