const puppeteer = require('puppeteer');
const fs = require('fs');

// the url for which the puppeteer will head to in order to scrape the required information 
const url = 'https://www.zse.co.zw/';

const getInfo = async () => {
  // launching puppeteer and browser instance
  const browser = await puppeteer.launch();
  // open a new page on the browser
  const page = await browser.newPage();
  // setting the view width of the browser page instance
  await page.setViewport({
    width: 1680,
    height: 1080,
  });
  // requsting the page from the server
  // wait for the html content to load before puppeteer begins executing
  await page.goto(url, {
    waitUntil: 'domcontentloaded',
    timeout: 120000,
  });

  // get the html page data
  const result = await page.evaluate( () => {
    // using a query selector to select all rows from the 'market cap indicies table'
    const data = document.querySelectorAll('.elementor-element-8923e1a > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr');
    
    // getting the name and price data 
    return Array.from(data).map( (el, pos) => {
      if (pos > 0) {
        const index = (el.querySelector('td:nth-child(1)').innerText.trim());
        const price = (el.querySelector('td:nth-child(2)').innerText.trim());

        return {
          index,
          price
        };
      } else return;
    })
  })

  // ending the browser instance
  await browser.close()
  return result
}

getInfo().then( value => {
  console.log(value);
  fs.writeFile('data.json', JSON.stringify(value.filter(e => e != null)), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Scraped data saved to file`);
    }
  });
});