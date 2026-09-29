import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LINEART_FADE_OPACITY = 0.18;

type RevealDir = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

function revealSectionContent(section: HTMLElement, tl: gsap.core.Timeline) {
  section.querySelectorAll<HTMLElement>('[data-text-reveal], [data-reveal]').forEach((el) => {
if (el.hasAttribute('data-text-reveal')) {
      el.querySelectorAll<HTMLElement>('.reveal-line').forEach((line, li) => {
        const text = line.textContent || '';
        line.innerHTML = '';
        const chars: HTMLElement[] = [];
        for (const token of text.split(/(\s+)/)) {
          if (!token) continue;
          const word = document.createElement('span');
          word.style.cssText = 'display:inline-block;white-space:nowrap';
          for (const ch of token) {
            const span = document.createElement('span');
            span.textContent = ch === ' ' ? ' ' : ch;
            span.style.cssText = 'display:inline-block;opacity:0;transform:translateY(60px) rotateX(-90deg) scale(0.5);transform-origin:bottom center';
            word.appendChild(span);
            chars.push(span);
          }
          line.appendChild(word);
        }
        tl.to(chars, {
          opacity: 1, y: 0, rotateX: 0, scale: 1,
          duration: 0.5, stagger: 0.025, ease: 'back.out(1.7)', delay: li * 0.15,
        }, '>');
      });
      return;
    }

    const reveal = el.dataset.reveal as RevealDir | undefined;
    if (!reveal) return;

    const from: gsap.TweenVars = { opacity: 0, duration: 0.7, ease: 'power3.out' };
    if (reveal === 'up') from.y = 40;
    else if (reveal === 'down') from.y = -40;
    else if (reveal === 'left') from.x = 40;
    else if (reveal === 'right') from.x = -40;
    else if (reveal === 'scale') from.scale = 0.95;

    tl.fromTo(el, from, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }, '>');
  });
}

export function initLineart() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll<HTMLElement>('[data-lineart]').forEach((svg) => {
    const section = svg.closest<HTMLElement>('section') || svg.parentElement;
    if (!section) return;

    const paths = svg.querySelectorAll<SVGPathElement>('.lineart-path');
    if (!paths.length) return;

    if (prefersReducedMotion) {
      svg.style.opacity = String(LINEART_FADE_OPACITY);
      return;
    }

    gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set(svg, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 88%', toggleActions: 'play none none none' },
    });

    tl.to(svg, { opacity: 1, duration: 0.3, ease: 'power1.out' });
    tl.to(paths, { strokeDashoffset: 0, duration: 1.1, stagger: 0.09, ease: 'power2.inOut' }, '<0.05');
    tl.to(svg, { opacity: LINEART_FADE_OPACITY, duration: 0.7, ease: 'power2.inOut' }, '+=0.25');

    revealSectionContent(section, tl);
  });
}