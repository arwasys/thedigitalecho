import { gsap } from 'gsap';

let cursorCleanup: (() => void) | null = null;

export function initCursor() {
  // Clean up previous instance
  if (cursorCleanup) {
    cursorCleanup();
    cursorCleanup = null;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (prefersReducedMotion || isTouchDevice) return;

  const cursor = document.querySelector('.cursor') as HTMLElement;
  if (!cursor) return;

  const label = cursor.querySelector('.cursor__label') as HTMLElement;

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let animFrameId: number;
  let isRunning = true;

  const cleanups: (() => void)[] = [];

  // Track mouse position
  function handleMouseMove(e: MouseEvent) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
  document.addEventListener('mousemove', handleMouseMove);
  cleanups.push(() => document.removeEventListener('mousemove', handleMouseMove));

  // Smooth follow with requestAnimationFrame
  function updateCursor() {
    if (!isRunning) return;
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    gsap.set(cursor, { x: cursorX, y: cursorY });
    animFrameId = requestAnimationFrame(updateCursor);
  }
  animFrameId = requestAnimationFrame(updateCursor);

  // Hide cursor when it leaves the window
  function handleMouseLeave() { cursor.classList.add('is-hidden'); }
  function handleMouseEnter() { cursor.classList.remove('is-hidden'); }
  document.addEventListener('mouseleave', handleMouseLeave);
  document.addEventListener('mouseenter', handleMouseEnter);
  cleanups.push(
    () => document.removeEventListener('mouseleave', handleMouseLeave),
    () => document.removeEventListener('mouseenter', handleMouseEnter),
  );

  // State management via data-cursor attributes
  const stateElements = document.querySelectorAll('[data-cursor]');
  const stateCleanups: (() => void)[] = [];

  stateElements.forEach((el) => {
    const state = el.getAttribute('data-cursor') || 'default';
    const cursorLabel = el.getAttribute('data-cursor-label') || '';

    function onEnter() {
      cursor.classList.remove('is-view', 'is-drag', 'is-open', 'is-explore');
      if (state !== 'default') {
        cursor.classList.add(`is-${state}`);
      }
      if (cursorLabel && label) {
        label.textContent = cursorLabel;
      }
    }

    function onLeave() {
      cursor.classList.remove('is-view', 'is-drag', 'is-open', 'is-explore');
      if (label) label.textContent = '';
    }

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    stateCleanups.push(
      () => el.removeEventListener('mouseenter', onEnter),
      () => el.removeEventListener('mouseleave', onLeave),
    );
  });

  // Enlarge on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
  const interactiveCleanups: (() => void)[] = [];

  interactiveElements.forEach((el) => {
    if (el.hasAttribute('data-cursor')) return;

    function onEnter() { cursor.classList.add('is-open'); }
    function onLeave() { cursor.classList.remove('is-open'); }

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    interactiveCleanups.push(
      () => el.removeEventListener('mouseenter', onEnter),
      () => el.removeEventListener('mouseleave', onLeave),
    );
  });

  cursorCleanup = () => {
    isRunning = false;
    cancelAnimationFrame(animFrameId);
    cleanups.forEach((fn) => fn());
    stateCleanups.forEach((fn) => fn());
    interactiveCleanups.forEach((fn) => fn());
  };
}
