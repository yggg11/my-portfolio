/* ===========================
   MAZEN MOHAMED — script.js
=========================== */

// ===========================
// LOADER
// ===========================
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    // Kick off hero reveals after loader
    setTimeout(triggerHeroReveal, 200);
  }, 2400);
});

function triggerHeroReveal() {
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, i * 120);
  });
}

// ===========================
// CUSTOM CURSOR
// ===========================
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left  = mouseX + 'px';
  dot.style.top   = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Scale cursor on interactive elements
document.querySelectorAll('a, button, .skill-chip, .filter-btn, .bento-card, .poster-card, .service-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width  = '56px';
    ring.style.height = '56px';
    ring.style.borderColor = 'rgba(198,255,0,0.8)';
    dot.style.transform = 'translate(-50%,-50%) scale(1.6)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width  = '36px';
    ring.style.height = '36px';
    ring.style.borderColor = 'rgba(198,255,0,0.5)';
    dot.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  dot.style.opacity  = '0';
  ring.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  dot.style.opacity  = '1';
  ring.style.opacity = '1';
});

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ===========================
// MOBILE MENU
// ===========================
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ===========================
// SCROLL REVEAL
// ===========================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Stagger children if many siblings
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, (idx % 6) * 90);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal:not(.hero .reveal)').forEach(el => {
  revealObserver.observe(el);
});

// ===========================
// BACK TO TOP
// ===========================
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backTop.classList.add('visible');
  } else {
    backTop.classList.remove('visible');
  }
}, { passive: true });

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===========================
// BEFORE / AFTER SLIDER
// ===========================
const baSlider  = document.getElementById('baSlider');
const baHandle  = document.getElementById('baHandle');
const baAfter   = baSlider ? baSlider.querySelector('.ba-after') : null;

let isDragging = false;

function setSliderPos(x) {
  const rect = baSlider.getBoundingClientRect();
  let pct = ((x - rect.left) / rect.width) * 100;
  pct = Math.max(2, Math.min(98, pct));
  baAfter.style.clipPath  = `inset(0 ${100 - pct}% 0 0)`;
  baHandle.style.left     = pct + '%';
}

if (baSlider) {
  baHandle.addEventListener('mousedown',  e => { isDragging = true; e.preventDefault(); });
  baHandle.addEventListener('touchstart', e => { isDragging = true; }, { passive: true });

  document.addEventListener('mousemove', e => {
    if (isDragging) setSliderPos(e.clientX);
  });
  document.addEventListener('touchmove', e => {
    if (isDragging) setSliderPos(e.touches[0].clientX);
  }, { passive: true });
  document.addEventListener('mouseup',  () => { isDragging = false; });
  document.addEventListener('touchend', () => { isDragging = false; });

  // Click anywhere on slider
  baSlider.addEventListener('click', e => { setSliderPos(e.clientX); });
}

// ===========================
// BENTO FILTER
// ===========================
const filterBtns  = document.querySelectorAll('.filter-btn');
const bentoCards  = document.querySelectorAll('.bento-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    bentoCards.forEach(card => {
      const cat = card.dataset.cat || '';
      if (filter === 'all' || cat === filter) {
        card.style.display = '';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = ''; }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  });
});

// ===========================
// CARD TILT EFFECT
// ===========================
document.querySelectorAll('.service-card, .testi-card, .poster-card, .social-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect  = card.getBoundingClientRect();
    const cx    = rect.left + rect.width / 2;
    const cy    = rect.top  + rect.height / 2;
    const dx    = (e.clientX - cx) / (rect.width / 2);
    const dy    = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-4px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===========================
// SMOOTH ACTIVE NAV HIGHLIGHT
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinksAll.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--neon)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ===========================
// NOISE TEXTURE (canvas overlay)
// ===========================
(function createNoise() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position:fixed;inset:0;width:100%;height:100%;
    pointer-events:none;z-index:1;opacity:0.025;
    mix-blend-mode:overlay;
  `;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function drawNoise() {
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const buffer = imageData.data;
    for (let i = 0; i < buffer.length; i += 4) {
      const val = Math.random() * 255;
      buffer[i]   = val;
      buffer[i+1] = val;
      buffer[i+2] = val;
      buffer[i+3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  let lastNoise = 0;
  function noiseLoop(ts) {
    if (ts - lastNoise > 80) { drawNoise(); lastNoise = ts; }
    requestAnimationFrame(noiseLoop);
  }
  requestAnimationFrame(noiseLoop);
})();
/* ===== Before / After Sliders ===== */

document.querySelectorAll(".ba-slider").forEach((slider) => {
  let isDragging = false;

  const updateSlider = (clientX) => {
    const rect = slider.getBoundingClientRect();
    let x = clientX - rect.left;

    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const position = (x / rect.width) * 100;
    slider.style.setProperty("--position", `${position}%`);
  };

  slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  slider.addEventListener("touchstart", (e) => {
    isDragging = true;
    updateSlider(e.touches[0].clientX);
  });

  window.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  });

  window.addEventListener("touchend", () => {
    isDragging = false;
  });
});
/* ===== Before / After Sliders ===== */

document.querySelectorAll(".ba-slider").forEach((slider) => {
  let isDragging = false;

  const beforeLabel = slider.querySelector(".ba-label-before");
  const afterLabel = slider.querySelector(".ba-label-after");

  const updateLabels = (positionPercent) => {
    const sliderRect = slider.getBoundingClientRect();
    const lineX = (positionPercent / 100) * sliderRect.width;

    if (beforeLabel) {
      const beforeRect = beforeLabel.getBoundingClientRect();
      const beforeRight = beforeRect.right - sliderRect.left;

      if (lineX <= beforeRight) {
        beforeLabel.classList.add("is-hidden");
      } else {
        beforeLabel.classList.remove("is-hidden");
      }
    }

    if (afterLabel) {
      const afterRect = afterLabel.getBoundingClientRect();
      const afterLeft = afterRect.left - sliderRect.left;

      if (lineX >= afterLeft) {
        afterLabel.classList.add("is-hidden");
      } else {
        afterLabel.classList.remove("is-hidden");
      }
    }
  };

  const updateSlider = (clientX) => {
    const rect = slider.getBoundingClientRect();
    let x = clientX - rect.left;

    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const position = (x / rect.width) * 100;

    slider.style.setProperty("--position", `${position}%`);
    updateLabels(position);
  };

  slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  slider.addEventListener("touchstart", (e) => {
    isDragging = true;
    updateSlider(e.touches[0].clientX);
  });

  window.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  });

  window.addEventListener("touchend", () => {
    isDragging = false;
  });

  updateLabels(50);
});




/* ===== Social grid: keep original order (left → right), no gaps ===== */
(function () {
  const grid = document.querySelector('#social .social-grid');
  if (!grid) return;
  const cards = Array.from(document.querySelectorAll('#social .social-card'));
  let current = 0;

  function layout() {
    const n = window.innerWidth <= 1024 ? 2 : 3;   // نفس breakpoints الـ CSS
    if (n === current) return;
    current = n;
    const cols = Array.from({ length: n }, () => {
      const c = document.createElement('div');
      c.className = 'social-col';
      return c;
    });
    cards.forEach((card, i) => cols[i % n].appendChild(card));
    grid.replaceChildren(...cols);
  }

  layout();
  window.addEventListener('resize', layout);
})();