import type { WordPressImageNode } from '../types';

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  loading?: 'lazy' | 'eager';
  fetchpriority?: 'high' | 'low' | 'auto';
  class?: string;
  sizes?: string;
}

export function getImageProps(image: WordPressImageNode, options?: {
  loading?: 'lazy' | 'eager';
  fetchpriority?: 'high' | 'low' | 'auto';
  class?: string;
  sizes?: string;
}): ImageProps {
  return {
    src: image.sourceUrl,
    alt: image.altText || '',
    width: image.width || image.mediaDetails?.width || 1200,
    height: image.height || image.mediaDetails?.height || 630,
    loading: options?.loading || 'lazy',
    fetchpriority: options?.fetchpriority || 'auto',
    class: options?.class || '',
    sizes: options?.sizes || '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
  };
}

export function getResponsiveSrcSet(image: WordPressImageNode, widths: number[] = [640, 768, 1024, 1280, 1600]): string {
  const imgWidth = image.width || image.mediaDetails?.width || 1200;
  return widths
    .filter((w) => w <= imgWidth)
    .map((w) => `${image.sourceUrl}?w=${w} ${w}w`)
    .join(', ');
}
