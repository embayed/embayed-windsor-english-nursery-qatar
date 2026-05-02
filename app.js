// Mark body as JS-ready so reveal animations activate safely
document.body.classList.add('js-ready');

// Mobile menu toggle
const btn = document.querySelector('.toggle');
const menu = document.querySelector('.menu');
if (btn) {
  btn.textContent = '☰';
  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    btn.textContent = menu.classList.contains('open') ? '✕' : '☰';
  });
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      btn.textContent = '☰';
    }
  });
}

// Lightbox for gallery images
document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => {
    let lb = document.getElementById('lightbox');
    if (!lb) {
      lb = document.createElement('div');
      lb.id = 'lightbox';
      lb.className = 'lightbox';
      lb.innerHTML = '<img>';
      document.body.appendChild(lb);
      lb.addEventListener('click', () => lb.classList.remove('active'));
    }
    lb.querySelector('img').src = img.src;
    lb.classList.add('active');
  });
});

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
// Immediately reveal elements already in viewport on load
setTimeout(() => {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add('visible');
  });
}, 50);

// Sticky header shadow
window.addEventListener('scroll', () => {
  document.querySelector('header')?.classList.toggle('scrolled', window.scrollY > 10);
});
