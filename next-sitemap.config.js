/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://abdul-aziz.my.id',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/login/']
      },
    ],
    additionalSitemaps: [
      'https://abdul-aziz.my.id/sitemap.xml',
    ],
  },
  exclude: ['/admin/*', '/login'],
  generateIndexSitemap: false,
  outDir: 'public',
}
