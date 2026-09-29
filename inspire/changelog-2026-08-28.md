# Changelog - August 28, 2026

## Homepage Changes

### 1. Removed "Trusted by forward-thinking brands" Section
- Removed the client logo slider section from `src/pages/index.astro`
- Removed the unused `clients` variable

### 2. Added Video Reels Carousel
- Added scrolling video carousel below "WE DON'T JUST" section
- Videos scroll from right to left with infinite loop
- Added 3 sample videos from Pexels (free stock):
  - `sample-restaurant.mp4` (27MB)
  - `sample-shop.mp4` (20MB)
  - `sample-factory.mp4` (54MB)
- Pauses on hover
- Seamless scrolling with triplicated slides

### 3. Spacing Adjustments
- Brand Statement: `pt-24 md:pt-48 pb-8`
- Reels Section: `pt-[75px] pb-24 md:pb-48`
- What We Do Section: `pt-24 pb-24`

### 4. "WE DON'T JUST" Text Animation
- Character-by-character reveal with ScrollTrigger
- Animation includes:
  - Slide up from bottom (y: 80)
  - 3D rotation (rotateX: -90)
  - Scale effect (0.5 to 1)
  - Staggered timing (0.03s per character)
  - Back easing for bounce effect
  - Line-by-line cascade (0.2s delay per line)
- Plays on scroll down, reverses on scroll up

### 5. "WHAT WE DO" Section Redesign
- Changed from 6 cards to clean list layout
- Each item has: icon + title + arrow
- Separator lines between items (gold color)
- Hover effects:
  - Row slides in (padding-left)
  - Background highlight
  - Title color change
  - Arrow movement and color change
- Thin font weight (300) for titles
- Thin arrow stroke (1.5)

### 6. "WHAT WE Do" Animated Background
- Gradient animation between warm neutral colors
- Colors: #f5e6d3, #e8e4de, #d4c4a8, #c9b896
- 8s animation cycle

### 7. All Home Page Titles Animation
- All h2 titles now have same character-by-character reveal
- Updated sections:
  - WE DON'T JUST CREATE CONTENT. WE CREATE AN ECHO.
  - WHAT WE DO.
  - CONTENT THAT STOPS THE SCROLL.
  - YOUR FEED CALLED. IT WANTS BETTER CONTENT.
  - CHANGE THE PERSPECTIVE.
  - RECEIPTS > PROMISES.
  - CREATIVE PROCESS.
  - WORD OF MOUTH.
  - THE DROP.
  - FAQ.
  - LET'S MAKE SOME NOISE.

## Files Modified
- `src/pages/index.astro` - Main homepage
- `src/animations/reveal.ts` - ScrollTrigger animations

## New Files
- `public/assets/sample-restaurant.mp4`
- `public/assets/sample-shop.mp4`
- `public/assets/sample-factory.mp4`

## Animation Details
- ScrollTrigger with `toggleActions: 'play reverse play reverse'`
- Start: `top 85%`
- End: `top 20%`
- Perspective: 1000px for 3D effects
- Transform-style: preserve-3d

## CSS Selectors
- `[data-text-reveal]` - All text with character animation
- `.brand-statement` - Brand statement specific styles
- `.what-we-do-section` - Services section with gradient background
- `.service-item` - Service list items
- `.reels-track` - Video carousel
