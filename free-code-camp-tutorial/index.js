const puppeteer = require('puppeteer');

const getQuotes = async () => {
  // start a puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website render load in full width and height)
  const browser = await puppeteer.launch ({
    headless: false,
    defaultViewport: null,
  });

  // open a new page
  const page = await browser.newPage();

  // on this new page
  // - open the 'http://quotes.toscrape.com/' website
  //  - wait until the DOM content is loaded (i.e. HTML is ready)
  await page.goto('http://quotes.toscrape.com/', {
    waitUntil: 'domcontentloaded',
  })

  // get page data 
  const quotes = await page.evaluate ( () => {
    // fetch the first element with class "quote"
    // gets the displayed text and returns it
    const quoteList = document.querySelectorAll(".quote");

    // convert the quoteList to an iterable array
    // for each quote fetch the text and author
    return Array.from(quoteList).map( (quote) => {
      // fetch the sub-elements from the previously fetched quote element
      // grt the displayed text and return it (`.innerText`)
      const text = quote.querySelector(".text").innerText;
      const author = quote.querySelector(".author").innerText;

    return { text, author };
    });
  });

  // display the quotes
  console.log(quotes)

  // click on the "Next page" button
  await page.click(".pager > .next > a");

  // close the browser
  await browser.close();
};

// start the scraping
getQuotes();