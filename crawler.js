import * as cheerio from 'cheerio';
import fs from 'fs';

const BASE = 'https://www.funice.ro';
const TARGETS = [
  "Paris", "Salzburg", "Macao", "AthenXL", "Sydney", "Montreal", "Miami",
  "Kinley", "Vento Hybrid", "Vento Water", "Vento VSV", "Rio", "Sao Paulo",
  "Vitrine cu perdea de aer AC", "RVC-300 Black LED", "Tehnologie Cuptoare Debag",
  "Linia BAKETEK", "Linia MEGA BAKERY", "Linia BRIO", "KITCHEN 2.0",
  "KITCHEN 4.0", "Samos Deep", "Basia 2",
  "Vitrina Frigorifică Innova", "Vitrina Frigorifică Innova T", "Vitrină Cofetărie Cube",
  "Echipamente AHT Recondiționate", "Echipamente AHT"
];

const results = {};
const queue = ['/ro/produse/'];
const visited = new Set();

async function run() {
  console.log("Starting spider...");
  while(queue.length > 0 && visited.size < 200) {
    const path = queue.shift();
    if (visited.has(path)) continue;
    visited.add(path);
    
    try {
      const html = await fetch(BASE + path).then(r=>r.text());
      const $ = cheerio.load(html);
      
      $('a').each((i, e) => {
        const href = $(e).attr('href');
        if (href && href.startsWith('/ro/produse/')) {
           if (!visited.has(href) && !queue.includes(href)) queue.push(href);
        }
      });
      
      const title = $('h1').first().text().trim();
      if (!title) continue;
      
      let desc = "";
      $('p').each((i, e) => {
          const t = $(e).text().trim();
          if (t.length > 30) desc += t + " ";
      });
      
      let pdfUrl = null;
      $('a').each((i, e) => {
          const href = $(e).attr('href');
          const t = $(e).text().toLowerCase();
          if (href && (href.toLowerCase().endsWith('.pdf') || t.includes('tehnic') || t.includes('pdf'))) {
              pdfUrl = href.startsWith('http') ? href : BASE + href;
          }
      });
      
      // Attempt to map product exactly
      for (const t of TARGETS) {
          const firstWord = t.split(' ')[0].toLowerCase();
          if (!results[t] && title.toLowerCase().includes(firstWord) && path.includes('.html')) {
              results[t] = {
                  scrapedTitle: title,
                  description: desc.substring(0, 300).trim(),
                  pdfUrl: pdfUrl || 'https://www.funice.ro/ro/produse/'
              };
          }
      }
    } catch(e) {}
  }
  
  fs.writeFileSync('product-data.json', JSON.stringify(results, null, 2));
  console.log("Finished. Mapped", Object.keys(results).length, "targets.");
}
run();
