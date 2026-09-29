import type { BrandStatement } from '../../types';

export const mockBrandStatement: BrandStatement = {
  id: 'brandstatement-mock',
  slug: 'we-dont-just',
  title: "We Don't Just",
  title1: 'Create Content.',
  title2: 'We create echo',
  fullTitle: "We Don't Just Create Content. We create echo",
  content: '',
  paragraphs: [
    "From professional photography and videography to social media marketing and brand storytelling, we create digital experiences designed around your audience. Whether it's a product launch, a new business, a campaign, or your everyday social media presence, we turn ideas into content that feels real and connects with people.",
    'Our approach to digital marketing is simple: understand the brand first, then create content that sounds and looks like it belongs to it. We combine creativity, strategy, visual storytelling, and platform-specific content to help brands build a stronger online presence.',
    'Need scroll-stopping visuals? Our photography and videography bring your products, people, and ideas to life. Want your social media to actually feel alive? Our social media management helps you stay consistent, relevant, and connected across platforms like Instagram, Facebook, LinkedIn, and WhatsApp.',
  ],
  reels: [
    '/assets/sample-restaurant.mp4',
    '/assets/sample-shop.mp4',
    '/assets/sample-factory.mp4',
  ],
};
