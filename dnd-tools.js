const puppeteer = require('puppeteer');
require('dotenv').config();

(async () => {

  const width = 1920;
  const height = 1080;

  // Launch the browser with the specified window size
  const browser = await puppeteer.launch({
    headless: false,
    args: [`--window-size=${width},${height}`]
  });

  // Launch the page with specific size
  const page = await browser.newPage();
  await page.setViewport({
    width: width,
    height: height,
  });


  console.log("1 - Login Google Page");
  await page.goto('https://accounts.google.com', { waitUntil: 'networkidle2' });

  console.log("2 - Entering Google credentials");
  
  // Fill in the username and password
//   await page.waitForSelector('input[type="email"]', { visible: true });
  await new Promise(resolve => setTimeout(resolve, 1000 * 3)); 
  console.log("3 - Email");
  console.log(process.env.GOOGLE_USERNAME)
  await page.type('input[type="email"]', process.env.GOOGLE_USERNAME);
  await page.click('div[id="identifierNext"]');
  await new Promise(resolve => setTimeout(resolve, 1000 * 5)); 

  console.log("3 - Password");
  console.log(process.env.GOOGLE_PASSWORD)
  await page.type('input[type="password"]', process.env.GOOGLE_PASSWORD);
  await page.click('div[id="passwordNext"]');

  // Wait for login to complete
  await page.waitForNavigation({ waitUntil: 'networkidle0' });


















//   console.log("1 - Accessing Page");
//   await page.goto('https://www.youtube.com/@DnDBrasilCork/live', { waitUntil: 'networkidle2' });

//   console.log("2 - Accepting the YouTube Cookies");
//   await page.waitForSelector('button[aria-label="Accept all"]', { visible: true });
//   await page.click('button[aria-label="Accept all"]');

//   console.log("3 - Waiting for the chat iframe to load");
//   await page.waitForSelector('iframe#chatframe', { visible: true, timeout: 60000 });

//   const iframeElement = await page.$('#chat-container iframe');
//   const iframe = await iframeElement.contentFrame();
//   await iframe.click('yt-live-chat-app yt-live-chat-button');

//   console.log("4 - Click PopOut");
//   // document.querySelector('tp-yt-paper-listbox ytd-menu-service-item-renderer:nth-of-type(2)')
//   await iframe.click('tp-yt-paper-listbox ytd-menu-service-item-renderer:nth-of-type(2)');

//   console.log("5 - New Page URL");
//   const pages = await browser.pages();
//   let pageIndex = 0;

//   while (pageIndex < pages.length) {
//     const page = pages[pageIndex];
//     const url = await page.url();
//     console.log(url);
//     pageIndex++;
// }

  
//   const newPage = pages[pages.length - 1];
//   if (newPage) {
//       console.log('New page URL:', newPage.url());
//   }
 
  console.log('Waiting');
  await new Promise(resolve => setTimeout(resolve, 1000 * 60 * 10)); 

  await browser.close();
})();
