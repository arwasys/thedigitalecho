import type { SiteContact } from '../types';

export interface SocialLink {
  label: string;
  url: string;
}

/**
 * Shared by the footer Contact column and the fullscreen menu's "Get in touch"
 * block, so both always show exactly the same links.
 *
 * WhatsApp: label = the ACF number when set (falls back to the word
 * "WhatsApp"); href = the stored wa.me link, else `wa.me/<digits>` built from
 * the number. Socials are hidden entirely when their URL is empty (free ACF:
 * one URL field per platform).
 */
export function getContactLinks(contact: SiteContact): {
  email: string;
  phone: string;
  whatsappHref: string;
  whatsappLabel: string;
  socials: SocialLink[];
} {
  const whatsappDigits = (contact.contactWhatsappNumber || '').replace(/\D/g, '');
  const whatsappHref =
    contact.contactWhatsappUrl || (whatsappDigits ? `https://wa.me/${whatsappDigits}` : '');

  const socials: SocialLink[] = [
    { label: 'Instagram', url: contact.contactSocialInstagram || '' },
    { label: 'Facebook', url: contact.contactSocialFacebook || '' },
    { label: 'LinkedIn', url: contact.contactSocialLinkedin || '' },
    { label: 'YouTube', url: contact.contactSocialYoutube || '' },
  ].filter((social) => Boolean(social.url));

  return {
    email: contact.contactEmail || '',
    phone: contact.contactPhone || '',
    whatsappHref,
    whatsappLabel: contact.contactWhatsappNumber || 'WhatsApp',
    socials,
  };
}
