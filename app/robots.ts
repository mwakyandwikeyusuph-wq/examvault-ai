export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/secure-examvault-admin-x8f4h2', '/admin'],
    },
    sitemap: 'https://examvault.ai/sitemap.xml',
  };
}
