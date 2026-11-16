import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  path,
  keywords,
  type = 'website'
}) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Helper to update or create meta tag
    const setMetaTag = (attribute: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update meta tags
    setMetaTag('name', 'description', description);
    if (keywords && keywords.length > 0) {
      setMetaTag('name', 'keywords', keywords.join(', '));
    }

    // OpenGraph
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', type);
    
    const canonicalUrl = typeof window !== 'undefined' 
      ? `${window.location.origin}${path}` 
      : `https://asadaliawan.com${path}`;
      
    setMetaTag('property', 'og:url', canonicalUrl);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Twitter
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);

  }, [title, description, path, keywords, type]);

  return null;
};
