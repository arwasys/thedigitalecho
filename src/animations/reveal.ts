import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initLineart } from './lineart';

gsap.registerPlugin(ScrollTrigger);

export function initScrollReveal() {
  const revealAll = () =>
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      gsap.killTweensOf(el);
      el.style.opacity = '1';
      el.style.transform = 'none';
    });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Keep CSS-hidden elements (e.g. .hero-badge) visible when animations are disabled
    revealAll();
    return;
  }

  try {
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.closest('section[data-lineart-section]')) return;

      const dir = el.dataset.reveal || 'up';
      const delay = parseFloat(el.dataset.delay || '0');
      const from: gsap.TweenVars = { opacity: 0, duration: 0.8, ease: 'power3.out', delay };
      if (dir === 'up') from.y = 40;
      else if (dir === 'down') from.y = -40;
      else if (dir === 'left') from.x = 40;
      else if (dir === 'right') from.x = -40;
      else if (dir === 'scale') from.scale = 0.95;

      gsap.fromTo(el, from, {
        opacity: 1, x: 0, y: 0, scale: 1,
        scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none' },
      });
    });

    initLineart();
  } catch (e) {
    // Never leave content invisible because an animation failed to initialise.
    console.error('Scroll reveal init failed:', e);
    revealAll();
    return;
  }

  // Trigger positions are measured once — late layout (images, fonts, video) can
  // shift them so nothing fires and the section stays at opacity 0.
  requestAnimationFrame(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  window.setTimeout(() => {
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.style.opacity !== '0') return;
      if (el.getBoundingClientRect().top >= window.innerHeight) return;
      gsap.killTweensOf(el);
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }, 2500);
}

export function initTextReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document
      .querySelectorAll<HTMLElement>('[data-text-reveal] .reveal-line, [data-text-reveal] .hero-title-line')
      .forEach((line) => { line.style.opacity = '1'; });
    return;
  }

  document.querySelectorAll<HTMLElement>('[data-text-reveal]').forEach((el) => {
    if (el.closest('section[data-lineart-section]')) return;

    // .reveal-line (section headings) + .hero-title-line (PageHero titles, CSS-hidden until revealed)
    const lines = el.querySelectorAll<HTMLElement>('.reveal-line, .hero-title-line');

    lines.forEach((line, li) => {
      // Always restore the parent: another page's init may have killed the reveal
      // while this line was still CSS-hidden (opacity: 0).
      gsap.set(line, { opacity: 1 });

      if (line.dataset.revealSplit !== 'true') {
        const text = line.textContent || '';
        line.innerHTML = '';
        for (const token of text.split(/(\s+)/)) {
          if (!token) continue;
          const word = document.createElement('span');
          word.style.cssText = 'display:inline-block;white-space:nowrap';
          for (const ch of token) {
            const span = document.createElement('span');
            span.className = 'reveal-char';
            span.textContent = ch === ' ' ? ' ' : ch;
            span.style.cssText =
              'display:inline-block;opacity:0;transform:translateY(60px) rotateX(-90deg) scale(0.5);transform-origin:bottom center';
            word.appendChild(span);
          }
          line.appendChild(word);
        }
        line.dataset.revealSplit = 'true';
      }

      const chars = line.querySelectorAll<HTMLElement>('.reveal-char');
      gsap.killTweensOf(chars);
      gsap.to(chars, {
        opacity: 1, y: 0, rotateX: 0, scale: 1,
        duration: 0.5, stagger: 0.025, ease: 'back.out(1.7)',
        delay: li * 0.15,
        scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none' },
      });
    });
  });
}

export function initImageReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  document.querySelectorAll<HTMLElement>('[data-image-reveal]').forEach((el) => {
    gsap.fromTo(el,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.inOut',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } },
    );
  });
}

export function initParallax() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || '0.1');
    gsap.to(el, { yPercent: speed * 100, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

export function initHorizontalScroll() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  document.querySelectorAll<HTMLElement>('[data-horizontal]').forEach((section) => {
    const items = section.querySelector<HTMLElement>('.horizontal-items');
    if (!items) return;

    gsap.to(items, {
      x: () => -(items.scrollWidth - section.clientWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${items.scrollWidth - section.clientWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });
  });
}

export function initServicesReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const section = document.querySelector('.what-we-do-section');
  if (!section) return;

  const items = section.querySelectorAll<HTMLElement>('.service-item');
  if (!items.length) return;

  gsap.fromTo(items,
    { opacity: 0, x: -40 },
    { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' } },
  );
}

export function cleanupAnimations() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
  ScrollTrigger.refresh();
}
