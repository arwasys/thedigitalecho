import { gsap } from 'gsap';

export function splitTextIntoChars(element: HTMLElement): HTMLElement[] {
  const text = element.textContent || '';
  element.innerHTML = '';
  const chars: HTMLElement[] = [];

  text.split('').forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.className = 'char';
    element.appendChild(span);
    chars.push(span);
  });

  return chars;
}

export function splitTextIntoWords(element: HTMLElement): HTMLElement[] {
  const text = element.textContent || '';
  element.innerHTML = '';
  const words: HTMLElement[] = [];

  text.split(' ').forEach((word, i, arr) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.style.display = 'inline-block';
    span.className = 'word';
    element.appendChild(span);
    words.push(span);
    if (i < arr.length - 1) {
      const space = document.createTextNode(' ');
      element.appendChild(space);
    }
  });

  return words;
}

export function splitTextIntoLines(element: HTMLElement): HTMLElement[] {
  const text = element.textContent || '';
  element.innerHTML = '';
  const lines: HTMLElement[] = [];

  const lineSpan = document.createElement('span');
  lineSpan.textContent = text;
  lineSpan.style.display = 'block';
  lineSpan.className = 'reveal-line';
  element.appendChild(lineSpan);
  lines.push(lineSpan);

  return lines;
}

export function animateChars(element: HTMLElement, vars?: gsap.TweenVars) {
  const chars = splitTextIntoChars(element);
  return gsap.from(chars, {
    y: 30,
    opacity: 0,
    duration: 0.5,
    stagger: 0.02,
    ease: 'power3.out',
    ...vars,
  });
}

export function animateWords(element: HTMLElement, vars?: gsap.TweenVars) {
  const words = splitTextIntoWords(element);
  return gsap.from(words, {
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.05,
    ease: 'power3.out',
    ...vars,
  });
}

export function animateLines(element: HTMLElement, vars?: gsap.TweenVars) {
  const lines = splitTextIntoLines(element);
  return gsap.from(lines, {
    yPercent: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
    ...vars,
  });
}
