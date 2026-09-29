# THE DIGITAL ECHO — Animation System

> GSAP and ScrollTrigger animation specifications.
> Last updated: 2026-09-23

---

## GSAP Setup

```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

---

## Animation Timing

| Animation | Duration | Easing |
|-----------|----------|--------|
| Micro interaction | 200–350ms | power2.out |
| Button | 300–450ms | power2.out |
| Reveal | 600–900ms | power3.out |
| Hero | 900–1400ms | power4.out |
| Page transition | 400–700ms | power2.inOut |

---

## Hero Animation (Cinematic Reveal)

**File:** `src/pages/index.astro` → `initHero()`

```typescript
function initHero() {
  const hero = document.querySelector('.video-bg__content');
  if (!hero) return;

  const titleLines = hero.querySelectorAll('.hero-title-line');
  const buttons = hero.querySelectorAll('.hero-btn');
  const badge = hero.querySelector('.hero-badge');
  const description = hero.querySelector('.hero-description');

  // Initial states
  gsap.set(badge, { opacity: 0, y: 30, clipPath: 'inset(0% 0% 100% 0%)' });
  gsap.set(titleLines, { opacity: 0, y: 80, clipPath: 'inset(0% 0% 100% 0%)', rotationX: 15 });
  gsap.set(description, { opacity: 0, y: 40 });
  gsap.set(buttons, { opacity: 0, y: 30, scale: 0.9 });

  const tl = gsap.timeline({ delay: 0.3 });

  // Badge: clip-path reveal from bottom
  tl.to(badge, {
    opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)',
    duration: 0.8, ease: 'power4.out'
  }, 0);

  // Title lines: clip-path + 3D rotationX tilt, staggered
  tl.to(titleLines, {
    opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', rotationX: 0,
    duration: 1.2, stagger: 0.12, ease: 'power4.out'
  }, 0.2);

  // Description: smooth fade-up
  tl.to(description, {
    opacity: 1, y: 0, duration: 0.9, ease: 'power3.out'
  }, 0.7);

  // Buttons: scale bounce
  tl.to(buttons, {
    opacity: 1, y: 0, scale: 1,
    duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)'
  }, 1.0);
}
```

**Key properties:**
- Badge: `clipPath` reveal (inset animation)
- Title: `clipPath` + `rotationX` (3D tilt), `stagger: 0.12`
- Description: simple `opacity` + `y` fade
- Buttons: `scale` + `back.out(1.7)` bounce

---

## Scroll Reveal System

**File:** `src/animations/reveal.ts`

### initScrollReveal

Elements with `data-reveal="up|down|left|right|fade|scale"` animate on scroll.

**Skip guard (2026-09-23):** elements inside `section[data-lineart-section]` are skipped — their reveal is driven by the lineart timeline (see Lineart section). Guard at `reveal.ts:12`.

```typescript
// Pattern: fade up
gsap.fromTo(element,
  { opacity: 0, y: 40 },
  {
    opacity: 1, y: 0,
    duration: 0.8, ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  }
);
```

### initTextReveal

Elements with `data-text-reveal` split into lines, reveal sequentially.

**Skip guard (2026-09-23):** same `section[data-lineart-section]` guard at `reveal.ts:36`.

```typescript
// Each .reveal-line animates with clipPath
gsap.fromTo(lines,
  { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  {
    clipPath: 'inset(0 0 0% 0)', opacity: 1,
    duration: 0.8, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: element, start: 'top 80%' }
  }
);
```

### initImageReveal

Elements with `data-reveal-image` use clip-path.

```typescript
gsap.fromTo(element,
  { clipPath: 'inset(0 100% 0 0)' },
  {
    clipPath: 'inset(0 0% 0 0)',
    duration: 1, ease: 'power3.inOut',
    scrollTrigger: { trigger: element, start: 'top 80%' }
  }
);
```

### initParallax

Elements with `data-parallax` move vertically on scroll.

```typescript
gsap.to(element, {
  yPercent: 10,
  ease: 'none',
  scrollTrigger: {
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});
```

---

## ProcessSection — CSS Keyframes

**File:** `src/components/sections/ProcessSection.astro`

Uses CSS `@keyframes` instead of GSAP to avoid cleanup conflicts with homepage `cleanupAnimations()`.

```css
@keyframes processStepReveal {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes processNumberReveal {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
}

.process-step {
  opacity: 0;
  animation: processStepReveal 0.8s ease forwards;
}

.process-step .number {
  animation: processNumberReveal 0.6s ease forwards;
}
```

Staggered via inline `style="animation-delay: Xs"`.

---

## Lineart SVG Draw-On (PILOT — 2026-09-23)

**Files:** `src/animations/lineart.ts` (animation) · `src/components/ui/Lineart.astro` (component) · `src/lib/lineart.ts` (path data)

Replaces static `.webp` lineart background images with hand-authored inline SVG that draws in on scroll.

**Sequence per section** (single timeline, trigger = `<section>`, `start: 'top 88%'`):
1. SVG fades in (opacity 0 → 1, 0.3s)
2. Paths draw on — `strokeDasharray: 1`, `strokeDashoffset: 1 → 0`, staggered 0.09s, `power2.inOut`, ~1.1s
3. SVG fades to backdrop — `LINEART_FADE_OPACITY = 0.18` (0.7s)
4. Section content reveals (headings char-split + `[data-reveal]`), driven inside the same timeline via `revealSectionContent()`

**SVG element contract:**
- Full-section: `absolute inset-0 w-full h-full`, `preserveAspectRatio="xMidYMid slice"`
- `fill="none" stroke="currentColor"`, `stroke-linecap/linejoin: round`, default `stroke-width: 1.2`
- Each path: `pathLength="1"` + `class="lineart-path"`
- Color via `class="text-accent"` / `text-accent-blue`

**Wiring:**
- `initLineart()` called at the end of `initScrollReveal()` (auto-runs on every page)
- `initScrollReveal`/`initTextReveal` skip content inside `section[data-lineart-section]`
- Component usage: `<Lineart name="drone" class="text-accent"/>` inside a `data-lineart-section` `<section>`

**Reduced motion:** no draw; SVG set to `opacity: 0.18`, content visible immediately.

**Awaiting:** author 6 more subjects (`video-editor`, `digitaloffice`, `videographer`, `sport`, `product`, `corporate`) and swap remaining 20 `<img>` lineart spots after art approval. Tweak: final fade `LINEART_FADE_OPACITY` (lineart.ts:6), stroke `strokeWidth` prop.

---

## Horizontal Scroll

**File:** `src/animations/reveal.ts` → `initHorizontalScroll()`

```typescript
const container = gsap.to(elements, {
  x: () => -(scrollWidth - window.innerWidth),
  ease: 'none',
  scrollTrigger: {
    trigger: wrapper,
    start: 'top top',
    end: () => '+=' + scrollWidth,
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true
  }
});
```

Used in `HorizontalProjects.astro` for "WORK > WORDS." section.

---

## Magnetic Buttons

**File:** `src/animations/magnetic.ts`

```typescript
function magneticButton(button: HTMLElement) {
  const strength = 0.3;

  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * strength, y: y * strength,
      duration: 0.3, ease: 'power2.out'
    });
  });

  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      x: 0, y: 0,
      duration: 0.5, ease: 'elastic.out(1, 0.3)'
    });
  });
}
```

**Disable on:** Touch devices, `prefers-reduced-motion`

---

## FAQ Accordion

**File:** `src/components/ui/FaqAccordion.astro`

Document-level event delegation (single listener):

```typescript
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('.faq-trigger');
  if (!trigger) return;

  const index = trigger.getAttribute('data-faq-index');
  const item = document.querySelector(`.faq-item[data-faq-index="${index}"]`);
  const content = item?.querySelector('.faq-content');
  const icon = trigger.querySelector('.faq-icon');
  const isOpen = trigger.getAttribute('aria-expanded') === 'true';

  // Close all others
  document.querySelectorAll('.faq-item').forEach(item => { ... });

  // Toggle current
  if (isOpen) {
    trigger.setAttribute('aria-expanded', 'false');
    content.style.maxHeight = '0';
  } else {
    trigger.setAttribute('aria-expanded', 'true');
    content.style.maxHeight = content.scrollHeight + 'px';
  }
});
```

---

## Cleanup Pattern

```typescript
function cleanupAnimations() {
  ScrollTrigger.getAll().forEach(st => st.kill());
  gsap.killTweensOf('*');
}
```

Called in `init()` before re-initializing animations after page navigation.

---

## Video Settings

```html
<video autoplay muted playsinline>
  <!-- no loop — plays once -->
</video>
```

```typescript
// Half speed
document.querySelectorAll('.video-bg video').forEach(v => {
  v.addEventListener('loadeddata', () => { v.playbackRate = 0.5; });
  if (v.readyState >= 2) v.playbackRate = 0.5;
});
```

---

## Reduced Motion

```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Disable parallax
  // Disable excessive text animation
  // Disable cursor effects
  // Keep simple fades only
}
```

CSS also enforces:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Performance Rules

1. Use `transform` and `opacity` only
2. Avoid animating `width`, `height`, `top`, `left`
3. Use `will-change` sparingly (only on hero elements)
4. Batch animations where possible
5. Kill ScrollTriggers on unmount
6. Re-initialize after client-side navigation
7. ProcessSection uses CSS `@keyframes` to avoid GSAP conflicts
