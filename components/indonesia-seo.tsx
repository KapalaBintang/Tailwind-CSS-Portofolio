import React from 'react';

export default function IndonesiaSeo() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Abdul Aziz - Fullstack Developer',
    url: 'https://abdul-aziz.my.id/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://abdul-aziz.my.id/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    description: 'Jasa pembuatan website profesional, pengembangan aplikasi web, dan solusi digital oleh Abdul Aziz, seorang Fullstack Developer berpengalaman di Indonesia.',
    inLanguage: 'id-ID',
    keywords: [
      'jasa pembuatan website',
      'developer website indonesia',
      'fullstack developer jakarta',
      'jasa web developer',
      'pembuatan aplikasi web',
      'jasa pembuatan website profesional',
      'web developer indonesia',
      'jasa website murah',
      'react developer indonesia',
      'next.js developer',
      'pengembangan aplikasi web',
      'website portofolio developer'
    ],
    author: {
      '@type': 'Person',
      name: 'Abdul Aziz',
      jobTitle: 'Fullstack Developer',
      url: 'https://abdul-aziz.my.id/',
      sameAs: [
        'https://github.com/KapalaBintang',
        'https://www.linkedin.com/in/abdul-aziz-852802280',
        'https://www.instagram.com/abdul_aziz_2412/'
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
