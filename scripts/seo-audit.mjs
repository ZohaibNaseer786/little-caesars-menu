const baseUrl = (process.env.SEO_BASE_URL || 'http://localhost:3005').replace(/\/$/, '')
const productionHost = 'https://www.little-caesars-menus.us'

function textMatch(html, pattern) {
  return html.match(pattern)?.[1]?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() || ''
}

function decodeXml(value) {
  return value.replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>')
}

async function read(url, options) {
  const response = await fetch(url, options)
  return { response, body: await response.text() }
}

const errors = []
const warnings = []
const pages = []

const robots = await read(`${baseUrl}/robots.txt`)
if (robots.response.status !== 200) errors.push('robots.txt did not return 200')
if (!robots.body.includes('Disallow: /api/')) errors.push('robots.txt does not block API routes')
if (!robots.body.includes(`${productionHost}/sitemap.xml`)) errors.push('robots.txt does not list the production sitemap')

const imageSitemap = await read(`${baseUrl}/image-sitemap.xml`)
if (imageSitemap.response.status !== 200 || !imageSitemap.body.includes('<image:image>')) {
  errors.push('image sitemap is missing or empty')
}

const sitemap = await read(`${baseUrl}/sitemap.xml`)
if (sitemap.response.status !== 200) throw new Error(`Sitemap returned ${sitemap.response.status}`)
const sitemapUrls = [...sitemap.body.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decodeXml(match[1]))
const uniqueUrls = new Set(sitemapUrls)
if (uniqueUrls.size !== sitemapUrls.length) errors.push('sitemap contains duplicate URLs')
if (!uniqueUrls.has(`${productionHost}/research/menu-price-comparison`)) errors.push('research dataset page is missing from the sitemap')

for (const sitemapUrl of sitemapUrls) {
  const parsed = new URL(sitemapUrl)
  const localUrl = `${baseUrl}${parsed.pathname}${parsed.search}`
  const { response, body } = await read(localUrl)
  const title = textMatch(body, /<title>(.*?)<\/title>/s)
  const description = body.match(/<meta name="description" content="([^"]*)"/)?.[1] || ''
  const canonical = body.match(/<link rel="canonical" href="([^"]*)"/)?.[1] || ''
  const robotsMeta = body.match(/<meta name="robots" content="([^"]*)"/)?.[1] || ''
  const h1Count = (body.match(/<h1[\s>]/g) || []).length

  pages.push({ url: sitemapUrl, status: response.status, title, description, canonical, h1Count })
  if (response.status !== 200) errors.push(`${sitemapUrl} returned ${response.status}`)
  if (!title) errors.push(`${sitemapUrl} has no title`)
  if (!description) errors.push(`${sitemapUrl} has no meta description`)
  if (!canonical) errors.push(`${sitemapUrl} has no canonical`)
  const normalizedCanonical = canonical.replace(/\/$/, '')
  const normalizedSitemapUrl = sitemapUrl.replace(/\/$/, '')
  if (canonical && normalizedCanonical !== normalizedSitemapUrl) errors.push(`${sitemapUrl} canonical points to ${canonical}`)
  if (/noindex/i.test(robotsMeta)) errors.push(`${sitemapUrl} is in the sitemap but marked noindex`)
  if (h1Count !== 1) errors.push(`${sitemapUrl} has ${h1Count} H1 elements`)
  if (title.length > 70) warnings.push(`${sitemapUrl} title is ${title.length} characters`)
  if (description.length > 180) warnings.push(`${sitemapUrl} description is ${description.length} characters`)
  if (body.includes('your-google-verification-code')) errors.push(`${sitemapUrl} contains a placeholder Google verification token`)

  if (parsed.pathname.startsWith('/blog/') && !body.includes('Little Caesars Menu Editorial Team')) {
    errors.push(`${sitemapUrl} has no visible editorial byline`)
  }
  if (parsed.pathname.startsWith('/blog/') && !body.includes('Sources and Review Method')) {
    errors.push(`${sitemapUrl} has no visible source methodology`)
  }
  if (parsed.pathname.startsWith('/item/') && !body.includes('/research/menu-price-comparison')) {
    errors.push(`${sitemapUrl} does not link to the price comparison dataset`)
  }
  if (parsed.pathname.startsWith('/menu/') && !body.includes('/nutrition') && !body.includes('/research/menu-price-comparison')) {
    errors.push(`${sitemapUrl} does not expose category research links`)
  }
  if (parsed.pathname === '/research/menu-price-comparison') {
    if (!body.includes('https://schema.org') || !body.includes('Dataset')) errors.push(`${sitemapUrl} has no Dataset structured data`)
    if (!body.includes('/downloads/menu-price-comparison.csv')) errors.push(`${sitemapUrl} does not link to its CSV download`)
    if (!body.includes('Report a correction')) errors.push(`${sitemapUrl} has no correction path`)
  }
}

const canonicalCounts = pages.reduce((counts, page) => {
  counts[page.canonical] = (counts[page.canonical] || 0) + 1
  return counts
}, {})
for (const [canonical, count] of Object.entries(canonicalCounts)) {
  if (canonical && count > 1) errors.push(`${count} sitemap pages share canonical ${canonical}`)
}

const aliases = ['/menu/pizza', '/menu/wings', '/menu/desserts', '/menu/limited']
for (const alias of aliases) {
  const { response } = await read(`${baseUrl}${alias}`, { redirect: 'manual' })
  if (![301, 308].includes(response.status)) errors.push(`${alias} should permanently redirect but returned ${response.status}`)
}

const invalidPaths = ['/menu/not-a-category', '/item/not-an-item']
for (const path of invalidPaths) {
  const { response } = await read(`${baseUrl}${path}`, { redirect: 'manual' })
  if (response.status !== 404) errors.push(`${path} should return 404 but returned ${response.status}`)
}

const home = await read(baseUrl)
if (!home.body.includes('G-GXLT7DJEJB')) errors.push('Google Analytics measurement ID is missing from rendered HTML')
if (!home.body.includes('/research/menu-price-comparison')) errors.push('sitewide navigation does not link to the research dataset')

const menuPage = await read(`${baseUrl}/menu`)
for (const requiredLink of ['/blog/little-caesars-menu-prices', '/research/menu-price-comparison', '/deals', '/nutrition', '/stores']) {
  if (!menuPage.body.includes(`href="${requiredLink}"`)) errors.push(`/menu is missing priority internal link ${requiredLink}`)
}

const csvDownload = await read(`${baseUrl}/downloads/menu-price-comparison.csv`)
if (csvDownload.response.status !== 200) errors.push(`menu price CSV returned ${csvDownload.response.status}`)
if (!csvDownload.response.headers.get('content-type')?.includes('text/csv')) errors.push('menu price download is not served as CSV')
const csvRows = csvDownload.body.trim().split('\n')
if (csvRows.length !== 109) errors.push(`menu price CSV should have 109 rows including the header but has ${csvRows.length}`)
if (!csvDownload.body.includes('item_id,item_name,category,guide_price_usd')) errors.push('menu price CSV header is incomplete')

console.log(`SEO crawl: ${pages.length} sitemap pages`)
console.log(`Errors: ${errors.length}`)
console.log(`Warnings: ${warnings.length}`)
for (const error of errors) console.error(`ERROR ${error}`)
for (const warning of warnings) console.warn(`WARN  ${warning}`)

if (errors.length) process.exitCode = 1
