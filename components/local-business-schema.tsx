import React from 'react';

export default function LocalBusinessSchema() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Abdul Aziz - Fullstack Developer',
    url: 'https://abdul-aziz.my.id/',
    logo: 'https://abdul-aziz.my.id/icon.ico',
    image: 'https://abdul-aziz.my.id/profile-3.jpg?height=600&width=600',
    description: 'Jasa pengembangan website profesional oleh Abdul Aziz, seorang Fullstack Developer yang berpengalaman dalam teknologi web modern.',
    priceRange: 'depends on project',
    telephone: '+62-895-6375-94068', // Replace with your actual phone number
    email: 'contact@abdul-aziz.my.id', // Replace with your actual email
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jambi', // Replace with your actual city
      addressRegion: 'Jambi', // Replace with your actual region
      addressCountry: 'ID'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.2088, // Replace with your actual coordinates
      longitude: 106.8456 // Replace with your actual coordinates
    },
    openingHours: 'Mo-Fr 07:00-21:00',
    sameAs: [
      'https://github.com/KapalaBintang',
      'https://www.linkedin.com/in/abdul-aziz-852802280',
      'https://www.instagram.com/abdul_aziz_2412/'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Layanan Web Development',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Website Development',
          description: 'Pembuatan website profesional dengan teknologi modern'
        },
        {
          '@type': 'Offer',
          name: 'Web Application Development',
          description: 'Pengembangan aplikasi web dengan React dan Next.js'
        },
        {
          '@type': 'Offer',
          name: 'SEO Optimization',
          description: 'Optimasi mesin pencari untuk website Anda'
        }
      ]
    },
    makesOffer: [
      {
        '@type': 'Offer',
        name: 'Website Development',
        description: 'Pembuatan website profesional dengan teknologi modern'
      }
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
