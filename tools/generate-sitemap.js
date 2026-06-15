const fs = require('fs')
const path = require('path')

const pages = ['/', '/products', '/about', '/contact']
const domain = process.env.SITE_DOMAIN || 'https://YOUR_DOMAIN_HERE'

const urls = pages.map(p => `  <url>\n    <loc>${domain}${p}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`).join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`

fs.writeFileSync(path.join(__dirname, '..', 'dist', 'sitemap.xml'), sitemap)
console.log('sitemap.xml generated')
