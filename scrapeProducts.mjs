import fs from 'fs/promises';
import path from 'path';

// =========================================================================
// USER CONFIGURATION: CHANGE THESE VARIABLES TO SCRAPE A DIFFERENT WEBSITE
// =========================================================================

// 1. The main sitemap index URL of the website you want to scrape.
// Usually found at /sitemap.xml or /sitemap_index.xml
const SITEMAP_INDEX_URL = 'https://gargagencypharma.com/sitemap_index.xml';

// 2. The directory where downloaded images will be saved.
// Change "gargagency_products" to the name of your new target website.
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'gargagency_products');

// 3. Regex to find the *Product Sitemaps* from the main sitemap index.
// Many sites split their sitemaps into product, category, page sitemaps.
// We only want the product ones. Change the domain and keywords accordingly.
// e.g., /<loc>(https:\/\/yourdomain\.com\/.*?)<\/loc>/g
const PRODUCT_SITEMAP_REGEX = /<loc>(https:\/\/gargagencypharma\.com\/.*?product.*?\.xml)<\/loc>/g;

// 4. Regex to find the *Individual Product URLs* from inside the product sitemaps.
// Adjust the domain and the path (e.g., /medicines/ or /products/ or /p/)
const PRODUCT_PAGE_REGEX = /<loc>(https:\/\/gargagencypharma\.com\/medicines\/.*?)<\/loc>/g;

// 5. How many pages to scrape at the exact same time.
// Keep this low (5-10) so the website doesn't block you for DDoSing them.
const CONCURRENCY = 10;

// =========================================================================
// END OF USER CONFIGURATION
// =========================================================================


async function ensureDir(dir) {
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

// Downloads an image buffer to a local file
async function downloadImage(url, dest) {
    try {
        if (!url || typeof url !== 'string' || !url.startsWith('http')) {
            return false;
        }
        const res = await fetch(url);
        if (!res.ok) return false;
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        await fs.writeFile(dest, buffer);
        return true;
    } catch (e) {
        return false;
    }
}

async function scrape() {
    await ensureDir(OUTPUT_DIR);
    console.log(`Ensured output directory: ${OUTPUT_DIR}`);

    console.log(`Fetching main sitemap index: ${SITEMAP_INDEX_URL}...`);
    let sitemapIndexHtml;
    try {
        const res = await fetch(SITEMAP_INDEX_URL);
        sitemapIndexHtml = await res.text();
    } catch (e) {
        console.error('Failed to fetch sitemap index:', e);
        return;
    }

    // Step 1: Extract the URLs of the product-specific sitemaps
    const sitemapUrls = [];
    let match;
    while ((match = PRODUCT_SITEMAP_REGEX.exec(sitemapIndexHtml)) !== null) {
        sitemapUrls.push(match[1]);
    }

    console.log(`Found ${sitemapUrls.length} product sitemaps.`);

    // Step 2: Fetch each product sitemap and extract all the individual product page URLs
    const productUrls = new Set();
    for (const sitemapUrl of sitemapUrls) {
        console.log(`Fetching product sitemap: ${sitemapUrl}`);
        try {
            const res = await fetch(sitemapUrl);
            const sitemapXml = await res.text();

            while ((match = PRODUCT_PAGE_REGEX.exec(sitemapXml)) !== null) {
                productUrls.add(match[1]);
            }
        } catch (e) {
            console.error(`Failed to fetch ${sitemapUrl}`, e);
        }
    }

    const urlsArray = Array.from(productUrls);
    console.log(`Found ${urlsArray.length} total product page URLs to process.`);

    let count = 0;

    // Step 3: Fetch each product page, find its main image, and download it
    for (let i = 0; i < urlsArray.length; i += CONCURRENCY) {
        // Process in batches defined by CONCURRENCY
        const batch = urlsArray.slice(i, i + CONCURRENCY);

        await Promise.all(batch.map(async (url) => {
            try {
                const res = await fetch(url);
                if (!res.ok) return;
                const html = await res.text();

                // We use Regular Expressions to find the Open Graph (og:image) meta tag.
                // This is the standard way most Websites define their "Main Image" for social media sharing.
                const ogImageMatch = html.match(/<meta property="og:image"\s+content="([^"]+)"/i)
                    || html.match(/<meta content="([^"]+)"\s+property="og:image"/i);

                if (ogImageMatch && ogImageMatch[1]) {
                    const imgUrl = ogImageMatch[1];
                    // Skip placeholders if any
                    if (imgUrl.includes('placeholder')) return;

                    // Extract the text after the last '/' to act as the filename
                    const filename = path.basename(new URL(imgUrl).pathname);
                    const dest = path.join(OUTPUT_DIR, filename);

                    // Actually download the file
                    const success = await downloadImage(imgUrl, dest);
                    if (success) {
                        count++;
                        if (count % 10 === 0) {
                            console.log(`Downloaded ${count} images so far...`);
                        }
                    }
                }
            } catch (err) {
                // Ignore single product page fetch failures
            }
        }));
    }

    console.log(`Finished scraping! Successfully downloaded ${count} images to ${OUTPUT_DIR}`);
}

// Start the scraper
scrape().catch(console.error);
