const fs = require('fs');
const markdownIt = require('markdown-it');
const puppeteer = require('puppeteer');

const md = new markdownIt();
const markdown = fs.readFileSync('README.md', 'utf8');
const html = md.render(markdown);

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html);
  await page.pdf({ path: 'output.pdf', format: 'A4' });
  await browser.close();
  console.log('PDF generated successfully!');
})();