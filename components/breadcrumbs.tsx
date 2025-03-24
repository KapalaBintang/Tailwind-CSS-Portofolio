import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // Don't show breadcrumbs on homepage
  if (pathname === '/') return null;
  
  const pathSegments = pathname.split('/').filter(segment => segment);
  
  // Generate breadcrumb data with proper URLs
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    ...pathSegments.map((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
      // Capitalize and replace hyphens with spaces
      const name = segment.charAt(0).toUpperCase() + 
                  segment.slice(1).replace(/-/g, ' ');
      return { name, href };
    })
  ];

  // Add structured data for breadcrumbs
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': breadcrumb.name,
      'item': `https://abdul-aziz.my.id${breadcrumb.href}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav aria-label="Breadcrumb" className="py-3 px-4 text-sm">
        <ol className="flex flex-wrap items-center space-x-1">
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={breadcrumb.href}>
              {index > 0 && (
                <li className="text-gray-500 dark:text-gray-400 mx-1">/</li>
              )}
              <li>
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-600 dark:text-gray-300 font-medium" aria-current="page">
                    {breadcrumb.name}
                  </span>
                ) : (
                  <Link 
                    href={breadcrumb.href}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {breadcrumb.name}
                  </Link>
                )}
              </li>
            </React.Fragment>
          ))}
        </ol>
      </nav>
    </>
  );
}
