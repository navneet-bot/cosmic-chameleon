import React from 'react';

interface HeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

const Head = ({
  title = "Cosmic Chameleon - Adaptive Digital Solutions",
  description = "Transform your business with Cosmic Chameleon's adaptive digital solutions. We specialize in brand creation, performance management, business analysis, website design, and comprehensive digital campaigns.",
  keywords = "digital marketing, brand creation, website design, business analysis, performance management, online campaigns, digital transformation, adaptive solutions",
  ogImage = "https://static.wixstatic.com/media/46b2f1_9437f14ef1b04c309f2e2788de7db047~mv2.png?originWidth=1152&originHeight=576",
  canonicalUrl = "https://cosmichameleon.com"
}: HeadProps) => {
  
  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cosmic Chameleon",
    "description": description,
    "url": canonicalUrl,
    "logo": "https://static.wixstatic.com/media/46b2f1_86551d0e8532495b8f2337890572c188~mv2.png?originWidth=1152&originHeight=576",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-234-567-890",
      "contactType": "customer service",
      "email": "hello@cosmichameleon.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Digital Universe",
      "addressRegion": "Web 3.0"
    },
    "sameAs": [
      "https://facebook.com/cosmichameleon",
      "https://twitter.com/cosmichameleon",
      "https://instagram.com/cosmichameleon",
      "https://linkedin.com/company/cosmichameleon"
    ],
    "services": [
      {
        "@type": "Service",
        "name": "Brand Creation",
        "description": "Comprehensive brand development and identity creation services"
      },
      {
        "@type": "Service", 
        "name": "Performance Management",
        "description": "Digital performance optimization and analytics services"
      },
      {
        "@type": "Service",
        "name": "Business Analysis", 
        "description": "Strategic business analysis and consulting services"
      },
      {
        "@type": "Service",
        "name": "Website Design",
        "description": "Custom website design and development services"
      },
      {
        "@type": "Service",
        "name": "Digital Campaigns",
        "description": "Online and offline marketing campaign management"
      },
      {
        "@type": "Service",
        "name": "Content Creation",
        "description": "Professional content creation and marketing services"
      }
    ]
  };

  React.useEffect(() => {
    // Set document title
    document.title = title;
    
    // Set meta tags
    const setMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.content = content;
    };

    // Basic meta tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('robots', 'index, follow');
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    setMetaTag('author', 'Cosmic Chameleon');

    // Open Graph meta tags
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:site_name', 'Cosmic Chameleon', true);

    // Twitter Card meta tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);

    // Additional SEO meta tags
    setMetaTag('theme-color', '#4CAF50');
    setMetaTag('msapplication-TileColor', '#4CAF50');

    // Set canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Add JSON-LD structured data
    let jsonLdScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(jsonLd);

    // Add Google Fonts
    let googleFonts = document.querySelector('link[href*="fonts.googleapis.com"]') as HTMLLinkElement;
    if (!googleFonts) {
      googleFonts = document.createElement('link');
      googleFonts.rel = 'stylesheet';
      googleFonts.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap';
      document.head.appendChild(googleFonts);
    }

    // Add preconnect for performance
    const addPreconnect = (href: string) => {
      if (!document.querySelector(`link[rel="preconnect"][href="${href}"]`)) {
        const preconnect = document.createElement('link');
        preconnect.rel = 'preconnect';
        preconnect.href = href;
        document.head.appendChild(preconnect);
      }
    };

    addPreconnect('https://fonts.googleapis.com');
    addPreconnect('https://fonts.gstatic.com');
    addPreconnect('https://static.wixstatic.com');

  }, [title, description, keywords, ogImage, canonicalUrl]);

  return null; // This component doesn't render anything visible
}

export default Head;