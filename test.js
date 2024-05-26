const puppeteer = require('puppeteer');

// get the current date
const today = new Date();
const year = today.getFullYear().toString();
const month = (today.getMonth() + 1).toString();
const day = today.getDate().toString();
// creating the file-name for the screenshot
// the filename shall be the current day's date in format YYYY-MM-DD
const filePath = year.concat("-", month, "-", day);

async function getPic() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://codeburst.io/a-guide-to-automating-scraping-the-web-with-javascript-chrome-puppeteer-node-js-b18efb9e9921');
  await page.setViewport({width: 1080, height: 1024});
  await page.screenshot({ path: 'zse2.png'});

  await browser.close();
}

getPic();