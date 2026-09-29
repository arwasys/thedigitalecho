THE DIGITAL ECHO — HEADLESS ASTRO WEBSITE
ROLE
You are a senior frontend architect, creative developer, UI/UX designer and motion designer specialising in:
AstroJS
Headless WordPress
WPGraphQL
TypeScript
TailwindCSS
GSAP
GSAP ScrollTrigger
modern CSS
high-performance websites
Awwwards-style creative websites
SEO
AEO
AIO
GEO
accessibility
Core Web Vitals
Build a production-ready website for:
THE DIGITAL ECHO
Tagline:
Your Brand. Our Creative Echo.
The company is a Gen Z-led digital marketing and content production company in India.
The website must feel:
Creative
Premium
Young
Bold
Editorial
Experimental
Cinematic
Modern
Fast
Human
Confident
Awwwards-inspired
Do NOT create a generic corporate digital marketing agency website.
The website should look like a creative studio/agency that could win a modern web design award.

Important Notes: use placeholder content - text, images, icon and everything through json. we will connect wordpress after completing astrojs website.

1. TECHNOLOGY STACK
Use:
AstroJS latest stable version
TypeScript
TailwindCSS latest stable version
WordPress as headless CMS
WPGraphQL
GSAP
GSAP ScrollTrigger
GSAP SplitText where licensing/setup permits
Astro View Transitions / ClientRouter where appropriate
Astro Image / astro:assets
native browser APIs where possible
Do NOT introduce React, Vue or Svelte unless there is a strong technical reason.
Prefer native Astro components and lightweight client-side scripts.
The site should follow Astro's islands architecture and keep JavaScript to the absolute minimum required.

2. CORE ARCHITECTURE
Architecture:
WORDPRESS
    |
    | WPGraphQL
    |
    v
ASTRO
    |
    +---- Static / SSR HTML
    |
    +---- SEO metadata
    |
    +---- Structured data
    |
    +---- TailwindCSS
    |
    +---- GSAP
    |
    +---- ScrollTrigger
    |
    +---- View Transitions
    |
    v
USER
WordPress is ONLY the content management system.
Astro is the presentation layer.
Do not depend on the WordPress theme for frontend presentation.
The WordPress frontend can remain minimal.

3. WORDPRESS ASSUMPTIONS
Assume WordPress has:
WPGraphQL
WPGraphiQL
Advanced Custom Fields or equivalent structured content solution
WPGraphQL support for the custom fields
SEO plugin such as Yoast SEO if configured
Media Library
WPGraphQL should expose all required content.
WPGraphQL documentation supports custom post types, taxonomies, media, settings and other WordPress data through GraphQL.
Do NOT hardcode content that should come from WordPress.

4. REQUIRED WORDPRESS CONTENT MODEL
Build the Astro frontend assuming the following WordPress content structure.
Pages
Create/query:
Home
About
Services
Contact
Custom Post Type: Services
Fields:
title
slug
shortDescription
description
heroTitle
heroDescription
featuredImage
gallery
icon
serviceCategory
features
process
faq
seoTitle
seoDescription
Services include:
Content Production
Photography
Videography
Drone Photography
Drone Videography
Social Media Management
Digital Marketing
Content Creation
Creative Campaigns
SEO
Local SEO
WhatsApp Marketing

5. PROJECTS CUSTOM POST TYPE
Create/query:
projects
Fields:
title
slug
clientName
clientLogo
heroImage
gallery
video
category
servicesUsed
challenge
strategy
execution
result
testimonial
testimonialAuthor
testimonialCompany
projectDate
location
featured
seoTitle
seoDescription
Project categories:
Photography
Videography
Drone
Social Media
Digital Marketing
Branding
Campaigns
Corporate
Ecommerce

6. BLOG
Use WordPress posts.
Support:
title
slug
excerpt
content
featuredImage
author
categories
tags
publishedDate
modifiedDate
SEO metadata
Blog URL:
/blog/
Individual article:
/blog/[slug]/

7. GRAPHQL ARCHITECTURE
Create a clean GraphQL data layer.
Do NOT scatter GraphQL queries throughout .astro files.
Create:
src/
├── graphql/
│   ├── client.ts
│   ├── queries/
│   │   ├── home.ts
│   │   ├── pages.ts
│   │   ├── services.ts
│   │   ├── projects.ts
│   │   ├── posts.ts
│   │   └── settings.ts
│   └── fragments/
│       ├── image.ts
│       ├── seo.ts
│       ├── project.ts
│       └── service.ts
Create a strongly typed GraphQL client.
Use environment variables:
WORDPRESS_GRAPHQL_URL=https://example.com/graphql
PUBLIC_SITE_URL=https://thedigitalecho.com
Do not hardcode production URLs.

8. GRAPHQL PERFORMANCE
Never query unnecessary fields.
Only request the fields required by the page.
Use fragments for reusable fields.
Avoid:
...
everything
Prefer:
title
slug
excerpt
featuredImage {
  node {
    sourceUrl
    altText
    width
    height
  }
}
Use pagination.
Do not download the entire WordPress database.
Do not make multiple GraphQL requests when a single well-designed query can provide the required page data.

9. IMAGE HANDLING
Images are extremely important.
Use:
astro:assets
where compatible.
Images must have:
width
height
alt text
responsive sizing
lazy loading where appropriate
eager loading for hero/LCP images
proper formats
appropriate quality
Hero images should NOT be lazy-loaded.
Below-the-fold images should normally use lazy loading.
Do not use huge 5000px images when a 1600px image is sufficient.
Use responsive image strategies.
Prevent layout shift.

10. DESIGN DIRECTION
The visual identity should be:
DARK + EDITORIAL + DIGITAL
Suggested base palette:
Background:
#080808

Primary text:
#F5F5F5

Muted text:
#9A9A9A

Accent:
#C8FF00
However, do not overuse the accent.
The design should feel premium rather than like a gaming website.
Use:
huge typography
oversized headings
whitespace
asymmetric layouts
editorial grids
image crops
subtle borders
large margins
fluid typography
strong contrast
minimal UI
cinematic transitions

11. TYPOGRAPHY
Use a modern variable sans-serif font.
Prefer:
Inter
Geist
Manrope
Satoshi
Plus Jakarta Sans
Use a strong display treatment for major headings.
Example:
WE MAKE
BRANDS
ECHO.
Typography should be responsive using CSS clamp().
Example:
font-size: clamp(3.5rem, 10vw, 10rem);
Do not create unnecessarily huge text that breaks mobile layouts.

12. HEADER
Create a minimal premium header.
Desktop:
THE DIGITAL ECHO                     MENU
or:
THE DIGITAL ECHO       WORK  SERVICES  ABOUT       LET'S TALK
Mobile:
THE DIGITAL ECHO                         MENU
Menu should open into a full-screen animated navigation.
Menu items:
01  HOME
02  WHAT WE DO
03  OUR WORK
04  THE CREW
05  THE DROP
06  LET'S TALK
Use Gen Z-style labels while keeping SEO-friendly URLs.

13. FULLSCREEN MENU
When opening menu:
background expands
menu items reveal sequentially
text slides upward
subtle image preview appears on hover
close button animates
cursor interaction where appropriate
Use GSAP.
Do not use excessive animation on mobile.

14. PAGE TRANSITIONS
Implement Astro View Transitions.
Navigation should feel like a modern creative website rather than traditional page reloads.
Use:
fade
clip-path reveal
scale
directional transition
shared image transition where appropriate
Astro provides native View Transition support and transition directives, so use Astro's capabilities rather than implementing an unnecessary SPA router.
Avoid making transitions slow.
Target:
250ms – 700ms
depending on transition type.

15. HERO SECTION
Homepage hero:
YOUR BRAND.
OUR CREATIVE
ECHO.
Supporting text:
A Gen Z-led digital marketing and content production company creating
content, campaigns and digital experiences people actually remember.
CTA:
LET'S MAKE SOME NOISE →
Secondary:
SEE THE WORK →

16. HERO ANIMATION
Create a cinematic hero entrance.
Sequence:
page loader
logo reveal
hero text clip reveal
letters/words rise from below
subtitle fades in
CTA reveals
background media begins subtle movement
Use GSAP timeline.
Do not animate every element independently.
Use one master timeline.

17. TEXT ANIMATION SYSTEM
Create reusable text animation utilities.
Example:
splitTextReveal()
splitTextUp()
splitTextFade()
splitLines()
splitWords()
splitChars()
Animations:
Character Reveal
Letters rise from below.
Word Reveal
Words move upward with stagger.
Line Reveal
Text lines clip upward.
Blur Reveal
Text transitions from blur to sharp.
Mask Reveal
Text appears behind a clipping mask.
Use GSAP.
Do not animate text with expensive per-frame calculations.

18. SCROLLTRIGGER SYSTEM
Create a reusable animation architecture.
Example:
src/
├── animations/
│   ├── reveal.ts
│   ├── text.ts
│   ├── parallax.ts
│   ├── magnetic.ts
│   ├── horizontal.ts
│   └── pageTransitions.ts
Use:
gsap.registerPlugin(ScrollTrigger)
ScrollTrigger supports scrub, pin and viewport-triggered animation, making it appropriate for the cinematic scroll effects required here.

19. IMPORTANT GSAP RULE
Do NOT create one massive global GSAP file that controls the entire website.
Animations should be component/page scoped.
Prefer:
Hero
  -> hero animation

Services
  -> service reveal

Projects
  -> project animation

Footer
  -> footer animation
Each animation must clean itself up.
When using Astro client-side navigation, ensure animations are re-initialised correctly after navigation.
Kill/revert ScrollTriggers when necessary.
Avoid duplicate animation initialization.

20. REDUCED MOTION
Accessibility is mandatory.
Respect:
prefers-reduced-motion
If the user prefers reduced motion:
disable parallax
disable excessive text animation
disable cursor effects
disable large movement
keep simple fades where appropriate
The site must remain fully usable without animation.
Astro's transition system also provides support around reduced-motion preferences; do not bypass accessibility requirements with custom animation code.

21. HOME PAGE STRUCTURE
Build the homepage in this order:
01 HERO

02 CLIENT / TRUST STRIP

03 BRAND STATEMENT

04 WHAT WE DO

05 CONTENT PRODUCTION

06 SOCIAL MEDIA

07 DRONE

08 SELECTED PROJECTS

09 CREATIVE PROCESS

10 INDUSTRIES

11 TESTIMONIALS

12 THE DROP / BLOG

13 FAQ

14 FINAL CTA

15 FOOTER

22. BRAND STATEMENT SECTION
Create a large editorial section:
WE DON'T JUST
CREATE CONTENT.

WE CREATE
AN ECHO.
Animate each line independently.
As the user scrolls:
WE DON'T JUST
reveals first.
Then:
CREATE CONTENT.
Then:
WE CREATE
Then:
AN ECHO.
Use ScrollTrigger.

23. WHAT WE DO
Large heading:
WHAT
WE DO.
Create interactive service cards.
Each card contains:
01
CONTENT PRODUCTION

Photography
Videography
Drone
Brand Content
Hover:
card expands slightly
image moves
title shifts
arrow rotates
background changes subtly
Do not create excessive hover animation.

24. CONTENT PRODUCTION SECTION
Use large visual storytelling.
Heading:
CONTENT THAT
STOPS THE SCROLL.
Use full-width photography/video.
Create:
image reveal
clip-path animation
subtle parallax
text movement
horizontal media strip

25. SOCIAL MEDIA SECTION
Heading:
YOUR FEED
CALLED.

IT WANTS
BETTER CONTENT.
Display platform names:
Instagram
Facebook
LinkedIn
WhatsApp
YouTube
Google
Animate them horizontally.

26. DRONE SECTION
Create a cinematic full-screen section.
Heading:
CHANGE
THE
PERSPECTIVE.
Use a large aerial image/video.
Create:
zoom-out
parallax
text reveal
image scale animation
If video exists in WordPress, query the video URL from GraphQL.
Do not autoplay video with sound.
Use:
muted
playsinline
autoplay
loop
where appropriate.

27. PROJECT SHOWCASE
This should be one of the most visually impressive sections.
Heading:
RECEIPTS
> PROMISES.
Display featured projects.
Use:
large images
overlapping cards
horizontal scroll
pinned section
image scaling
text reveal
Possible desktop interaction:
scroll down
      ↓
horizontal project movement
      ↓
project image expands
      ↓
project details reveal
Use ScrollTrigger carefully.
Do not make the entire website horizontally scroll.
Only use horizontal scrolling for selected editorial sections.

28. PROJECT CARD
Each project card:
CLIENT NAME

PROJECT CATEGORY

PROJECT TITLE

VIEW CASE STUDY →
Hover:
image scale 1.05
overlay opacity
title moves
arrow rotates
Keep transitions around:
300ms – 600ms

29. PROJECT DETAIL PAGE
URL:
/projects/[slug]/
Structure:
Hero
Client
Services
Challenge
Strategy
Execution
Gallery
Video
Results
Testimonial
Related Projects
CTA
Make the project page highly visual.

30. SERVICES PAGE
URL:
/services/
Hero:
EVERYTHING YOUR
BRAND NEEDS
TO BE SEEN.
Display services from WordPress dynamically.
Do not hardcode service cards.

31. SERVICE DETAIL PAGE
URL:
/services/[slug]/
Structure:
Hero
Description
Capabilities
Visual Showcase
Process
Benefits
FAQ
Related Projects
CTA
SEO metadata must come from WordPress where configured.

32. ABOUT PAGE
URL:
/about/
Hero:
WE'RE THE GENERATION
THAT GREW UP ONLINE.
Content:
company story
philosophy
team
values
working style
capabilities
Add creative editorial animation.

33. BLOG
URL:
/blog/
Blog listing:
featured article
category filter
article grid
pagination/load more
Individual article:
/blog/[slug]/
Must be highly SEO friendly.
Do not hide article content behind JavaScript.
Article content should be server-rendered HTML.

34. CONTACT PAGE
Hero:
GOT A BRAND
THAT NEEDS
AN ECHO?
Form fields:
Name
Company
Email
Phone / WhatsApp
Website
Service
Budget
Message
Service options:
Photography
Videography
Drone
Social Media
Digital Marketing
Content Production
Campaign
Other
CTA:
LET'S CREATE →
Form submission should NOT expose WordPress credentials.
If WordPress is used for form processing, use a secure backend/API endpoint.
Never put private credentials in client-side JavaScript.

35. FOOTER
Large footer.
Text:
YOUR BRAND.
OUR CREATIVE ECHO.
Links:
What We Do
Our Work
The Crew
The Drop
Let's Talk
Social:
Instagram
LinkedIn
Facebook
WhatsApp
YouTube
Final microcopy:
Create.
Connect.
Echo.

36. CURSOR INTERACTION
Desktop only.
Create an optional custom cursor.
States:
DEFAULT

VIEW

DRAG

OPEN

EXPLORE
Example:
Hover project:
VIEW
Hover CTA:
→
Do NOT replace the native cursor on mobile.
Do NOT make cursor interaction essential for usability.

37. MAGNETIC BUTTONS
Create reusable magnetic buttons.
Example:
LET'S TALK →
Button slightly follows pointer.
Use GSAP quickTo or efficient pointer calculations.
Limit movement.
Do not create excessive cursor effects.
Disable on touch devices and reduced-motion users.

38. PAGE LOADER
Create a very short branded loader.
Example:
THE
DIGITAL
ECHO
or:
TDE
Animation:
0% → logo
30% → percentage / line
70% → reveal
100% → page
Do NOT make the loader annoying.
Maximum target:
~1 second
If page resources are already loaded, skip unnecessary waiting.

39. RESPONSIVE DESIGN
Mobile is NOT an afterthought.
Breakpoints:
Mobile
Tablet
Desktop
Large Desktop
The site should be excellent at:
360px
390px
430px
768px
1024px
1280px
1440px
1920px
On mobile:
reduce animation
remove custom cursor
remove magnetic effects
simplify horizontal scrolling
reduce large typography
avoid pinning huge sections
avoid excessive parallax

40. SEO
Every page must have:
<title>
<meta name="description">
<link rel="canonical">
Open Graph
Twitter/X metadata
Generate dynamically from WordPress.
Use sensible fallbacks.
Example:
The Digital Echo | Digital Marketing & Content Production

41. SEMANTIC HTML
Use:
<header>
<nav>
<main>
<section>
<article>
<aside>
<footer>
Use only one primary H1 per page.
Maintain logical heading hierarchy.
Do not use divs for everything.

42. AEO / ANSWER ENGINE OPTIMISATION
Important service pages should answer questions directly.
Example:
What does The Digital Echo do?

The Digital Echo is a Gen Z-led digital marketing and content production company offering photography, videography, drone shoots, social media management and digital marketing services for businesses in India.
Place direct answers near the top of relevant pages.
Create FAQ sections.
Do not keyword stuff.

43. AIO / AI SEARCH OPTIMISATION
Make the website easy for AI systems to understand.
Clearly communicate:
Who is The Digital Echo?
What services do they provide?
Who do they serve?
Where do they operate?
What makes them different?
What projects have they completed?
How can someone contact them?
Use clear entity relationships.
Example:
The Digital Echo
    |
    +-- Digital Marketing
    +-- Content Production
    +-- Photography
    +-- Videography
    +-- Drone
    +-- Social Media
    +-- Projects
    +-- Blog
Avoid vague marketing copy everywhere.
Creative copy is welcome, but every important page must also contain clear factual information.

44. GEO
Build genuine geographic relevance.
If the company operates in Mumbai:
Create:
Digital Marketing Agency in Mumbai
But only if the business genuinely serves Mumbai.
Potential future locations:
Mumbai
Thane
Navi Mumbai
Pune
Delhi
Bengaluru
Hyderabad
Ahmedabad
Do not automatically create hundreds of location pages.
Each location page must contain unique, useful content.

45. STRUCTURED DATA
Implement JSON-LD.
Use appropriate schema:
Organization
WebSite
WebPage
BreadcrumbList
Service
Article
LocalBusiness
FAQPage
Do not create fake ratings.
Do not create fake reviews.
Do not create fake prices.
Do not create fake business addresses.
Only output structured data based on actual WordPress data.

46. SITEMAP
Generate sitemap automatically.
Include:
Pages
Services
Projects
Blog
Location pages
Exclude:
404
draft content
private content
admin
preview URLs

47. ROBOTS
Create proper:
robots.txt
Allow search engine crawling of public content.
Do not block important CSS, JS or image assets unnecessarily.

48. PERFORMANCE
Performance is a first-class requirement.
Target:
LCP < 2.5s
CLS < 0.1
INP < 200ms
Avoid:
huge JS bundles
unnecessary libraries
excessive animation
layout thrashing
massive videos
unoptimised images
unnecessary hydration
blocking scripts
Use Astro's static rendering capabilities wherever possible.

49. JAVASCRIPT RULE
Default:
HTML + CSS
Then progressively enhance with:
GSAP
ScrollTrigger
small interactive scripts
Do not make basic navigation or content dependent on JavaScript.
The site should remain readable if JavaScript fails.

50. GSAP PERFORMANCE
Follow these principles:
Use:
transform
opacity
scale
x
y
clip-path
Avoid animating:
width
height
top
left
margin
padding
unless genuinely necessary.
Prefer GPU-friendly transforms.
Do not create hundreds of ScrollTriggers unnecessarily.
Batch animations where possible.
Use will-change sparingly.

51. SCROLLTRIGGER EXAMPLES
Use patterns such as:
Fade Up
opacity: 0 → 1
y: 40 → 0
Image Reveal
clip-path inset(0 100% 0 0)
→
clip-path inset(0 0% 0 0)
Parallax
yPercent: -10 → 10
Scale
scale: 1.15 → 1
Horizontal Gallery
Use a pinned section with controlled horizontal movement.
Do not overuse these patterns.

52. ANIMATION TIMING
Suggested:
Micro interaction:
200–350ms

Button:
300–450ms

Reveal:
600–900ms

Hero:
900–1400ms

Page transition:
400–700ms
Use easing such as:
power2.out
power3.out
power4.out
expo.out
circ.out
Use custom easing only when useful.

53. CONTENT
Use the content supplied in this project brief as the initial website copy.
Brand:
The Digital Echo
Tagline:
Your Brand. Our Creative Echo.
Core statement:
We don't just create content. We create an echo.
Services:
Content Production
Photography
Videography
Drone Photography
Drone Videography
Social Media Management
Digital Marketing
Creative Campaigns
SEO
Local SEO
WhatsApp Marketing
Platforms:
Instagram
Facebook
LinkedIn
WhatsApp
YouTube
Google Business Profile

54. GEN Z MICROCOPY
Use naturally throughout the website:
RECEIPTS > PROMISES.

YOUR FEED CALLED.
IT WANTS BETTER CONTENT.

CHANGE THE PERSPECTIVE.

GOOD CONTENT DOESN'T WHISPER.

DON'T LET YOUR IDEA STAY IN YOUR NOTES APP.

MAKE SOME NOISE.

CREATE.
CONNECT.
ECHO.
Do not use slang excessively.
The company should feel Gen Z, not childish.

55. COMPONENT ARCHITECTURE
Create reusable components.
Example:
src/
├── components/
│   ├── layout/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── MobileMenu.astro
│   │   └── PageTransition.astro
│   │
│   ├── ui/
│   │   ├── MagneticButton.astro
│   │   ├── RevealText.astro
│   │   ├── RevealImage.astro
│   │   ├── SectionHeading.astro
│   │   ├── Cursor.astro
│   │   └── Marquee.astro
│   │
│   ├── home/
│   │   ├── Hero.astro
│   │   ├── BrandStatement.astro
│   │   ├── ServicesPreview.astro
│   │   ├── SocialSection.astro
│   │   ├── DroneSection.astro
│   │   ├── FeaturedProjects.astro
│   │   ├── Process.astro
│   │   ├── Testimonials.astro
│   │   ├── FAQ.astro
│   │   └── FinalCTA.astro
│   │
│   ├── projects/
│   │   ├── ProjectCard.astro
│   │   ├── ProjectGrid.astro
│   │   └── ProjectGallery.astro
│   │
│   └── blog/
│       ├── BlogCard.astro
│       ├── BlogGrid.astro
│       └── ArticleContent.astro

56. PAGE ARCHITECTURE
src/
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── services/
│   │   ├── index.astro
│   │   └── [slug].astro
│   │
│   ├── projects/
│   │   ├── index.astro
│   │   └── [slug].astro
│   │
│   ├── blog/
│   │   ├── index.astro
│   │   └── [slug].astro
│   │
│   ├── contact.astro
│   └── 404.astro
│
├── layouts/
│   ├── BaseLayout.astro
│   ├── PageLayout.astro
│   └── ArticleLayout.astro
│
├── graphql/
├── animations/
├── lib/
├── types/
├── styles/
└── utils/

57. TYPESCRIPT
Use strict TypeScript.
Avoid:
any
unless absolutely unavoidable.
Create types for:
WordPressImage
SEO
Service
Project
Post
Category
Author
Testimonial
FAQ
GraphQL responses should be typed.

58. ERROR HANDLING
WordPress can go offline.
GraphQL can fail.
Implement graceful handling.
If GraphQL fails:
do not crash the entire site unnecessarily
provide a meaningful fallback
log the technical error server-side
never expose secrets
show a friendly user-facing message where appropriate

59. SECURITY
Never expose:
WordPress admin credentials
API secrets
private tokens
application passwords
database credentials
Do not put private environment variables into:
PUBLIC_*
Only public configuration may use PUBLIC_*.

60. CACHING
Use appropriate Astro caching/static generation.
Do not request WordPress data on every browser interaction.
Where possible:
Build time
        ↓
GraphQL
        ↓
Static page
For content requiring updates without rebuilding, use an appropriate SSR/revalidation strategy.
Do not introduce unnecessary server complexity.

61. DYNAMIC ROUTES
Generate service pages and project pages dynamically.
For static builds:
getStaticPaths()
should retrieve WordPress slugs.
Example:
/services/content-production/
/services/social-media-management/
/services/drone-photography/
/projects/project-name/

62. ACCESSIBILITY
Meet WCAG principles.
Requirements:
keyboard navigation
visible focus states
semantic HTML
proper labels
alt text
sufficient contrast
reduced motion
accessible mobile menu
accessible buttons
accessible form errors
no information conveyed only through animation
Animation must enhance the experience, never become the only way to understand content.

63. MOBILE MENU ACCESSIBILITY
When menu opens:
trap focus
ESC closes menu
proper ARIA labels
focus returns to menu button
body scrolling controlled correctly

64. FORMS
Form must have:
labels
validation
accessible error messages
loading state
success state
failure state
Example success:
YOU'RE ON OUR RADAR.

We'll get back to you soon.

65. COOKIE / PRIVACY
Do not invent legal content.
Create placeholders/pages:
/privacy-policy/
/terms-and-conditions/
/cookie-policy/
Content should later be supplied by the business/legal advisor.

66. ANALYTICS
Prepare integration points for:
Google Analytics 4
Google Search Console
Meta Pixel
LinkedIn Insight Tag
Do not hardcode IDs.
Use environment variables/configuration.
Load tracking scripts in a performance-conscious manner.

67. SEO TECHNICAL CHECKLIST
Before completion verify:
[ ] Unique title per page
[ ] Unique meta description
[ ] Canonical URLs
[ ] One H1
[ ] Proper heading hierarchy
[ ] Open Graph
[ ] Twitter/X cards
[ ] Sitemap
[ ] Robots
[ ] JSON-LD
[ ] Breadcrumbs
[ ] Image alt text
[ ] Image dimensions
[ ] Internal links
[ ] 404 page
[ ] Clean URLs
[ ] No duplicate content
[ ] No orphan pages
[ ] Mobile responsive

68. AWWWARD-STYLE DESIGN PRINCIPLE
Important:
DO NOT copy any specific Awwwards website.
Use Awwwards-level principles:
editorial layouts
immersive storytelling
typography-driven design
cinematic transitions
smooth scrolling
interactive media
sophisticated whitespace
asymmetrical grids
creative navigation
meaningful micro-interactions
The design must be original to The Digital Echo.

69. DO NOT OVERDESIGN
Avoid:
excessive gradients
random blobs
generic glassmorphism
neon cyberpunk aesthetics
excessive rounded cards
too many floating elements
animation everywhere
unnecessary 3D
stock-template appearance
The website should feel like:
A premium creative agency with Gen Z energy.
Not:
An AI-generated startup landing page.

70. OPTIONAL 3D
Do NOT add Three.js initially.
Only introduce 3D if there is a genuine creative requirement.
GSAP + CSS + video + photography should be sufficient for version 1.
Performance is more important than technology flexing.

71. SMOOTH SCROLL
If implementing smooth scrolling:
Prefer lightweight/native-friendly approaches.
Do not introduce a heavy smooth-scroll library unless necessary.
If a library is introduced, ensure:
ScrollTrigger synchronization
mobile fallback
reduced-motion support
no scroll-jacking problems
accessibility
Normal browser scrolling must remain usable.

72. VIDEO
For background video:
<video
  autoplay
  muted
  loop
  playsinline
>
Do not use:
autoplay with sound
Use poster images.
Do not load huge videos immediately.
Use appropriate formats.

73. PROJECT IMAGE GALLERY
Build a cinematic gallery.
Interactions:
click image
full-screen lightbox
keyboard navigation
ESC close
next/previous
touch swipe
But keep it lightweight.

74. LOADING STRATEGY
Critical:
Load first:
HTML
critical CSS
hero image
primary font
Then:
secondary images
videos
animations
non-critical scripts
Do not delay the first meaningful content just because animation exists.

75. DEVELOPMENT QUALITY
Use:
npm
TypeScript
ESLint
Prettier
If appropriate, add:
Husky
lint-staged
but do not add unnecessary tooling.

76. REQUIRED NPM DEPENDENCIES
Use only what is required.
Expected core packages:
astro
typescript
tailwindcss
gsap
graphql
Add other packages only when they provide clear value.

77. ENVIRONMENT
Create:
.env.example
with:
WORDPRESS_GRAPHQL_URL=
PUBLIC_SITE_URL=
PUBLIC_GA_ID=
PUBLIC_META_PIXEL_ID=
PUBLIC_LINKEDIN_PARTNER_ID=
Do not commit .env.
Create:
.gitignore
properly.

78. README
Create a professional README containing:
Project
The Digital Echo — Headless Astro Website
Stack
Astro + WordPress + WPGraphQL + TypeScript + TailwindCSS + GSAP
Installation
npm install
npm run dev
Build
npm run build
Preview
npm run preview
Environment
Explain .env.
WordPress
Explain the required WPGraphQL endpoint.
Deployment
Explain recommended deployment.

79. DEPLOYMENT
The architecture should be compatible with:
Vercel
Netlify
Cloudflare
traditional Node hosting
static hosting where appropriate
Prefer static generation when possible.
Do not lock the project unnecessarily to one hosting provider.

80. DEVELOPMENT PHASES
Do NOT try to build everything blindly in one step.
Work in phases.
PHASE 1
Create:
Astro project
TypeScript
TailwindCSS
base layout
global styles
header
footer
routing
environment configuration
PHASE 2
Create:
GraphQL client
WordPress queries
types
image handling
service/project/blog data layer
PHASE 3
Create:
homepage
about
services
projects
blog
contact
PHASE 4
Create:
GSAP animation system
ScrollTrigger
text animations
image reveals
magnetic buttons
cursor
page transitions
PHASE 5
Create:
SEO
JSON-LD
sitemap
robots
OG metadata
canonical URLs
accessibility
PHASE 6
Performance optimisation.
PHASE 7
Final QA.

81. IMPORTANT OPENCODE WORKFLOW
Before coding:
Inspect the repository.
Check whether an Astro project already exists.
Check existing package.json.
Check existing configuration.
Do not overwrite existing work unnecessarily.
Identify current WordPress GraphQL endpoint configuration.
Check available WordPress schema.
Use GraphiQL if available to inspect actual schema.
Only then implement.
If WPGraphQL schema differs from assumptions:
adapt the code to the actual schema rather than inventing fields.

82. GRAPHQL SCHEMA VALIDATION
Before creating queries:
Inspect:
GraphQL schema
Check:
Pages
Posts
Media
Services
Projects
Taxonomies
SEO
ACF/custom fields
Do not assume field names.
If fields are unavailable, clearly document what WordPress configuration is required.

83. IMPORTANT CONTENT RULE
Do not replace the supplied brand copy with generic AI marketing language.
Preserve the personality of:
The Digital Echo
The copy should feel:
human
sharp
concise
confident
Gen Z
Indian
professional
Avoid phrases like:
We are a leading organisation committed to excellence...
Avoid generic agency clichés.

84. FINAL HOMEPAGE EXPERIENCE
The final homepage should feel approximately like:
LOAD
 ↓
THE DIGITAL ECHO
 ↓
YOUR BRAND.
OUR CREATIVE ECHO.
 ↓
SCROLL
 ↓
WE DON'T JUST CREATE CONTENT.
 ↓
WE CREATE AN ECHO.
 ↓
CONTENT
 ↓
SOCIAL
 ↓
DRONE
 ↓
PROJECTS
 ↓
PROCESS
 ↓
TESTIMONIALS
 ↓
FAQ
 ↓
LET'S MAKE SOME NOISE.
 ↓
THE DIGITAL ECHO
The user should feel like they are experiencing a creative story, not reading a brochure.

85. FINAL ACCEPTANCE CRITERIA
The website is complete only when:
Design
Looks premium
Original creative direction
Gen Z personality
Awwwards-inspired quality
Excellent typography
Strong visual hierarchy
Astro
Uses Astro correctly
Minimal hydration
Reusable components
Proper layouts
Static generation where possible
No unnecessary framework
WordPress
GraphQL integration works
Dynamic content works
Projects work
Services work
Blog works
Images work
GSAP
Hero animation
Text animation
ScrollTrigger
Image reveal
Project interactions
Page transitions
Reduced motion support
SEO
Metadata
Schema
Sitemap
Robots
Canonical
Open Graph
Semantic HTML
Performance
No unnecessary JS
Optimised images
Optimised fonts
No layout shift
Lazy loading
Fast LCP
Mobile performance
Accessibility
Keyboard accessible
Focus states
ARIA where required
Form accessibility
Reduced motion
Good contrast
Responsive
360px
390px
430px
768px
1024px
1280px
1440px
1920px

FINAL INSTRUCTION TO OPENCODE
Do not stop after generating a basic working website.
The goal is NOT:
"Make an Astro website."
The goal is:
Build a premium, high-performance, Awwwards-inspired digital experience for The Digital Echo using Astro + headless WordPress + WPGraphQL + TailwindCSS + GSAP.
The site must combine:
Creative Direction + Content + Motion + Performance + SEO + Accessibility + Maintainability.
Prioritise:
1. Performance
2. Content clarity
3. UX
4. Accessibility
5. SEO/AEO/AIO/GEO
6. Motion design
7. Visual experimentation
Never sacrifice usability or performance merely to create an animation.
When finished:
Run the build.
Fix all TypeScript errors.
Fix all ESLint errors.
Fix all Astro errors.
Fix broken GraphQL queries.
Test every route.
Test mobile navigation.
Test page transitions.
Test ScrollTrigger after navigation.
Test reduced motion.
Test keyboard navigation.
Check image loading.
Check SEO metadata.
Check structured data.
Check sitemap.
Check robots.txt.
Review Core Web Vitals risks.
Then provide a concise final report containing:
WHAT WAS BUILT

WORDPRESS / GRAPHQL REQUIREMENTS

PAGES CREATED

ANIMATION SYSTEM

SEO IMPLEMENTATION

PERFORMANCE IMPLEMENTATION

ENVIRONMENT VARIABLES

COMMANDS TO RUN

KNOWN LIMITATIONS
Do not claim something works unless it has actually been tested.
