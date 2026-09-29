import { gsap } from 'gsap';

let magneticCleanup: (() => void) | null = null;

export function initMagneticButtons() {
  // Clean up previous instance
  if (magneticCleanup) {
    magneticCleanup();
    magneticCleanup = null;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window;
  if (prefersReducedMotion || isTouchDevice) return;

  const magneticElements = document.querySelectorAll('[data-magnetic]');
  const cleanups: (() => void)[] = [];

  magneticElements.forEach((el) => {
    const element = el as HTMLElement;
    const strength = parseFloat(element.dataset.magnetic || '0.3');

    function handleMouseMove(e: MouseEvent) {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    function handleMouseLeave() {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    }

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    cleanups.push(
      () => element.removeEventListener('mousemove', handleMouseMove),
      () => element.removeEventListener('mouseleave', handleMouseLeave),
    );
  });

  magneticCleanup = () => {
    cleanups.forEach((fn) => fn());
  };
}
