import React from 'react';

export default function FaqSchema() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Apa saja layanan yang ditawarkan oleh Abdul Aziz?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Abdul Aziz menawarkan jasa pembuatan website profesional, pengembangan aplikasi web dengan React dan Next.js, optimasi SEO, dan solusi digital lainnya untuk kebutuhan bisnis dan personal.'
        }
      },
      {
        '@type': 'Question',
        name: 'Berapa biaya untuk membuat website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Biaya pembuatan website bervariasi tergantung pada kompleksitas, fitur, dan kebutuhan spesifik. Silakan hubungi kami melalui halaman kontak untuk mendapatkan penawaran yang sesuai dengan kebutuhan Anda.'
        }
      },
      {
        '@type': 'Question',
        name: 'Berapa lama waktu yang dibutuhkan untuk membuat website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Waktu pengembangan website bervariasi tergantung pada kompleksitas proyek. Website sederhana dapat selesai dalam 1-2 minggu, sementara website yang lebih kompleks dengan fitur khusus dapat membutuhkan waktu 4-8 minggu atau lebih.'
        }
      },
      {
        '@type': 'Question',
        name: 'Apakah Abdul Aziz menyediakan layanan pemeliharaan website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ya, kami menyediakan layanan pemeliharaan website untuk memastikan website Anda tetap berjalan dengan baik, aman, dan up-to-date. Layanan ini mencakup pembaruan keamanan, backup rutin, dan dukungan teknis.'
        }
      },
      {
        '@type': 'Question',
        name: 'Teknologi apa yang digunakan untuk pengembangan website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kami menggunakan teknologi modern seperti React, Next.js, TypeScript, Tailwind CSS, dan berbagai tools pengembangan terkini untuk memastikan website Anda memiliki performa tinggi, responsif, dan mudah dikelola.'
        }
      },
      {
        '@type': 'Question',
        name: 'Apakah website yang dibuat akan responsif untuk perangkat mobile?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ya, semua website yang kami kembangkan dirancang dengan pendekatan mobile-first dan sepenuhnya responsif untuk semua ukuran layar, termasuk smartphone, tablet, dan desktop.'
        }
      },
      {
        '@type': 'Question',
        name: 'Apakah Abdul Aziz dapat membantu dengan optimasi SEO?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ya, kami menyediakan layanan optimasi SEO komprehensif untuk membantu website Anda mendapatkan peringkat lebih tinggi di mesin pencari seperti Google. Layanan ini mencakup optimasi on-page, riset kata kunci, dan implementasi structured data.'
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
