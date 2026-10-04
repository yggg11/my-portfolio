/* ===========================
   YOUSEF ELGENDY — script.js
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
 
 
 
 
/* ===== Social grid: keep original order, no gaps =====
   desktop (> 1024px) → 3 columns · tablet (≤ 1024px) → 2 columns · phone (≤ 768px) → 1 column
   Same breakpoints as the CSS. */
(function () {
  const grid = document.querySelector('#social .social-grid');
  if (!grid) return;
  const cards = Array.from(document.querySelectorAll('#social .social-card'));
  // remember the original order (the lightbox uses it to go next / previous)
  cards.forEach((card, i) => { card.dataset.idx = i; });
  let current = 0;
 
  function layout() {
    const w = window.innerWidth;
    const n = w <= 768 ? 1 : (w <= 1024 ? 2 : 3);
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
 
 
/* ===== Social media lightbox =====
   Tap a design (or "show more") → opens full screen.
   · pinch with two fingers / double-tap / mouse wheel → zoom
   · drag when zoomed → move around the design
   · swipe left / right → next / previous design · swipe down → close
   · Android back button, Esc and the ✕ button close it
*/
(function () {
  const grid = document.querySelector('#social .social-grid');
  if (!grid) return;
 
  const root = document.documentElement;
 
  // ---------- build the markup ----------
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Design preview');
  lb.innerHTML =
    '<div class="lb-top">' +
      '<span class="lb-count"></span>' +
      '<button class="lb-btn lb-close" type="button" aria-label="Close">✕</button>' +
    '</div>' +
    '<div class="lb-stage"><img class="lb-img" alt="" draggable="false"></div>' +
    '<button class="lb-btn lb-nav lb-prev" type="button" aria-label="Previous design">‹</button>' +
    '<button class="lb-btn lb-nav lb-next" type="button" aria-label="Next design">›</button>' +
    '<div class="lb-caption"><strong class="lb-title"></strong><span class="lb-type"></span></div>' +
    '<div class="lb-hint">Pinch or double-tap to zoom</div>';
  document.body.appendChild(lb);
 
  const stage   = lb.querySelector('.lb-stage');
  const img     = lb.querySelector('.lb-img');
  const countEl = lb.querySelector('.lb-count');
  const titleEl = lb.querySelector('.lb-title');
  const typeEl  = lb.querySelector('.lb-type');
 
  const MAX_SCALE = 5;
  let items = [];
  let index = 0;
  let lastFocus = null;
 
  // current zoom / position of the image
  let scale = 1, tx = 0, ty = 0;
 
  // ---------- helpers ----------
  function getItems() {
    return Array.from(grid.querySelectorAll('.social-card')).sort(function (a, b) {
      return (+a.dataset.idx || 0) - (+b.dataset.idx || 0);
    });
  }
 
  function apply(animate) {
    img.style.transition = animate ? 'transform 0.25s ease, opacity 0.25s' : 'opacity 0.25s';
    img.style.transform = 'translate(' + tx + 'px, ' + ty + 'px) scale(' + scale + ')';
  }
 
  function reset(animate) {
    scale = 1; tx = 0; ty = 0;
    apply(animate);
  }
 
  function metrics() {
    const r = stage.getBoundingClientRect();
    return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, w: r.width, h: r.height };
  }
 
  // keep the zoomed image from being dragged out of the screen
  function clampPan() {
    const m = metrics();
    const maxX = Math.max(0, (img.offsetWidth  * scale - m.w) / 2);
    const maxY = Math.max(0, (img.offsetHeight * scale - m.h) / 2);
    tx = Math.max(-maxX, Math.min(maxX, tx));
    ty = Math.max(-maxY, Math.min(maxY, ty));
  }
 
  // zoom to scale k so the point that was under (fx, fy) ends up under (px, py)
  function transformAbout(k, k0, t0x, t0y, fx, fy, px, py) {
    const m = metrics();
    k = Math.max(1, Math.min(MAX_SCALE, k));
    scale = k;
    tx = (px - m.cx) - (k / k0) * (fx - m.cx - t0x);
    ty = (py - m.cy) - (k / k0) * (fy - m.cy - t0y);
    if (k === 1) { tx = 0; ty = 0; }
    clampPan();
  }
 
  function toggleZoom(px, py) {
    if (scale > 1) { reset(true); return; }
    transformAbout(2.5, 1, 0, 0, px, py, px, py);
    apply(true);
  }
 
  // ---------- show a design ----------
  function show(i) {
    index = (i + items.length) % items.length;
    const card  = items[index];
    const thumb = card.querySelector('.social-img-wrap img');
    const h3    = card.querySelector('h3');
    const type  = card.querySelector('.social-type');
    const src   = thumb ? (thumb.currentSrc || thumb.src) : '';
 
    reset(false);
    if (img.src !== src) {
      img.style.opacity = '0';
      img.onload = img.onerror = function () { img.style.opacity = '1'; };
      img.src = src;
    }
    img.alt = thumb ? (thumb.alt || (h3 ? h3.textContent.trim() : '')) : '';
 
    titleEl.textContent = h3 ? h3.textContent.trim() : '';
    typeEl.textContent  = type ? type.textContent.trim() : '';
    countEl.textContent = (index + 1) + ' / ' + items.length;
 
    // warm up the neighbours so swiping feels instant
    [index + 1, index - 1].forEach(function (j) {
      const c = items[(j + items.length) % items.length];
      const t = c && c.querySelector('.social-img-wrap img');
      if (t) { const pre = new Image(); pre.src = t.currentSrc || t.src; }
    });
  }
 
  function step(d) {
    if (items.length > 1) show(index + d);
  }
 
  function open(card) {
    items = getItems();
    const i = items.indexOf(card);
    if (i < 0) return;
    lastFocus = document.activeElement;
    show(i);
    lb.classList.add('open');
    root.classList.add('lb-open');
    // so the phone's back button closes the viewer instead of leaving the site
    try { history.pushState({ lightbox: true }, ''); } catch (err) {}
    lb.querySelector('.lb-close').focus({ preventScroll: true });
  }
 
  function close(fromPop) {
    if (!lb.classList.contains('open')) return;
    lb.classList.remove('open');
    root.classList.remove('lb-open');
    pts.clear();
    if (!fromPop) {
      try { if (history.state && history.state.lightbox) history.back(); } catch (err) {}
    }
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
 
  window.addEventListener('popstate', function () { close(true); });
 
  // ---------- open from the grid ----------
  grid.addEventListener('click', function (e) {
    const link = e.target.closest('.social-icons-row a');
    const wrap = e.target.closest('.social-img-wrap');
    if (!link && !wrap) return;
    e.preventDefault();
    const card = e.target.closest('.social-card');
    if (card) open(card);
  });
 
  // ---------- buttons + keyboard ----------
  lb.querySelector('.lb-close').addEventListener('click', function () { close(); });
  lb.querySelector('.lb-prev').addEventListener('click', function () { step(-1); });
  lb.querySelector('.lb-next').addEventListener('click', function () { step(1); });
 
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') { close(); }
    else if (e.key === 'ArrowRight') { step(1); }
    else if (e.key === 'ArrowLeft')  { step(-1); }
    else if (e.key === 'Tab') {
      const f = Array.from(lb.querySelectorAll('button')).filter(function (b) { return b.offsetParent !== null; });
      if (!f.length) return;
      e.preventDefault();
      const i = f.indexOf(document.activeElement);
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });
 
  // stop iOS Safari from zooming the whole page while pinching the design
  lb.addEventListener('gesturestart', function (e) { e.preventDefault(); });
 
  // ---------- touch / mouse gestures ----------
  const pts = new Map();              // active pointers
  let pinch = null;                   // state at the start of a two-finger pinch
  let drag = null;                    // state of a one-finger drag
  let multi = false;                  // a second finger touched during this gesture
  let lastTap = 0, lastTapX = 0, lastTapY = 0;
 
  stage.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    try { stage.setPointerCapture(e.pointerId); } catch (err) {}
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
 
    if (pts.size === 1) {
      multi = false;
      drag = { x: e.clientX, y: e.clientY, tx: tx, ty: ty, t: Date.now(), target: e.target, moved: false };
    } else if (pts.size === 2) {
      multi = true;
      const p = Array.from(pts.values());
      pinch = {
        dist: Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) || 1,
        scale: scale, tx: tx, ty: ty,
        mx: (p[0].x + p[1].x) / 2,
        my: (p[0].y + p[1].y) / 2
      };
      drag = null;
    }
  });
 
  stage.addEventListener('pointermove', function (e) {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
 
    // two fingers → pinch zoom (+ move)
    if (pts.size >= 2 && pinch) {
      const p = Array.from(pts.values());
      const dist = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
      const mx = (p[0].x + p[1].x) / 2;
      const my = (p[0].y + p[1].y) / 2;
      transformAbout(pinch.scale * dist / pinch.dist, pinch.scale, pinch.tx, pinch.ty, pinch.mx, pinch.my, mx, my);
      apply(false);
      return;
    }
 
    if (!drag) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) drag.moved = true;
 
    if (scale > 1) {
      // zoomed in → move around the design
      tx = drag.tx + dx;
      ty = drag.ty + dy;
      clampPan();
      apply(false);
    } else if (drag.moved) {
      // not zoomed → the design follows the finger (swipe to change / close)
      tx = dx;
      ty = dy;
      apply(false);
    }
  });
 
  function endPointer(e) {
    if (!pts.has(e.pointerId)) return;
    pts.delete(e.pointerId);
    try { stage.releasePointerCapture(e.pointerId); } catch (err) {}
 
    // one finger lifted after a pinch → keep moving with the remaining finger
    if (pts.size === 1) {
      const p = Array.from(pts.values())[0];
      drag = { x: p.x, y: p.y, tx: tx, ty: ty, t: Date.now(), target: null, moved: true };
      pinch = null;
      return;
    }
    if (pts.size > 1) return;
 
    // all fingers are up
    pinch = null;
    const d = drag;
    drag = null;
 
    if (e.type === 'pointercancel' || !d || multi) {
      if (scale <= 1.02) reset(true); else { clampPan(); apply(true); }
      return;
    }
 
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    const isTap = !d.moved && (Date.now() - d.t) < 350;
 
    if (isTap) {
      const now = Date.now();
      if (now - lastTap < 320 && Math.hypot(e.clientX - lastTapX, e.clientY - lastTapY) < 30) {
        lastTap = 0;
        toggleZoom(e.clientX, e.clientY);          // double tap
      } else {
        lastTap = now; lastTapX = e.clientX; lastTapY = e.clientY;
        if (d.target === stage && scale === 1) close();   // tap on the dark background
      }
      return;
    }
 
    if (scale > 1) { clampPan(); apply(true); return; }
 
    // swipes (only when not zoomed)
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) && items.length > 1) {
      step(dx < 0 ? 1 : -1);
    } else if (dy > 110 && Math.abs(dy) > Math.abs(dx)) {
      close();
    } else {
      reset(true);
    }
  }
 
  stage.addEventListener('pointerup', endPointer);
  stage.addEventListener('pointercancel', endPointer);
 
  // mouse wheel zoom (desktop)
  stage.addEventListener('wheel', function (e) {
    e.preventDefault();
    const k = scale * Math.exp(-e.deltaY * 0.002);
    transformAbout(k, scale, tx, ty, e.clientX, e.clientY, e.clientX, e.clientY);
    apply(false);
  }, { passive: false });
})();
 
