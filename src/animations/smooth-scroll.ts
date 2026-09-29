import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;

export function initSmoothScroll() {
  if (lenis) return;

  lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    autoResize: true,
    respectReducedMotion: true,
  });

  lenis.on('scroll', () => ScrollTrigger.update());

  tickerCallback = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  // A scroll lock (intro loader) may already be active at this point.
  if (document.body.style.overflow === 'hidden') lenis.stop();
}

export function destroySmoothScroll() {
  if (!lenis) return;
  if (tickerCallback) gsap.ticker.remove(tickerCallback);
  tickerCallback = null;
  lenis.destroy();
  lenis = null;
}

export function stopSmoothScroll() {
  lenis?.stop();
}

export function startSmoothScroll() {
  lenis?.start();
}
