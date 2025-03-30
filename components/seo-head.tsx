import Head from 'next/head';
import React from 'react';

interface SeoHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export default function SeoHead({
  title = "Abdul 'Aziz | Fullstack Developer & Web Engineer",
  description = "Professional portfolio of Abdul 'Aziz, a skilled Fullstack Developer specializing in modern web technologies, React, Next.js, and full-stack development solutions.",
  keywords = ["fullstack developer", "web developer", "React developer", "Next.js developer", "portfolio", "Abdul Aziz"],
  ogImage = "/https://abdul-aziz.my.id/icon.ico",
  canonicalUrl = "https://abdul-aziz.my.id/",
}: SeoHeadProps) {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="Abdul 'Aziz" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://abdul-aziz.my.id${ogImage}`} />
      <meta property="og:site_name" content="Abdul 'Aziz Portfolio" />
      <meta property="og:locale" content="id_ID" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://abdul-aziz.my.id${ogImage}`} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      
      {/* Preconnect to important domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Language */}
      <meta httpEquiv="content-language" content="id" />
      
      {/* Title */}
      <title>{title}</title>
    </Head>
  );
}
