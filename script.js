const header = document.querySelector('.site-header');
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
const toTop = document.querySelector('.to-top');
const heroImage = document.querySelector('.hero-image img');

window.addEventListener('load', () => {
  setTimeout(() => document.body.classList.add('loaded'), 950);
});

const onScroll = () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 20);
  toTop.classList.toggle('show', y > 500);

  if (heroImage && y < window.innerHeight) {
    heroImage.style.transform = `translateY(${y * 0.12}px) scale(1)`;
  }
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.classList.toggle('active', open);
  menuBtn.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const number = entry.target;
    const target = Number(number.dataset.count || 0);
    const duration = 1300;
    const start = performance.now();

    const animate = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      number.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
    counterObserver.unobserve(number);
  });
}, { threshold: 0.7 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

const filterButtons = document.querySelectorAll('.filters button');
const projects = document.querySelectorAll('.project');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    projects.forEach(project => {
      const match = filter === 'all' || project.dataset.category === filter;
      project.classList.toggle('hide', !match);
    });
  });
});
