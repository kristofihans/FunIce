import * as cheerio from 'cheerio';
import fs from 'fs';

async function run() {
  const html = await fetch('https://www.funice.ro/ro/produse/').then(r=>r.text());
  console.log("HTML length:", html.length);
  const $ = cheerio.load(html);
  const links = [];
  $('a').each((i, e) => links.push($(e).attr('href')));
  console.log("Links with 'produse':", links.filter(l => l && l.includes('produse')).length);
  console.log("Sample links:", links.filter(l => l && l.includes('produse')).slice(0, 10));
  fs.writeFileSync('temp.html', html);
}
run();
