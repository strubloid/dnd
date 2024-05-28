const puppeteer = require('puppeteer');
require('dotenv').config();

(async () => {

  const width = 1920;
  const height = 1080;

  // Launch the browser with the specified window size
  const browser = await puppeteer.launch({
    headless: false,
    args: [`--window-size=${width},${height}`, '--disable-blink-features=AutomationControlled']
  });

  // Launch the page with specific size
  const page = await browser.newPage();
  await page.setViewport({
    width: width,
    height: height,
  });

  console.log("GOOGLE Login");
  console.log("1 - Login Google Page");
  await page.goto('https://accounts.google.com', { waitUntil: 'networkidle2' });

  console.log("2 - Entering Google credentials");
  
  // Fill in the username and password
  console.log("3 - Email");
  await new Promise(resolve => setTimeout(resolve, 1000 * 2)); 
  await page.type('input[type="email"]', process.env.GOOGLE_USERNAME);
  await page.click('div[id="identifierNext"]');
  
  // wait for a bit
  console.log("3 - Password");
  await new Promise(resolve => setTimeout(resolve, 1000 * 2)); 
  await page.type('input[type="password"]', process.env.GOOGLE_PASSWORD);
  await page.click('div[id="passwordNext"]');

  // Wait for login to complete
  await page.waitForNavigation({ waitUntil: 'networkidle0' });


  console.log("DND PAGE on Youtube");

  console.log("1 - Accessing Page");
  await page.goto('https://www.youtube.com/@DnDBrasilCork/live', { waitUntil: 'networkidle2' });

  // console.log("2 - Accepting the YouTube Cookies");
  // await page.waitForSelector('button[aria-label="Accept all"]', { visible: true });
  // await page.click('button[aria-label="Accept all"]');

  console.log("2 - Waiting for the chat iframe to load");
  await page.waitForSelector('iframe#chatframe', { visible: true, timeout: 60000 });

  const iframeElement = await page.$('#chat-container iframe');
  const iframe = await iframeElement.contentFrame();
  await iframe.click('yt-live-chat-app yt-live-chat-button');

  console.log("3 - Click PopOut");
  // document.querySelector('tp-yt-paper-listbox ytd-menu-service-item-renderer:nth-of-type(2)')
  await iframe.click('tp-yt-paper-listbox ytd-menu-service-item-renderer:nth-of-type(2)');

  console.log("4 - New Page URL");
  const pages = await browser.pages();
  let pageIndex = 0;

  while (pageIndex < pages.length) {
    const page = pages[pageIndex];
    const url = await page.url();
    console.log(url);
    pageIndex++;
}

  
  const newPage = pages[pages.length - 1];
  if (newPage) {
      console.log('New page URL:', newPage.url());
  }
 
  console.log('Waiting');
  await new Promise(resolve => setTimeout(resolve, 1000 * 60 * 10)); 

  await browser.close();
})();
