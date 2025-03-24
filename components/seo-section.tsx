import React from 'react';

interface SeoSectionProps {
  type: 'about' | 'experience' | 'portfolio' | 'contact';
  title: string;
  description: string;
  id: string;
}

export default function SeoSection({ type, title, description, id }: SeoSectionProps) {
  let structuredData;

  switch (type) {
    case 'about':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: title,
        description: description,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://abdul-aziz.my.id/#${id}`
        }
      };
      break;
    case 'experience':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: title,
        description: description,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://abdul-aziz.my.id/#${id}`
        }
      };
      break;
    case 'portfolio':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: title,
        description: description,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://abdul-aziz.my.id/#${id}`
        }
      };
      break;
    case 'contact':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: title,
        description: description,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://abdul-aziz.my.id/#${id}`
        }
      };
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
