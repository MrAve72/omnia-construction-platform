import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
}

// SEO configuration for each page (Minnesota-focused)
const pageConfigs: Record<string, SEOConfig> = {
  '/': {
    title: 'Omnia Construction - Kitchen & Bathroom Remodeling | Minneapolis, MN',
    description: 'Licensed Minnesota contractor (CR807108) specializing in kitchen & bathroom remodeling. 13 years experience, 279 completed projects. Minneapolis, St. Paul & Twin Cities. Free estimates. Call (612) 849-9633',
    keywords: 'kitchen remodeling Minneapolis, bathroom remodeling Minneapolis, home remodeling Twin Cities, licensed contractor Minnesota',
    ogImage: '/og-image.webp',
  },
  '/portfolio': {
    title: 'Portfolio - 279 Completed Projects | Omnia Construction Minneapolis',
    description: 'View our portfolio of 279 completed kitchen, bathroom, and basement remodeling projects in Minneapolis and St. Paul. Before and after photos. 5-star rated contractor.',
    keywords: 'Minneapolis remodeling portfolio, before after kitchen bathroom, Twin Cities contractor projects',
    ogImage: '/og-image.webp',
  },
  '/booking': {
    title: 'Book Free Consultation - Schedule Estimate | Omnia Construction',
    description: 'Schedule your free remodeling consultation with licensed Minnesota contractor. Online booking available. Kitchen, bathroom, basement estimates. Call (612) 849-9633 or book online.',
    keywords: 'book remodeling consultation Minneapolis, free estimate, schedule contractor appointment',
    ogImage: '/og-image.webp',
  },
  '/contact': {
    title: 'Contact Us - Free Estimates | Omnia Construction Minneapolis',
    description: 'Contact Omnia Construction for free remodeling estimates in Minneapolis & St. Paul. Licensed contractor CR807108. Phone: (612) 849-9633. Email: kolbasin.oleksandr@omniaconstructionmn.com',
    keywords: 'contact Minneapolis contractor, free remodeling estimate, Twin Cities construction',
    ogImage: '/og-image.webp',
  },
  '/about': {
    title: 'About Us - 13 Years Experience, 279 Projects | Omnia Construction',
    description: 'Meet Omnia Construction LLC - Licensed Minnesota contractor with 13 years experience. 279 completed projects across Minneapolis & St. Paul. BBB accredited. 5-star reviews.',
    keywords: 'about Minneapolis contractor, licensed remodeler Minnesota, BBB accredited',
    ogImage: '/og-image.webp',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Omnia Construction',
    description: 'Privacy policy for Omnia Construction LLC. Learn how we protect your personal information.',
    keywords: 'privacy policy',
  },
  '/terms-conditions': {
    title: 'Terms & Conditions | Omnia Construction',
    description: 'Terms and conditions for services provided by Omnia Construction LLC.',
    keywords: 'terms conditions',
  },
  '/sms-policy': {
    title: 'SMS Policy | Omnia Construction',
    description: 'SMS messaging policy for Omnia Construction LLC.',
    keywords: 'sms policy',
  },
};

export const useSEO = (customConfig?: Partial<SEOConfig>) => {
  const location = useLocation();

  useEffect(() => {
    // Get config for current page or use homepage as fallback
    const config = {
      ...pageConfigs[location.pathname] || pageConfigs['/'],
      ...customConfig
    };

    // Update document title
    document.title = config.title;

    // Update or create meta description
    const updateMetaTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Update or create meta property (for Open Graph)
    const updateMetaProperty = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Update meta tags
    updateMetaTag('description', config.description);
    if (config.keywords) {
      updateMetaTag('keywords', config.keywords);
    }

    // Update Open Graph tags
    updateMetaProperty('og:title', config.title);
    updateMetaProperty('og:description', config.description);
    updateMetaProperty('og:url', `https://www.omniaconstructionmn.com${location.pathname}`);
    if (config.ogImage) {
      updateMetaProperty('og:image', `https://www.omniaconstructionmn.com${config.ogImage}`);
    }

    // Update Twitter card tags
    updateMetaProperty('twitter:title', config.title);
    updateMetaProperty('twitter:description', config.description);
    updateMetaProperty('twitter:url', `https://www.omniaconstructionmn.com${location.pathname}`);
    if (config.ogImage) {
      updateMetaProperty('twitter:image', `https://www.omniaconstructionmn.com${config.ogImage}`);
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', config.canonical || `https://www.omniaconstructionmn.com${location.pathname}`);

  }, [location.pathname, customConfig]);
};
