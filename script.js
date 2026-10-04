// =============================================
// RIPPLE EFFECT ON LINK CARDS
// =============================================
document.querySelectorAll('.link-card').forEach(card => {
  card.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.4;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.16);
      left: ${x}px;
      top: ${y}px;
      transform: scale(0);
      animation: ripple-anim 0.65s linear;
      pointer-events: none;
      z-index: 10;
    `;

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// Inject ripple keyframes
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple-anim {
    to { transform: scale(1); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

// =============================================
// SAKURA PETALS — dynamic creation
// =============================================
const petalsContainer = document.getElementById('petals-container');
const PETAL_COUNT = 18;

function createPetal() {
  const petal = document.createElement('div');
  petal.classList.add('petal');

  const size = Math.random() * 10 + 8; // 8–18px
  const left = Math.random() * 110 - 5; // -5% to 105%
  const duration = Math.random() * 10 + 10; // 10–20s
  const delay = Math.random() * 15; // 0–15s
  const drift = (Math.random() - 0.5) * 120; // horizontal drift
  const scale = Math.random() * 0.5 + 0.7;

  petal.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${left}%;
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
    --drift: ${drift}px;
    transform: scale(${scale});
  `;

  petalsContainer.appendChild(petal);
}

if (petalsContainer) {
  for (let i = 0; i < PETAL_COUNT; i++) {
    createPetal();
  }
}

// =============================================
// AVATAR EASTER EGG — click to wiggle
// =============================================
const avatar = document.getElementById('avatar-img');
if (avatar) {
  const wiggleStyle = document.createElement('style');
  wiggleStyle.textContent = `
    @keyframes wiggle {
      0%  { transform: rotate(0deg) scale(1); }
      20% { transform: rotate(-12deg) scale(1.12); }
      40% { transform: rotate(12deg) scale(1.12); }
      60% { transform: rotate(-7deg) scale(1.06); }
      80% { transform: rotate(5deg) scale(1.04); }
      100%{ transform: rotate(0deg) scale(1); }
    }
  `;
  document.head.appendChild(wiggleStyle);

  avatar.addEventListener('click', () => {
    avatar.style.animation = 'none';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        avatar.style.animation = 'wiggle 0.55s ease';
        avatar.addEventListener('animationend', () => {
          avatar.style.animation = '';
        }, { once: true });
      });
    });
  });
}

// =============================================
// STAGGERED ENTRANCE ANIMATION FOR LINKS
// =============================================
const linkCards = document.querySelectorAll('.link-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 130);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

linkCards.forEach((card) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(28px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
  observer.observe(card);
});

// =============================================
// PARALLAX HERO — subtle mouse tracking
// =============================================
const heroImg = document.getElementById('hero-img');
if (heroImg && window.matchMedia('(min-width: 600px)').matches) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 8;
    const y = (e.clientY / window.innerHeight - 0.5) * 5;
    heroImg.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
  });
}
