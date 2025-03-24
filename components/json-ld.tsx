import React from 'react';

export default function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abdul Aziz',
    url: 'https://abdul-aziz.my.id/',
    jobTitle: 'Fullstack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    description: 'Professional portfolio of Abdul Aziz, a skilled Fullstack Developer specializing in modern web technologies, React, Next.js, and full-stack development solutions.',
    sameAs: [
      'https://github.com/KapalaBintang',
      'https://www.linkedin.com/in/abdul-aziz-852802280',
      'https://www.instagram.com/abdul_aziz_2412/'
    ],
    knowsAbout: [
      'Web Development',
      'React',
      'Next.js',
      'JavaScript',
      'TypeScript',
      'Node.js',
      'Full Stack Development',
    ],
    image: 'https://abdul-aziz.my.id/og-image.jpg',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://abdul-aziz.my.id/'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
