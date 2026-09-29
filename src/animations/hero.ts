import { gsap } from 'gsap';

let heroTimeline: gsap.core.Timeline | null = null;

export function initHeroAnimation() {
  if (heroTimeline) {
    heroTimeline.kill();
    heroTimeline = null;
  }

  const hero = document.querySelector('.video-bg__content');
  if (!hero) return;

  const titleLines = hero.querySelectorAll('.hero-title-line');
  const buttons = hero.querySelectorAll('.hero-btn');
  const badge = hero.querySelector('.hero-badge');

  // Set hidden state immediately
  if (badge) gsap.set(badge, { opacity: 0, y: 20 });
  gsap.set(titleLines, { opacity: 0, y: 40 });
  gsap.set(buttons, { opacity: 0, y: 20 });

  heroTimeline = gsap.timeline({ delay: 0.1 });

  if (badge) {
    heroTimeline.to(badge, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0);
  }

  heroTimeline.to(titleLines, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, 0.2);

  if (buttons.length) {
    heroTimeline.to(buttons, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }, 0.8);
  }
}
