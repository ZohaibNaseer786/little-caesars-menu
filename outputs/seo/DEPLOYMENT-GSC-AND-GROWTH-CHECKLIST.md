# Deployment, Search Console, Analytics, and Growth Checklist

## 1. Production deployment

- [ ] Deploy the current production build.
- [ ] Set `NEXT_PUBLIC_APP_URL=https://www.little-caesars-menus.us` in the production environment.
- [ ] Set `GOOGLE_SITE_VERIFICATION` to the real Search Console verification token only if HTML verification is needed.
- [ ] Confirm the canonical host redirects consistently to `https://www.little-caesars-menus.us`.
- [ ] Confirm these live URLs return HTTP 200:
  - `https://www.little-caesars-menus.us/robots.txt`
  - `https://www.little-caesars-menus.us/sitemap.xml`
  - `https://www.little-caesars-menus.us/image-sitemap.xml`
  - `https://www.little-caesars-menus.us/research/menu-price-comparison`
  - `https://www.little-caesars-menus.us/downloads/menu-price-comparison.csv`
- [ ] Run `SEO_BASE_URL=https://www.little-caesars-menus.us npm run seo:audit` after deployment.

## 2. Google Search Console

- [ ] Use a Domain property for `little-caesars-menus.us` when DNS access is available; it covers protocol and subdomain variants.
- [ ] Submit `https://www.little-caesars-menus.us/sitemap.xml` in Search Console.
- [ ] Inspect and live-test these priority URLs:
  - `/`
  - `/menu`
  - `/blog/little-caesars-menu-prices`
  - `/stores`
  - `/deals`
  - `/nutrition`
  - `/research/menu-price-comparison`
  - `/item/hnrs-orcw`
  - `/item/hnrs-cdbmm`
- [ ] Request indexing for changed priority URLs after each live test passes.
- [ ] Check Page Indexing weekly for server errors, blocked pages, duplicate canonicals, and crawled-currently-not-indexed pages.
- [ ] Do not expect every utility or duplicate URL to be indexed. Measure canonical landing pages and search clicks.

Official references:

- Google sitemap guidance: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- URL Inspection: https://support.google.com/webmasters/answer/9012289

## 3. Google Analytics 4

- [ ] Open Google Tag Assistant and verify `G-GXLT7DJEJB` is detected on the production domain.
- [ ] Confirm a `page_view` event appears for the homepage, menu, research page, item page, and blog page.
- [ ] Check the GA4 Realtime report 10-15 minutes after deployment.
- [ ] Add internal-traffic filtering before using engagement data for editorial decisions.
- [ ] Annotate the deployment date in the team's reporting notes.

Official references:

- Verify the Google tag: https://support.google.com/analytics/answer/15756111
- Confirm data collection: https://support.google.com/analytics/answer/10201247

## 4. First 14 days after deployment

- [ ] Day 1: submit sitemap, inspect priority URLs, and verify GA4 events.
- [ ] Day 2: compare Google-selected canonicals against the declared canonicals.
- [ ] Day 3: start personalized outreach for the price dataset using `outreach-templates.md`.
- [ ] Day 5: review Search Console query discovery and fix unexpected title or snippet issues.
- [ ] Day 7: record indexed priority pages, clicks, impressions, CTR, and average position.
- [ ] Day 10: follow up once with relevant outreach prospects.
- [ ] Day 14: compare results with the Semrush baseline and select the next two pages from `editorial-calendar-90-days.csv`.

## 5. Weekly operating rhythm

- Monday: export Search Console page and query performance for the previous 28 days.
- Tuesday: refresh one priority page only when prices, availability, sources, or search intent changed.
- Wednesday: contact five carefully selected publishers or resource maintainers.
- Thursday: improve internal links from pages already receiving impressions.
- Friday: record rankings, referring domains, indexed URLs, CTR, and completed corrections.

## Success measures

- Priority pages indexed with the intended canonical.
- Non-brand impressions and clicks grow over rolling 28-day periods.
- The menu-price article moves from positions 7-11 toward the top five.
- Stores, deals, nutrition, wings, and brownie pages gain query coverage and clicks.
- Relevant referring domains increase without paid dofollow links or bulk outreach.
- Search snippets improve through higher CTR, not clickbait or unsupported claims.

No technical change can guarantee Google's first position. The controllable work is crawlability, intent match, useful original resources, trustworthy sourcing, strong internal links, and legitimate authority growth.
