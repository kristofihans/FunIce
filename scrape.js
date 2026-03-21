import * as cheerio from 'cheerio';
import fs from 'fs';

const BASE_URL = 'https://www.funice.ro';

async function fetchHtml(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.text();
  } catch(e) { return null; }
}

async function main() {
  const html = await fetchHtml(BASE_URL + '/ro/produse/');
  let $ = cheerio.load(html);
  
  const categoryLinks = new Set();
  $('a').each((i, el) => {
    const href = $(el).attr('href');
    if (href && href.startsWith('/ro/produse/') && href.split('/').length === 5) {
      categoryLinks.add(href);
    }
  });

  const productLinks = new Set();
  for (const catLink of Array.from(categoryLinks)) {
    const catHtml = await fetchHtml(BASE_URL + catLink);
    if (!catHtml) continue;
    const cat$ = cheerio.load(catHtml);
    cat$('a').each((i, el) => {
      const href = cat$(el).attr('href');
      if (href && href.startsWith('/ro/produse/') && href.split('/').length >= 6) {
        productLinks.add(href);
      }
    });
  }

  const results = {};
  const linksArray = Array.from(productLinks);
  console.log(`Discovered ${linksArray.length} product links. Fetching details...`);
  
  for (const pLink of linksArray) {
    const pHtml = await fetchHtml(BASE_URL + pLink);
    if (!pHtml) continue;
    const p$ = cheerio.load(pHtml);
    
    const title = p$('h1').first().text().trim();
    if (!title) continue;
    
    let description = "";
    p$('h1').parent().find('p').each((i, el) => {
      const text = p$(el).text().trim();
      if (text.length > 20) description += text + " ";
    });
    
    // Backup description scrape
    if (!description && p$('.product-short-description').length) {
      description = p$('.product-short-description').text().trim();
    }
    if (!description && p$('.descriere').length) {
      description = p$('.descriere').text().trim();
    }
    if (!description && p$('article').length) {
        description = p$('article').find('p').first().text().trim();
    }
    
    let pdfUrl = null;
    p$('a').each((i, el) => {
      const href = p$(el).attr('href');
      const text = p$(el).text().toLowerCase();
      if (href && (href.toLowerCase().endsWith('.pdf') || text.includes('fisa') || text.includes('fișa') || text.includes('tehnic'))) {
        if (href.startsWith('/')) {
            pdfUrl = BASE_URL + href;
        } else if (href.startsWith('http')) {
            pdfUrl = href;
        } else {
            pdfUrl = BASE_URL + '/' + href;
        }
      }
    });

    // Cleaning the data
    const finalDesc = description.replace(/\s+/g, ' ').substring(0, 500).trim();
    
    results[title] = {
      description: finalDesc,
      pdfUrl: pdfUrl
    };
  }
  
  fs.writeFileSync('funice-data.json', JSON.stringify(results, null, 2));
  console.log(`Successfully extracted and saved ${Object.keys(results).length} products to funice-data.json`);
}

main();
